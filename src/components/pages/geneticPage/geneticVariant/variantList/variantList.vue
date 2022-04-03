<template>
  <div class="listContainer">
    <variant-item
        v-for="variant in currentPageVariants"
        :key="variant.hgvs.g"
        :variantData="variant"
    />
  </div>
</template>

<script>
import variantItem from "@/components/pages/geneticPage/geneticVariant/variantList/variantItem/variantItem"
import {ref, onMounted, onUpdated, computed, watch} from "vue"
import {getData} from "@/api/api"
import {useRoute} from 'vue-router';
import {useVariantsFiltering} from "@/components/pages/geneticPage/geneticVariant/variantList/variantsFiltering";

export default {
  name: 'variantList',
  components: {
    variantItem
  },

  props: {
    currentPageNumber: {
      type: Number,
      required: false,
      default: 1
    },
  },

  setup(props, {emit}) {
    //Подключение useRoute для динамического обновления URL
    const route = useRoute();

    const pageSize = 15                         //Количество элементов (вариантов) на странице
    let leftPageBorder = ref()                  //Номер начального элемента на странице (Для пагинации)
    let rightPageBorder = ref()                 //Номер конечного элемента на странице (Для пагинации)
    let allPageNumber = ref(1)            //Общее количество страниц вариантов (начальное 1)
    const currentPageNumber = ref(props, 'currentPageNumber') //Текущая страница, получаем как prop из компоненты pagination

    //Параметры фильтрации получаемые из URL (заданы начальные параметры, при которых не происходит фильтрация)
    const filterParams = ref({
      name: route.query.filterName || '',
      significance: route.query.filterSignificance || '',
      genotype: route.query.filterGenotype || 'ALL',
      HGWStype: route.query.filterHGWStype || 'g',
      HGWSname: route.query.filterHGWSname || ''
    })

    const variants = ref([])               //Общий(начальный) массив всех доступных вариантоа
    const filteredVariants = ref([])       //Отфильтрованный массив вариантов
    const currentPageVariants = ref([])    //Отфильтрованный массив вариантов для текущей страницы

    onMounted(() => {
      variants.value = getData().variants        //Получение всех вариантов из api
      setFilteredVariants()                      //Получение отфильтрованых вариантов (первоначально равно общему массиву вариантов)
      getCurrentPageVariants()                   //Получение отфильтрованых вариантов для текущей страницы
    })

    onUpdated(() => {
      //При обновлении DOM страницы общее количество страниц передаётся в компоненту pagination
      emit('setAllPagesNumber', allPageNumber.value)
    })

    leftPageBorder = computed(() => {
      return (props.currentPageNumber - 1) * pageSize
    })

    rightPageBorder = computed(() => {
      return props.currentPageNumber * pageSize
    })

    allPageNumber = computed(() => {
      return filteredVariants.value.length > 0 ? Math.ceil(filteredVariants.value.length / pageSize) : 1
    })

    //Функция получения отфильтрованных вариантов соответствующих текущей странице
    //Определяется по соответствию индекса варианта в массиве между начальным конечным значение на странице
    const getCurrentPageVariants = () => {
      currentPageVariants.value = filteredVariants.value.filter((item, index) => index >= leftPageBorder.value & index < rightPageBorder.value)
    }

    //Функция отслеживающая изменение номера текущей странице
    watch(currentPageNumber.value, () => {
      getCurrentPageVariants()
    })

    //Функция отслеживающая изменение URL и обновляющая параметры фильтрации
    watch(() => route.query, () => {
      Object.keys(filterParams.value).forEach(function(key) {
        this[key] = route.query[key]
      }, filterParams.value)
    })

    //Функция отслеживающая обновление параметров фильтрации
    watch(filterParams.value, () => {
      setFilteredVariants()
      getCurrentPageVariants()
    })

    //Функция для обновления отфильтрованного массива вариантов при заданных параметрах фильтрации
    const setFilteredVariants = () => {
      filteredVariants.value = useVariantsFiltering(variants.value, filterParams.value)
    }

    return {
      currentPageVariants
    }
  }
}
</script>

<style src="./variantList.css">

</style>
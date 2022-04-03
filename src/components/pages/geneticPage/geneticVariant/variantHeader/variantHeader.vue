<template>
  <div class="variantHeader" ref="headerArea">
    <!-- Контейнер заголовка для выбора отчёта -->
    <div class="variantDownload">
      <img src="@/assets/img/figure/downArrow.png" alt="download arrow">
    </div>

    <!-- Контейнер заголовка имени варианта -->
    <div class="variantName">
      <p @click="toggleFilterArea('isFilterName')">Name</p>
      <div @click="toggleFilterArea('isFilterName')" class="openButton"/>
      <div class="filterName" v-show="filtersShow.isFilterName">
        <input placeholder="Name"
               type="text"
               v-model="filterParams.inputName"
        >
      </div>
    </div>

    <!-- Контейнер заголовка названия значимости варианта -->
    <div class="variantSignificance">
      <p @click="toggleFilterArea('isFilterSignificance')">Significance</p>
      <div @click="toggleFilterArea('isFilterSignificance')" class="openButton"/>
      <div class="filterSignificance" v-show="filtersShow.isFilterSignificance">
        <div>
          <input id="pathogenic"
                 value="PATHOGENIC"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="pathogenic">PATHOGENIC</label>
        </div>

        <div>
          <input id="likely_pathogenic"
                 value="LIKELY_PATHOGENIC"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="likely_pathogenic">LIKELY_PATHOGENIC</label>
        </div>

        <div>
          <input id="benign"
                 value="BENIGN"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="benign">BENIGN</label>
        </div>

        <div>
          <input id="undefined"
                 value="UNDEFINED"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="undefined">UNDEFINED</label>
        </div>

        <div>
          <input id="uncertain"
                 value="UNCERTAIN"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="uncertain">UNCERTAIN</label>
        </div>

        <div>
          <input id="likely_benign"
                 value="LIKELY_BENIGN"
                 type="checkbox"
                 v-model="filterParams.checkedSignificance"
          >
          <label for="likely_benign">LIKELY_BENIGN</label>
        </div>
      </div>
    </div>

    <!-- Контейнер заголовка названия генотипа -->
    <div class="variantGenotype">
      <p @click="toggleFilterArea('isFilterGenotype')">Genotype</p>
      <div @click="toggleFilterArea('isFilterGenotype')" class="openButton"/>
      <div class="filterGenotype" v-show="filtersShow.isFilterGenotype">
        <div class="radioContainer">
          <input type="radio"
                 id="option1_1"
                 name="genotype"
                 value="HETEROZYGOTE"
                 v-model="filterParams.pickedGenotype"
          >
          <label for="option1_1">HETEROZYGOTE</label>
        </div>

        <div class="radioContainer">
          <input type="radio"
                 id="option1_2"
                 name="genotype"
                 value="HOMOZYGOTE"
                 v-model="filterParams.pickedGenotype"
          >
          <label for="option1_2">HOMOZYGOTE</label>
        </div>

        <div class="radioContainer">
          <input type="radio"
                 id="option1_3"
                 name="genotype"
                 value="ALL"
                 v-model="filterParams.pickedGenotype"
          >
          <label for="option1_3">ALL</label>
        </div>
      </div>
    </div>

    <!-- Контейнер заголовка названия HGWS варианта -->
    <div class="variantHGVS">
      <p @click="toggleFilterArea('isFilterHGWS')">HGVS</p>
      <div @click="toggleFilterArea('isFilterHGWS')" class="openButton"/>
      <div class="filterHGWS" v-show="filtersShow.isFilterHGWS">
        <div class="radioContainer">
          <input type="radio"
                 id="option2_1"
                 name="hgvs"
                 value="g"
                 v-model="filterParams.pickedHGWS"
          >
          <label for="option2_1">G</label>
        </div>

        <div class="radioContainer">
          <input type="radio"
                 id="option2_2"
                 name="hgvs"
                 value="c"
                 v-model="filterParams.pickedHGWS"
          >
          <label for="option2_2">C</label>
        </div>

        <div class="radioContainer">
          <input type="radio"
                 id="option2_3"
                 name="hgvs"
                 value="p"
                 v-model="filterParams.pickedHGWS"
          >
          <label for="option2_3">P</label>
        </div>

        <div class="hgwsInput">
          <input type="text" v-model="filterParams.inputHGWS">
        </div>
      </div>
    </div>

    <!-- Контейнер заголовка внешник источников варианта -->
    <div class="variantExternalSource">
      <p>External source</p>
      <div class="promptLogo">?</div>
      <div class="prompt">
        <p class="item1">COMMON</p>
        <p class="item2">CUSTOM</p>
        <p class="item3">LOCUS SPECIFIC</p>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue"
import router from "@/router/router";
import {useClickOutside} from "@/common/functions/clickOutside"
import {useUrlQueryString} from "@/components/pages/geneticPage/geneticVariant/variantHeader/urlQueryString";

export default {
  name: 'variantHeader',

  setup() {
    //Переменная состояния открытия/закрытия окон фильтров
    const filtersShow = ref({
      isFilterName: false,
      isFilterSignificance: false,
      isFilterGenotype: false,
      isFilterHGWS: false
    })

    //Переменная для хранения состояния параметров фильтрации
    //С начальными параметрами, для первоначальной фильтрации (т.е. не фильтруют ничего)
    const filterParams = ref({
      inputName: '',
      checkedSignificance: [],
      pickedGenotype: 'ALL',
      pickedHGWS: 'g',
      inputHGWS: ''
    })

    //Вызов для первоначального получения URL с query параметрами для начальной фильтрации при монтировании
    onMounted(() => {
      filterUpdateURL()
    })

    //Функция для скрытия всех выпадающих окон фильтров
    const hideFilters = () => {
      Object.keys(filtersShow.value).forEach(function(key) {
        this[key] = false
      }, filtersShow.value)
    }

    //Функция для открытия/закрытия выпадающих окон фильтров
    const toggleFilterArea = (filterName) => {
      //Если нажатие было выполено для уже открытого окна, то оно закроется и функция прервётся
      if(filtersShow.value[filterName]) {
        filtersShow.value[filterName] = false
        return
      }

      //Если нажатие было выполнено для закрытого окна
      //То сначала закроются все открытые окна/окно
      hideFilters()

      //А затем откроется только выбранное окно
      if(filterName) {
        filtersShow.value[filterName] = true
      }
    }

    //Объявление DOM области расположение фильтров
    const headerArea = ref(null)

    //При клике вне области расположение фильтров все открытые фильтры закроются
    useClickOutside(headerArea, () => {
      hideFilters()
    })

    //Функция для отслеживания состояния значений фильтров
    //При изменении полей ввода фильтров обновляется URL адрес страницы
    watch(filterParams.value, () => {
      filterUpdateURL()
    })

    //Функция для обновления query параметров для URL адреса
    const filterUpdateURL = () => {
      const urlString = useUrlQueryString(filterParams.value)
      router.push(`/parseqLabTest/${urlString}`)
    }

    return {
      filtersShow,
      headerArea,
      filterParams,
      toggleFilterArea
    }
  }
}
</script>

<style src="./variantHeader.css">

</style>
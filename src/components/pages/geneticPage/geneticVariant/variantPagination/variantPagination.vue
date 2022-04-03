<template>
  <div class="paginatorContainer">
    <button class="arrow leftArrow"
            @click="setPrevPage"
            :disabled="min"
            :class="{'disabledArrow': min}"
    ></button>

    <input type="number"
           pattern="[0-9]{1,2}"
           maxlength="3"
           @input="setPage"
           v-model="currentPageNumber"
    >
    <div class="pageNumber">of <span>{{allPageNumber}}</span></div>

    <button class="arrow rightArrow"
            @click="setNextPage"
            :disabled="currentPageNumber >= allPageNumber"
            :class="{'disabledArrow': currentPageNumber >= allPageNumber}"
    ></button>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue"

export default {
  name: 'variantPagination',

  props: {
    allPageNumber: {
      type: Number,
      default: 1
    }
  },

  setup(props, {emit}) {

    const currentPageNumber = ref(1)              //Объявление текущей страницы
    const allPageNumber = ref(props, 'allPageNumber')   //Общее количество страниц (данные принимаются из компоненты listVariant)

    let min = ref(null)                           //Ограничение по первой странице
    let max = ref(null)                           //Ограничение по последней странице

    min = computed(() => {
      return currentPageNumber.value <= 1
    })

    max = computed(() => {
      return currentPageNumber.value - 1 >= allPageNumber.value.allPageNumber
    })

    //Устновка предыдущей страницы
    const setPrevPage = () => {
      currentPageNumber.value = currentPageNumber.value - 1
      //Отправка данных в компоненту listVariant
      emit('setCurrentPage', currentPageNumber.value)
    }

    const setNextPage = () => {
      currentPageNumber.value = currentPageNumber.value + 1
      emit('setCurrentPage', currentPageNumber.value)
    }

    //Отпрака пользовательского ввода страницы из input
    const setPage = () => {
      //Если пользователь ввёл страницу за пределами доступных, то страница сбрасывается
      if(min.value || max.value) {
        currentPageNumber.value = 1
      }

      emit('setCurrentPage', Math.ceil(currentPageNumber.value))
    }

    //Отслеживание значения общего количества страниц
    watch(allPageNumber.value, () => {
      //Отслеживание значения текущей страницы оказалось больше допустимой, то страница сбрасывается
      if(max.value < currentPageNumber.value) {
        setPage()
      }
    })

    return {
      currentPageNumber,
      setPrevPage,
      setNextPage,
      setPage,
      min,
      max
    }
  }
}
</script>

<style src="./variantPagination.css">

</style>
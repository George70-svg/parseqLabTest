<template>
  <div class="geneticContainer">
    <genetic-header @setBackground="setBackgroundRoot"/>
    <genetic-variant :class="{'shadow': background}"/>
  </div>
</template>

<script>
import geneticHeader from "@/components/pages/geneticPage/geneticHeader/geneticHeader";
import geneticVariant from "@/components/pages/geneticPage/geneticVariant/geneticVariant";
import {ref} from "vue"

export default {
  name: 'geneticContainer',

  components: {
    geneticHeader,
    geneticVariant,
  },

  setup() {
    //Объявление переменной состояния стиля компоненты geneticVariant
    const background = ref(false)

    //Функция обработки emit из компоненты geneticHeader
    //Устанавливает стили в соответствии с открытием/закрытие окна "загрузки отчёта"
    const setBackgroundRoot = () => {
      background.value = !background.value
    }

    return {
      setBackgroundRoot,
      background
    }
  }
}
</script>

<style src="./geneticPage.css">

</style>
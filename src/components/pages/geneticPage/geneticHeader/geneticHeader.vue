<template>
  <div class="geneticHeader">
    <p class="info1">СРТКН6</p>
    <p class="infoDate">{{currentDate}}</p>
    <p class="info2">Test sample 01</p>
    <p class="info3">S1</p>
    <p class="info4">CFTR v1 (SP 1.1.1)</p>
    <p class="info5">1210-0</p>
    <button class="report" @click="toggle">download report</button>

    <div v-if="isReportOpen" class="reportContainer">
      <div class="commentsContainer">
        <p>comment</p>
        <textarea placeholder="No required"></textarea>
      </div>
      <div class="buttonContainer">
        <button class="getButton">Get report</button>
        <button class="cancelButton" @click="toggle">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import {useCurrentDate} from "@/common/functions/currentDate";

  export default {
    name: "geneticHeader",

    setup(props, {emit}) {
      //Объявление переменной состояния открытия/закртия модального окна отчёта
      const isReportOpen = ref(false)

      //Функция открытия/закрытия модального окна "получения отчёта"
      const toggle = () => {
        isReportOpen.value = !isReportOpen.value
        //передача состояни модального окна компоненте geneticVariant для задания стилей
        emit('setBackground', isReportOpen.value)
      }

      //Определения даты загрузки страницы
      const currentDate = useCurrentDate()

      return {
        isReportOpen,
        currentDate,
        toggle
      }
    }
  }
</script>

<style src="./geneticHeader.css">

</style>
<template>
  <header>
    <div class="logoContainer">
      <img src="@/assets/img//logo/logo.svg" alt="">
      <p>Parseq Tests</p>
    </div>
    <div class="linkContainer">
      <router-link to="/parseqLabTest">Варианты</router-link>
      <router-link to="/analyzes">Анализы</router-link>
      <router-link to="/launches">Запуски</router-link>
    </div>
    <div class="buttonContainer">
      <button>ЗАГРУЗИТЬ ДАННЫЕ</button>
    </div>
  </header>
  <router-view/>
</template>

<script>
export default {
  name: 'headerContainer',
}
</script>

<style src="./headerContainer.css">

</style>
<template>
  <div class="itemContainer">
    <div class="itemCheckbox">
      <input type="checkbox">
    </div>
    
    <p class="itemName">{{variantData.alleleName}}</p>

    <p class="itemSignificance">{{variantData.significance}}</p>

    <p class="itemGenotype">{{variantData.genotype}}</p>

    <div class="itemsHGVS">
      <div class="item g">
        <div>g</div>
        <p>{{variantData.hgvs.g}}</p>
      </div>
      <div class="item c">
        <div>c</div>
        <p>{{variantData.hgvs.c}}</p>
      </div>
      <div class="item p">
        <div>p</div>
        <p>{{variantData.hgvs.p}}</p>
      </div>
    </div>

    <div class="itemSource">
      <div>
        <a v-for="item in variantData.externalSourceEntries"
           :key="item.id"
           :class="{
              'custom': item.database.category === 'CUSTOM',
              'locusSpecific': item.database.category === 'LOCUS SPECIFIC',
           }"
           :href="item.link"
           target="_blank"
        >
          <div class="nameCategory">{{item.database.name}}</div>
          <div v-if="item.link" class="arrow"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'variantItem',

  props: {
    variantData: {
      type: Object
    },
  }
}
</script>

<style src="./variantItem.css">

</style>
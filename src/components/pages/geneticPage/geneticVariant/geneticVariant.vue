<template>
  <div class="geneticVariant">
    <variant-header/>
    <variant-list :currentPageNumber="currentPageNumber"
                  @setAllPagesNumber="setAllPage"
    />
    <variant-pagination :allPageNumber="allPageNumber"
                        @setCurrentPage="setCurrentPage"
    />
  </div>

</template>

<script>
import variantHeader from "@/components/pages/geneticPage/geneticVariant/variantHeader/variantHeader";
import variantList from "@/components/pages/geneticPage/geneticVariant/variantList/variantList";
import variantPagination from "@/components/pages/geneticPage/geneticVariant/variantPagination/variantPagination";
import {ref} from "vue"

export default {
  name: 'geneticVariant',

  components: {
    variantHeader,
    variantList,
    variantPagination
  },

  setup() {
    const currentPageNumber = ref(1)
    const allPageNumber = ref(1)

    const setCurrentPage = (page) => {
      currentPageNumber.value = page
    }

    const setAllPage = (numberOfPages) => {
      allPageNumber.value = numberOfPages
    }

    return {
      currentPageNumber,
      allPageNumber,
      setCurrentPage,
      setAllPage
    }
  }
}
</script>

<style src="./geneticVariant.css">

</style>
<template>
  <div v-if="$root.store.username">
    <FamilyRecipePreviewList/>
  </div>
  <div v-else-if="!$root.store.username">
    <NotFoundPage></NotFoundPage>
  </div>
</template>

<script>
import FamilyRecipePreviewList from "../components/FamilyPreviewList";
import NotFoundPage from "../pages/NotFoundPage.vue";
export default {
components: {
  FamilyRecipePreviewList,
  
  NotFoundPage,
},
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
margin: 10px 0 10px;
}
.blur {
-webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
filter: blur(2px);
}
::v-deep .blur .recipe-preview {
pointer-events: none;
cursor: default;
}
</style>
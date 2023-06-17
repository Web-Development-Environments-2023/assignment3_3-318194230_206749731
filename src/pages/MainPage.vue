<template>
  <div class="container">
    <h1 class="title">Welcome To Recipes Website</h1>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <RecipePreviewList title="Explore these recipes" class="RandomRecipes" />
        <div class="text-center">
          <router-link v-if="!$root.store.username" to="/login" class="btn btn-primary">
            You need to Login to view this
          </router-link>
        </div>
        <button @click="updateRandomRecipes" class="btn btn-primary mt-3">
          Get Random Recipes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  methods: {
    updateRandomRecipes() {
      this.$refs.recipeList.updateRecipes();
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.recipe-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.title {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  animation: fade 2s infinite;
}
</style>

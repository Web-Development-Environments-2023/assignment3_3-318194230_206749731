<template>
  <div>
    <b-card
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
      :to="{ name: 'recipe', params: { recipeId: recipe.recipe_id } }"
    >
      <b-card-text>
        <h5 class="title" style="font-size: 1.2rem;">{{ recipe.title }}</h5>
        <ul class="recipe-overview" style="font-size: 0.8rem;">
          <li>Recipe ID: {{ recipe.recipe_id }}</li>
          <li>Popularity: {{ recipe.popularity }}</li>
          <li>Vegan: {{ recipe.vegan }}</li>
          <li>Vegetarian: {{ recipe.vegetarian }}</li>
          <li>Gluten Free: {{ recipe.glutenFree }}</li>
          <!-- Add any other recipe data you want to display -->
        </ul>
      </b-card-text>
      <b-button :to="{ name: 'recipe', params: { recipeId: recipe.recipe_id } }"  variant="primary">Add Favorite</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.2rem;
}
</style>

<template>
  <div>
    <b-card
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
      @click="navigateToRecipe"
      @mouseover="setHovered(true)"
      @mouseleave="setHovered(false)"
    >
      <b-card-text>
        <h5 class="title" :class="[{'underline': isHovered}, {'blue-text': recipe.seen&& $root.store.username}]"><strong>{{ recipe.title }}</strong></h5>
        <ul class="recipe-overview" :class="{ 'underline': isHovered }" :style="{ fontSize: '0.8rem', color: isImageClicked ? 'red' : 'inherit' }">
          <li>Recipe ID: {{ recipe.recipe_id }}</li>
          <li>Popularity: {{ recipe.popularity }}</li>
          <li>Vegan: {{ recipe.vegan }}</li>
          <li>Vegetarian: {{ recipe.vegetarian }}</li>
          <li>Gluten Free: {{ recipe.glutenFree }}</li>
          <li>
            <span v-if="recipe.favorite && $root.store.username">
              <i class="heart-icon">❤️</i>
            </span>
          </li>
          <!-- Add any other recipe data you want to display -->
        </ul>
      </b-card-text>
      <div class="d-flex justify-content-between">
        <b-button
          v-if="$root.store.username"
          variant="primary"
          class="mb-2"
          @click.stop="addFavrecipe"
        >
          <b-icon icon="heart-fill"></b-icon> Like
        </b-button>
      </div>
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
  data() {
    return {
      isHovered: false,
      isImageClicked: false,
    };
  },
  methods: {
    async navigateToRecipe() {
      try {
        const recipeDetails = {
          recipe_id: this.recipe.recipe_id,
          title: this.recipe.title,
          image: this.recipe.image,
          readyInMinutes: this.recipe.readyInMinutes,
          popularity: this.recipe.popularity,
          vegetarian: this.recipe.vegetarian,
          vegan: this.recipe.vegan,
          glutenFree: this.recipe.glutenFree,
          extendedIngredients: this.recipe.extendedIngredients,
          instructions:this.recipe.instructions,
          servings: this.recipe.servings}
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/MyRecipes",
          {
            username: this.$root.store.username,
            recipeDetails: recipeDetails,
          }
        );
    // Handle the response or perform any other actions
        this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.recipe_id } });
    } catch (err) {
      console.log(err.response);
      this.form.submitError = err.response.data.message;
    }
  },
    setHovered(value) {
      this.isHovered = value;
    },
    handleImageClick() {
      this.isImageClicked = true;
    },
    async addFavrecipe() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            username: this.$root.store.username,
            recipeId: this.recipe.recipe_id,
          }
        );
        // Handle the response or perform any other actions
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.2rem;
}
.underline {
  text-decoration: underline;
}
.blue-text {
  color: blue;
}
</style>

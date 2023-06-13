<template>
  <!-- The main container -->
  <b-container>
    <!-- Display the title of the recipe list -->
    <h3>
      {{ title }} ({{ recipesLength }} recipes):
      
      <!-- Allow for custom content to be placed inside the title -->
      <slot></slot>
    </h3>
    <!-- Iterate over each recipe in the recipes array -->
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <!-- Render the RecipePreview component and pass the recipe as a prop -->
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    // Define the title prop as a required string
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Initialize an empty array for storing recipes
      recipes: []
    };
  },
  mounted() {
    // When the component is mounted, call the updateRecipes method
    this.updateRecipes();
  },
  computed: {
    recipesLength() {
      return this.recipes.length;
    }
  },
  methods: {
    async updateRecipes() {
      try {
        // Make an asynchronous GET request to fetch random recipes
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // Extract the recipes from the response
        const recipes = response.data.recipes;
        // Clear the existing recipes array
        this.recipes = [];
        // Add the fetched recipes to the recipes array
        this.recipes.push(...recipes);
      } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>

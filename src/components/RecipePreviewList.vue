<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
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
      title: {
        type: String,
        required: true
      },
      recipe_id: {
        type: String,
        required: true
      },
      reqSource: {
        type: String,
        required: true
      },
      readyInMinutes: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      popularity: {
        type: Number,
        required: true
      },
      vegan: {
        type: Boolean,
        required: true
      },
      vegetarian: {
        type: Boolean,
        required: true
      },
      glutenFree: {
        type: Boolean,
        required: true
      },
      servings: {
        type: Number,
        required: true
      },
      instructions: {
        type: String,
        required: true
      },
      extendedIngredients: {
        type: Array,
        required: true
      }
    },

  data() {
    return {
      recipes: []
    };
  },
  mounted() {

    this.updateRecipes();
    

  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          {withCredentials:true}
        );

        // console.log(response);
        this.recipes = [];
        const recipes = response.data;
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
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
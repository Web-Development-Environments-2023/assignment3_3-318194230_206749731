<template>
    <div>
      <template v-if="recipes.length === 0">
        <div class="slide-content">
          <h2 class="no-recipes">YOU DON'T HAVE ANY RECIPES</h2>
        </div>
      </template>
  
      <div class="recipes-container" v-else>
        <div v-for="r in recipes" :key="r.id" class="slide-content">
          <RecipePreview class="recipePreview" :recipe="r" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RecipePreview from "./SerachPreReview.vue";
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
        },
        page_type: {
        type: String,
        required: true,
      },
      },
  
    data() {
      return {
        recipes: []
      };
    },
    mounted:  function() {
      
      if (this.page_type === "Random")
        this.updateRecipes();
      else if(this.page_type === "LastSeen"){
        this.updateLastSeenRecipes();
      }
     
    },
    
    methods: {
      async updateRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/recipes/random",
            {withCredentials:false}
          );
          this.recipes = [];
          const recipes = response.data;
          this.recipes.push(...recipes);
        } catch (error) {
          console.log(error);
        }
      },
      async updateLastSeenRecipes() {
        try {
          const response = await this.axios.get(
           
            this.$root.store.server_domain + "/users/LastViewed",
           
          );
          this.recipes = [];
          const recipes = response.data;
          this.recipes.push(...recipes);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
.recipes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; 
}

.recipes-container > .slide-content {
  flex: 1 1 10px;
}


.recipe-row {
  display: flex;
}

.slide-content {
  flex: 1;
  margin-right: 20px; /* Optional: Add margin between the recipe items */
}

body {
  overflow: hidden;
}

.recipePreview {
  width: 100%;
  max-width: 100%;
  margin: 10px auto;
}
  </style>
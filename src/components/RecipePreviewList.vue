<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 0px 2px #333; height: 350px; overflow: hidden;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <template v-if="recipes.length === 0">
        <b-carousel-slide>
          <div class="slide-content">
            <h2 class="no-recipes">YOU DON'T HAVE FAMILY RECIPES</h2>
          </div>
        </b-carousel-slide>
      </template>

      <b-carousel-slide v-else v-for="r in recipes" :key="r.id" :text="r.instructions" img-src="https://fastly.picsum.photos/id/923/1024/480.jpg?hmac=wH-OHHwRuzh0Br74_C1jTWd06IZxd9zZCkX-ZfMMezc">
        <div class="slide-content">
          <RecipePreview class="recipePreview" :recipe="r" 
          style="width: 100%; max-width: 600px; margin: 20 auto;" />
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
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
    let vm = this;
    vm.$nextTick(function() {
      if (this._props.page_type == "Random") this.updateRandomRecipes();
      else if (this._props.page_type == "RecentleyViewed")
        this.updateLastSeenRecipes();
    });
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
        const recipes = [
          response.data[0],
          response.data[1],
          response.data[2],
        ];
        this.recipes = [];
        for (let i = 0; i < recipes.length; i++) {
          if (recipes[i] !== null) {
            this.recipes.push(recipes[i]);
          }
        }
     
      } catch (error) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.no-recipes {
  text-align: center;
  font-size: 24px;
  color: #fff;
  padding: 20px;
}

body {
  overflow: hidden;
}
</style>
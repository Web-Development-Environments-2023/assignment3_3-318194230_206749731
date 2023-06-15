<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; height: 100vh; overflow: hidden;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <b-carousel-slide
      
        v-for="r in recipes"
        :key="r.id"
        :text="r.instructions"
        img-src="https://picsum.photos/1024/480/?image=603"
      >
        <div class="slide-content">

          <PesonalPreview
            class="recipePreview"
            :recipe="r"
            style="width: 80%; max-width: 600px; margin: 0 auto;"
          />
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<style>
.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

body {
  overflow: hidden;
}
</style>

<script>
import PesonalPreview from "../components/PesonalRecipePreview";

export default {
  components: {
    PesonalPreview
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
      slide: 0,
      sliding: null,
      recipes: []
    };
  },

  mounted() {
    this.pesonalrecipes();
  },

  methods: {
    async pesonalrecipes() {
      try {
        const response = await this.axios.get(
          `${this.$root.store.server_domain}/users/MyRecipes`,
          { withCredentials: true }
        );
        this.recipes = response.data;
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

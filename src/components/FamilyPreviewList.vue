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
      <template v-if="recipes.length === 0">
        <b-carousel-slide>
          <div class="slide-content">
            <h2 class="no-recipes">YOU DON'T HAVE FAMILY RECIPES</h2>
          </div>
        </b-carousel-slide>
      </template>
      
      <b-carousel-slide v-else v-for="r in recipes" :key="r.id" :text="r.instructions" img-src="https://picsum.photos/1024/480/?image=10">
        <div class="slide-content">
          <FamilyPreview class="recipePreview" :recipe="r" style="width: 100%; max-width: 600px; margin: 0 auto;" />
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
  <script>
  import FamilyPreview from "./FamilyPreview.vue";
  export default {
    components: {
      FamilyPreview,
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        recipes: [],
      };
    },
  
    mounted: function() {
      let vm = this;
      vm.$nextTick(function() {
        this.UpdateFamilyRecipes();
        
      });
    },
    methods: {
      async UpdateFamilyRecipes() {
        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/FamilyRecipes",
          );
  
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
        } catch (error) {
        }
      },
      onSlideStart(slide) {
      this.sliding = true;
      },
    
      onSlideEnd(slide) {
      this.sliding = false;
      }
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
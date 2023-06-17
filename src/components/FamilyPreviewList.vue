<template>
    <div>
      <b-container>
        <b-row v-for="r in recipes" :key="r.recipe_id">
          <b-col>
            <FamilyPreview class="FamilyPreview" :recipe="r" />
          </b-col>
        </b-row>
      </b-container>
      <div v-if="recipes.length === 0">
        <h3>You have no family recipes</h3>
      </div>
    </div>
  </template>
  
  <script>
  import FamilyPreview from "./FamilyPreview.vue";
  export default {
    components: {
      FamilyPreview,
    },
    data() {
      return {
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
           // process.env.VUE_APP_ROOT_API + "/user/family",
            this.$root.store.server_domain + "/user/FamilyRecipes",
          );
  
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
        } catch (error) {
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
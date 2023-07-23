<template>
  <div>
    <b-card
    :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 15rem; height: 27rem;"
      class="mb-2"
      @click="navigateToRecipe"
      @mouseover="setHovered(true)"
      @mouseleave="setHovered(false)"
>
      <b-card-text>
        <h5 class="title" :class="[{'underline': isHovered}, {'blue-text': recipe.seen && $root.store.username}]" style="font-size: 0.7rem;"><strong>{{ recipe.title }}</strong></h5>
        <ul class="recipe-overview" :class="{ 'underline': isHovered }" :style="{ fontSize: '0.8rem', color: isImageClicked ? 'red' : 'inherit' }">
          <li>Recipe ID: {{ recipe.recipe_id }}</li>
          <li>Popularity: {{ recipe.popularity }}</li>
          <li>Vegan: {{ recipe.vegan }}</li>
          <li>Vegetarian: {{ recipe.vegetarian }}</li>
          <li>Gluten Free: {{ recipe.glutenFree }}</li>
          <li v-if="$root.store.username">Favorite: {{  recipe.favorite ? '❤️' : 'It is not in your favorite'}}</li>
          <li v-if="$root.store.username">Seen: {{  recipe.seen ? 'You have seen this recipe' : 'You did not seen this recipe'}}</li>
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
      // 
      if (this.$root.store.username) {
        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/LastViewed",
            {
              username: this.$root.store.username,
              recipe_id: this.recipe.recipe_id,
            },
            // { withCredentials: true }

          );
          // Handle the response or perform any other action
          this.axios.defaults.withCredentials = false; 
          console.log(response);
        } 
        catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      }
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.recipe_id } });
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
          },
          { withCredentials: true }

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
  font-size:0.7rem;
}
.underline {
  text-decoration: underline;
}
.blue-text {
  color: blue;
}
</style>

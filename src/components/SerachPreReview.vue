<template>
  <div>
    <b-card
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 10rem; height: 15rem;"
      class="mb-2"
      @click="navigateToRecipe"
      @mouseover="setHovered(true)"
      @mouseleave="setHovered(false)"
    >
      <div class="title-wrapper">
        <h5 class="title" :class="[{'underline': isHovered}, {'blue-text': recipe.seen && $root.store.username}]" style="font-size: 1rem;"><strong>{{ recipe.title }}</strong></h5>
        <ul class="recipe-overview" :class="{ 'underline': isHovered }" :style="{ fontSize: '0.8rem', color: isImageClicked ? 'red' : 'inherit' }">
          <!-- Recipe overview content -->
        </ul>
      </div>
      <div class="d-flex justify-content-between">
        <!-- Additional content if needed -->
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
      if (this.$root.store.username) {
        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/LastViewed",
            {
              username: this.$root.store.username,
              recipe_id: this.recipe.recipe_id,
            }
          );
          // Handle the response or perform any other action
          console.log(response);
        } catch (err) {
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
.title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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

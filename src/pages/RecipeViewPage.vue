<template>
  <div class="background-div">
        <div class="background-overlay">
          <div class="container">
              <div class="recipe-header mt-3 mb-4">
        <h1 class="centered-text bold-text glow-effect">{{ recipe.title }}</h1>
                <img :src="recipe.image" class="center" />
              </div>
              <div class="recipe-body">
                <div class="wrapper">
                        <b-card-text>
        <div class="recipe-details">
          <h2 class="recipe-title">Recipe Details:</h2>
          <ul class="recipe-list">
            <li><strong>Recipe ID:</strong> {{ recipe.recipe_id }}</li>
            <li><strong>Popularity:</strong> {{ recipe.popularity }}</li>
            <li><strong>Vegan:</strong> {{ recipe.vegan }}</li>
            <li><strong>Vegetarian:</strong> {{ recipe.vegetarian }}</li>
            <li><strong>Gluten Free:</strong> {{ recipe.glutenFree }}</li>
            <li><strong>Servings:</strong> {{ recipe.servings }}</li>
            <li><strong>Instructions:</strong></li>
            <p v-html="recipe.instructions"></p>
<li><strong>Extended Ingredients:</strong></li>
<table>
  <thead>
    <tr>
      <th>Ingredient</th>
      <th>Portion</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
      <td>{{ ingredient.split(' - ')[0] }}</td>
      <td>{{ ingredient.split(' - ')[1] }}</td>
    </tr>
  </tbody>
</table>

            <!-- Add any other recipe data you want to display -->
          </ul>
        </div>

      </b-card-text>
          <!-- <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div> -->

        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->

  </div>
  </div>
    </div>

  
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
            response = await this.axios.get(
              `${this.$root.store.server_domain}/recipes/fullRecipeReview/${this.$route.params.recipeId}`
            );



        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }



      this.recipe = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.background-div {
  /* Set the background image styles */
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('../assets/ori.avif');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
}

.background-overlay {
  /* Create an overlay to cover the background */
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.418); /* Set the desired overlay color and opacity */
  z-index: 1; /* Adjust the z-index value to ensure it's above the background */

  /* Enable scrolling within the overlay */
  overflow-y: scroll;
}

.container {
  /* Set the container styles */
    position: absolute;
  max-width: 60%;
  margin: 2rem auto;
  position: relative;
  border: 2.5px solid #eb0808;
  border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.829); /* Set the desired overlay color and opacity */

  box-shadow: 50 0 60px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Ensure the container appears above the overlay */
  position: relative;
  z-index: 2;

  /* Responsive styles */
  @media (max-width: 767px) {
    max-width: 100%;
    border-radius: 20px;
    box-shadow: none;
    margin: 2rem auto;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #000;
}
</style>
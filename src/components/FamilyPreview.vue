<template>
  <div class="background-div">
        <div class="background-overlay">
          <div class="container">
              <div class="recipe-header mt-3 mb-4">
          <h4 class="centered-text bold-text glow-effect">Recipe Title: {{ recipe.recipeName}}</h4>
          <!-- Displaying the recipe image -->
          <div class="center">
            <img v-for="image in recipe.images" :src="image" class="recipe-image" :key="image" />
          </div>
        </div>

        <div class="recipe-body">
                <div class="wrapper">
                <b-card-text>
                <div class="recipe-details">
                <h2 class="recipe-title">Recipe Details:</h2>
                <table class="recipe-table">
                  <tbody>
      <tr>
        <td><strong>Owner of this recipe:</strong></td>
        <td>{{ recipe.recipeOwner }}</td>
      </tr>
      <tr>
        <td><strong>Best time to make it:</strong></td>
        <td>
          <table class="recipe-table">
            <tbody>
              <tr v-for="time in recipe.specialOccasions" :key="time">
                <td>{{ time }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td><strong>Cooking Time:</strong></td>
        <td>{{ recipe.cookingTime }}</td>
      </tr>
      <tr>
        <td><strong>Ingredients:</strong></td>
        <td>
          <table class="recipe-table">
            <tbody>
              <tr v-for="ingredient in recipe.components" :key="ingredient">
                <td>{{ ingredient }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      
      <tr>
        <td><strong>Preparation Method:</strong></td>
        <td>{{ recipe.preparationMethod }}</td>
      </tr>
    </tbody>

                </table>
              </div>
            </b-card-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // The recipe object that is passed as a prop
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Styling for the recipe page */

.title {
  font-size: 1.4rem;
  color: black;
}

.b-card img {
  /* Adding a brightness filter to the recipe image */
  filter: brightness(0%);
}

.recipe-overview {
  font-size: 1.3rem;
  color: black;
  text-align: left;
}

.center {
  max-width: 50%;
  justify-content: center;
  align-items: center;
}

.container {
  /* Styling for the recipe container */
  
  position: absolute;
  max-width: 70%;
  margin: 5rem auto;
  position: relative;
  border: 2.5px solid #eb0808;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.644);
  box-shadow: 50 0 60px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  position: relative;
  z-index: 2;
  margin-top: 10rem;   /* Adjust this to increase/decrease top margin */
  margin-right: auto;
  margin-bottom: 5rem;
  margin-left: auto;

  @media (max-width: 767px) {
    /* Responsive styling for smaller screens */
    max-width: 100%;
    border-radius: 20px;
    box-shadow: none;
    margin: 2rem auto;
    padding: 1rem;
  }
}

@media (max-width: 767px) {
  /* Additional styling for smaller screens */
  .recipe-header {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 479px) {
  /* Additional styling for even smaller screens */
  .container {
    padding: 3rem;
  }
}

/* Updated CSS for recipe table */
.recipe-table {
  width: 100%;
  margin-top: 2rem;
  text-align: left;
}

.recipe-table th,

.recipe-table th {
  font-weight: bold;
}
.recipe-image {
  max-width: 70%;
  height: auto;
}
</style>
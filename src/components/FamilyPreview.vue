<template>
  <!-- The main container for the recipe collection -->
  <div class="background-div">
    <!-- Introduction text -->
    <h4 style="font-family: 'Cleccj', sans-serif; color: black;">
      Welcome to my family recipes collection!
    </h4>

    <div class="background-overlay">
      <!-- Recipe container -->
      <div class="container mt-4">
        
        <!-- Recipe header section -->
        <div class="recipe-header mt-3 mb-4">
          <!-- Displaying the recipe title -->
          <h4 class="centered-text bold-text glow-effect">Recipe Title: {{ recipe.recipeName}}</h4>
          <!-- Displaying the recipe image -->
          <img :src="recipe.image" class="center" />
        </div>

        <div class="recipe-body">
          <div class="wrapper">
            <!-- Recipe details section -->
            <b-card-text>
              <div class="recipe-details">
                <!-- Title for the recipe details -->
                <h2 class="recipe-title">Recipe Details:</h2>
                <ul class="recipe-list">
                  <!-- Displaying the recipe ID -->
                  <li><strong>Owner of this recipe:</strong> {{ recipe.recipeOwner}}</li>
                  <!-- Displaying the recipe popularity -->
                  <li><strong>Best time to make it:</strong> {{ recipe.specialOccasions}}</li>
                  <!-- Displaying whether the recipe is vegan or not -->
                  <li><strong>Cooking Time::</strong> {{ recipe.cookingTime }}</li>
                  <!-- Displaying whether the recipe is vegetarian or not -->
                  <li>
                  <strong>Ingredients:</strong>
                  <ul>
                    <li v-for="ingredient in recipe.components" :key="ingredient">
                      {{ ingredient }}
                    </li>
                  </ul>
                  </li>
                  <!-- Displaying whether the recipe is gluten-free or not -->
                  <li><strong>Preparation Method:</strong> {{recipe.preparationMethod}}</li>
                </ul>
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
    padding: 0.5rem;
  }
}
</style>

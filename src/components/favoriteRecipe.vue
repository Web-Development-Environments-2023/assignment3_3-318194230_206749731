<template>
  <!-- The main container for the recipe collection -->
  <div class="background-div">
    <!-- Introduction text -->
    <h4 style="font-family: 'Cleccj', sans-serif; color: black;">
      <b>Welcome to my recipe collection, where flavors come alive and creativity thrives. Enjoy the journey!</b>
    </h4>

    <div class="background-overlay">
      <!-- Recipe container -->
      <div class="container mt-4">
        
        <!-- Recipe header section -->
        <div class="recipe-header mt-3 mb-4">
          <!-- Displaying the recipe title -->
          <h4 class="centered-text bold-text glow-effect">Recipe Title: {{ recipe.title }}</h4>
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
                <table class="recipe-table">
                  <tbody>
                    <!-- Displaying the recipe ID -->
                    <tr class="table-row">
                      <th>Recipe ID:</th>
                      <td>{{ recipe.recipe_id }}</td>
                    </tr>
                    <!-- Displaying the recipe popularity -->
                    <tr class="table-row">
                      <th>Popularity:</th>
                      <td>{{ recipe.popularity }}</td>
                    </tr>
                    <!-- Displaying whether the recipe is vegan or not -->
                    <tr class="table-row">
                      <th>Vegan:</th>
                      <td>{{ recipe.vegan }}</td>
                    </tr>
                    <!-- Displaying whether the recipe is vegetarian or not -->
                    <tr class="table-row">
                      <th>Vegetarian:</th>
                      <td>{{ recipe.vegetarian }}</td>
                    </tr>
                    <!-- Displaying whether the recipe is gluten-free or not -->
                    <tr class="table-row">
                      <th>Gluten Free:</th>
                      <td>{{ recipe.glutenFree }}</td>
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
  margin: 3rem auto;
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

/* Updated CSS for recipe table */
.recipe-table {
  width: 100%;
  margin-top: 1rem;
  text-align: left;
}

.recipe-table th,
.recipe-table td {
  padding: 0.005rem;
}

.recipe-table th {
  font-weight: bold;
}

</style>
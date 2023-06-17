<template>
  <!-- The main container for the recipe display -->
  <div class="background-div">
    <!-- Header section -->
    <h4 style="font-family: 'Cleccj', sans-serif; color: black;">
      Welcome to my recipe collection, where flavors come alive and creativity thrives. Enjoy the journey!
    </h4>

    <!-- Background overlay -->
    <div class="background-overlay">
      <!-- Recipe container -->
      <div class="container mt-4">
        
        <!-- Recipe header -->
        <div class="recipe-header mt-3 mb-4">
          <!-- Recipe title -->
          <h2 class="centered-text bold-text glow-effect">Recipe Title: {{ recipe.title }}</h2>
          <!-- Recipe image -->
          <img :src="recipe.image" class="center" />
        </div>

        <!-- Recipe body -->
        <div class="recipe-body">
          <div class="wrapper">
            <!-- Recipe details -->
            <b-card-text>
              <div class="recipe-details">
                <h2 class="recipe-title">Recipe Details:</h2>
                <table class="recipe-table">
                  <tbody>
                    <tr class="table-row">
                      <th>Recipe ID:</th>
                      <td>{{ recipe.recipe_id }}</td>
                    </tr>
                    <tr class="table-row">
                      <th>Popularity:</th>
                      <td>{{ recipe.popularity }}</td>
                    </tr>
                    <tr class="table-row">
                      <th>Vegan:</th>
                      <td>{{ recipe.vegan }}</td>
                    </tr>
                    <tr class="table-row">
                      <th>Vegetarian:</th>
                      <td>{{ recipe.vegetarian }}</td>
                    </tr>
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
    // The recipe object received as a prop
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Styles for the recipe display */

.title {
  font-size: 1.4rem;
  color: black;
}

.b-card img {
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
  /* Styles for the recipe container */
  position: absolute;
  max-width: 100%;
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
    /* Responsive styles for smaller screens */
    max-width: 100%;
    border-radius: 20px;
    box-shadow: none;
    margin: 2rem auto;
    padding: 1rem;
  }
}

@media (max-width: 767px) {
  /* Styles for smaller screens */
  .recipe-header {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 479px) {
  /* Styles for even smaller screens */
  .container {
    padding: 0.5rem;
  }
}

.table-row {
  margin-bottom: 5px;
}

.recipe-title {
  text-align: left;
}

</style>
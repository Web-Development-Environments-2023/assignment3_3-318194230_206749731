<template>
  <div class="preparation-page">
    <h1 class="centered-text">{{ preparationRecipe.title }} Preparation</h1>

    <div class="preparation-steps">
      <h2 class="recipe-title">Preparation Steps:</h2>
      <ul>
        <li v-for="(step, index) in preparationRecipe.analyzedInstructions" :key="index">
          <label>
            <input type="checkbox" v-model="step.isPerformed" @change="updateStepStatus(index)" />
            {{ step }}
          </label>
        </li>
      </ul>
    </div>

    <div class="ingredients">
      <h2 class="recipe-title">Ingredients:</h2>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Portion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in preparationRecipe.extendedIngredients" :key="index">
            <td>{{ ingredient.split(' - ')[0] }}</td>
            <td>{{ ingredient.split(' - ')[1] * portions }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="btn btn-primary" @click="doublePortions">Double Portions</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preparationRecipe: null,
      portions: 1, // Default portions
    };
  },
  async created() {
    try {
      // Fetch the preparation recipe based on the recipeId route parameter
      const recipeId = this.$route.params.recipeId;
      let response = await this.axios.get(`${this.$root.store.server_domain}/recipes/fullRecipeReview/${recipeId}`);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }
      this.preparationRecipe = response.data;
      this.initStepStatuses();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    initStepStatuses() {
      // Initialize step status for each step in the preparation recipe
        if (this.preparationRecipe && this.preparationRecipe.analyzedInstructions) {
      this.preparationRecipe.analyzedInstructions.forEach((step) => {
        step.isPerformed = false; // Add the isPerformed property to each step object
      });
    }
    },
    updateStepStatus(index) {
      // Update the status of the preparation step
      this.preparationRecipe.analyzedInstructions[index].isPerformed = !this.preparationRecipe.analyzedInstructions[index]
        .isPerformed;
    },
    doublePortions() {
      // Double the portions and update the ingredient quantities accordingly
      this.portions *= 2;
    },
  },
};
</script>

<style scoped>
.preparation-page {
  background-color: bisque;
  /* Add other styles as needed */
  color: black;

}
.preparation-page label,
.preparation-page .recipe-title,
.preparation-page .centered-text,
.preparation-page table {
  color: black; /* Set the font text color to black */
}
/* Add necessary styles for the preparation page here */
</style>

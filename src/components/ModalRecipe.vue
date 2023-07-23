<template>
  <div>
    <!-- Button to open the modal -->
    <b-button v-b-modal.modal-prevent-closing>Create Recipe</b-button>

    <!-- Modal for creating a recipe -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create Your Recipe :"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <!-- Recipe creation form -->
      <form ref="form" @submit.stop.prevent="handleSubmit">

        <!-- Recipe ID input -->
        <b-form-group
          label="Recipe ID"
          label-for="recipe-id-input"
          :state="recipeIdState"
        >
          <b-form-input
            id="recipe-id-input"
            v-model="recipeId"
            type="number"
            :state="recipeIdState"
            required
            min="1"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!recipeId">Recipe ID is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="recipeId && recipeId < 1">Number must be positive</b-form-invalid-feedback>
        </b-form-group>

        <!-- Title input -->
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Image input -->
        <b-form-group
          label="Image"
          label-for="image-input"
          invalid-feedback="Image is required"
          :state="imageState"
        >
          <b-form-input
            id="image-input"
            v-model="image"
            :state="imageState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Ready in Minutes input -->
        <b-form-group
          label="Ready in Minutes"
          label-for="ready-input"
          invalid-feedback="Ready in Minutes must be a number"
          :state="readyInMinutesState"
        >
          <b-form-input
            id="ready-input"
            v-model="readyInMinutes"
            :state="readyInMinutesState"
            type="number"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- Popularity input -->
        <b-form-group
          label="Popularity"
          label-for="popularity-input"
          invalid-feedback="Popularity must be a number"
          :state="popularityState"
        >
          <b-form-input
            id="popularity-input"
            v-model="popularity"
            :state="popularityState"
            type="number"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- Vegetarian checkbox -->
        <b-form-group label="Vegetarian">
          <b-form-checkbox v-model="vegetarian"></b-form-checkbox>
        </b-form-group>

        <!-- Vegan checkbox -->
        <b-form-group label="Vegan">
          <b-form-checkbox v-model="vegan"></b-form-checkbox>
        </b-form-group>

        <!-- Gluten Free checkbox -->
        <b-form-group label="Gluten Free">
          <b-form-checkbox v-model="glutenFree"></b-form-checkbox>
        </b-form-group>

        <!-- Extended Ingredients input -->
        <b-form-group
          label="Extended Ingredients"
          label-for="ingredients-input"
          invalid-feedback="Extended Ingredients must be an array"
          :state="extendedIngredientsState"
        >
          <b-form-input
            id="ingredients-input"
            v-model="extendedIngredients"
            :state="extendedIngredientsState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Instructions textarea -->
        <b-form-group
          label="Instructions"
          label-for="instructions-input"
          invalid-feedback="Instructions is required"
          :state="instructionsState"
        >
          <b-form-textarea
            id="instructions-input"
            v-model="instructions"
            :state="instructionsState"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- Servings input -->
        <b-form-group
          label="Servings"
          label-for="servings-input"
          invalid-feedback="Servings must be a number"
          :state="servingsState"
        >
          <b-form-input
            id="servings-input"
            v-model="servings"
            :state="servingsState"
            type="number"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- Analyzed Instructions input -->
        <b-form-group
          label="Analyzed Instructions"
          label-for="analyzed-instructions-input"
          invalid-feedback="Analyzed Instructions must be an array"
          :state="analyzedInstructionsState"
        >
          <b-form-input
            id="analyzed-instructions-input"
            v-model="analyzedInstructions"
            :state="analyzedInstructionsState"
            required
          ></b-form-input>
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Recipe form data
      recipeId: "",
      recipeIdState: null,
      title: "",
      titleState: null,
      image: "",
      imageState: null,
      readyInMinutes: null,
      readyInMinutesState: null,
      popularity: null,
      popularityState: null,
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      extendedIngredients: "",
      extendedIngredientsState: null,
      instructions: "",
      instructionsState: null,
      servings: null,
      servingsState: null,
      analyzedInstructions: "",
      analyzedInstructionsState: null,
      submittedRecipes: [], // List of submitted recipes
    };
  },

  methods: {
    // Checks if the form is valid
    checkFormValidity() {
      return this.$refs.form.checkValidity();
    },

    // Resets the recipe creation modal
    resetModal() {
      this.$refs.form.classList.remove("was-validated");
      this.recipeId = "";
      this.recipeIdState = null;
      this.title = "";
      this.titleState = null;
      this.image = "";
      this.imageState = null;
      this.readyInMinutes = null;
      this.readyInMinutesState = null;
      this.popularity = null;
      this.popularityState = null;
      this.vegetarian = false;
      this.vegan = false;
      this.glutenFree = false;
      this.extendedIngredients = "";
      this.extendedIngredientsState = null;
      this.instructions = "";
      this.instructionsState = null;
      this.servings = null;
      this.servingsState = null;
      this.analyzedInstructions = "";
      this.analyzedInstructionsState = null;
    },

    // Handles the OK button click in the modal
    async handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
      this.$emit("recipe-id-selected", this.recipeId);
    },

    // Submits the recipe form
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        this.$refs.form.classList.add("was-validated");
        return;
      }

      // Pad the recipe ID with leading '9' characters to make it 8 characters long
      const paddedRecipeId = this.recipeId.padStart(8, '9');
      // this.axios.defaults.withCredentials = true;


      try {
        this.axios.defaults.withCredentials = true;
        // Send a POST request to create the recipe
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/MyRecipes",
          {
            recipe_id: paddedRecipeId,
            title: this.title,
            image: this.image,
            readyInMinutes: this.readyInMinutes,
            popularity: this.popularity,
            vegetarian: this.vegetarian,
            vegan: this.vegan,
            glutenFree: this.glutenFree,
            extendedIngredients: this.extendedIngredients,
            instructions: this.instructions,
            servings: this.servings,
            analyzedInstructions: this.analyzedInstructions,
          },
          // { withCredentials: true }
        );
        this.axios.defaults.withCredentials = false; 
        console.log(response.data);

        // Add the submitted recipe to the list
        this.submittedRecipes.push({
          id: response.data.id,
          title: this.title,
        });

        // Hide the modal
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.was-validated .form-control:invalid {
  border-color: #f50c24 !important;
}
</style>


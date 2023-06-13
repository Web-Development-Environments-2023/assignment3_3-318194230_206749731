<template>
  <div class="background-div">
    <div class="container">
      <h1 class="title">Search Page</h1>
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
        <b-form-group
          id="input-group-recipeName"
          label-cols-sm="3"
          label="Recipe Name:"
          label-for="recipeName"
        >
          <b-form-input
            id="recipeName"
            v-model="form.recipeName"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-recipeCount"
          label-cols-sm="3"
          label="Number of Recipes:"
          label-for="recipeCount"
        >
          <b-form-select
            id="recipeCount"
            v-model="form.recipeCount"
            :options="recipeCountOptions"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-filter"
          label-cols-sm="3"
          label="Filter:"
          label-for="filter"
        >
          <b-form-select
            id="filter"
            v-model="form.filter"
            :options="filterOptions"
          ></b-form-select>
        </b-form-group>

        <div class="button-group">
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="submit" variant="primary">Search</b-button>
        </div>
        

      </b-form>

      <!-- Rest of the content -->
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "SearchPage",
  data() {
    return {
      form: {
        recipeName: "",
        recipeCount: 5,
        filter: null,
      },

      recipeCountOptions: [5, 10, 15],
      filterOptions: [
        { value: null, text: "None" },
        { value: "name", text: "Name" },
        { value: "popularity", text: "Popularity" },
        { value: "time", text: "Time" },
        { value: "cuisine", text: "Cisine" },
      ],
    };
  },
  validations: {
    form: {
      recipeName: {
        required,
      },
    },
  },
  methods: {
  onSearch() {
    this.$v.form.$touch();
    if (this.$v.form.$anyError) {
      return;
    }

    // Perform the search based on the form values
    const { recipeName, recipeCount, filter } = this.form;
    // Your search logic goes here
    console.log("Search query:", recipeName);
    console.log("Number of recipes:", recipeCount);
    console.log("Filter:", filter);

    // Move the form to the top left side of the page
    const formContainer = document.querySelector('.container');
    formContainer.style.position = 'absolute';
    formContainer.style.left = '0';
    formContainer.style.top = '0';
  },
  onReset() {
    this.form = {
      recipeName: "",
      recipeCount: 5,
      filter: null,
    };
    this.$nextTick(() => {
      this.$v.$reset();
    });

    // Return the form to its original position
    const formContainer = document.querySelector('.container');
    formContainer.style.position = 'relative';
    formContainer.style.left = 'auto';
    formContainer.style.top = 'auto';
  },
  },
};
</script>

<style lang="scss" scoped>
.background-div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('../assets/pancake.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
}

.container {
  background-color: #ffffff;
  max-width: 40%;
  margin: 4rem auto;
  position: relative;
  border: 2px solid #a15252;
  border-radius: 50px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Responsive styles */
  @media (max-width: 767px) {
    max-width: 90%;
    border-radius: 20px;
    box-shadow: none;
    margin: 2rem auto;
  }
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.button-group > .btn {
  width: 150px;
}

/* Additional styles for mobile */
@media (max-width: 480px) {
  .container {
    max-width: 95%;
    padding: 1.5rem;
  }

  .button-group > .btn {
    width: 120px;
  }
}


</style>

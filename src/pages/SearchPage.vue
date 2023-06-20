<template>
  <div class="background-div">
    <div class="container">
      <h1 class="title">Search Page</h1>
      <div class="search-wrapper">
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
        <b-form-group
          id="input-group-recipeName"
          label-cols-sm="3"
          label="Recipe Name:"
          label-for="recipeName"
          :state="recipeNameError ? false : null" 
          :invalid-feedback="recipeNameError ? 'Recipe name is required' : null" 
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
          id="input-group-cuisines"
          label-cols-sm="3"
          label="Cuisines:"
          label-for="cuisines"
        >
          <b-form-select
            id="cuisines"
            v-model="form.cuisines"
            :options="Cuisines"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-diet"
          label-cols-sm="3"
          label="Diet:"
          label-for="diet"
        >
          <b-form-select
            id="diet"
            v-model="form.diet"
            :options="Diet"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-intolerances"
          label-cols-sm="4"
          label="Intolerances:"
          label-for="intolerances"
        >
          <b-form-select
            id="intolerances"
            v-model="form.intolerances"
            :options="Intolerances"
          ></b-form-select>
        </b-form-group>

         <div class="button-group">
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="submit" variant="primary">Search</b-button>
        </div>
      </b-form>
    </div>
    <div v-if="lastSearch && Object.keys(lastSearch).length !== 0" class="lastSearch">
      <h1 style = "font-size: 1.2em">You recently searched:</h1>
      <RecipePreview :recipe="lastSearch" />
    </div>

    </div>
    <div class="results-container" v-show="showresults">
      <div id="results" v-show="showresults">
        <div id="resultsempty">
          <h1 class="massages" v-show="resultsfound === 0">
            Sorry, no results have been returned
          </h1>
        </div>
        <div id="resultsnotempty" v-show="resultsfound !== 0">
          <b-select
            class="Select-bars"
            id="PopOrPrep"
            :options="['Please select filter','Popularity','Preparation']"
            v-model="PopOrPrep"  
          >
          </b-select>
          <b-button class="buttons" @click="sortThem" v-show="PopOrPrep !== 'Please select filter'">Sort by Filters</b-button>
          <br/>
          <br/>
          <div class="results-container">
            <div class="row">
              <b-col v-for="r in search_results" :key="r.id" cols="4">
                <RecipePreview class="recipePreview" :recipe="r" />
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/SerachPreReview.vue";

export default {
  name: "SearchPage",
  components:{
    RecipePreview 
  },
  data() {
    return {
      form: {
        recipeName: "",
        recipeCount: 5,
        cuisines: null,
        diet: null,
        intolerances: null
      },
      recipeNameError: false,
      recipeCountOptions: [5, 10, 15],
      Cuisines: [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern",
        "European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin",
        "American",
        "Mediterranean",
        "Mexican",
        "Middle",
        "Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
      ],
      Diet: [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30"
      ],
      Intolerances: [
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree",
        "Nut",
        "Wheat"
      ],
      search_results: [], // Placeholder for search results
      resultsfound:0,
      is_query: true,
      PopOrPrep:"Please select filter",
      showresults: false,
      lastSearch: null,
    };
  },
  created() {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      this.lastSearch = JSON.parse(lastSearch);
    }
  },
  methods: {
  // checkLastSearch(){
  // },
  async onSearch(){ 
    const { recipeName, recipeCount, cuisines, diet,intolerances} = this.form;
    if (recipeName.trim() === "") {
      this.recipeNameError = true; // Set error state to true
      return; // Stop executing the method
    }
    this.recipeNameError = false;
    let response;
    try {
      response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/searchForRecipe?query=" + recipeName + "&number=" +recipeCount
        + "&cuisine='" + cuisines + "'&diet=" + diet + "&intolerance=" + intolerances, { withCredentials: true });
      if (response.status !== 200) this.$router.replace("/NotFound");
      
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
    const recipes = response.data;
    if (recipes.length > 0) {
        this.lastSearch = recipes[0];
        localStorage.setItem("lastSearch", JSON.stringify(recipes[0]));
    }
    this.search_results = [];
    this.search_results.push(...recipes);
    this.resultsfound=this.search_results.length;
    this.showresults = true;
   
  },
  sortThem() { 
  if(this.PopOrPrep == "Please select filter"){
    alert("You have to choose a filter before sort");
  } else if (this.PopOrPrep == 'Popularity') {
    this.sortByRating();
  } else if (this.PopOrPrep == 'Preparation') {
    this.sortByTime();
  }
},
  onReset() {
    this.form = {
      recipeName: "",
      recipeCount: 5,
      cuisines: null,
      diet: null,
      intolerances: null,
    };
    this.$nextTick(() => {
      this.$v.$reset();
    });
    this.results = []; // Reset search results
    this.showresults = false; // Hide search results
  },
  isEmpty(){
        if(this.search_results.length > 0)
        {
          return true
        }
        else
        {
          return false
        }
      },
  sortByRating() {
    this.search_results = this.search_results.sort(function(a, b) {
      if (a.popularity < b.popularity) return 1;
      else if (a.popularity > b.popularity) return -1;
      else {
        return 0;
      }
    });
},
  sortByTime() {
    this.search_results = this.search_results.sort(function(a, b) {
      if (a.readyInMinutes > b.readyInMinutes) return 1;
      else if (a.readyInMinutes < b.readyInMinutes) return -1;
      else {
        return 0;
      }
    });
  }
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
  overflow-y: scroll;
}

.container {
  background-color: #ffffff;
  max-width: 30%;  // Reduce max-width to make the form smaller
  margin: 2rem auto;
  position: relative;
  border: 2px solid #a15252;
  border-radius: 50px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:80%;
  

  /* Responsive styles */
  @media (max-width: 767px) {
    max-width: 80%;  // Increase max-width for smaller screens
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

#recipeInfo2 {
border-width:2px;
border-style:groove;
border-color:rgb(62, 89, 115);
border-radius: 12px;
margin: 10px;
padding: 10px;
}
.results-container {
  max-width: 80%;
  margin: 2rem auto; /* Adjust the margin as needed */
  background-color: #ffffff;
  border: 2px solid #a15252;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  /* Remove height and overflow properties */
}
.search-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
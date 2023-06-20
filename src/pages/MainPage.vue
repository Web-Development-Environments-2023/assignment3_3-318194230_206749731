<template>
  <body>
    <div class="container">
      <div class='container1'>
      <h1 class="horizontal-cut-text">Welcome To Recipes Website</h1>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="left-column">
            <p class="random-recipes">Random Recipes</p>
            <RandomList ref="recipeList" 
            title="Explore these recipes" 
            class="RandomRecipes"
            page_type="Random" />
            <div class="text-center">
              <button @click="updateRandomRecipes" class="btn btn-info">
                Get New Recipes
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="right-column">
            <p v-if="!$root.store.username" class="random-recipes">You Need to Log in to Vue this</p>
            <LogIn v-if="!$root.store.username" />
            <p v-if="$root.store.username" class="random-recipes">Your Last viewed Recipes</p>
            <RecipePreviewList 
              v-if="$root.store.username" 
              title="Your Last seen Recipes"
              class="lastseen" 
              page_type="LastSeen"/>
            <div class="text-center">
            </div>
          </div>
        </div>
      </div>
    </div>
</body>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RandomList from "../components/RecipeRandomList.vue";
import LogIn from "../components/LogIn.vue"
export default {
  components: {
    RecipePreviewList,
    RandomList,
    LogIn
  },
  methods: {
    updateRandomRecipes() {
      this.$refs.recipeList.updateRecipes();
    },
   
    
  },
};
</script>

<style lang="scss" scoped>


.title {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  animation: fade 2s infinite;
}
.random-recipes {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 10px;
}




.container {
  margin: 0 ;
  text-align: center;
}



.left-column {
  margin-right: 10%;
}

.right-column {
  margin-left: 10%;
}

.lastseen {
  margin: 5% 0 5%;
}

.RandomRecipes {
  margin: 5% 0 5%;
}

.recipe-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  float: left;
  margin-right: 10%;
  margin-bottom: 10%;
}

.custom-button {
  background-color: #17a2b8;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.custom-button:hover {
  background-color: #138496;
}
// Color
$brown: #2b2520;
$green: #39dbc2;
$pink: #f41fbf;
$yellow: #ffed28;
$purple: #b028ff;
$blue: #49A7FF;
$red: #ff3838;
$orange: #db7953;

// Font
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Molle:ital@1&display=swap');


// Size
$extra-large: 85px;
$large: 84px;

*, *:before, *:after {
  box-sizing: border-box;
}


@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  font-family: Arial, sans-serif;
  min-height: 100%;
  min-width: 100%;
  background-color: $brown;
  @include center;
  height: 100%;
  width: 100%;
  background-image: url("https://cdn.pixabay.com/photo/2017/10/22/20/42/table-2879213_1280.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container1 {
  
  * {
    margin: 0 0;
  }
  

  .horizontal-cut-text {
      font-size: $extra-large * 1.2;
      font-weight: 900;
      font-family: 'Catamaran', sans-serif;
      text-transform: uppercase;
      $dark-pink: darken($green, 10%);
      $stripe-size: 3%;
      background:
      -webkit-linear-gradient(270deg, $dark-pink, $dark-pink 50%,      transparent 50%),
      -webkit-repeating-linear-gradient(
        90deg,
        transparent,
        transparent $stripe-size,
        white $stripe-size,
        white $stripe-size * 2,
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
        text-shadow: 6px 6px rgba(black, 0.4),
  }
}
</style>
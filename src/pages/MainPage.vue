<template>

  <div class="container">
    
    <h1 class="title">Welcome To Recipes Website</h1>    
    <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" />
    
    
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
     {{ !$root.store.username }} 
    <!-- <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>  -->
    <!-- <div
      style="position: absolute;top: 0%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div> -->

  </div>
  
  
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.recipe-preview {
  width: 100px; /* Adjust the width as per your requirements */
  height: 100px; /* Adjust the height as per your requirements */
  object-fit: cover; /* Preserve the aspect ratio and cover the container */
  float: left; /* Align the photos on the left side */
  margin-right: 10px; /* Add some space between the photos */
  margin-bottom: 10px; /* Add some space below each photo */
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.title {
  text-align: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  animation: fade 2s infinite;
}
</style>

import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  
  {
    path: "/FamilyRecipePage",
    name: "FamilyRecipePage",
    component: () => import("./pages/FamilyRecipePage"),
  },
  {
    path: "/PesonalRecipes",
    name: "PesonalRecipes",
    component: () => import("./pages/PesonalRecipes"),
  },
  {
    path: "/FavoriteRecipePage",
    name: "FavoriteRecipePage",
    component: () => import("./pages/FavoriteRecipePage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    
  },
  {
    path: "/AboutPage",
    name: "About",
    component: () => import("./pages/AboutPage"),
    
  },
  {
    path: "/RecipePreparation/:recipeId",
    name: "recipe-preparation",
    component: () => import("./pages/RecipePreparation"),
    
  },
  
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  
];

export default routes;

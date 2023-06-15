<template>
  <div id="app">
    <!-- Navigation Bar -->
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- Collapsible Navigation Items -->
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- Home Link -->
            <b-nav-item>
              <router-link :to="{ name: 'main' }">Vue Recipes</router-link>
            </b-nav-item>

            <!-- Search Link -->
            <b-nav-item>
              <router-link :to="{ name: 'search' }">Search</router-link>   
            </b-nav-item>    

            <!-- Register and Login Links -->
            <b-nav-item v-if="!$root.store.username">
              <router-link :to="{ name: 'register' }">Register</router-link>
            </b-nav-item>
            <b-nav-item v-if="!$root.store.username">
              <router-link :to="{ name: 'login' }">Login</router-link>
            </b-nav-item>

            <!-- About Link -->
            <b-nav-item>
              <router-link :to="{ name: 'About' }">About</router-link>
            </b-nav-item>

            <!-- Personal Dropdown Menu -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right v-if="$root.store.username">
                <template #button-content>
                  <em>Personal</em>
                </template>
                <b-dropdown-item :to="{ name: 'FavoriteRecipePage' }">Favorite Recipes</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'PesonalRecipes' }">Personal Recipes</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'favorite' }">Family Recipes</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

          </b-navbar-nav>

          <!-- Guest Dropdown Menu -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em v-if="!$root.store.username">Hello Guest</em>
                <em v-if="$root.store.username">Welcome: {{ $root.store.username }}</em>
              </template>

              <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
              <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <ModalRecipe v-if="$root.store.username"></ModalRecipe>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script>
import ModalRecipe from "./components/ModalRecipe.vue";

export default {
  name: "App",
  components: {
    ModalRecipe,
  },
  methods: {
    // Function to logout the user
    async Logout() {
      this.$root.store.logout();

      // Display appropriate toast message based on user's login status
      if (!this.$root.store.username) {
        this.$root.toast("Logout", "User logged out successfully", "success");
      } else {
        this.$root.toast("Logout", "User already logged out", "danger");
      }

      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Logout",
          { withCredentials: true }
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      // Redirect the user to the homepage
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #36502c;
  min-height: 100vh;
}

#nav a {
  font-weight: bold;
  color: #8aaec0;
}

#nav a.router-link-exact-active {
  color: #be555d;
}
</style>

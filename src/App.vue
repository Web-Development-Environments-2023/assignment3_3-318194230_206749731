<template>
  <div id="app">
<div id="nav">
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        
        <b-nav-item >
         <router-link :to="{ name: 'main' }">Vue Recipes</router-link>
         </b-nav-item>
        <b-nav-item >
         <router-link :to="{ name: 'search' }">Search</router-link>   
         </b-nav-item>    


        <b-nav-item v-if="!$root.store.username">
          <router-link :to="{ name: 'register' }">Register</router-link>
        </b-nav-item>
        <b-nav-item v-if="!$root.store.username">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </b-nav-item>

        <b-nav-item v-if="$root.store.username">
           <router-link :to="{ name: 'login' }">CreateRecipe</router-link>
        </b-nav-item>

        <!-- <b-nav-item v-else>
          <span>{{ $root.store.username }}:</span>
          <b-button @click="Logout">Logout</b-button>
        </b-nav-item> -->


      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="$root.store.username">
          <template #button-content>
            <em>Personal</em>
          </template>
          <b-dropdown-item :to="{ name: 'favorite' }">Favorite Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favorite' }">Private Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favorite' }">Familia Recipes</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>



      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
        <template #button-content>
          <em v-if="!$root.store.username">User</em>
          <em v-if="$root.store.username">Welcome: {{ $root.store.username }}</em>
        </template>

          <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
          <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
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

// #nav {
  


// }

#nav a {
  font-weight: bold;
  color: #8aaec0;
}

#nav a.router-link-exact-active {
  color: #be555d;
}


</style>

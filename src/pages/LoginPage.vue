<template>
  
 <div class="background-div">
  
  <div class="container">
    
    <h1 class="title">Login</h1>

    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      // this.axios.defaults.withCredentials = true;

      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            username: this.form.username,
            password: this.form.password
          },
          { withCredentials: true }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        this.axios.defaults.withCredentials = false; 
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.background-div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('../assets/1412206.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0; /* Adjust the z-index value */
}


.container {
  background-color: #ffffff; /* Set the background color you want */

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
    max-width: 100%;
    border-radius: 20px;
    box-shadow: none;
    margin: 2rem auto;
  }
}

.b-button.register-btn {
  width: 250px;
}

@media (max-width: 767px) {
  .b-button.register-btn {
    width: 100%;
  }
}




</style>

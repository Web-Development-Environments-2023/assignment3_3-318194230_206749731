<template>
  <div class="background-div">
    <div class="container">
      <h1 class="title"></h1>
      <b>
       <b><h2>About the Development Team and Project</h2></b>
        <p>
          Our development team consists of talented software engineers, Ori Fadida and Keren Gorelik. They bring their expertise and passion to deliver an exceptional user experience for our project, which focuses on creating a recipes website. 
        </p>
        <p>
          Ori Fadida, a software engineer based in Beersheba, Israel, has a strong background in web development and has previously worked on various projects. You can learn more about Ori and his professional background on his <a href="https://www.linkedin.com/in/ori-fadida-1117a21b3/">LinkedIn profile</a> and explore his coding work on <a href="https://github.com/orifad100">GitHub</a>.
        </p>
        <p>
          Keren Gorelik, another valuable member of our team, contributes her skills in creating intuitive and user-friendly interfaces. While specific contact details and links for Keren are not provided, her expertise is crucial to the success of our project.
        </p>
        <p> Now, let's delve into our project itself. Our main objective is to create a recipes website that provides users with a wide range of culinary inspirations and resources. The website will offer an extensive collection of recipes from various cuisines, catering to both novice and experienced home cooks. Users will be able to search for specific recipes, browse categories, and even submit their own favorite recipes to share with the community.
        With our team's expertise in web development, we will ensure that the website is responsive, visually appealing, and user-friendly across different devices and screen sizes. We are excited to bring this recipes website to life and provide a valuable resource for food enthusiasts around the world.</p>
        <p>
           We are excited to bring this recipes website to life and provide a valuable resource for food enthusiasts around the world. Stay tuned for updates as we continue to work diligently on this exciting project.To get a better understanding of our team's capabilities, you can explore some of our previous exercises and projects.<br> Previous projects : <a href="https://web-development-environments-2023.github.io/318194230/">Warren Buffett Website</a>
          ,<a href="https://web-development-environments-2023.github.io/assignment2-206749731_318194230/">SpaceShip Game Website</a>          
        </p>
      </b>
    </div>
  </div>
</template>

<script>


export default {
  name: "RegisterComponent",
  data() {
    return {
      form: {

      },

    };
  },



};
</script>

<style lang="scss" scoped>
.background-div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../assets/pexels-jane-doan-1099680.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0; /* Adjust the z-index value */
}



.container {
  background-color: #ffffffe1; /* Set the background color you want */
  max-width: 80%;
  margin: 2rem auto;
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


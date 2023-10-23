<template>
  <div class="container">
    <Navbar />
    <div class="router-view-container">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import Navbar from './components/NavbarView.vue'; // Adjust the path to the Navbar component

export default {
  components: {
    Navbar, // Register the Navbar component
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  justify-content: flex-start; /* Align children at the top */
  min-height: 100vh; /* Make the container at least the full viewport height */
}


.navbar {
  width: 100%; /* Make the navbar take up all available horizontal space */
  background-color: #3a3b47;
  color: #fff;
  padding: 10px;
  width: 100%;
  position: sticky; 
}

.router-view-container {
  margin-top: 40px; /* Add a margin of 40px to the top */
  /* Add any specific styling for the router-view content container here */
}
</style>

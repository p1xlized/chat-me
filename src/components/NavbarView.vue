<template>
  
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/feed">Messages</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
      <router-link to="/profile">Profile</router-link>
      <button class="button is-danger align-right" @click="handleSignOut" v-if="isLoggedIn">Logout</button>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import router from '../router'; // Adjust the path to your router file
  
  const isLoggedIn = ref(false);
  let auth;
  
  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });
  });
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/");
      isLoggedIn.value = false;
    });
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-top:  10px;
    margin-left: 5px;
    background-color: #3a3b47;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: flex-start; /* Align text to the left */
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
  }
  
  .navbar a {
    color: #fff;
    text-decoration: none;
    margin-right: 10px; /* Add margin between links instead of "|" separators */
  }
  
  .navbar button {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .align-right {
    margin-left: auto;
  }
  </style>
  
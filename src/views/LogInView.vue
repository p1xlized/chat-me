<template>
  <div class="container">
    <div class="center-box" style="width: 600px; padding: 20px; border: 1px solid #838181; border-radius: 10px;">
      <h1 class="title">
        <i class="fas fa-user"></i> Log In
      </h1>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" v-model="email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p class="forgot-password">
          <a href="/forgot-password">Forgot Password?</a> <!-- Replace with the actual link -->
        </p>
      </div>
      <br />
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <br />
      <div class="buttons is-justify-content-space-between">
        <button class="button is-info" @click="register">Submit</button>
        <button class="button is-success" @click="signInWithGoogle">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const errorMsg = ref(); //erreur
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully signed in");
      router.push({ name: "home" });
    })
    .catch((error) => {
      
      console.error("Log-in error:", error);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;
        case "auth/invalid-password":
          errorMsg.value = "Invalid password";
          break;
        case "auth/user-disabled":
          errorMsg.value = "User disabled";
          break;
        case "auth/user-not-found":
          errorMsg.value = "User not found";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Wrong password";
          break;
        default:
          errorMsg.value = "Email or password is incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {
  
};
</script>
<style scoped>

.forgot-password {
  margin-top: 10px; 
  text-align: left;
}
</style>

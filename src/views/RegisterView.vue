<template>
  <div class="container">
    <div class="center-box" style="width: 600px; padding: 20px; border: 1px solid #838181; border-radius: 10px;">
      <h1 class="title">
        <i class="fas fa-user"></i> Register
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
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="checkbox">
          <input type="checkbox" v-model="agreed" /> I agree to the terms and conditions
        </label>
      </div>
      <br />
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <br />
      <div class="buttons is-justify-content-space-between">
        <button class="button is-info" @click="register" :disabled="!agreed">Submit</button>
        <button class="button is-success" @click="signInWithGoogle">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref(""); // New ref for password confirmation
const agreed = ref(false); // New ref for checkbox
const router = useRouter();
const errorMsg = ref("");

const register = () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    return;
  }

  if (!agreed.value) {
    errorMsg.value = "Please agree to the terms and conditions";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      console.log("Registration successful");
      router.push({ name: "home" });
      return userCredential;
    })
    .catch((error) => {
      // Handle the error if needed
      console.error("Registration error:", error);
    });
};

const signInWithGoogle = () => {
  // Implement Google sign-in if needed
};
//export { userCredential } 
</script>

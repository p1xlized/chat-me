<template>
  <div class="box">
    <div class="image-container">
      <div class="image-box">
        <img :src="imageUrl" alt="User Image" v-if="imageUrl" />
        <input type="file" @change="uploadImage" accept="image/*" />
      </div>
    </div>
    <div class="info-container">
      <div>
        <p>
          <strong>Logged in as:</strong> <small>{{ userEmail }}</small>
        </p>
        <br>
        <div class="password-form">
          <h3>Change Password 


          </h3>
          <br>  
          <div>
            <input
              class="input is-normal"
              type="text"
              placeholder="Current Password"
            />
          </div>
          <div>
            <input
              class="input is-normal"
              type="text"
              placeholder="New Password"
            />
          </div>
          <div>
            <input
              class="input is-normal"
              type="text"
              placeholder="Confirm New Password"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import { ref, onMounted } from 'vue';
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  list,
} from "firebase/storage";

export default {
  data() {
    return {
      imageUrl: null,
    };
  },

  computed: {
    user() {
      const auth = getAuth();
      return auth.currentUser;
    },

    userEmail() {
      return this.user ? this.user.email : "";
    },
  },

  async mounted() {
    if (this.user) {
      const storage = getStorage();
      const userImageRef = storageRef(storage, `images/${this.user.email}`);
      const response = await list(userImageRef);
      const files = response.items;

      if (files.length > 0) {
        const lastImageRef = files[files.length - 1];
        this.imageUrl = await getDownloadURL(lastImageRef);
      }
    }
  },

  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      const user = this.user;

      if (!user) {
        // Handle the case when the user is not logged in
        return;
      }

      const storage = getStorage();
      const imageRef = storageRef(storage, `images/${user.email}/${file.name}`);

      try {
        await uploadBytes(imageRef, file);
        console.log("Image uploaded successfully.");

        // Set the 'imageUrl' data property to the image URL
        this.imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  text-align: left;
}

.image-container {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image-box {
  margin-right: 20px;
}

.info-container {
  width: 50%;
}

.password-form div {
  margin-bottom: 10px; /* Add space between input fields */
}
</style>


<template>
  <div class="box" id="message-box">
    <div class="message-container">
      <div class="messages" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="{
            'message-box': true,
            sent: message.userEmail === currentUserEmail,
            received: message.userEmail !== currentUserEmail,
          }"
        >
          <div class="message-content">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <div class="message-title">
                    <strong>{{ message.userEmail }}</strong>
                  </div>
                    

                    <br>
                    {{ message.message }}
                    <br/>
                    <small>{{ formatTimestamp(message.timestamp) }}  </small>
                  
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="form-container">
      <div class="box">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Message"
              v-model="messageText"
              required
            ></textarea>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export default {
  setup() {
    const messageText = ref("");
    const messages = ref([]);
    const currentUserEmail = ref("");

    const sendMessage = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const messagesRef = collection(db, "messages");
          const newMessage = {
            message: messageText.value,
            userEmail: user.email,
            timestamp: new Date().getTime(),
          };
          await addDoc(messagesRef, newMessage);
          messageText.value = "";
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    };

    onMounted(async () => {
      try {
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("timestamp")
        );
        const querySnapshot = await getDocs(messagesQuery);
        messages.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        currentUserEmail.value = auth.currentUser ? auth.currentUser.email : "";
      } catch (error) {
        console.error("Error retrieving messages:", error);
      }
    });

    return {
      messageText,
      messages,
      sendMessage,
      currentUserEmail,
      formatTimestamp,
    };
  },
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  height: 85%;
  width: 100%;
  margin-left: 4%;
   
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
}

.message-box {
  margin: 100px 100px 0 100px;
  padding: 10px;

  border-radius: 10px;
  max-width: 50%;
  clear: both;
  font-size: 15px; 
}

.sent {
  float: right;
  background-color: aquamarine;
  margin-left: 10px;
}

.received {
  background-color: #d2c8f7; 
  float: left; 
  margin: 10px; 
}

.content {
  margin: 0;
  clear: both;
  text-align: left; 

#message-box {
  margin-bottom: 2%;
}
.form-container {
  display: flex;
  padding: 10px;
  position: sticky;
  bottom: 10px;
  
  border-radius: 12px;
}

textarea {
  width: 1250px;
  height: 75px;
  
}

button {
  height: 90%;
  width: 100px;
  margin-right: 10px;
  margin-left: 10px;
}
.user-email {
  text-align: left;

  font-weight: bold;
  margin-bottom: 5px;
}
</style>

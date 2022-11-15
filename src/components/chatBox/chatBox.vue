<template>
  <div class="bottomright" :style="!minimizeChat && { bottom: '65px', zIndex: '999999' }">
    <Transition name="slide-fade">
      <q-card v-if="showChatBox" class="shadow-1" style="border-top: 0" :class="minimizeChat && 'bg-transparent'">
        <q-card-section class="chat-header-color text-white" style="border-bottom: 0"
          @click="biDIrStore.chatBoxWindow.minimizeChat = !minimizeChat">
          <div class="flex justify-between">
            <div class="text-subtitle2 text-capitalize">
              <strong>{{ patientDemographicsData.first_name }}

                {{ patientDemographicsData.last_name }}</strong>
            </div>

            <div>
              <q-icon :name="!minimizeChat ? 'close_fullscreen' : 'open_in_full'" class="text-weight-bold" left
                @click.stop="biDIrStore.chatBoxWindow.minimizeChat = !minimizeChat" />

              <q-icon name="close" class="text-weight-bold" @click.stop="biDIrStore.chatBoxWindow.show = false" />
            </div>

            <!-- open_in_full -->
          </div>
        </q-card-section>

        <div v-if="!minimizeChat">
          <q-card-section class="q-pa-none">
            <ConversationDetail />
          </q-card-section>

          <q-card-section class="q-px-none" v-if="!showAudioSection && !showVideoSection">
            <div class="text-area-badge">
              <span>{{ maxlength - textMessage.length }}/{{ maxlength }}</span>
            </div>
          </q-card-section>

          <q-separator v-if="showAudioSection || showVideoSection" />

          <q-card-section class="q-py-sm" v-if="showAudioSection">
            <AudioSection :closeAudioSection="closeAudioSection" @SendAudio="sendAudioVideo" />
          </q-card-section>

          <q-card-section v-if="showVideoSection" class="pa-ten q-py-none">
            <VideoSection :closeVideoSection="closeVideoSection" @SendVideo="sendAudioVideo" />
          </q-card-section>

          <q-card-section class="q-py-none bg-grey-1 textarea" v-if="!showAudioSection && !showVideoSection">
            <q-input borderless rows="4" input-style="padding-top:4px" type="textarea" v-model="textMessage"
              :maxlength="maxlength" placeholder="Write a replay..." />
          </q-card-section>

          <q-card-section v-if="attachment.name && !showAudioSection && !showVideoSection">
            <div class="attachment-div">
              <div class="flex no-wrap">
                <div class="attach-name">{{ attachment.name }}</div>

                <div>{{ Math.round(attachment.size / 1024) }} KB</div>
              </div>

              <div>
                <q-icon name="close" size="14px" @click="detachFile" />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="flex justify-between items-end pa-ten" v-if="!showAudioSection && !showVideoSection">
            <div>
              <input type="file" ref="file" style="display: none" :accept="accept" @change="attachFile" />

              <q-avatar rounded size="30px" class="attach-icon" style="border: 1px solid #dadada"
                @click="$refs.file.click()">
                <q-icon size="18px" name="attachment" />
              </q-avatar>

              <q-avatar rounded size="30px" style="background-color: #fd6a8e" text-color="white"
                @click="showAudioSection = true" class="q-mx-xs">
                <q-icon size="18px" name="mic" />
              </q-avatar>

              <q-avatar rounded size="30px" style="background-color: #4dc095" text-color="white"
                @click="showVideoSection = true">
                <q-icon size="18px" name="videocam" />
              </q-avatar>
            </div>
            <div>
              <q-btn color="primary" :loading="sendloading" size="11.6px" class="text-capitalize q-pl-sm q-pr-xs"
                label="Send message" @click="handleSendMessage">
                <q-icon class="send-msg-icon" size="14px" name="send" />
                <template v-slot:loading>
                  <p class="loading q-ma-none">Sending</p>
                </template>
              </q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </Transition>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useBiDirectionalMessage } from "../../stores/biDirectionalMessage";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
import ConversationDetail from "./conversationDetail.vue";
import cancelSvg from "../../assets/Images/msg/cancel.svg";
import AudioSection from "./audioSection.vue";
import AudioPlayer from "./audioPlayer.vue";
import VideoSection from "./videoSection.vue";
import best from "../../assets/Images/audio/Best.mp3";
import Best_flute from "../../assets/Images/audio/Best_flute.mp3";
import audio_music from "../../assets/Images/audio/audio_music.mp3";
import audio_3 from "../../assets/Images/audio/audio.mp3";
import imageUrl from "../../assets/logo.png";

export default {
  setup() {
    const maxAllowedSize = +import.meta.env.VITE_MAX_ALLOWED_FILE_SIZE * 1024 * 1024;
    const OCStore = useOnlineConsultationStore();
    const biDIrStore = useBiDirectionalMessage();
    const patienDemoStore = usepatientDemographicsStore();
    const showChatBox = computed(() => biDIrStore.chatBoxWindow.show);
    const minimizeChat = computed(() => biDIrStore.chatBoxWindow.minimizeChat);
    const showAudioSection = ref(false);
    const showVideoSection = ref(false);
    const maxlength = ref(1500);
    const accept = import.meta.env.VITE_SELECT_FILE;
    const textMessage = ref("");
    const patientDemographicsData = computed(
      () => patienDemoStore.patientDemographicsData
    );

    const form = ref({
      practice: null,
      category: null,
      patient: null,
      subject: null,
      message: "",
    });
    const isLoading = ref(false);
    const selectedPractice = ref(null);
    const selectedCategory = ref(null);
    const selectedPatient = ref(null);
    const formData = ref(new FormData());
    const attachment = ref({
      size: null,
      name: null,
      type: null,
    });
    const timer = ref(0);
    const pressEnter = ref(false);
    const sendloading = ref(false);

    // expose to template and other options API hooks
    return {
      sendloading,
      biDIrStore,
      maxAllowedSize,
      OCStore,
      patienDemoStore,
      patientDemographicsData,
      showChatBox,
      minimizeChat,
      maxlength,
      textMessage,
      form,
      pressEnter,
      timer,
      attachment,
      formData,
      selectedPatient,
      selectedCategory,
      selectedPractice,
      isLoading,
      cancelSvg,
      accept,
      showAudioSection,
      showVideoSection,
    };
  },

  components: {
    AudioSection,
    VideoSection,
    AudioPlayer,
    ConversationDetail,
  },
  methods: {
    handleStopOthers(wavesurf) {
      this.$refs.audioPlayerRef.forEach((item) => {
        if (item.wavesurfer != wavesurf) {
          item.wavesurfer.pause();
        }
      });
    },
    closeAudioSection() {
      this.showAudioSection = false;
    },
    closeVideoSection() {
      this.showVideoSection = false;
    },

    async sendAudioVideo({ file, fileName }) {
      this.formData.append("attachment", file, fileName);
      await this.handleSendMessage();
      this.showAudioSection = false;
      this.showVideoSection = false;
    },

    async handleSendMessage() {
      if (!this.textMessage.trim() && !this.formData.has("attachment")) {
        this.OCStore.setNotificationAlert({
          type: "error",
          text: `please write text message or attach any file `,
          show: true,
        });
        return;
      }
      this.sendloading = true;
      console.log(this.textMessage.length);
      this.formData.append("message", this.textMessage.replace(/\s+/g, ' ').trim());
      if (this.biDIrStore.cmid) {
        this.formData.append("conversationId", this.biDIrStore.cmid);
        await this.biDIrStore.sendMessages(this.formData);
      } else {
        const { submitted_date, label } = this.OCStore.ocSummaryData;
        this.formData.append("subject", `${label} ${submitted_date}`);
        this.formData.append("category", "");
        this.formData.append("ref_id", this.OCStore.conditionId);
        this.formData.append("patient", this.patientDemographicsData.id);
        await this.biDIrStore.inisiateConversation(this.formData);
      }
      this.sendloading = false;
      this.attachment = { size: null, name: null, type: null };
      this.textMessage = "";
      this.formData = new FormData();
    },
    attachFile(event) {
      if (event.target.files.length) {
        const file = event.target.files[0];
        console.log(file);
        const { name, size, type } = file;
        if (size > this.maxAllowedSize) {
          let allow = import.meta.env.VITE_MAX_ALLOWED_FILE_SIZE;
          this.OCStore.setNotificationAlert({
            type: "error",
            text: `File size exceeds maximum limit is ${allow}MB`,
            show: true,
          });
          this.$refs.file.value = "";
          return;
        }
        this.attachment = {
          name,
          size,
          type,
        };
        this.formData.append("attachment", file);
      }
    },
    detachFile() {
      this.$refs.file.value = "";
      this.formData.delete("attachment");
      this.attachment = { size: null, name: null, type: null };
    },
  },

};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(720px);
  /* opacity: 0; */
}

.attach-name {
  white-space: nowrap;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 6px;
}

.bottomright {
  position: fixed;
  width: 350px;
  z-index: 999999;
  right: 20px;
  bottom: 0px;
  bottom: 65px;
}

.my-card {
  /* width: 100%; */
  width: 23.5vw;
}

.chat-header-color {
  background-color: #00a886;
  cursor: pointer;
}

.date-badge {
  position: relative;
  border-top: 1px solid #dfdfdf;
  margin-top: 15px;
}

.date-badge span {
  display: inline-block;
  color: #999;
  position: relative;
  top: -12px;
  left: 40%;
  font-size: 11px;
  background-color: #fff;
}

.left-chat-text {
  word-break: break-all;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 18px 8px 8px 0px;
  padding: 5px;
  margin-block: 4px;
  position: relative;
  width: 260px;
  display: inline-block;
}

.chat-image {
  width: 73px;
  height: 50px;
  object-fit: contain;
  border-radius: 4px;
  /* border: solid 1px #e6e6e6; */
}

.chat-image-text {
  flex: 1;
  margin-inline: 5px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #5f5f61;
}

.download-icon {
  width: 30px;
  height: 32px;
  /* margin: 4.5px 0 4.5px 9.9px; */
  /* padding: 4.6px 4.1px 4.6px; */
  align-items: center;
  justify-content: center;
  display: flex;
  color: #8b8b8b;
  border-radius: 4px;
  border: solid 1px #e6e6e6;
  background-color: #fff;
}

/* .right-chat-text {
  word-break: break-all;
  background: #4c78ff;
  border: 2px solid #00a886;
  border-radius: 8px 18px 0px 8px;
  padding: 5px;
  margin-block: 4px;
  float: right;
  width: 260px;
  display: inline-block;
} */

.left-chat-text p {
  color: #8b8b8b;
  font-size: 12px;
}

.left-chat-text span {
  color: #8b8b8b;
  font-size: 9px;
  opacity: 0.5;
}

.right-chat-text span {
  color: #fff;
  font-size: 9px;
  opacity: 0.5;
}

.right-chat-text p {
  color: #fff;
  font-size: 12px;
}

.text-area-badge {
  position: relative;
  border-top: 1px solid #dfdfdf;
}

.text-area-badge span {
  display: inline-block;
  border: 1px solid #ccc;
  color: #999;
  position: absolute;
  top: -10px;
  right: 20px;
  padding: 0 5px;
  font-size: 11px;
  border-radius: 4px;
  background-color: #fff;
}

.attach-icon {
  border: 1px solid #dadada;
}

.attach-icon .q-icon {
  color: #4d4c4c;
  transform: rotate(-40deg);
}

.send-msg-icon {
  transform: rotate(-40deg);
  padding: 0 0 0 6px;
}

::deep .q-textarea .q-field__native {
  padding-top: 0 !important;
}

.attachment-div {
  border: 1px solid #d4d4d4;
  font-size: 10px;
  border-radius: 4px;
  padding: 4px;
  font-weight: 600;
  display: flex;
  color: #7c7c7c;
  justify-content: space-between;
  align-items: center;
}

/* loading dots */

.loading:after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {

  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }

  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }

  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }

  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
}
</style>

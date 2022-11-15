<template>
  <div id="text-messages-section">
    <div v-if="conversation.length">
      <div v-for="(item, key) in conversation" :key="key">
        <div class="date-badge"><span class="date">{{ format(item.date, 'DD-MM-YYYY') }}</span></div>
        <!-- <div class="separator">Next section</div> -->
        <div v-if="item.messages.length">
          <div v-for="message in item.messages" :key="message.id"
            :class="`${item.patient.id !== message.user.id ? 'right-chat-text' : 'left-chat-text'}`">

            <div class="attachment-area" v-if="message.attachment">
              <template v-if="isVideo(message.attachment.extension)">
                <VideoPlayer ref="videoPlayerRef" :src="message.attachment.fileLocation"
                  :isSend="item.patient.id === message.user.id" @stopOtherVideo="handleStopOtherVideo" />
              </template>
              <template v-if="isAudio(message.attachment.extension)">
                <AudioPlayer ref="audioPlayerRef" :src="message.attachment"
                  :isSend="item.patient.id === message.user.id" :downloadAttachment="downloadAttachment"
                  @StopOthers="handleStopOthers" />
                <!-- <audio controls>
                <source :src="message.attachment.fileLocation" type="audio/ogg">
                <source :src="message.attachment.fileLocation" type="audio/mpeg">
                <source :src="message.attachment.fileLocation" type="audio/webm">
                Your browser does not support the audio element.
              </audio> -->
              </template>
              <template v-if="isImage(message.attachment.extension) || isFile(message.attachment.extension)">
                <div class="flex justify-between items-center no-wrap">
                  <div style="height:50px">
                    <img v-if="message.attachment.extension === 'doc'" class="chat-image" :src="docSvg"
                      alt="Attachment">
                    <img v-else-if="message.attachment.extension === 'docx'" class="chat-image" :src="docSvg"
                      alt="Attachment">
                    <img v-else-if="message.attachment.extension === 'pdf'" class="chat-image" :src="pdfSvg"
                      alt="Attachment">
                    <img v-else class="chat-image" :src="message.attachment.fileLocation" alt="ImgErr">
                  </div>
                  <div class="chat-image-text">
                    <div>
                      {{ message.attachment.fileLabel }}</div>
                    <div>{{ message.attachment.fileSize }}</div>
                  </div>
                  <div class="download-icon" @click="downloadAttachment(message.attachment)">
                    <q-icon name="file_download" />
                  </div>
                </div>
              </template>
            </div>
            <p class="q-py-none" v-if="message.message">{{ message.message }}</p>
            <q-btn class="three-dot" icon="more_vert" size="sm">
              <q-menu anchor="bottom right" style="box-shadow: 0 0 3px 0 rgb(0 0 0 / 16%); border: solid 1px #e6e6e6;"
                self="top end" :offset="[0, -10]" class="shadow-24">
                <q-list>
                  <q-item clickable v-ripple class="q-px-sm q-py-xs" style="min-height:10px"
                    @click="deleMessageById(message.id)" v-close-popup>
                    <q-item-section style="font-size: 10px;">Delete</q-item-section>
                    <q-item-section avatar class="q-pa-none">
                      <q-btn flat :loading="message.id === LodingMessageIndex" color="primary" class="q-pa-none">
                        <div v-html="deleteMsgSvg" class="q-pa-none"></div>
                        <template v-slot:loading>
                          <q-spinner size="30px" />
                        </template>
                      </q-btn>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="item.patient.id === message.user.id && lastWhiteMesage(item, message.id)" />
                  <q-item v-if="item.patient.id === message.user.id && lastWhiteMesage(item, message.id)" clickable
                    v-ripple v-close-popup class="q-px-sm q-py-xs" style="min-height:10px"
                    @click="biDirectStore.unreadConversation(message.conversationMetaId)">
                    <q-item-section style="font-size: 10px;">Unread</q-item-section>
                    <q-item-section avatar class="q-pa-none">
                      <div v-html="unreadSvg"></div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <div class="flex justify-between q-pt-sm">
              <span class="text-left">Sent by - {{ message.user.fullName }}</span><span class="text-right">{{
              format(message.createdAt, 'hh:mm A')
              }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-message">
          No Message
        </div>
      </div>

    </div>
    <div v-else class="no-message">
      No Message
    </div>

  </div>
</template>

<script >
import {
  calculateAge, unreadSvg,
  deleteMsgSvg, format, fileExtension, isAudio, isVideo, isFile, isImage, setAttachmentLink
} from '@/utils'
import Pusher from "pusher-js";
import { computed, ref } from '@vue/runtime-core'
import { useBiDirectionalMessage } from '../../stores/biDirectionalMessage'
import { usepatientDemographicsStore } from '../../stores/patientDemographics'
import AudioPlayer from './audioPlayer.vue';
import VideoPlayer from './videoPlayer.vue'
export default {
  setup() {
    const pdfSvg = new URL('../../assets/Images/msg/pdfSvg.svg', import.meta.url).href
    const docSvg = new URL('../../assets/Images/msg/wordSvg.svg', import.meta.url).href
    const biDirectStore = useBiDirectionalMessage()
    const patientDemographics = usepatientDemographicsStore()
    const LodingMessageIndex = ref(null)
    const conversation = computed(() => (biDirectStore.chatBoxWindow.conversation))
    const organizationId = computed(() => (patientDemographics.patientDemographicsData?.organization_id))
    const conversationMetaId = computed(() => (biDirectStore.cmid))
    const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE
    return {
      drIqUrl,
      pdfSvg,
      docSvg,
      LodingMessageIndex,
      unreadSvg,
      deleteMsgSvg,
      biDirectStore,
      conversation,
      calculateAge,
      format,
      fileExtension,
      isAudio,
      isVideo,
      isFile,
      isImage,
      setAttachmentLink,
      conversationMetaId,
      patientDemographics,
      organizationId
    }
  },
  components: {
    AudioPlayer,
    VideoPlayer
  },
  mounted() {
    // console.log('this is conversation detail');
    // this.subscribe()
    // console.log('subscribing to `message-channel`...', {
    //   $pusher: this.$pusher,
    // })

    const channel = this.$pusher.subscribe('message-channel');

    // channel.bind('pusher:subscription_succeeded', () => console.log('subscription succeeded'))
    channel.bind(`message-event.${this.organizationId}`, async (event) => {
      // console.log('my-event', event)
      if (event.message.conversationMetaId === this.conversationMetaId) {
        await this.biDirectStore.getMessagesByCMID(event.message.conversationMetaId)
        this.scrollToBottom()
      }
    })
    this.scrollToBottom()
  },
  unmounted() {
    this.$pusher.unsubscribe('message-channel')
  },
  methods: {
    async deleMessageById(id) {
      this.LodingMessageIndex = id
      await this.biDirectStore.deleteMessage(id)
      this.LodingMessageIndex = null
    },
    lastWhiteMesage(item, messageId) {
      let showMessage = false
      const result = item.messages.filter(newItem => item.patient.id === newItem.user.id);
      if (result[result.length - 1].id === messageId) {
        showMessage = true
      }
      return showMessage
    },
    handleStopOthers(wavesurf) {
      this.$refs.audioPlayerRef.forEach((item) => {
        if (item.wavesurfer != wavesurf) {
          item.wavesurfer.pause()
        }
      })
    },
    handleStopOtherVideo(element) {
      console.log(this.$refs.videoPlayerRef);
      this.$refs.videoPlayerRef.forEach((item) => {
        console.log(item.setupState);
        if (item.element != element) {
          // element.pause()
          console.log(element);
          console.log('not matched');
        } else {
          console.log('matched');
        }
      })
      console.log(element);
    },
    scrollToBottom() {
      const element = document.getElementById('text-messages-section');
      element.scrollTop = element.scrollHeight
      // element.scrollIntoView({behavior: "smooth", block: "end"})
      // console.log(element.scrollHeight);
      // console.log(element.clientHeight);
    },
    downloadAttachment(source) {
      const fileName = source.fileLocation.split("/").pop();
      let newSource = `${this.drIqUrl}secure/download?keyName=${fileName}`;
      console.log(newSource);
      var el = document.createElement("a");
      el.setAttribute("download", source.fileLabel);
      el.setAttribute("href", newSource);
      document.body.appendChild(el);
      el.click();
      el.remove();
    }
  }
}
</script>

<style  scoped>
.no-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.left-chat-text .video-radius {
  border-radius: 18px 8px 0px 0px;
  width: 235px;
}

.left-chat-text .three-dot {
  color: #5f5f61;
  position: absolute;
  right: -25px;
  top: 0;
  padding: 0;
}

.right-chat-text .three-dot {
  color: #5f5f61;
  position: absolute;
  left: -25px;
  top: 0;
  padding: 0;
}



::v-deep .q-item__section--avatar {
  min-width: 20px;
  height: 22px;
  overflow: hidden;
}

.right-chat-text .video-radius {
  border-radius: 8px 14px 0px 0px;
  width: 235px;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 11px;

}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 3px double #dfdfdf;
}

.separator::before {
  margin-right: .5em;
}

.separator::after {
  margin-left: .5em;
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

#text-messages-section {
  height: 300px;
  overflow: auto;
  padding-inline: 10px;
  scroll-behavior: smooth;

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
  /* position: relative; */
  position: sticky;
  top: 0px;
  /* border-top: 1px solid #dfdfdf; */
  margin-top: 15px;
  z-index: 5;

}

.date-badge span {
  display: inline-block;
  border: 1px solid #ccc;
  color: #999;
  position: relative;
  padding: 0 5px;
  /* top: -12px; */
  left: 40%;
  border-radius: 4px;
  font-size: 11px;
  background-color: #fff;
}

.left-chat-text {
  word-break: break-all;
  background: #f4f4f4;
  border: 1px solid #e6e6e6;
  border-radius: 14px 8px 8px 0px;
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

.left-chat-text .chat-image-text {
  flex: 1;
  margin-inline: 10px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #5f5f61;
}

.right-chat-text .chat-image-text {
  flex: 1;
  margin-inline: 10px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}

.left-chat-text .download-icon {
  width: 30px;
  height: 32px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #8b8b8b;
  border-radius: 4px;
  border: solid 1px #e6e6e6;
  background-color: #fff;
}

.right-chat-text .download-icon {
  width: 30px;
  height: 32px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  display: flex;
  color: #fff;
  border-radius: 4px;
  border: solid 1px #fff;
}

.right-chat-text {
  word-break: break-all;
  background: #4c78ff;
  border: 2px solid #00a886;
  border-radius: 8px 18px 0px 8px;
  padding: 5px;
  margin-block: 4px;
  width: 260px;
  margin-left: auto;
  position: relative;
}

.left-chat-text p {
  color: #000000;
  font-size: 12px;
  margin: 0;
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
  margin: 0;
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
</style>
// stores/counter.js
import { defineStore } from "pinia";
import {
  biDirectionalPrivateUrl,
  biDirectionalPublicUrl,
} from "../axiosIntegration";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
export const useBiDirectionalMessage = defineStore("biDirectionalMessage", {
  state: () => {
    return {
      encryptedId: params.encrypted_id ? params.encrypted_id : "",
      conditionId: params.condition_id ? params.condition_id : "",
      archive: params.archive ? params.archive : "",
      messages: [],
      cmid:null,
       chatBoxWindow: {
        show: false,
        minimizeChat:false,
        conversation: [],
      },
    };
  },
  getters: {},

  actions: {
    async openchatBoxWindow() {
      let token = localStorage.getItem("bi-directional-token");
      if (!token) {
        await this.bdmLogin();
      }
       this.chatBoxWindow.conversation = [];
      this.cmid=null
       this.chatBoxWindow.show = true;
    },
    async getMessagesByCMID(id) {
      try {
        let token = localStorage.getItem("bi-directional-token");
        if (!token) {
          await this.bdmLogin();
        }
        try {
          const response = await biDirectionalPrivateUrl.post("messages", {
            conversationId: id,
          });
          this.chatBoxWindow.conversation = response.data.data;
           this.cmid=id
          this.chatBoxWindow.minimizeChat=false
          this.chatBoxWindow.show=true
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async sendMessages(payload){
         try {
          const response = await biDirectionalPrivateUrl.post('messages/send',payload)
          if(response){
            this.getMessagesByCMID(this.cmid)
          }
         } catch (error) {
          console.log(error);
         }
    },
    async deleteMessage(messageId){
         try {
          const response = await biDirectionalPrivateUrl.post('messages/delete',{messageId})
          if(response){
            this.getMessagesByCMID(this.cmid)
          }
         } catch (error) {
          console.log(error);
         }
    },
    async unreadConversation(cmid){ 
         try {
          const response = await biDirectionalPrivateUrl.post('conversations/unread',{conversationId:cmid})
          if(response){
            // this.getMessagesByCMID(this.cmid)
            // this.messagesTabsList(this.conditionId)
            

          }
         } catch (error) {
          console.log(error);
         }
    },
    async bdmLogin() {
      try {
        const response = await biDirectionalPublicUrl.post(
          `login?encrypted_id=${this.encryptedId}`
        );
        localStorage.setItem(
          "bi-directional-token",
          response.data.data.access_token
        );
      } catch (error) {
        console.log(error);
      }
    },
    async inisiateConversation(payload) {
      try {
        const response = await biDirectionalPrivateUrl.post(
          "conversations/initiate",
          payload
        ); 
        this.getMessagesByCMID(response.data.data.latestMessage.conversationMetaId)
        this.messagesTabsList(this.conditionId)
      } catch (error) {
        console.log(error);
      }
    },
    async messagesTabsList(id) {
      try {
        const response = await biDirectionalPrivateUrl.get(
          `conversations/list/${id}`
        );
        this.messages = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

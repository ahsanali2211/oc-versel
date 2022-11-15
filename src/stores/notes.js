// stores/counter.js
import { defineStore } from 'pinia';
import { useCookies } from 'vue3-cookies';
import { publicUrl ,gpConnectPublicUrl, gpConnectPrivateUrl, privateUrl } from '../axiosIntegration';
 import axios from 'axios';
const urlSearchParams = new URLSearchParams(window.location.search);
const { cookies } = useCookies();
const params = Object.fromEntries(urlSearchParams.entries());
export const useNotesStore = defineStore('notes', {
  state: () => {
    return {
      notes:null,
      archive:params.archive
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getNotesList(condition_id) {
     const response =  await privateUrl.get(`/get-note-list/${condition_id}?archived=${params.archive}&module_type=condition`)
      this.notes = response.data.notes;
     },
    async addNote(note,id) {
      
      let data={
        condition_id:id,
        note:note,
        'module_type': 'condition',
        'is_urgent': false,
        'file_in_record': false
      }
       await privateUrl.post(`/add-note?archived=${params.archive}`,data)
     },
     async deleteNote(noteID){
       await privateUrl.get(`/delete-note/${noteID}?archived=${params.archive}`)
      },
     async updateNote(payload){
       return privateUrl.post(`/edit-note?archived=${params.archive}`,payload)
     },
      updateFileInRecord(payload) {
      return privateUrl.post(`/update-file-in-record?archived=${params.archive}`,payload)
     },
      updateMarkAsUrgent(payload) {
       return privateUrl.post(`/update-mark-as-urgent?archived=${params.archive}`,payload)
     },
  },
})

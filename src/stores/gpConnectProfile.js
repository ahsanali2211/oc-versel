// stores/counter.js
import { defineStore } from 'pinia';
import { useCookies } from 'vue3-cookies';
import { publicUrl, gpConnectPublicUrl, gpConnectPrivateUrl } from '../axiosIntegration';
import axios from 'axios';
const urlSearchParams = new URLSearchParams(window.location.search);
const { cookies } = useCookies();
const params = Object.fromEntries(urlSearchParams.entries());

export const useGPConnectProfileStore = defineStore('gpConnectProfile', {
  state: () => {
    return {
      gpConnectLoginData: null,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async changeStatus(status) {
      this.status = status;
    },
    async gpConnectLogin() {
      let email = localStorage.getItem('email')
      const response = await gpConnectPublicUrl.post('v3/appointment/auth/login', { email })
      localStorage.setItem('gp-connect-token', response.data.data.user.token)
      this.gpConnectLoginData = response.data.data.user;
    },
    async getGPConnectData(data) {
      const gpToken = localStorage.getItem('gp-connect-token');
      if (!gpToken) {
        await this.gpConnectLogin();
      }
      return gpConnectPrivateUrl.post('v1/integration/GPConnect/getPatientHtml', data)
    },

    async connectPDS(data) {
       return await gpConnectPrivateUrl.post('v4/update/PDS/details', data);
    }

  },
})

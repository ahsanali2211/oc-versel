import { defineStore } from 'pinia'
import { privateUrl } from '../axiosIntegration';
const urlSearchParams = new URLSearchParams(window.location.search);
const pathname = window.location.pathname.split('/');
const params = Object.fromEntries(urlSearchParams.entries());
const encrypted_id = pathname[pathname.length - 1];
export const usepatientDemographicsStore = defineStore('patientDemographics', {
  state: () => {
    return {
      conditionId: params.condition_id ? params.condition_id : '',
      encryptedId: encrypted_id,
      archive: params.archive ? params.archive : '',
      patientDemographicsData: null,
      patient_id: null,
      pathways: null
    }
  },
  actions: {
    async changeStatus(status) {
      this.status = status;
    },
    async getpathways(id) {
      const response = await privateUrl.get(`get-pathways/${id}`);
      if (response.data.code === 200) {
        this.pathways = response.data.pathways;
      }
    },
    async getPatientDemographicsData(condition_id) {
      const response = await privateUrl.get(`get-patient-demog/${condition_id}?archived=${params.archive}`)
      if (response.data.code === 200) {
        this.patientDemographicsData = response.data.user;
        this.getpathways(response.data.user.id);
      }
    },
    async setPathways(data){
      const newdata = {condition_id : this.conditionId,...data};
      return privateUrl.post('request-another-oc', data);
    }
  },
})

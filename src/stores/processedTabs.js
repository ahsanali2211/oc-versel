// stores/counter.js
import { defineStore } from 'pinia'
import { privateUrl } from '../axiosIntegration';
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
 export const useProcessedTabsStore = defineStore('processedtabs', {
  state: () => {
    return {
      conditionId: params.condition_id ? params.condition_id : '',
      archive: params.archive ? params.archive : '',
      ocReview:null,
      activityHistory:[],
      calling:null,
      showSkelton:true,
      messages:[
        {
          "cmid": 1676,
          "id": 7591,
          "created_date": "2022-08-22 06:18:35",
          "message": "test msg234",
          "first_name": "waqar",
          "last_name": "Ali",
          "practice_role": "Manager",
          "role": "ROLE_PRACTICE_ADMIN"
      },
      ]
    }
  },
  actions: {
    async getOCReview(condition_id) {
      const response = await privateUrl.get(`get-oc-review/${condition_id}?archived=${params.archive}`);
      this.ocReview = response.data['oc-review']
      this.showSkelton = false
     },
     async getActivityHistory(condition_id) {
      const response = await privateUrl.get(`get-activity-history/${condition_id}?archived=${params.archive}`);
      this.activityHistory = response.data['activity-history']
     },

  },
})

// stores/counter.js
import { defineStore } from "pinia";
import { privateUrl } from "../axiosIntegration";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
export const useOnlineConsultationStore = defineStore("onlineConsultation", {
  state: () => {
    return {
      encryptedId: params.encrypted_id ? params.encrypted_id : "",
      conditionId: params.condition_id ? params.condition_id : "",
      archive: params.archive ? params.archive : "",
      pre_requested_oc: null,
      prev_requested_oc_count: null,
      prev_requested_oc_previous: null,
      offset: 0,
      ocSummary: null,
      ocSummaryData: {},
      rolesList: [],
      showConfigration: {
        "oc-appointment-integration": 'false',
        "oc-calling-integration": 'false',
        "oc-bdm-integration": 'false',
        invalid_key: [],
      },
      showOptSkelton: true,
      notificationAlert: {
        show: false,
        text: "No message to display",
        type: "success",
      },
    };
  },

  actions: {
    async configurationRecord() {
      try {
        const response = await privateUrl.post("configuration-record", {
          configuration_key: [
            "oc-appointment-integration",
            "oc-calling-integration",
            "oc-bdm-integration",
          ],
        });
        this.showConfigration = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setNotificationAlert(payload) {
      this.notificationAlert = payload;
      setTimeout(() => {
        this.notificationAlert.show = false;
      }, 5000);
    },
    async changeStatus(status) {
      this.ocSummaryData.status = status;
    },
    async updateConditionId(condId) {
      this.conditionId = condId;
    },
    processOC(outcome, message) {
      let data = {
        reason: message.text,
        condition_id: this.conditionId,
        key: message.key,
      };
      if (outcome) {
        data.outcome = outcome;
      }
      return privateUrl.post(`process-oc?archived=${params.archive}`, data);
    },
    async getPreviousOC(action) {
      let condition_id = this.conditionId;
      if (action) {
        if (action == "prev-case") {
          this.offset = this.prev_requested_oc_previous;
        } else {
          this.offset = 0;
          condition_id = action;
        }
      }
      const response = await privateUrl.get(
        `get-previous-oc/${condition_id}?offset=${this.offset}&archived=${params.archive}`
      );
      this.offset = response.data.offset;
      this.pre_requested_oc = response.data.conditions;
      response.data.count &&
        (this.prev_requested_oc_count = response.data.count);
      this.prev_requested_oc_previous = response.data.previous;
    },

    async getOCSummary(condition_id = this.conditionId) {
      const response = await privateUrl.get(
        `get-oc-summary/${condition_id}?archived=${params.archive}`
      );
      this.ocSummary = response.data.condition[0].summary;
      this.ocSummaryData = response.data.condition[0];
    },

    async getRoleList(condition_id = this.conditionId) {
      try {
        const response = await privateUrl.get(
          `role-list/${condition_id}?archived=${params.archive}`
        );
        this.rolesList = response.data.roles;
        this.showOptSkelton = false;
      } catch (err) {
        this.showOptSkelton = false;
      }
    },
    async assingNewRole(assign) {
      const data = {
        condition_id: this.conditionId,
        assign,
      };
      return privateUrl.post(`assign-role?archived=${params.archive}`, data);
    },
  },
});

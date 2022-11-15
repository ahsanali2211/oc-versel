<script setup>
import Loader from "./views/Loader.vue";
import PageNotFound from "./views/404.vue";
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import OnlineConsultation from "./views/OnlineConsultation.vue";
import { reactive, ref } from "vue";
import { useOnlineConsultationStore } from "./stores/onlineConsultation";
import { useGPConnectProfileStore } from "./stores/gpConnectProfile";
import { usepatientDemographicsStore } from "./stores/patientDemographics";
import { useBiDirectionalMessage } from "./stores/biDirectionalMessage"; 
import { useProcessedTabsStore } from "./stores/processedTabs";
import { useNotesStore } from "./stores/notes";
import { publicUrl } from "./axiosIntegration";
import { provide } from 'vue'
// import firebaseMessaging from './firebase'
// provide('messaging', firebaseMessaging)
const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;
const sessionTimeOut = import.meta.env.VITE_LOGOUT_SESSION_TIMEOUT
const userInfo = reactive({
  logged_in_as: "",
  profile_image: "",
});
const OC = useOnlineConsultationStore();
const biDirStore = useBiDirectionalMessage();
const processedTabs = useProcessedTabsStore();
const notesStore = useNotesStore();
const { getOCReview, getActivityHistory } = processedTabs;
const { messagesTabsList } = biDirStore;
const { getNotesList } = notesStore;
const { getPreviousOC, getOCSummary, getRoleList,configurationRecord } = OC;
const gpConnectProfile = useGPConnectProfileStore();
const { getPatientDemographicsData } = usepatientDemographicsStore();
const component = reactive({
  name: OnlineConsultation,
});
const callAllAPIs = async () => {
  await Promise.any([
    configurationRecord(),
    getOCSummary(),
    getPatientDemographicsData(OC.conditionId),
    getPreviousOC(),
    getOCReview(OC.conditionId),
    getNotesList(OC.conditionId),
    getRoleList(),
    getActivityHistory(OC.conditionId),
    messagesTabsList(OC.conditionId),
    
  ])
    .then(() => {
      component.name = OnlineConsultation;
    })
    .catch(() => {
      component.name = OnlineConsultation;
    });
};

const UserLogin = async () => {
  if (!OC.encryptedId) {
     window.open(`${drIqUrl}secure/online-cons/Online-consultations?archive=${OC.archive}&condition_id=${OC.conditionId}`, '_self')
    return;
  } else if (!OC.conditionId) {
    component.name = PageNotFound;
  } else {
    try {
      const response = await publicUrl.post(
        `login?encrypted_id=${OC.encryptedId}`
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      userInfo.logged_in_as = response.data.logged_in_as;
      userInfo.profile_image = response.data.profile_image;
      // =============this api is use to Login for gps connect =================//
      gpConnectProfile.gpConnectLogin(response.data.email);
        //=======================//
        let params = new URLSearchParams(window.location.search);
        params.delete("encrypted_id");
          // window.history.pushState('object', document.title, `?${params}`);
      if (response.data.token) {
        callAllAPIs(); 
      }
    } catch (e) {
      component.name = PageNotFound;
    }
  }
};
UserLogin();
         
 
</script>

<template>
  <q-layout>
    <Header :userInfo="userInfo" />
    <q-page-container style="padding-bottom:36px !important">
      <q-page>
        <component :is="component.name" />
      </q-page>
    </q-page-container>
    <Footer  style="position: static" />
  </q-layout>
</template>

<style>
.q-btn:before {
  box-shadow: none !important;
}
</style>

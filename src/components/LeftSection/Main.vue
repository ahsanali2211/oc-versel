<template>
  <!-- this is main LeftSction where we import and use all component will shown in left section -->
    <!-- this left section contain  4 main section  -->
  <div class="main">
    <!-- the  ReqMediCertificate show name of OC, icon ,submitted ate and process date od online consultation -->
    <ReqMediCertificate />
    <q-list class="tabs-list">
      <!-- PatientDemographicsComponent component show patient detail -->
      <PatientDemographicsComponent group="ocGroup" />

      <q-skeleton type="QToolbar" class="q-mt-md" v-if="!pre_oc" />
       <!-- pre requested online consultion are those consultaion which patient already submitted  -->
      <PrevRequestedOC group="ocGroup" v-else />

      <q-skeleton type="QToolbar" class="q-mt-md" v-if="!patientDemographicsData" />
     <!-- this is patient profile from Gp connect   -->
      <ViewPatientProfile group="ocGroup" v-else />
    </q-list>
  </div>
</template>
    
<script setup>
import ReqMediCertificate from "./ReqMediCertificate.vue";
import PatientDemographicsComponent from "./PatientDemographics.vue";
import PrevRequestedOC from "./PrevRequestedOC.vue";
import ViewPatientProfile from "./ViewPatientProfile.vue";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { computed } from "@vue/runtime-core";

const OC = useOnlineConsultationStore();
const patientDemographics = usepatientDemographicsStore();
const pre_oc = computed(() => OC.pre_requested_oc ?? null);
const patientDemographicsData = computed(
  () => patientDemographics.patientDemographicsData
);
</script>

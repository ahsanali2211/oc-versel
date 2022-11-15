<template>
  <!-- =========================== Alert Section ============================= -->
  <AutoLogoutVue/>
  <ProcessSuccessAlert />

  <BannerMessage />

  <!-- ===========================End of Alert Section ============================= -->
  <!-- =========================== Start of Consultation Summary Section ============================= -->
  <ConsultationSummary />
  <!-- ===========================End of Consultation Summary Section ============================= -->
  <!-- ===========================Satrt of operational tip  Section ============================= -->
  <OperationalTip />
  <!-- =========================== End  of operational tip  Section ============================= -->
  <!-- =========================== Start of Message Section ============================= -->
  <Message v-if="state == 'Pending'" />

  <q-separator class="my-ten" />
  <!-- =========================== End of Message Section ============================= -->
  <!-- =========================== Start of Process Section ============================= -->
  <OcReview />
  <!-- =========================== End of Process Section ============================= -->

  <!-- =========================== Start of  OC Review Section tabs ================================ -->
</template>
    
<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import BannerMessage from "../MiddleSection/BannerMessage.vue";
import ProcessSuccessAlert from "./ProcessSuccessAlert.vue";
import ConsultationSummary from "./ConsultationSummary.vue";
import OperationalTip from "./operationalTip.vue";
import Message from "./Message.vue";
import OcReview from "./OcReview.vue";
import AutoLogoutVue from "./AutoLogout.vue";


const OCstore = useOnlineConsultationStore();
const state = computed(() => OCstore.ocSummaryData.status);
</script>
    
<style scoped>
.q-tab-panels {
  background: transparent !important;
}

.or-review .q-btn:before {
  box-shadow: none !important;
  border: 1px solid grey;
}

.alert-chip-radius {
  border-radius: 25px;
}
</style>

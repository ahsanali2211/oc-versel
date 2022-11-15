<template>
  <div class="row q-col-gutter-xs items-stretch" style="margin-top:6px">
    <div class="col content-stretch pointer-cursor" v-if="showCallingTab === 'true'">
      <LaunchCall />
    </div>
    <div class="col pointer-cursor" @click="openchatBoxWindow" v-if="showMessageTab === 'true'">
      <LaunchMessages />
    </div>
    <div class="col pointer-cursor" v-if="showAppointmentTab === 'true'">
      <BookAppointment />
    </div>
  </div>

</template>
    
<script setup >
import LaunchCall from "./LaunchCall.vue";
import LaunchMessages from "./LaunchMessages.vue";
import BookAppointment from "./BookAppointment.vue";
import { useBiDirectionalMessage } from '../../stores/biDirectionalMessage'
import { useOnlineConsultationStore } from '../../stores/onlineConsultation'
import { computed } from "@vue/runtime-core";
const { openchatBoxWindow } = useBiDirectionalMessage()
const OCStore = useOnlineConsultationStore()
const showCallingTab = computed(() => OCStore.showConfigration['oc-calling-integration'])
const showMessageTab = computed(() => OCStore.showConfigration['oc-bdm-integration'])
const showAppointmentTab = computed(() => OCStore.showConfigration['oc-appointment-integration'])
</script>
    
<style>

</style>
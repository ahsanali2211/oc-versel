<template>
  <div
    class="message-content mt-ten"
    v-if="message_content"
    v-html="message_content"
  ></div>
</template>

<script setup>
import { computed, watchEffect } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";

const store = useOnlineConsultationStore();

const message_content = computed(() => store.ocSummaryData.message_content);

 
</script>

<style scoped>
.alert-danger {
  border: 1px solid #ffeeba;
  color: #856404;
  background-color: #fff3cd;
}
.text-caption {
  font-size: 14px;
}
</style>
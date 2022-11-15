<template>
  <div v-if="summaryData">
    <div v-if="summaryData.is_complete && !summaryData.banner_message">
      <q-banner
        v-if="showDanger"
        inline-actions
        rounded
        class="mb-ten alert alert-danger full-width custom-border-radius"
      >
        <div class="text-caption">
          No clinician action needed - Code and file in patient's record only
        </div>
        <template v-slot:action>
          <q-icon
            size="xs"
            name="close"
            class="cursor-pointer"
            @click="showDanger = false"
          />
        </template>
      </q-banner>
    </div>
    <div
      class="banner-message"
      v-else-if="summaryData.banner_message"
     >
     <q-banner
        inline-actions
        v-if="bannerAlert"
        roundedalert
        class="mb-ten alert alert-danger full-width custom-border-radius"
      >
        <div class="text-caption">
          {{summaryData.banner_message}}
        </div>
        <template v-slot:action>
          <q-icon
            size="xs"
            name="close"
            class="cursor-pointer"
            @click="bannerAlert = false"
          />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";

const store = useOnlineConsultationStore();
const summaryData = computed(() => store.ocSummaryData);

const showDanger = ref(false);
const bannerAlert = ref(true);

const closeAlert = () => {
  showDanger.value = false;
};

// Checking that is complete key and banner_message
watch(summaryData, () => {
  if (
    (summaryData.value.is_complete && !summaryData.value.banner_message) ||
    summaryData.value.banner_message
  ) {
     showDanger.value = true;
  } else {
    showDanger.value = false;
  }
});
</script>

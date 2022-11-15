<template>
  <div class="row" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">
    <div class="col-12">
      <div
        class="flex justify-between bg-white q-px-lg q-py-xs text-weight-bold"
      >
      <!-- this is  breadcrumbs show in between header and other component -->
        <q-breadcrumbs gutter="xs" active-color="red" style="font-size: 13px">
          <q-breadcrumbs-el
            class="text-primary"
            label="Home"
            :href="`${drIqUrl}secure`"
          />
          <q-breadcrumbs-el
            class="text-primary"
            label="Online Consultation"
            :href="`${drIqUrl}secure/online-cons/Online-consultations`"
          />
          <q-breadcrumbs-el
            label="Details"
            active-class="red"
            class="text-black"
          />
        </q-breadcrumbs>
        <!-- end of breadcrumbs -->
        <!-- this bottom div is use to show origin lable in top right just stright to breadcrumbs -->
        <div class="text-grey" style="font-size: 13px">
          <span
            >Origin:
            {{
              ocSummaryData?.origin_label ? ocSummaryData?.origin_label : "N/A"
            }}</span
          >
        </div>
        <!-- --------------End of div---------------- -->
      </div>
    </div>
  </div>
   
  <div class="row q-mx-lg q-mt-md q-col-gutter-sm">
    <div class="col-md-3 col-sm-12 col-xs-12 q-pl-none">
      <LeftSection />
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12">
      <MiddleSection />
    </div>
    <div class="col-md-3 col-sm-12 col-xs-12">
      <RightSection />
    </div>

    <!-- Chatbox which is fixed at the bottom-right of the page -->
    <ChatBox />

  
  </div>
</template>
    
<script setup >
import { ref } from "@vue/reactivity";
import LeftSection from "../components/LeftSection/Main.vue";
import MiddleSection from "../components/MiddleSection/TheMiddleSection.vue";
import RightSection from "../components/RightSection/TheRightSection.vue";
import ChatBox from "../components/chatBox/chatBox.vue";
import { computed } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../stores/onlineConsultation";

const store = useOnlineConsultationStore();
const ocSummaryData = computed(() => store.ocSummaryData);
const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;

 
 
 </script>
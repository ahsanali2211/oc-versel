<template>
  <!-- this process component is uesd inside Message component  -->
  <q-card class="my-ten" flat bordered>
    <q-card-section class="q-py-sm">
      <div class="flex justify-between items-center">
        <div class="text-subtitle2">
          <strong>Do you want to {{summaryData.is_complete ? "complete" : "process"}} this online consultation?</strong>
        </div>
        <div>
          <q-btn
            color="primary"
            :loading="completedBtnLoading"
            class="text-capitalize custom-border-radius"
            @click="
              !summaryData.is_complete
                ? (processDialog = true)
                : handleProcess()
            "
          >
            <span>
              <q-icon
                name="manage_accounts"
                v-if="!summaryData.is_complete"
                left
              />
              {{ summaryData.is_complete ? "Complete" : "Process" }}
              <!-- <q-tooltip
                v-if="!message.text.length"
                class="bg-black text-body2"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Please write message before submit process
              </q-tooltip> -->
            </span>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <!-- =========================== Process Model that open in Process Btn ============================= -->
  <q-dialog v-model="processDialog">
    <q-card class="my-card">
      <q-card-section class="flex justify-between q-pa-md q-pl-lg q-pt-lg">
        <div class="text-primary text-h6 text-weight-bold">
          What was the outcome of this OC?
        </div>
        <div>
          <q-icon
            name="close"
            color="grey-5"
            size="sm"
            @click="processDialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-px-lg q-pt-none">
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div>
                  <strong>Completed on DR.iQ</strong>
                </div>
                <div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      val="Closed in OC"
                      label="Closed in OC"
                    />
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      val="Created BDM and closed consult"
                      label="Created BDM And closed Consult"
                    />
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      val="Asked to use another OC"
                      label="Asked to use another OC"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div>
                  <strong>Completed by TC</strong>
                </div>

                <div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="Quick TC"
                      val="Quick TC"
                      color="primary"
                    />
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="Formal TC with Doctor"
                      val="Formal TC with Doctor"
                      color="primary"
                    />
                  </div>
                  <div class="flex items-start q-py-sm">
                    <div tag="label">
                      <q-radio
                        v-model="outcome"
                        size="xs"
                        val="Formal TC with AHP"
                        color="primary"
                      />
                    </div>
                    <div
                      @click="outcome = 'Formal TC with AHP'"
                      style="cursor: pointer"
                    >
                      <div>Formal Tc with AHP</div>
                      <div
                        class="
                          q-item__label q-item__label--caption
                          text-caption
                        "
                      >
                        (Pharamacist / physician Associate / ANP)
                      </div>
                    </div>
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="Formal TC with Physio"
                      val="Formal TC with Physio"
                      color="primary"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div>
                  <strong>Completed by F2F</strong>
                </div>
                <div class="">
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="F2F Doctor"
                      val="F2F Doctor"
                      color="primary"
                    />
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="F2F Nurse"
                      val="F2F Nurse"
                      color="primary"
                    />
                  </div>
                  <div class="flex items-start q-py-sm">
                    <div>
                      <q-radio
                        v-model="outcome"
                        size="xs"
                        val="F2F AHP"
                        color="primary"
                      />
                    </div>
                    <div @click="outcome = 'F2F AHP'" style="cursor: pointer">
                      <div>F2F AHP</div>
                      <div
                        class="
                          q-item__label q-item__label--caption
                          text-caption
                        "
                      >
                        (Pharamacist / physician Associate / ANP)
                      </div>
                    </div>
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="F2F HCA"
                      val="F2F HCA"
                      color="primary"
                    />
                  </div>
                  <div class="q-py-sm">
                    <q-radio
                      v-model="outcome"
                      size="xs"
                      label="F2F physio"
                      val="F2F physio"
                      color="primary"
                    />
                  </div>
                </div>
                <div></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="q-pb-lg q-mb-md">
        <q-btn
          color="primary"
          size="lg"
          style="padding-inline:40px"
          :loading="processLoading"
          class="custom-border-radius  submit-btn text-lowercase"
          @click="handleProcess"
        >
          <span><span class="text-capitalize">Submit</span> & process online consultation </span>
          <template v-slot:loading>
            <q-spinner-facebook />
            Loading...
          </template></q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- =========================== End of Process Model that open in Process Btn ============================= -->
</template>
    
<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useProcessedTabsStore } from "../../stores/processedTabs";
const processedTabs = useProcessedTabsStore();
const OCstore = useOnlineConsultationStore();
const { getOCReview, getActivityHistory } = processedTabs;
const { processOC, setNotificationAlert, getOCSummary } = OCstore;
const summaryData = computed(() => OCstore.ocSummaryData);
const props = defineProps({
  message: Object,
});
const processDialog = ref(false);
const completedBtnLoading = ref(false);
const processLoading = ref(false);
const outcome = ref("Closed in OC");
const handleProcess = () => {
  processLoading.value = true;
  if (summaryData.value.is_complete) {
    completedBtnLoading.value = true;
  }
  processOC(!summaryData.value.is_complete && outcome.value, props.message)
    .then((res) => {
       getOCReview(OCstore.conditionId);
      getActivityHistory(OCstore.conditionId);
      getOCSummary();

      setNotificationAlert({
        text: res.data.message,
        type: "sussess",
        show: true,
      });
    })
    .catch((err) => {
      setNotificationAlert({
        text: err.response.data.message,
        type: "error",
        show: true,
      });
    })
    .finally(() => {
      processDialog.value = false;
      processLoading.value = false;
      completedBtnLoading.value = false;
    });
};
</script>
    
<style>
</style>
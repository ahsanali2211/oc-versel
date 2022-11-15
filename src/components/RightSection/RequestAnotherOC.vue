<template>
  <q-expansion-item
    :group="props.group"
    :disable="state !== 'Pending'"
    :title="state !== 'Pending' ? 'You can request another OCs in case of Pending OC Only' :''"
    expand-icon-class="hidden"
    v-model="requestAnotherExpansion"
    :header-class="`text-primary bg-white custom-border-another-oc ${
      requestAnotherExpansion
        ? 'custom-top-border-radius'
        : 'custom-border-radius'
    }`"
    class="perentClass"
  >
    <!-- height: 58px; width: 49px -->
    <template v-slot:header>
      <q-item-section avatar style="min-width: auto">
        <div style="height: 28px; width: 25px">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 58"
          >
            <rect
              id="Rectangle_577"
              data-name="Rectangle 577"
              class="cls-1"
              width="49"
              height="58"
              rx="5.84"
            />
            <g id="Shape-Copy">
              <path
                class="cls-2"
                d="M39.81,45.83a2.18,2.18,0,0,1-2.07-1.47l-5-14.23L31.3,34.29a2.2,2.2,0,0,1-2.07,1.47h-4.7a2.2,2.2,0,0,1,0-4.39h3.15l3-8.6a2.19,2.19,0,0,1,4.14,0l5,14.23,1.45-4.16a2.2,2.2,0,0,1,2.07-1.47H48a2.2,2.2,0,0,1,0,4.39H44.88l-3,8.6A2.18,2.18,0,0,1,39.81,45.83Z"
                transform="translate(-11.38 -4.5)"
              />
            </g>
          </svg>
        </div>
      </q-item-section>
      <q-item-section class="">
        <q-item-label
          class="custum-yellow-color text-subtitle2 text-weight-bold"
          >Request another Online Consultation</q-item-label
        >
      </q-item-section>
      <q-item-section side class=""
        ><q-avatar size="lg" text-color="white" rounded>
          <!-- <q-icon name="north_east" color="yellow-8" :class="requestAnotherExpansion && 'animate-icon'"/> -->
          <q-icon
            name="arrow_forward"
            :class="requestAnotherExpansion && 'animate-icon'"
            style="color: #ffa100"
          />
        </q-avatar>
      </q-item-section>
    </template>

    <q-card bordered style="border-top: none">
      <q-card-section class="q-pa-none">
        
          <q-list class="q-pa-md pathways-height" v-if="pathways">
            <q-item
              v-for="(oc, index) in pathways"
              :key="index"
              rounded
              @click="handleSelectedOc(oc)"
              :active="checkedObject(oc)"
              active-class="selected-oc"
              style="height: 58px !important"
              clickable
              class="
                q-mb-sm q-pa-none
                subItem
                custom-btn-border custom-border-radius
                oc-options
              "
            >
              <q-item-section
                avatar
                class="leftAcordianIcon custom-border-radius-on-icon-box"
              >
                <img
                  :src="
                    oc.icon ??
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'
                  "
                  style="max-width: 30px; height: 30px"
                  fit="contain"
                  alt="NoImg"
                />
                 
              </q-item-section>
              <q-item-section class="head-padding">
                <q-item-label class="text-weight-bold ellipsis-2-lines">{{
                  oc.label
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list v-else class="q-mt-md">
            <q-item v-for="n in 3" :key="n">
              <q-skeleton width="100%" type="QToolbar" />
            </q-item>
          </q-list>
      </q-card-section>
      <q-card-actions align="center" class="mb-ten q-pt-xs">
        <q-btn
          color="primary"
          :disable="selectedOc.length == 0"
          size="12px"
          class="
            text-capitalize
            custom-border-radius custom-btn-padding
            q-mt-sm
          "
          label="Request"
          @click="ocRequestDialog = true"
        />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
  <!-- =========================== Requested another Online consultation (OC)  Expentional Panel ================================ -->

  <!-- =========================== this is conformation dialog of requested Online Consultation ================================ -->
  <q-dialog v-model="ocRequestDialog">
    <q-card bordered class="my-card q-pa-md q-pb-lg">
      <q-card-section class="q-pb-none">
        <div class="text-h5 text-weight-bold text-center">
          You have requested for following OCs
        </div>
      </q-card-section>
      <q-card-section class="req-oc">
       
        <q-list class="q-pt-xs pathways-height-modal">
          <q-item
            v-for="(oc, index) in selectedOc"
            :key="index"
            rounded
            style="height: 58px !important"
            class="
              q-mb-sm q-mr-sm q-pa-none
              subItem
              custom-btn-border custom-border-radius
              oc-options
            "
          >
            <q-item-section
              avatar
              class="leftAcordianIcon custom-border-radius-on-icon-box"
            >
              <img
                :src="oc.icon"
                style="max-width: 30px; height: 30px"
                fit="contain"
                alt="image"
              />
            
            </q-item-section>
            <q-item-section class="q-pa-md">
              <q-item-label class="text-weight-bold ellipsis-2-lines">{{
                oc.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
       
      </q-card-section>
      <q-card-section class="text-center text-h6 text-grey">
        Are you sure you want to request this?
      </q-card-section>
      <q-card-actions align="center" class="q-mb-sm">
        <q-btn
          color="primary"
          :loading="btnLoading"
          size="md"
          class="
            text-capitalize
            custom-border-radius
            no-shadow
            vertical-pad
            custom-btn-padding
          "
          label="Yes"
          @click="submitPathways()"
        >
        </q-btn>
        <q-btn
          size="md"
          class="
            text-capitalize
            custom-border-radius
            no-shadow
            vertical-pad
            btn-grey-border
            custom-btn-padding
          "
          label="No"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
    
<script setup  >
import { computed, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useProcessedTabsStore } from "../../stores/processedTabs";
const ProcessedTabsStore = useProcessedTabsStore();
const props = defineProps(["group"]);
const $q = useQuasar();
const model = ref(null);
const requestAnotherExpansion = ref(false);
const ocRequestDialog = ref(false);
const OCstore = useOnlineConsultationStore();
const { setNotificationAlert } = OCstore;
const { getActivityHistory } = ProcessedTabsStore;
const store = usepatientDemographicsStore();
const pathways = computed(() => store.pathways);
const patient_id = computed(() => store.patientDemographicsData.id);
const state = computed(() => OCstore.ocSummaryData.status);
watch(state,(newValue)=>{
  if(newValue === 'Processed'){
    requestAnotherExpansion.value=false
  }
})

const selectedOc = ref([]);
const btnLoading = ref(false);

const handleSelectedOc = (oc) => {
  if (selectedOc.value.includes(oc)) {
    selectedOc.value = selectedOc.value.filter((item) => item != oc);
  } else {
    selectedOc.value.push(oc);
  }
};
 
const submitPathways = () => {
  btnLoading.value = true;
  let pathway_id = selectedOc.value.map((item) => item.encoded_id);
  let data = {
    condition_id: OCstore.conditionId,
    patient_id: patient_id.value,
    pathway_id,
  };
  store
    .setPathways(data)
    .then((res) => {
      selectedOc.value = [];
      btnLoading.value = false;
      ocRequestDialog.value = false;
      setNotificationAlert({
        type: "success",
        text: res.data.message,
        show: true,
      });

      // this is Activity history api call which take nae data atter request another OC
      getActivityHistory(OCstore.conditionId);
    })
    .catch((err) => {
      btnLoading.value = false;
      setNotificationAlert({
        type: "error",
        text: err.response.data.message,
        show: true,
      });
      ocRequestDialog.value = false;
    });
};

const checkedObject = (oc) => {
  let val = false;
  if (selectedOc.value.includes(oc)) {
    val = true;
  }
  return val;
};
</script>
    
<style scoped>
.my-card {
  width: 100%;
  max-width: 520px;
  padding-inline: 2vw;
}
.perentClass .custom-border-another-oc {
  border: 1px solid #ffa100 !important;
  height: 42px;
}
.selected-oc {
  background: rgb(240, 39, 39);
}
.custum-yellow-color {
  color: #ffa100;
}
.selected-oc {
  background-color: #3c6cde;
  color: #fff;
  cursor: pointer;
}
.selected-oc .text-dark {
  color: #fff !important;
}
/* .selected-oc .leftAcordianIcon {
  background-color: #3c6cde;
} */
/* .selected-oc img {
  filter: brightness(0) invert(1);
} */

.q-btn.disabled {
  background-color: #cdcdcd !important;
}
.head-padding {
  padding: 20px;
}
.custom-btn-padding {
  padding: 0.5rem 2rem;
}
.vertical-pad {
  padding: 0.8rem 2.4rem;
}
.btn-grey-border {
  border: 1px solid #b9b9b9;
}
.req-oc {
  width: 402px;
  margin-inline: auto;
}

.q-btn.disabled {
  background-color: #cdcdcd !important;
}
.cls-1 {
  fill: #ffa100;
}
.cls-2 {
  fill: #fff;
}
.pathways-height {
  max-height: 210px;
  overflow-y: hidden;
}
.pathways-height:hover {
  overflow-y: auto;
}
.pathways-height-modal {
  max-height: 260px;
  overflow-y: hidden;
}
.pathways-height-modal:hover {
  overflow-y: auto;
}
.animate-icon {
  transform: rotate(90deg);
}
</style>
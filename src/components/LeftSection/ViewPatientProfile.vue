<template>
  <div class="relative mb-ten">
    <q-expansion-item :group="props.group" v-model="gp_connect" header-class="q-pa-none" expand-icon-class="hidden"
      @show="gp_connect = true" @hide="gp_connect = false" duration="0">
      <template v-slot:header>
        <div class="flex  text-primary gp-content-header no-padding full-width custom-border-radius" :class="
          gp_connect
            ? 'active bg-primary border-primary'
            : 'bg-blue-1 custom-btn-border'
        " @click="!gp_connect && gpConnectHtml()">
          <q-item-section avatar class="leftAcordianIcon custom-border-radius-on-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="9.981" viewBox="0 0 16.667 9.981">
              <g data-name="Group 6005">
                <path data-name="Path 2792"
                  d="M293.589 399.581a9.387 9.387 0 0 1-8.1-4.676.228.228 0 0 1 0-.229 9.35 9.35 0 0 1 16.2 0 .228.228 0 0 1 0 .229 9.387 9.387 0 0 1-8.1 4.676zm-7.636-4.79a8.894 8.894 0 0 0 15.272 0 8.894 8.894 0 0 0-15.272 0z"
                  transform="translate(-285.256 -389.8)" style="fill: #3366cc; stroke: #3366cc; stroke-width: 0.6px" />
                <path data-name="Path 2793"
                  d="M453.281 456.14a2.861 2.861 0 1 1 2.861-2.861 2.864 2.864 0 0 1-2.861 2.861zm0-5.265a2.4 2.4 0 1 0 2.4 2.4 2.407 2.407 0 0 0-2.4-2.401z"
                  transform="translate(-444.948 -448.289)"
                  style="fill: #3366cc; stroke: #3366cc; stroke-width: 0.6px" />
              </g>
            </svg>
            <!-- <q-icon name="visibility" class="text-center" /> -->
          </q-item-section>

          <q-item-section class="head-padding ">
            <q-item-label class="text-subtitle2 text-weight-bold q-py-sm" :class="gp_connect ? 'text-white' : 'text-black'">
              View Complete Patient Profile
              <span class="block text-weight-regular">from
                <span class="text-weight-bold" :class="gp_connect ? 'text-white' : 'text-primary'">GP
                  Connect</span></span>
            </q-item-label>
            
            <!-- <q-item-label caption :class="gp_connect ? 'text-white' : 'text-black'">Last Sync 12-10-2021</q-item-label> -->
          </q-item-section>
          <q-item-section side class="icon-margin">
            <q-avatar size="lg" :text-color="gp_connect ? 'primary' : 'white'" rounded
              :color="gp_connect ? 'white' : 'primary'">
              <q-icon name="arrow_forward" />
            </q-avatar>
          </q-item-section>
        </div>
      </template>

      <q-expansion-item default-opened header-class="expansion-header bg-primary custom-border-radius" disable class="
          absolute
          primary-dark-color
          text-white
          absolute-panel absolute-panel-from-bottom
          custom-border-radius
        " @mouseleave="handMouseleave">
        <template v-slot:header>
          <div class="flex justify-between full-width items-center">
            <h6 class="q-ma-none text-subtitle1">GP Connect Profile</h6>
            <q-icon name="close" size="xs" style="cursor: pointer !important" @click="gp_connect = false"></q-icon>
          </div>
        </template>
        <div class="q-pa-md bg-white text-black shadow-6">
          <div class="flex bg-indigo-1 q-pa-sm items-center justify-between">
            <span>{{
                profileData.first_name + " " + profileData.last_name
            }}</span>
            <div class="tooltip">
              <q-icon name="warning" color="warning" size="xs"> </q-icon>
              <span class="tooltiptext"><b>Unmatched information:</b>There is a mismatch in the
                information we have recorded for this patient on Dr. iQ and
                their clinical system record, this includes: [Address, Postcode,
                Gender, Mobile Number]. Please update the patient’s details on
                Dr. iQ or the clinical system record to allow GP Connect to
                present the patient’s full record on this screen.</span>
            </div>
            <!-- <q-icon name="warning" color="warning" size="xs">
            </q-icon> -->
          </div>
          <div class="text-subtitle2">
            Gender: {{ `${profileData.gender} | ${profileData.sex_at_birth}` }} |
            <span v-if="profileData.nhs_number">NHS: {{ profileData.nhs_number }} |
            </span>
            DOB: {{ profileData.dob.split(" ")[0] }} | Age:
            {{ profileData.dob.split(" ")[1].replace(/[()]/g, "") }} |
          </div>
          <div class="text-subtitle2 flex items-center justify-between">
            <span>Address: {{ profileData.address ?? "N/A" }} |
              {{ profileData.post_code }}</span>
            <span>{{ profileData.practice }}</span>
          </div>
          <div class="q-mt-sm">
            <q-btn v-for="conectBtn in gpConnectBtn" :key="conectBtn.value" flat class="connect-button text-capitalize"
              :class="conectBtn.value == dType && 'bg-primary text-white'" :label="conectBtn.name"
              @click="(dType = conectBtn.value), (selectedTab = conectBtn)" />
          </div>

          <div>
            <div class="row q-my-sm items-center" v-if="selectedTab && selectedTab.date">
              <div class="col-5 q-pr-md">
                <div class="flex items-center">
                  <label for="start_date" class="q-mr-sm">Start Date:</label>
                  <q-input dense placeholder="DD-MM-YYYY" readonly filled v-model="startDate" mask="##-##-####"
                    class="q-pb-none" style="flex: 1" :rules="['startDate']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale"
                          v-model="showStartDatePicker">
                          <q-date v-model="startDate" minimal no-unset :options="startDateLimit" mask="DD-MM-YYYY">
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-5 q-px-md">
                <div class="flex items-center">
                  <label for="start_date" class="q-mr-sm">End Date</label>
                  <q-input placeholder="DD-MM-YYYY" :disable="!startDate" readonly dense filled v-model="endDate"
                    class="q-pb-none" style="flex: 1" mask="##-##-####" :rules="['endDate']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy"  transition-show="scale" transition-hide="scale"
                          v-model="showEndDatePicker">
                          <q-date v-model="endDate"  no-unset  :options="endDateLimit" minimal mask="DD-MM-YYYY">
                            <!-- v-close-popup -->
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-2 q-pl-lg">
                <q-btn color="primary" class="full-width text-capitalize" :disable="disableSearch || !endDate"
                  @click="gpConnectHtml()">
                  Search
                </q-btn>
              </div>
            </div>

            <div class="q-mt-sm gp-connect-profile" v-if="gpConnectProfileData" v-html="gpConnectProfileData"></div>
            <Loader v-else height="200px" />
          </div>
        </div>
      </q-expansion-item>
    </q-expansion-item>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useGPConnectProfileStore } from "../../stores/gpConnectProfile";
import Loader from "../../views/Loader.vue";
import "../../assets/css/gp-profile.css";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
const gpConnectProfile = useGPConnectProfileStore();
const profileData = usepatientDemographicsStore().patientDemographicsData;
const gpConnectProfileData = ref(null);

const props = defineProps({
  group: String,
});
const closeBtn = ref(null);
const disableSearch = ref(false);
const gp_connect = ref(false);
const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);
const selectedTab = ref(null);
const nhsNumber = ref("9674960007");
const dType = ref("sum");


const handMouseleave = () => {
  if (!showStartDatePicker.value && !showEndDatePicker.value) {
    gp_connect.value = false;
    startDate.value = null;
    endDate.value = null;
    dType.value = 'sum';
  }
}


const concateZero = (value) => {
  return value < 10 ? "0" + value : value;
};
 

// setting current date as default
// let todayDate = new Date();
// const formatedDate =
//   concateZero(+todayDate.getDate()) +
//   "-" +
//   concateZero(+(todayDate.getMonth() + 1)) +
//   "-" +
//   todayDate.getUTCFullYear();

const startDate = ref(null);
const endDate = ref(null);
watch(startDate, (newValue) => {
  showStartDatePicker.value = false;
  if (newValue > endDate.value) {
    endDate.value = null
  }
})
watch(endDate, (value) => {
  showEndDatePicker.value = false;
})

const startDateLimit = (date) => {
  let parts = date.split("-");
  let currentDate = new Date();
  let today =
    currentDate.getUTCFullYear() +
    "/" +
    concateZero(+(currentDate.getMonth() + 1)) +
    "/" +
    concateZero(+currentDate.getDate());

  return parts <= today;
};

const endDateLimit = (date) => {
  let parts = date.split("-");
  let startDateValue = startDate.value.split("-").reverse();
  let initDate = startDateValue.join("/");
  let currentDate = new Date();
  let today =
    currentDate.getUTCFullYear() +
    "/" +
    concateZero(+(currentDate.getMonth() + 1)) +
    "/" +
    concateZero(+currentDate.getDate());
  return parts[0] >= initDate && parts[0] <= today;
};

const gpConnectBtn = [
  {
    name: "Summary",
    value: "sum",
    date: false,
  },
  {
    name: "Encounters",
    value: "enc",
    date: true,
  },
  {
    name: "Clinical Items",
    value: "cli",
    date: true,
  },
  {
    name: "Problems and Issues",
    value: "prb",
    date: true,
  },
  {
    name: "Allergies and Adverse Reactions",
    value: "all",
    date: false,
  },
  {
    name: "Medications",
    value: "med",
    date: true,
  },
  {
    name: "Referrals",
    value: "ref",
    date: true,
  },
  {
    name: "Observations",
    value: "obs",
    date: true,
  },
  {
    name: "Immunisations",
    value: "imm",
    date: false,
  },
  {
    name: "Administrative Items",
    value: "adm",
    date: true,
  },
];
const gpConnectHtml = async () => {
  gpConnectProfileData.value = null;
  disableSearch.value = true
  let data = {
    nhsNumber: profileData.nhs_number,
    dataType: dType.value,
  };

  if (endDate.value) {
    let apistartDate = startDate.value.split("-").reverse().join("-");
    let apiendDate = endDate.value.split("-").reverse().join("-");
    data["filters"] = { startDate: apistartDate, endDate: apiendDate };
  }
  try {
    const response = await gpConnectProfile.getGPConnectData(data);
    if (response.data.code === 500) {
      gpConnectProfileData.value = `<div class="custom-alert" style:"padding:14px">No GP Connect data available</div>`;
      return;
    }

    let jsondata = JSON.parse(response.data.data);
    if (jsondata.status === "failure" || response.data.code === 500) {
      gpConnectProfileData.value = `<div class="custom-alert" style:"padding:14px">No GP Connect data available</div>`;
    } else {
      gpConnectProfileData.value = jsondata.htmlData;
    }
  } catch (err) {
    if (err.response) {
      gpConnectProfileData.value = `<div class="custom-alert" style="
    padding: 10px">No GP Connect data available</div> `;
    }
  }
  disableSearch.value = false
};
watch(dType, () => {
  startDate.value = null;
  endDate.value = null;
  gpConnectHtml();
});
</script>

<style scoped>
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.custom-alert {
  background: red;
}

.alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  padding: 14px;
  border-radius: 4px;
}

.connect-button {
  color: #007bff;
  border: 1px solid #e6e6e6;
  display: inline-block;
  background: #fff;
  padding: 5px 11px;
  margin: 0 4px 8px 4px;
  border-radius: 2px;
  font-size: 12px;
}
</style>
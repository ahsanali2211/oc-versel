<template>
  <q-expansion-item :group="props.group" icon="explore" label="First" expand-icon-class="hidden"
    v-model="patient_demographics" :header-class="
      !patientDemographicsData
        ? 'no-padding'
        : `text-primary no-padding custom-border-radius icon-style ${!patient_demographics
          ? 'bg-blue-1 custom-btn-border'
          : 'bg-primary custom-top-border-radius border-primary'
        }`
    " class="mt-ten q-pa-none">
    <!-- header Data  -->
    <template v-slot:header v-if="patientDemographicsData">
      <q-item-section avatar class="leftAcordianIcon caretOnAfter border-radius-from-left"
        :class="!patient_demographics && 'custom-border-radius-on-icon-box'">
        <q-icon :name="patient_demographics ? 'remove' : 'add'" class="text-center" />
        <Transition name="fade">
          <q-icon v-if="patient_demographics" name="arrow_drop_down" class="absolute"></q-icon>
        </Transition>
      </q-item-section>
      <q-item-section class="head-padding">
        <q-item-label class="text-subtitle2 text-weight-bold"
          :class="patient_demographics ? 'text-white' : 'text-black'">Patient Demographics</q-item-label>
        <q-item-label caption :class="patient_demographics ? 'text-white' : 'text-black'">General Information
        </q-item-label>
      </q-item-section>
      <q-item-section side class="icon-margin">
        <q-avatar size="lg" :text-color="patient_demographics ? 'primary' : 'white'" rounded
          :color="patient_demographics ? 'white' : 'primary'">
          <q-icon name="arrow_downward" />
        </q-avatar>
      </q-item-section>
    </template>

    <!-- Skeleton header -->
    <template v-slot:header v-else>
      <q-skeleton width="100%" height="59px" type="QToolbar" />
    </template>
    <q-card bordered class="botoom-rad">
      <!-- sekelton section -->
      <q-card-section v-if="!patientDemographicsData" class="px-ten">
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <hr />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <hr />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
        <hr />
        <q-skeleton class="my-ten" />
        <q-skeleton class="my-ten" />
      </q-card-section>

      <!-- Data section -->
      <q-card-section v-else class="px-ten">
        <div class="flex justify-between q-py-sm">
          <div><strong>User ID</strong></div>
          <div>
            {{
                patientDemographicsData?.encoded_id
                  ? patientDemographicsData?.encoded_id
                  : "N /A"
            }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Title</strong></div>
          <div>
            {{
                patientDemographicsData?.title
                  ? patientDemographicsData?.title
                  : "N/A"
            }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>First Name</strong></div>
          <div>
            {{ patientDemographicsData?.first_name }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Last Name</strong></div>
          <div>{{ patientDemographicsData?.last_name }}</div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Gender</strong></div>
          <div>
            {{ patientDemographicsData?.gender }}
            <!-- <q-icon
              :name="patientDemographicsData?.gender.toLowerCase()"
              color="primary"
              size="xs"
            /> -->
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Sex at birth</strong></div>
          <div>
            {{ patientDemographicsData?.sex_at_birth }}
            <q-icon :name="patientDemographicsData?.sex_at_birth.toLowerCase()" color="primary" size="xs" />
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>DOB</strong></div>
          <div>
            <q-btn size="sm" class="text-capitalize custom-border-radius" color="primary" label="Copy DOB"
              @mouseleave="resetCopy()" @click="copyTextToClipboard(patientDemographicsData?.dob, 'dob')">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-black">{{ copyDOB ?
                  "Copied!" : "Copy to Clipboard"
              }}</q-tooltip>
            </q-btn>
            {{ patientDemographicsData?.dob }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Ethnic Origin</strong></div>
          <div style="width: 210px" class="text-right">
            {{
                patientDemographicsData?.ethnic_origin
                  ? patientDemographicsData?.ethnic_origin
                  : "N / A"
            }}
          </div>
        </div>
        <hr />
        <div class="flex justify-between q-py-sm">
          <div><strong>Email Adress</strong></div>
          <div>{{ patientDemographicsData?.email }}</div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Phone</strong></div>
          <div class="">
            <q-btn :disable="!patientDemographicsData?.phone.trim()" size="sm"
              class="text-capitalize q-mr-sm custom-border-radius" color="primary" label="Launch Quick Call" />
            {{
                patientDemographicsData?.phone.trim()
                  ? patientDemographicsData?.phone
                  : "N / A"
            }}
          </div>
        </div>
        <hr />
        <div class="flex justify-between q-py-sm">
          <div><strong>Address</strong></div>
          <div style="width: 220px" class="text-right">
            {{
                patientDemographicsData?.address
                  ? patientDemographicsData?.address
                  : "N / A"
            }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>Post Code</strong></div>
          <div>
            {{
                patientDemographicsData?.post_code
                  ? patientDemographicsData?.post_code
                  : "N / A"
            }}
          </div>
        </div>
        <hr />
        <div class="flex justify-between q-py-sm">
          <div><strong>Practice</strong></div>
          <div style="width: 220px" class="text-primary text-weight-bold text-right">
            {{ patientDemographicsData?.practice }}
          </div>
        </div>
        <div class="flex justify-between q-py-sm">
          <div><strong>NHS #</strong></div>
          <div>
            {{
                patientDemographicsData?.nhs_number
                  ? patientDemographicsData?.nhs_number
                  : "N/A"
            }}
          </div>
        </div>
        <div class="text-right">
          <q-btn v-if="patientDemographicsData.nhs_number" size="sm"
            class="text-capitalize custom-border-radius q-mr-sm" color="primary" label="Copy NHS Number"
            @mouseleave="resetCopy()" @click="copyTextToClipboard(patientDemographicsData.nhs_number, 'nhs_num')">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-black">{{ copyNHS ?
                "Copied!" : "Copy to Clipboard"
            }}</q-tooltip>
          </q-btn>
          <q-btn size="sm" :loading="pdsLoading" class="text-capitalize custom-border-radius text-white"
            style="background-color: #48b77c" label="Connect PDS" @click="hnadleConnectPDS()" />
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <q-dialog v-model="PDSAvaiableModal" persistent>
    <q-card :style="PDSData.code === 400 ? { maxWidth: '500px' } : { width: '800px' }" class="q-pa-lg">
      <!-- NO PDS Found data -->
      <div class="no-pds-available" v-if="PDSData.code === 400">
        <q-card-section>
          <h6 class="text-black text-weight-bold text-center q-ma-none">
            Unmatched Information
          </h6>
        </q-card-section>

        <q-card-section class="text-center">
          Some of the patient's information on Dr. iQ does not match their
          clinical system record - see the red notification bar below for more
          details.
          <div class="text-center q-pt-lg">
            <q-btn dense flat class="bg-primary text-white text-capitalize q-px-lg q-py-sm" v-close-popup>
              Okay
            </q-btn>
          </div>
        </q-card-section>
      </div>

      <div class="" v-else-if="PDSData.code === 200">
        <q-card-section>
          <h6 class="text-black text-weight-bold text-center q-ma-none">
            Patient Details
          </h6>
        </q-card-section>
        <q-card-section>
          <table class="table pds-table full-width" aria-describedby="pdsTable">
            <thead>
              <th style="width: 150px"></th>
              <th style="width: 200px">Dr.iQ Record</th>
              <th>From PDS</th>
            </thead>
            <tbody>
              <tr>
                <td class="text-weight-bold">First Name</td>
                <td>{{ patientDemographicsData.first_name }}</td>
                <td>{{ PDSProfileData.firstName }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Last Name</td>
                <td>{{ patientDemographicsData.last_name }}</td>
                <td>{{ PDSProfileData.lastName }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Telephone</td>
                <td>{{ patientDemographicsData.phone ?? "N/A" }}</td>
                <td>{{ PDSProfileData.tel }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">DOB</td>
                <td>{{ patientDemographicsData.dob.split(" ")[0] }}</td>
                <td>{{ formatedPDSDate }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Gender</td>
                <td>{{ patientDemographicsData.gender }}</td>
                <td>{{ PDSProfileData.gender }}</td>
              </tr>
              <tr :class="
                formatedNHS !== PDSProfileData.nhsnumber && 'bg-green-2'
              ">
                <td class="text-weight-bold">NHS Number</td>
                <td>{{ patientDemographicsData.nhs_number }}</td>
                <td>{{ PDSProfileData.nhsnumber }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Address</td>
                <td>{{ patientDemographicsData.address ?? "N/A" }}</td>
                <td>{{ PDSProfileData.addr.address }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Post Code</td>
                <td>{{ patientDemographicsData.post_code ?? "N/A" }}</td>
                <td>{{ PDSProfileData.addr.postcode }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Organization Name</td>
                <td>{{ patientDemographicsData.practice }}</td>
                <td>{{ PDSProfileData.organization.name }}</td>
              </tr>
              <tr>
                <td class="text-weight-bold">Organization ODS Code</td>
                <td>
                  {{ patientDemographicsData.organization_ods_code ?? "N/A" }}
                </td>
                <td>{{ PDSProfileData.organization.odscode }}</td>
              </tr>
            </tbody>
          </table>
          <div class="q-mt-md">
            <b>Note:</b> Please confirm the above details with the patient and
            press "Confirm Patient" if they are correct
            <span class="bg-green-2">(only NHS Number will be updated)</span>.
            You can also update the patient's details manually if you cannot
            find a match.
          </div>
          <div class="text-center q-mt-lg">
            <q-btn color="primary" class="text-weight-bold text-capitalize q-px-md q-py-sm" dense :loading="savePdsLoading" @click="handleSavePDS">
              Confirm Patient
            </q-btn>
            <q-btn color="white" class="text-capitalize text-black q-ml-md q-px-md q-py-sm" v-close-popup
              style="border: 1px solid #dadada" dense>
              Cancel
            </q-btn>
          </div>
        </q-card-section>
      </div>
      <!-- NO PDS Found data End -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useGPConnectProfileStore } from "../../stores/gpConnectProfile";
import { computed } from "@vue/runtime-core";
const patientDemographics = usepatientDemographicsStore();
const OCStore = useOnlineConsultationStore();
const { connectPDS } = useGPConnectProfileStore();
const patientDemographicsData = computed(
  () => patientDemographics.patientDemographicsData
);
const props = defineProps(["group"]);

const formatedNHS = computed(() => {
  let nhsNumber = patientDemographicsData.value.nhs_number;
  if (nhsNumber && nhsNumber.includes(" ")) {
    nhsNumber = nhsNumber.split(" ").join("");
  }
  return nhsNumber;

});

const formatedPDSDate = computed(() => {
  let splitDate = PDSProfileData.value.dob;
  let year = splitDate.slice(0, 4);
  let month = splitDate.slice(4, 6);
  let date = splitDate.slice(6);

  return date + "-" + month + "-" + year;
});

const copyDOB = ref(false);
const copyNHS = ref(false);
const pdsLoading = ref(false);
const savePdsLoading = ref(false);
const PDSAvaiableModal = ref(false);
const PDSData = ref(null);
const PDSProfileData = ref(null);

const copyTextToClipboard = (text, property) => {
  if (property = 'dob') {
    text = text.slice(0, 10)
  }
  navigator.clipboard.writeText(text);
  copyDOB.value = true;
  copyNHS.value = true;
};
const patient_demographics = ref(true);

const resetCopy = () => {
  setTimeout(() => {
    copyDOB.value = false;
    copyNHS.value = false;
  }, 100);
};
const handleSavePDS =async()=>{
  savePdsLoading.value= true
  let {
    firstName,
    lastName, 
    nhsnumber,
    gender,
    tel, 
  } = PDSProfileData.value;
  let {postcode,address}=PDSProfileData.value.addr
  let {odscode,name}=PDSProfileData.value.organization
  let data = { 
    email:patientDemographicsData.value.email,
    fname: firstName,
    lname: lastName,
    dob: formatedPDSDate.value,
    postcode: postcode,
    telephone: tel,
    userToken: localStorage.getItem("gp-connect-token"),
    sex_at_birth:gender,
    address: address ? address : "",
    nhsnumber: nhsnumber ? nhsnumber : "",
    orgname: name ? name : "",
    odscode: odscode ? odscode : "",
    type: "save",
  }
  
  try {
    console.log('object');
    await connectPDS(data)
    await patientDemographics.getPatientDemographicsData(OCStore.conditionId)
    savePdsLoading.value = false;
    PDSAvaiableModal.value = false;
  } catch (error) {
    savePdsLoading.value = false;
    console.log(error);
  }
   
}
const hnadleConnectPDS = () => {
  pdsLoading.value = true;
  let {
    first_name,
    last_name,
    email,
    dob,
    post_code,
    sex_at_birth,
    address,
    nhs_number,
    practice,
    phone,
    organization_ods_code,
  } = patientDemographicsData.value;
  let formatedDob = dob.split(" ");

  let data = {
    email: email,
    fname: first_name,
    lname: last_name,
    dob: formatedDob[0],
    postcode: post_code,
    telephone: phone,
    userToken: localStorage.getItem("gp-connect-token"),
    sex_at_birth,
    address: address ? address : "",
    nhsnumber: nhs_number ? nhs_number : "",
    orgname: practice ? practice : "",
    odscode: organization_ods_code ? organization_ods_code : "",
    type: "getData",
  };

  connectPDS(data).then((res) => {
    pdsLoading.value = false;
    PDSAvaiableModal.value = true;
    PDSData.value = res.data;
    if (res.data.code === 200) {
      PDSProfileData.value = res.data.data.response;
    }
  }).catch((err)=>{
    pdsLoading.value = false;
    console.log(err);
  });
};
</script>

<style scoped>
.head-padding {
  padding: 12px 16px;
}

.icon-margin {
  margin-right: 12px;
}

.pds-table {
  border-collapse: collapse;
}

.pds-table th {
  background-color: #ccc;
  text-align: left;
}

.pds-table td,
.pds-table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
</style>
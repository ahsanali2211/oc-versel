<template>
<div class="row">
  <div class="col q-pr-xs">
    <div class="text-weight-bold q-pb-xs">Assigned</div>
           <q-skeleton v-if="showOptionSkeltion" height="40px" />
          <q-select
            v-else
            hide-dropdown-icon
            class="rounded-borders  no-shadow bg-white"
            outlined
            options-selected-class="text-weight-bold"
            :model-value="asssignTo"
            readonly
            input-class="red-text"
            dense
            dropdown-icon="expand_more"
            option-value="id"
            option-label="name"
          >
            <!--=========== the option slot use to customize  options =========== -->
            <template v-slot:prepend>
              <span
                class="color-icon q-mr-sm"
                :class="asssignTo?.ocrole_color"
              ></span>
            </template>
            <!-- <template v-slot:option="item">
              <q-item
                style="min-height: 40px"
                class="q-py-none items-center"
                v-bind="item.itemProps"
                ><span
                  class="color-icon q-mr-sm"
                  :class="item.opt.ocrole_color"
                ></span>
                {{ item.opt.name }}</q-item
              >
              <q-separator />
            </template> -->
          </q-select>
        </div>
        <div class="col-6 q-pl-xs" v-if="showReassign">
            <div class="text-weight-bold q-pb-xs">Re-Assign</div>
           <q-skeleton v-if="showOptionSkeltion" height="40px" />
          <q-select
            v-else
            class="rounded-borders  no-shadow bg-white"
            outlined
            options-selected-class="text-weight-bold"
            :model-value="reAsssignTo"
            input-class="red-text"
            dense
            :disable="status=='Processed' ||archive == 1"
            dropdown-icon="expand_more"
            option-value="id"
            option-label="name"
            :loading="assignToLoading"
            :options="options"
            @update:model-value="(val) => handleAssignTo(val)"
          >
            <!--=========== the option slot use to customize  options =========== -->
            <template v-slot:prepend>
              <span
                class="color-icon q-mr-sm"
                :class="reAsssignTo?.ocrole_color"
              ></span>
            </template>
            <template v-slot:option="item">
              <q-item
                style="min-height: 40px"
                class="q-py-none items-center"
                v-bind="item.itemProps"
                ><span
                  class="color-icon q-mr-sm"
                  :class="item.opt.ocrole_color"
                ></span>
                {{ item.opt.name }}</q-item
              >
              <q-separator />
            </template>
          </q-select>
        </div>
</div>
</template>
    
<script setup  >
import { computed, ref } from "vue";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import {useProcessedTabsStore} from '../../stores/processedTabs'
const ProcessedTabsStore = useProcessedTabsStore()
const OC = useOnlineConsultationStore();
const newRole = ref(null);
const { assingNewRole } = OC;
const { getActivityHistory } = ProcessedTabsStore;
const options = computed(() => OC.rolesList);
const showOptionSkeltion = computed(() => OC.showOptSkelton);
const archive = ref(computed(() => OC.archive));
const showReassign = ref(computed(() => (OC.archive == 0 && OC.ocSummaryData.status =='Pending')?true:false ));

 
const status = computed(() => OC.ocSummaryData.status)


const unassigned = {
  name: "Unassigned",
  id: null,
  ocrole_color: "Unassigned-clr",
};

const checkIsAssignes = computed(() =>
   newRole.value ?? OC.rolesList.find((role) => role.is_assigned) ?? unassigned
);

const asssignTo = ref(checkIsAssignes);
const reAsssignTo = ref(unassigned);
const assignToLoading = ref(false);

const handleAssignTo = (val) => {
  assignToLoading.value = true;
  assingNewRole(val.id)
    .then(() => {
      assignToLoading.value = false
      newRole.value = val;
      getActivityHistory(OC.conditionId)
    })
    .catch((err) => {
      console.log(err.message);
      assignToLoading.value = false;
    });
};
</script>
    
<style scoped>
.Unassigned-clr {
  background-color: #44536a;
}
.Senior-AHP-clr {
  background-color: #44536a;
}
.Doctor-clr {
  background-color: #ff3925;
}
.Physician-clr {
  background-color: #af7ad7;
}
.Nurse-clr {
  background-color: #54c7fd;
}
.Pharmacist-clr {
  background-color: #18c601;
}
.HCA-clr {
  background-color: #8c6238;
}
.Admin-clr {
  background-color: #ffce04;
}
.Physio-clr {
  background-color: #af7ad7;
}
.Care-coordinator-clr {
  background-color: #00e69c;
}
.Paramedic-clr {
  background-color: #cc00f1;
}
.GP-Director-clr {
  background-color: #e82a96;
}
.customChip {
  padding-block: 10px;
  padding-inline: 10px;
  border-radius: 4px;
}
.processed {
  background-color: #8ed69f;
}
.color-icon {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.custom-padding {
  border: 1px solid #d5d5d5;
  padding: 0.46rem;
}
</style> 
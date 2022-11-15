<template>
  <q-expansion-item :group="props.group" icon="perm_identity" label="Second" expand-icon-class="hidden"
    v-model="pre_request_collapse" :header-class="`text-primary no-padding custom-border-radius icon-style ${!pre_request_collapse
      ? 'bg-blue-1 custom-btn-border'
      : 'bg-primary custom-top-border-radius border-primary'
    }`" class="my-ten">
    <template v-slot:header>
      <q-item-section avatar class="leftAcordianIcon caretOnAfter border-radius-from-left"
        :class="!pre_request_collapse && 'custom-border-radius-on-icon-box'">
        <q-icon :name="pre_request_collapse ? 'remove' : 'add'" class="text-center" />
        <Transition name="fade">
          <q-icon v-if="pre_request_collapse" name="arrow_drop_down" class="absolute"></q-icon>
        </Transition>
      </q-item-section>
      <q-item-section class="head-padding">
        <q-item-label class="text-subtitle2 text-weight-bold"
          :class="pre_request_collapse ? 'text-white' : 'text-black'">Previously Requested OC</q-item-label>
        <q-item-label caption :class="pre_request_collapse ? 'text-white' : 'text-black'">By this patient on
          <span class="text-weight-bold" :class="pre_request_collapse ? 'text-white' : 'text-primary'">DR.IQ</span>
        </q-item-label>
      </q-item-section>
      <q-item-section side class="icon-margin">
        <q-avatar size="lg" :text-color="pre_request_collapse ? 'primary' : 'white'" rounded
          :color="pre_request_collapse ? 'white' : 'primary'">
          <span class="text-weight-bold" style="font-size: 14px">{{
              prev_requested_oc_count ?? "0"
          }}</span>
        </q-avatar>
      </q-item-section>
    </template>
    <q-card bordered>
      <q-card-section class="q-pa-none" v-if="pre_requested_oc">
        <q-list class="q-pt-md oc-list-height q-pl-md q-pr-sm q-pb-sm" v-if="pre_requested_oc.length > 0">
          <q-item v-for="(oc, index) in pre_requested_oc" :key="index" rounded clickable
            class="q-mb-sm q-mr-sm q-pa-none subItem custom-btn-border custom-border-radius oc-options" @mouseleave="expentionalIndex = -1">
            <span class="caret-mark" v-if="expentionalIndex === index"></span>
            <span class="grey-caret-mark" v-if="expentionalIndex === index"></span>
            <q-item-section avatar class="leftAcordianIcon custom-border-radius-on-icon-box">
              <img :src="
                oc.icon ??
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'
              " style="max-width: 30px; height: 30px" fit="contain" alt="image" />
            </q-item-section>
            <q-item-section class="head-padding">
              <q-item-label class="text-weight-bold ellipsis">{{
                  oc.label ?? "No label Yet"
              }}</q-item-label>
              <q-item-label caption class="text-dark" style="font-size:11px">
                <strong >Submitted on: </strong><span>{{
                  oc.submitted_date
              }}</span>
                </q-item-label>
            </q-item-section>
            <q-item-section side class="icon-margin h-fit" :class="oc.summary.length && 'after-icon'">
              <q-avatar size="lg" text-color="white" rounded color="primary" :class={disabled:!oc.summary.length}
                @mouseover="oc.summary.length && (expentionalIndex = index)" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="9.981" viewBox="0 0 16.667 9.981">
                  <g data-name="Group 6005">
                    <path data-name="Path 2792"
                      d="M293.589 399.581a9.387 9.387 0 0 1-8.1-4.676.228.228 0 0 1 0-.229 9.35 9.35 0 0 1 16.2 0 .228.228 0 0 1 0 .229 9.387 9.387 0 0 1-8.1 4.676zm-7.636-4.79a8.894 8.894 0 0 0 15.272 0 8.894 8.894 0 0 0-15.272 0z"
                      transform="translate(-285.256 -389.8)" style="fill: #fff; stroke: #fff; stroke-width: 0.4px" />
                    <path data-name="Path 2793"
                      d="M453.281 456.14a2.861 2.861 0 1 1 2.861-2.861 2.864 2.864 0 0 1-2.861 2.861zm0-5.265a2.4 2.4 0 1 0 2.4 2.4 2.407 2.407 0 0 0-2.4-2.401z"
                      transform="translate(-444.948 -448.289)" style="fill: #fff; stroke: #fff; stroke-width: 0.4px" />
                  </g>
                </svg>
                <q-tooltip class="bg-black text-white" anchor="top middle" self="bottom middle" :offset="[10, 10]"
                  v-if="!oc.summary.length">No Data Availble</q-tooltip>
              </q-avatar>
            </q-item-section>

            <q-expansion-item v-if="expentionalIndex == index" disable expand-icon="hidden"
              @mouseleave="expentionalIndex = -1" header-class="expansion-header" default-opened
              class="absolute text-white absolute-panel shadow-5 custom-border-radius primary-dark-color">
              <template v-slot:header>
                <q-item-section>
                  <div class="flex justify-between items-center">
                    <span v-if="!oc.someone_else"> {{ oc.label ?? "No label Yet" }}</span>
                    <span v-else class="text-weight-bold">
                      <span class="dot-someone-else"></span>
                      {{
                          `${oc.encoded_id} | For: ${oc.someone_else_data.for} | DoB: ${oc.someone_else_data.dob} | Age:
                                            ${oc.someone_else_data.age}`
                      }}</span>
                  </div>
                </q-item-section>

                <q-item-section class="q-mr-sm" side v-if="oc.someone_else">
                  <div class="bg-white text-black q-py-xs q-px-sm ponter-cur">
                    OC for Someone Else
                  </div>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="close" size="xs" color="white" style="cursor: pointer !important"
                    @click="expentionalIndex = -1"></q-icon>
                </q-item-section>
              </template>
              <q-card class="text-black no-border-radius cursor-auto">
                <q-card-section class="q-px-none card-height">
                  <div class="q-px-md" v-for="(summary, index) in oc.summary" :key="index">
                    <q-card class="ques-card no-shadow no-border-radius q-mb-sm" bordered>
                      <q-card-section>
                        <div class="text-subtitle text-weight-bold q-mb-sm"
                          v-if="!Array.isArray(summary.selected_choice)" v-html="summary.question"></div>
                        <div class="text-subtitle2 text-primary break-word" v-if="!Array.isArray(summary.selected_choice)"
                          v-html="summary.selected_choice" />
                        <div v-else>
                          <span v-for="item in summary.selected_choice" :key="item.link">
                            <span v-if="
                              [
                                'jpg',
                                'jpeg',
                                'gif',
                                'png',
                                'tiff',
                                'bmp',
                                'svg',
                              ].includes(item.type)
                            ">
                              <img style="width: 20%" class="q-mr-md q-mb-md" :src="item.link" alt="No Image" />
                            </span>
                            <span class="block break-word" v-else>
                              <a :href="changeLink(item)" target="_blank" v-html="changeLink(item)"></a>
                            </span>
                          </span>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-card-section>
                <q-card-section class="q-pl-none q-pr-none" :class="!!oc.summary && 'q-pb-none'">
                  <div v-if="oc.summary.length" style="background: #f9f9f9; border: 1px solid #d4d4d4"
                    class="flex justify-between items-start q-pa-md">
                    <div class="panel-buttons flex justify-start items-end q-mt-xs">
                      <q-btn label="Copy NHS Number" color="white" size="sm" dense :disable="!oc.nhs_number"
                        text-color="black" class="q-mr-xs text-capitalize custom-border-radius custom-btn-padding"
                        @mouseleave="resetCopy()" @click="copyTextToClipboard(oc.nhs_number)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13.13" height="14.887" class="q-ml-md"
                          viewBox="0 0 11.13 12.887">
                          <path data-name="Icon material-content-copy"
                            d="M11.2 1.5H4.172A1.175 1.175 0 0 0 3 2.672v8.2h1.172v-8.2H11.2zm1.757 2.343H6.515a1.175 1.175 0 0 0-1.172 1.172v8.2a1.175 1.175 0 0 0 1.172 1.172h6.444a1.175 1.175 0 0 0 1.172-1.172v-8.2a1.175 1.175 0 0 0-1.173-1.172zm0 9.373H6.515v-8.2h6.444z"
                            transform="translate(-3 -1.5)" style="fill: #8b8b8b" />
                        </svg>
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-black">{{
                            copyData ? "Copied!" : "Copy to Clipboard"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn label="Copy DOB" color="white" dense size="sm" text-color="black"
                        class="q-mr-xs text-capitalize custom-border-radius custom-btn-padding"
                        @mouseleave="resetCopy()" @click="copyTextToClipboard(oc.date_of_birth)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13.13" height="14.887" class="q-ml-md"
                          viewBox="0 0 11.13 12.887">
                          <path data-name="Icon material-content-copy"
                            d="M11.2 1.5H4.172A1.175 1.175 0 0 0 3 2.672v8.2h1.172v-8.2H11.2zm1.757 2.343H6.515a1.175 1.175 0 0 0-1.172 1.172v8.2a1.175 1.175 0 0 0 1.172 1.172h6.444a1.175 1.175 0 0 0 1.172-1.172v-8.2a1.175 1.175 0 0 0-1.173-1.172zm0 9.373H6.515v-8.2h6.444z"
                            transform="translate(-3 -1.5)" style="fill: #8b8b8b" />
                        </svg>
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-black">{{
                            copyData ? "Copied!" : "Copy to Clipboard"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn label="Copy Summary" color="white" dense size="sm" text-color="black"
                        class="q-mr-xs text-capitalize custom-border-radius custom-btn-padding"
                        :loading="copySummaryIndex == index" @mouseleave="resetCopy()"
                        @click="copySummaryToClipboard(oc, index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13.13" height="14.887" class="q-ml-md"
                          viewBox="0 0 11.13 12.887">
                          <path data-name="Icon material-content-copy"
                            d="M11.2 1.5H4.172A1.175 1.175 0 0 0 3 2.672v8.2h1.172v-8.2H11.2zm1.757 2.343H6.515a1.175 1.175 0 0 0-1.172 1.172v8.2a1.175 1.175 0 0 0 1.172 1.172h6.444a1.175 1.175 0 0 0 1.172-1.172v-8.2a1.175 1.175 0 0 0-1.173-1.172zm0 9.373H6.515v-8.2h6.444z"
                            transform="translate(-3 -1.5)" style="fill: #8b8b8b" />
                        </svg>
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="bg-black">{{
                            copyData ? "Copied!" : "Copy to Clipboard"
                        }}</q-tooltip>
                      </q-btn>
                      <q-btn label="View details" color="primary" dense size="sm" ripple icon-right="visibility"
                        class="q-mr-xs text-capitalize custom-border-radius custom-btn-padding"
                        @click="handleViewDetail(oc.id)" />
                    </div>
                    <div class="details q-ml-xs">
                      <div>
                        <small class="text-weight-bold q-mr-xs">Submitted on:</small>
                        <small>{{ oc.submitted_date }}</small>
                      </div>
                      <div v-if="oc.processed_date">
                        <small class="text-weight-bold q-mr-xs">Processed on:</small>
                        <small>{{ oc.processed_date }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="text-center q-pb-lg" v-else>
                    <NoData />
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-item>
          <div class="flex justify-between q-px-sm q-pt-sm q-pb-md">
            <q-btn :loading="prevLoad" :disabled="prev_requested_oc_offset === 10 || prev_requested_oc_count < 10"
              color="primary" size="sm" class="text-capitalize text-right" label="Previous" @click="loadOcs('prev')" />
            <q-btn :loading="nextLoad" :disabled="prev_requested_oc_offset === 0" color="primary" size="sm"
              class="text-capitalize text-right" label="Next" @click="loadOcs('next')" />
          </div>
        </q-list>
        <NoData v-else />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useProcessedTabsStore } from "../../stores/processedTabs";
import { useNotesStore } from "../../stores/notes";
import { privateUrl } from "../../axiosIntegration";
import NoData from "../../views/noData.vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const OCStore = useOnlineConsultationStore();
const { getPreviousOC, getOCSummary, getRoleList, updateConditionId } = OCStore;
const processedTabs = useProcessedTabsStore();
const { getOCReview, getActivityHistory } = processedTabs;
const notesStore = useNotesStore();
const { getNotesList } = notesStore;

const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;
const props = defineProps(["group"]);
const expentionalIndex = ref(-1);
const pre_request_collapse = ref(false);
const pre_requested_oc = computed(() => OCStore.pre_requested_oc);
const prev_requested_oc_count = computed(() => OCStore.prev_requested_oc_count);
const prev_requested_oc_previous = computed(() => OCStore.prev_requested_oc_previous);
const prev_requested_oc_offset = computed(() => OCStore.offset);
const copyData = ref(false);
const prevLoad = ref(false);
const nextLoad = ref(false);
const copySummaryIndex = ref(-1);
const copyTextToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  copyData.value = true;
};
const loadOcs = async (val) => {
  expentionalIndex.value = -1;
  if (val === "next") {
    nextLoad.value = true;
    await getPreviousOC();
    nextLoad.value = false;
  } else if (val === "prev") {
    prevLoad.value = true;
    await getPreviousOC("prev-case");
    prevLoad.value = false;
  }
};
const changeLink = (item) => {
  let fileName = item.link.split("/").pop();
  let newLink = "";
  if (["jpg", "jpeg", "gif", "png", "tiff", "bmp", "svg"].includes(item.type)) {
    newLink = `${drIqUrl}secure/show/asset/img?keyName=${fileName}`;
  } else {
    newLink = `${drIqUrl}secure/download?keyName=${fileName}`;
  }
  return newLink;
};
const callAllAPIs = (ocId) => {
  window.scrollTo(0, 0);
  expentionalIndex.value = -1;
  $q.loading.show();
  Promise.all([
    getPreviousOC(ocId),
    getOCSummary(ocId),
    getOCReview(ocId),
    getNotesList(ocId),
    getRoleList(ocId),
    getActivityHistory(ocId),
  ])
    .then(() => {
      $q.loading.hide();
    })
    .catch(() => {
      $q.loading.hide();
    });
};
const handleViewDetail = async (ocId) => {
  const params = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  await params.set("condition_id", ocId);
  // Replace current querystring with the new one.
  await history.replaceState(null, null, "?" + params.toString());
  await updateConditionId(ocId);
  callAllAPIs(ocId);
  //  window.location.href = `${location.pathname}?${params}`;
};
const copySummaryToClipboard = async (summary, index) => {
  copySummaryIndex.value = index;
  let string = `User ID: ${summary.encoded_id}\n`;
  const response = await privateUrl.get(
    `/get-note-list/${summary.id}?archived=${OCStore.archive}&module_type=condition`
  );
  if (response.data.notes.length) {
    response.data.notes.filter((note) => {
      if (note.file_in_record) {
        string += `Action requested by ${note.note_by} (${note.practice_role}) at ${note.note_date}: ${note.note}\n`;
      }
    });
  }

  if (summary.clinical_annotation) {
    string +=
      "--------------------------------------------------------------------------------------------------\n";
    string += `${summary.clinical_annotation}`;
    string +=
      "--------------------------------------------------------------------------------------------------\n";
  }
  var regex = /<[^>]+>/g;
  var regexBr = /<br\s*[\/]?>/gi;
  for (const element of summary.copySummary) {
    //////////handling if select choice have value
    if (element.selected_choice) {
      string += `Q: ${element.question}\n`;
      //////////handling if select choice is string
      if (!Array.isArray(element.selected_choice)) {
        string += `A: ${element.selected_choice.replace(regexBr, "\n")}\n`;
      } else {
        //////////handling if select choice is array
        for (const index in element.selected_choice) {
          let fileName = element.selected_choice[index].link.split("/").pop();
          if (
            ["jpg", "jpeg", "gif", "png", "tiff", "bmp", "svg"].includes(
              element.selected_choice[index].type
            )
          ) {
            string += `${index == 0 ? "A:" : ""
              }${drIqUrl}secure/show/asset/img?keyName=${fileName} \n`;
          } else {
            string += `${index == 0 ? "A:" : ""
              }${drIqUrl}secure/download?keyName=${fileName} \n`;
          }
        }
      }
    } else {
      //////////handling if select choice is empty where we have to show question with InFo keyword
      string += `INFO: ${element.question}\n`;
    }
  }
  //////////remov html tag from string
  let resultString = string.replace(regex, "");
  resultString += `Status: ${summary.status}\nSubmitted Date :${summary.submitted_date}\n`;
  if (summary.status == "Processed") {
    resultString += `Processed Date: ${summary.processed_date}\n ${summary.out_come && `Outcome: ${summary.out_come}`
      }\n ${summary.message.noaction && `Message: ${summary.message.noaction}`}`;
  }
  navigator.clipboard.writeText(resultString);
  copyData.value = true;
  copySummaryIndex.value = -1;
};
const resetCopy = () => {
  setTimeout(() => {
    copyData.value = false;
  }, 100);
};
</script>

<style scoped>
.card-height {
  max-height: 240px;
  overflow: auto;
  padding-bottom: 0;
}

.dot-someone-else {
  display: inline-block;
  background: #fb6e00;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  border-radius: 50%;
  border: 1px solid white;
}

.head-padding {
  padding: 12px 16px;
}

.icon-margin {
  margin-right: 12px;
}

.panel-buttons button {
  border: 1px solid #d4d4d4;
}

.dark-orange-color {
  background: #fb6e00;
}

.ponter-cur {
  border-radius: 4px;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (min-height: 1350px) {
  .card-height {
    max-height: 440px;
  }
}
</style>

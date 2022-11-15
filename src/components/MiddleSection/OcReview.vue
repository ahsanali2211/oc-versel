<template>
  <div class="my-ten">
    <q-tabs v-model="tab" dense class="text-grey or-review" active-color="primary" indicator-color="primary"
      align="justify" narrow-indicator>
      <!-- :disable="state == 'Pending' || !ocReview" -->
      <q-btn name="ocReview" :class="tab != 'ocReview' ? 'text-black cus-btn-outline' : 'cus-blue-btn-outline'"
        class="q-mr-sm q-mb-sm text-capitalize custom-border-radius" label="Overview"
        :color="tab == 'ocReview' ? 'primary' : 'white'" @click="tab = 'ocReview'" />

      <q-btn name="activityHistory"
        :class="tab != 'activityHistory' ? 'text-black cus-btn-outline' : 'cus-blue-btn-outline'"
        class="q-mr-sm q-mb-sm text-capitalize custom-border-radius " label="Activity History"
        :color="tab == 'activityHistory' ? 'primary' : 'white'" @click="tab = 'activityHistory'" />

      <q-btn name="messages" :class="tab != 'messages' ? 'text-black cus-btn-outline' : 'cus-blue-btn-outline'"
        class="q-mr-sm q-mb-sm text-capitalize custom-border-radius" label="Messages"
        :color="tab == 'messages' ? 'primary' : 'white'" @click="tab = 'messages'" v-if="showMessageTab === 'true'" />

      <q-btn name="calling" disable v-if="false && showCallingTab === 'true'"
        :class="tab != 'calling' ? 'text-black cus-btn-outline' : 'cus-blue-btn-outline'"
        class="q-mr-sm q-mb-sm text-capitalize custom-border-radius" label="Calling"
        :color="tab == 'calling' ? 'primary' : 'white'" @click="tab = 'calling'" />
    </q-tabs>
    <!-- =========================== this Div will show when no data is available  ================================ -->
    <!-- <div v-if="state == 'Pending'">
      <q-card class="" style="height: 40vh" flat>
        <q-card-section class="full-height flex justify-center items-center">
          <div class="text-center">
            <no-data />
          </div>
        </q-card-section>
      </q-card>
    </div> -->
    <!-- =========================== this dev will show when process is submitted ================================ -->
    <div>
      <q-tab-panels v-model="tab" animated class="custom-border-radius bg-transparent">
        <!-- =========================== Start of Oc Review Tab ================================ -->
        <q-tab-panel name="ocReview" class="q-pa-none">
          <q-card flat bordered>
            <!-- OC Review Skeleton -->
            <div v-if="!ocReview">
              <q-card-section v-if="ocReviewSkelton">
                <div>
                  <q-skeleton type="text" class="q-mb-sm" height="21px" />
                  <q-skeleton type="QToolbar" class="q-mt-lg" height="54px" />
                  <div class="flex items-center q-mt-lg" style="border-bottom: 1px solid #dadada; padding-bottom: 20px">
                    <span>Status Update</span>
                    <div class="q-px-sm">
                      <q-skeleton type="QBtn" height="28px" width="200px" />
                    </div>
                  </div>

                  <div class="flex items-center justify-between q-pt-sm" style="margin-top: 10px">
                    <q-skeleton type="text" height="21px" width="200px" />
                    <q-skeleton type="text" height="21px" width="200px" />
                  </div>
                </div>
              </q-card-section>

              <div v-else>
                <q-card flat>
                  <no-data text="OC review not available" />
                </q-card>
              </div>
            </div>

            <q-card-section v-else>
              <!-- <span class="message-text">Message</span> -->
              <fieldset class="break-word message-height">
                <legend class="text-weight-bold">Message</legend>
                <!--Inputs or anything-->
                <div v-html="ocReview.message" v-if="ocReview.message"></div>
                <p v-else class="text-center" style="color: #393939;">No Content</p>
              </fieldset>
              <div class="
                  bg-grey-2
                  rounded
                  flex
                  justify-between
                  q-pa-md
                  rounded-borders
                ">
                <div class="text-subtitle2 text-weight-bold">Outcome</div>
                <div class="text-subtitle2 text-weight-bold">
                  {{ ocReview.outcome }}
                </div>
              </div>
              <div class="flex q-py-md items-center">
                <span class="">Status Update</span>
                <div class="q-px-sm">
                  <q-chip square>Pending</q-chip>
                </div>
                <q-icon name="east" class="q-px-sm" />
                <div class="activity-new">
                  <q-chip square color="blue-2 text-capitalize">{{ ocReview.status }}</q-chip>
                </div>
              </div>
              <q-separator />
              <div class="flex justify-between q-pt-md">
                <div class="">
                  {{ ocReview.first_name + " " + ocReview.last_name }} |
                  {{ ocReview.role }}
                </div>
                <div class="pull-right">{{ ocReview.action_at }}</div>
              </div>
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <!-- =========================== End of Oc Review Tab ================================ -->
        <!-- =========================== Start of Activity History Tab ================================ -->
        <q-tab-panel name="activityHistory" class="q-pa-none rounded-borders message-card-height">
          <div v-if="activityHistory.length" class="rounded-borders">
            <q-card flat bordered>
              <div v-for="(activityHis, index) in activityHistory" :key="index">
                <q-card-section>
                  <div class="flex items-start justify-between">
                    <div class="flex items-center no-wrap">
                      <span class="">{{ activityHis?.field_name }}:</span>

                      <div class="ellipsis" v-if="activityHis.old_value">
                        <q-chip square class="ellipsis custom-chip q-ml-sm" :class="activityHis.old_value && 'q-mr-sm'">
                          <!-- <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          class="bg-black text-white"
                          >{{ activityHis.old_value }}</q-tooltip
                        > -->
                          {{ activityHis?.old_value }}
                        </q-chip>
                      </div>
                      <q-icon name="east" class="q-px-md" v-if="activityHis.old_value"></q-icon>
                      <div class="activity-new">
                        <q-chip square class="ellipsis custom-chip q-ml-sm" color="green-2">
                          <!-- <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          class="bg-black text-white"
                          >{{ activityHis.new_value }}</q-tooltip
                        > -->
                          {{ activityHis?.new_value }}
                        </q-chip>
                      </div>
                    </div>
                    <div class="text-right text-caption text-grey">
                      <div>{{ activityHis?.action_date }}</div>
                      <div class="text-right">
                        <span>{{ modifiedBy(activityHis?.field_name) }}:
                          <strong class="text-primary text-weight-reqular">{{
                              activityHis?.action_performed_by
                          }}</strong>({{ activityHis?.action_performed_by_role }})</span>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator v-if="index !== activityHistory.length - 1" />
              </div>
            </q-card>
          </div>
          <div v-else>
            <q-card flat bordered >
              <no-data text="Activity history not available" />
            </q-card>
          </div>
        </q-tab-panel>
        <!-- =========================== End of Activity History Tab ================================ -->
        <!-- =========================== Start of Messages Tab ================================ -->

        <q-tab-panel name="messages" class="q-pa-none custom-border-radius message-card-height">
          <q-card flat bordered v-if="messagesData && messagesData.length">
            <template v-for="(message, messageIndex) in messagesData" :key="message">
              <q-card-section class="pa-ten">
                <div class="flex justify-between items-center">
                  <div>{{ `${message.first_name} ${message.last_name} ${!!message.practice_role ?
                      `(${(message.practice_role)})` : ''} sent a
                  message.`}}</div>
                  <div class="text-caption text-grey flex items-center">
                    {{ message.created_date }}
                    <q-btn flat :loading="messageIndex === messageLoadingIndex" color="primary" class="q-pa-none"
                      @click="getMessageDetailByCMID(message.cmid, messageIndex)" icon="keyboard_double_arrow_right">
                      <template v-slot:loading>
                        <q-spinner-facebook />
                      </template>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator v-if="index !== messagesData.length - 1" />
            </template>
          </q-card>
          <div v-else>
            <q-card flat bordered >
              <no-data text="No messages to display" />
            </q-card>
          </div>
        </q-tab-panel>
        <!-- =========================== End of Messages Tab ================================ -->
        <!-- =========================== Start of Calling Tab ================================ -->
        <q-tab-panel name="calling" class="q-pa-none custom-border-radius">
          <q-card flat bordered>
            <q-card-section>
              <div class="flex justify-between items-center">
                <div>
                  Dr. Hasnain Abbasi (Practice Admin) initiated a Quick Call.
                </div>
                <div class="text-caption text-grey">02-06-2021 01:00 PM</div>
              </div>
            </q-card-section>
          </q-card>
          <q-card flat bordered>
            <q-card-section>
              <div class="flex justify-between items-center">
                <div>Quick Call missed by Mr. Kylie Jacob.</div>
                <div class="text-caption text-grey">02-06-2021 01:00 PM</div>
              </div>
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <!-- =========================== Start of Calling Tab ================================ -->
      </q-tab-panels>
    </div>
  </div>
</template>
    
<script setup >
import { computed, ref, watch } from "vue";
import NoData from "../../views/noData.vue";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useProcessedTabsStore } from "../../stores/processedTabs";
import { useBiDirectionalMessage } from "../..//stores/biDirectionalMessage";

const OCstore = useOnlineConsultationStore();
const processedTabs = useProcessedTabsStore();
const biDirectStore = useBiDirectionalMessage();
const state = computed(() => OCstore.ocSummaryData?.status);
// watch(state, (currentValue) => {
//   tab.value = currentValue == "Pending" ? "activityHistory" : "ocReview";
// });
const ocReview = computed(() => processedTabs.ocReview);
const messagesData = computed(() => biDirectStore.messages);

const ocReviewSkelton = computed(() => processedTabs.showSkelton);
const activityHistory = computed(() => processedTabs.activityHistory);
const tab = ref("ocReview");
const messageLoadingIndex = ref(-1);
const getMessageDetailByCMID = async (id, index) => {
  messageLoadingIndex.value = index
  await biDirectStore.getMessagesByCMID(id)
  messageLoadingIndex.value = -1
}
const showCallingTab = computed(() => OCstore.showConfigration['oc-calling-integration'])
const showMessageTab = computed(() => OCstore.showConfigration['oc-bdm-integration'])
const modifiedBy = (value) => {
  let textObject = {
    'Status': 'Processed by',
    'Request Another OC': 'Requested by',
    'Assign Practice Role': 'Assigned by'
  }
  return textObject[value] ?? 'Modified by'
}
</script>
    
<style scoped>
.submit-btn {
  font-size: 0.95rem !important;
  text-transform: none;
  padding: 1.1rem 1.6rem;
}

.cardScrollHeight {
  max-height: 300px;
  overflow-y: auto;
}

.cus-btn-outline {
  border: 1px solid #d5d5d5;
}

.cus-blue-btn-outline {
  border: 1px solid #274f9f;
}

.activity-new {
  max-width: 250px;
}

.message-height {
  max-height: 15vh;
  overflow-y: hidden;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  padding: 6px;
  margin-bottom: 10px;
}

.message-height:hover {
  overflow-y: auto;
}

.message-card-height {
  max-height: 38vh;
  overflow-y: hidden;
}

.message-card-height:hover {
  overflow-y: auto;
}

.message-text {
  position: absolute;
  top: 6px;
  left: 29px;
  background: white;
  padding-inline: 3px;
  font-weight: 600;
}
</style>
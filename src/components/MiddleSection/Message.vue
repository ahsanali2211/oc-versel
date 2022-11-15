<template>
  <q-card class="my-ten" flat bordered>
    <q-card-section class="q-pa-none">
      <q-expansion-item v-model="openMessageArea">
        <template v-slot:header>
          <q-item-section class="text-weight-bold"> Message </q-item-section>
          <div class="text-area-badge" v-if="openMessageArea"><span>{{3000 - message.text.length}}/{{3000}}</span></div>
        </template>
        <q-card class="">
          <q-separator />
          

          <q-card-section class="q-py-none">
            <div class="">
              <q-input
                borderless
                autogrow
                :maxlength="3000"
                v-model.trim="message.text"
                :rows="1"
                 input-style="max-height: 6em"
                type="textarea"
                placeholder="Write message..."
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none" v-if="preDraftedMessage && preDraftedMessage.length">
            <q-separator />
            <q-expansion-item
              :disable="preDraftedMessage && !preDraftedMessage.length"
              v-model="showPredrafted"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <img
                    width="24"
                    src="../../assets/Images/pre-drafted-message.svg"
                    alt="pre drafted message"
                  />
                </q-item-section>

                <q-item-section> Pre-Drafted Messages</q-item-section>
              </template>
              <q-separator />
              <q-card
                v-if="preDraftedMessage && preDraftedMessage.length > 0"
                class="pre-drafted-message"
              >
                <q-card-section
                  v-for="draftMessage in preDraftedMessage"
                  :key="draftMessage.key"
                  @click="
                    (message.text = draftMessage.message[0]),
                      (message.key = draftMessage.key),
                      showPredrafted=false"
                  class="q-pb-none cursor-pointer q-px-none"
                >
                  <p class="m-0 q-px-none">
                    <span class="q-px-lg block">{{
                      draftMessage.message[0]
                    }}</span>
                  </p>
                  <q-separator class="q-mt-md" />
                </q-card-section>
              </q-card>

              <q-card v-else>
                <q-card-section class="text-center q-py-xl">
                  <NoData />
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
  <Process :message="message" />
</template>
    
<script setup>
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import Process from "./Process.vue";
import NoData from "../../views/noData.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
const showPredrafted = ref(false)
const openMessageArea = ref(true)
const message = reactive({
  text: "",
  key: "noaction",
});

const store = useOnlineConsultationStore();
const ocSummaryData = computed(() => store.ocSummaryData);

const preDraftedMessage = ocSummaryData.value.predefined_messages ?? null;
</script>
    
<style scoped>
.pre-drafted-message {
  height: 155px;
  resize: vertical;
  overflow-y: auto;
}
.text-area-badge {
  position: relative;
  border-top: 1px solid #dfdfdf;
 }
.text-area-badge span {
  display: inline-block;
  border: 1px solid #ccc;
  color: #999;
  position: absolute;
  top: 30px;
  right: 0px;
  padding: 0 5px;
  font-size: 11px;
  border-radius: 4px;
  background-color: #fff;
  z-index: 1;
}
</style>
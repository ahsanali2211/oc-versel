<template>
  <div class="support-section">
    <q-btn
      class="support-btn text-white text-weight-bold text-capitalize"
      rounded
      @click="supportBoxOpen = true"
      v-if="!supportBoxOpen"
    >
      <q-icon name="help" size="sm" class="q-mr-sm" />
      Support
    </q-btn>

    <!-- Support Data -->
    <q-card class="support-card" v-else>
      <q-card-section class="bg-custom-blue text-white">
        <div class="text-center text-weight-bold relative">
          <q-icon
            name="keyboard_backspace"
            class="absolute back-icon"
            v-if="openResultDetail"
            size="sm"
            @click="openResultDetail = false"
          ></q-icon>
          Support
          <q-icon
            name="remove"
            class="absolute remove-icon"
            @click="supportBoxOpen = false"
          ></q-icon>
        </div>

        <q-input
          outlined
          placeholder="How can we help ?"
          class="q-mt-sm"
          bg-color="white"
          v-if="result && !openResultDetail"
          clearable
          v-model="searchSupport"
          @keyup.enter="searchSupport && getResult()"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <!-- Before result -->
        <q-input
          outlined
          placeholder="How can we help ?"
          clearable
          v-model="searchSupport"
          v-if="!result"
          @keyup.enter="searchSupport && getResult()"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- After result -->
        <div class="result-box text-left" v-else>
          <div class="text-weight-bold q-py-sm" v-if="!openResultDetail">
            Top results
          </div>
          <div v-for="data in result" :key="data.id">
            <ol type="1" class="q-pl-md q-my-sm" v-if="!openResultDetail">
              <li>
                <a href="javascript:void(0)" @click="openResultDetail = true">{{
                  data.name
                }}</a>
              </li>
            </ol>
            <div v-else>
              <div class="flex no-wrap items-start">
                <h6 class="q-ma-none">{{ data.title }}</h6>
                <a
                  class="text-black"
                  style="text-decoration: none"
                  target="_blank"
                  :href="data.html_url"
                >
                  <q-icon
                    name="open_in_new"
                    size="xs"
                    class="q-pa-sm cursor-pointer"
                  ></q-icon>
                </a>
              </div>
              <div class="q-mt-sm" v-html="data.body"></div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="result" class="q-px-none q-pb-none">
        <div class="text-right q-pa-md shadow-up-2">
          <q-btn
            class="
              text-white
              bg-custom-blue
              text-capitalize text-weight-bold
              custom-border-radius
            "
            >Contact Us</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const supportBoxOpen = ref(true);
const openResultDetail = ref(false);
const searchSupport = ref("");
const result = ref(null);

const getResult = () => {
  result.value = [
    {
      id: 360004572397,
      url: "https://dr-iq.zendesk.com/api/v2/help_center/en-gb/articles/360004572397-Can-I-request-a-blood-test-on-Dr-iQ-.json",
      html_url:
        "https://support.dr-iq.com/hc/en-gb/articles/360004572397-Can-I-request-a-blood-test-on-Dr-iQ-",
      author_id: 368963478998,
      comments_disabled: false,
      label_names: [],
      draft: false,
      promoted: false,
      position: 3,
      vote_sum: 0,
      vote_count: 4,
      section_id: 360001501558,
      created_at: "2020-01-02T15:56:38Z",
      updated_at: "2022-03-24T13:32:10Z",
      edited_at: "2021-06-10T08:13:47Z",
      name: "Can I request a blood test on Dr. iQ?",
      title: "Can I request a blood test on Dr. iQ?",
      body: '<p><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'>Yes, you can request a blood test on Dr. iQ by following the below steps:</span></p>\n<ul>\n<li><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'> Go to Online Consultation</span></li>\n<li><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'>Select Request a Blood Test. </span></li>\n<li><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'>Proceed further as required</span></li>\n</ul>\n<p><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'>If this request is for a family member, please choose \'\'<strong>This e-consultation is for someone else registered at the same practice</strong>" and proceed from there. Please note that the person you are requesting this for <strong>MUST</strong> be registered at the same practice as you.<br></span></p>\n<p><span data-sheets-value=\'{"1":2,"2":"Yes, you can request a blood test on Dr. iQ. Go to Online Consultation and select Request a Blood Test. Your request will be processed by your GP practice, usually within 1 working day."}\' data-sheets-userformat=\'{"2":897,"3":{"1":0},"10":0,"11":4,"12":0}\'>Your request will be processed by your GP practice, usually within 1 working day.</span></p>',
      source_locale: "en-gb",
      locale: "en-gb",
      outdated: false,
      outdated_locales: [],
      permission_group_id: 832254,
      user_segment_id: null,
      result_type: "article",
      rank: 1,
    },
  ];
};
</script>

<style scoped>
.support-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.support-section {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 9999;
  width: 350px;
  text-align: right;
}
.support-btn {
  background-color: #0029a3;
  padding: 0.5rem 1.3rem;
  letter-spacing: 0.6;
  font-size: 1.07143rem;
}

.bg-custom-blue {
  background-color: #0029a3;
}

.remove-icon,
.back-icon {
  right: 0;
  left: auto;
  top: 5px;
  cursor: pointer;
}

.back-icon {
  left: 0;
  right: auto;
  top: 0px;
}

.result-box {
  max-height: 300px;
  overflow-y: auto;
  -webkit-box-flex: 2;
  flex-grow: 2;
}
</style>
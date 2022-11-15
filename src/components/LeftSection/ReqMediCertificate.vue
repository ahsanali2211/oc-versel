<template>
  <div v-if="summarydata">

  <!-- skeleton for label -->
  <q-skeleton width="200px" height="32px" v-if="summaryLabel === undefined" />
    <h5 class="q-ma-none text-primary text-weight-bold req-med-heading" v-else>
      {{summaryLabel ?? 'N/A'}} 
    </h5>
    <q-list class="">
      <q-item class="q-pa-none items-start">
        <q-item-section avatar class="q-pt-xs">
          <!-- skeleton for svg image -->
          <div v-if="Object.keys(summarydata).length" class="img-div">
           <img :src="summarydata.icon" class="avatar-img" height="30" width="30" alt="No Icon">
          </div>
          <q-skeleton v-else type="QToggle" />
        </q-item-section>

        <!-- skeleton for summary data -->
        <q-item-section v-if="!summarydata.submitted_date && !summarydata.status">
            <q-skeleton type="text" height="24px" size="xs" />
            <q-skeleton type="text" height="24px" size="xs" />
            <q-skeleton type="text" height="24px" />
        </q-item-section>

        <q-item-section v-else>   
          <div class="label-text">
            <strong>Submitted on:</strong>
            <span class="q-ml-md">{{summarydata.submitted_date}}</span>
          </div>
          <div class="label-text" v-if="summarydata.processed_date">
            <strong>Processed on:</strong>
            <span class="q-ml-md">{{summarydata.processed_date}}</span>
          </div>
          <div class="label-text">
            <strong>Status :</strong>
            <span class="q-ml-md">{{summarydata.status }}</span>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

  import { computed, watch } from '@vue/runtime-core';
  import { useMeta } from 'quasar'
  import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
const metaData = {
  // sets document title
  title: 'OC | ',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} ${summaryLabel.value}`,
  // meta tags
 
  }
const store = useOnlineConsultationStore();
const summarydata = computed(() => store.ocSummaryData);
const summaryLabel = computed(() => summarydata.value.label);
const changeSource =(icon)=>{
  const bgIcon = icon.replace('icon','bg_icon')
  return bgIcon
}
watch(summaryLabel,()=>{
useMeta(metaData)
})

</script>


<style scoped>
/* =============these three clases is used for svg  */
.st0{fill:url(#frame_00000132792655079676031470000000268581168436005556_);}
	.st1{fill:none;}
	.st2{fill:#FFFFFF;}
  /* ========================== */
.req-med-heading {
  font-size: 22px;
}
.label-text span {
  color: #7c7c7c;
}
.label-text strong {
  font-weight: bold;
  display: inline-block;
  min-width: 75px;
}
.label-text * {
  font-size: 12px;
}
.avatar-img{
  width: 30px;
  height: 30px;
}
.img-div{
  height: 48px;
  width: 48px;
  border-radius: 4px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
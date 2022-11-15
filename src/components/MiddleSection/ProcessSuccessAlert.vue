<template>
  <q-banner
    v-if="OCStore.notificationAlert.show"
    inline-actions
    rounded
    :class="
      OCStore.notificationAlert.type == 'error'
        ? 'alert-danger'
        : 'alert-success'
    "
    class="mb-ten alert full-width custom-border-radius"
  >
    <div class="text-caption">
      <q-icon
        size="sm"
        class="text-weight-medium q-pr-md"
        :color="
          OCStore.notificationAlert.type == 'error' ? '#842029' : 'green-5'
        "
        :name="
          OCStore.notificationAlert.type == 'error' ? 'error' : 'check_circle'
        "
      />

      {{ OCStore.notificationAlert.text }}
    </div>
    <template v-slot:action>
      <q-icon
        size="xs"
        name="close"
        style="cursor: pointer !important"
        @click="OCStore.notificationAlert.show = false"
      />
    </template>
  </q-banner>
</template>
    
<script setup >
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
const OCStore = useOnlineConsultationStore();
</script>
    
<style>
.alert {
  position: sticky;
  top: 8px;
  width: calc(50vw - 19px);
  z-index: 10;
}
.alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  text-shadow: #c3e6cb;
}
</style>
<template>
  <AssignTo />

  <!-- =========================== Start of  Notes Expentional Panel ================================ -->
  <Notes group="noteGroup" />
  <!-- =========================== End of  Notes Expentional Panel ================================ -->
  <RequestAnotherOC group="noteGroup"  />
  <!-- =========================== End of  Request Another Online Consultation Expentional Panel ================================ -->
  <CallMessageAndAppointment />

</template> 
<script setup>
import AssignTo from './AssignTo.vue'
import Notes from './Notes.vue'
import RequestAnotherOC from './RequestAnotherOC.vue'
import CallMessageAndAppointment from './callMessageAppointment.vue'

</script> 
<style >
.perentClass .custom-border-another-oc {
  border: 1px solid #ffa100 !important;
}

.selected-oc {
  background: rgb(240, 39, 39);
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
</style>

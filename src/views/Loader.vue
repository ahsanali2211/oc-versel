<template>
  <div :style="{height:props.height ? props.height : '100vh'}" class="flex items-center justify-center">
    <div>
         <div class="loader"></div> 
        <div class="text-center q-mt-md text-h6">Fetching Data...</div> 
    </div>
  </div>
</template>
    
<script setup>

const props = defineProps({
  height: String
});

</script>
    
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: spin 1.5s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
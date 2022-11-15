<template>
  <q-footer class="bg-white text-black" bordered>
    <div
      class="flex items-center justify-between q-px-lg"
      style="min-height: 48px"
    >
      <div class="text-subtitle2">Dr. iQ 2022. All rights reserved.</div>
       <div class="text-subtitle2 q-ml-auto">
        <router-link
          to="#"
          class="text-black q-mr-lg"
          style="text-decoration: none"
        > 
          <a :href="drIqUrl " style="text-decoration: none;color:#000">  Dr. iQ Website</a>
        </router-link>
        <router-link
          class="text-black q-mr-lg"
          style="text-decoration: none"
        >
        <a :href="`${drIqUrl}Report-problem`" style="text-decoration: none;color:#000"> Report a Problem</a>
          
        </router-link>
        <router-link  class="text-black" style="text-decoration: none">
          <a :href="`${drIqUrl}contact-us`" style="text-decoration: none;color:#000">Contact Us</a>
        </router-link>
      </div>
    </div>
  </q-footer>
</template>
<script setup>
 const drIqUrl=import.meta.env.VITE_DR_IQ_WEBSITE
</script>

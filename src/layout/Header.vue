<template>
  <q-header class="bg-white q-py-xs q-px-lg" bordered>
    <div class="flex items-center justify-between" style="min-height: 50px">
      <div class="flex">
        <a :href="`${drIqUrl}secure`">
          <img
            src="https://qa-app.dr-iq.com/assets/img/top-header/header-logo.svg"
            alt=""
            style="vertical-align: middle"
          />
        </a>
      </div>
 
      <q-list class="flex">
        <q-item
          clickable
          class="text-black q-px-sm"
          :href="`${drIqUrl}secure/appointment/appointment-list`"
        >
          <q-item-section avatar class="q-pa-none" style="min-width: 30px">
            <q-icon color="black" name="calendar_today" />
          </q-item-section>

          <q-item-section>Appointments</q-item-section>
        </q-item>
        <q-item clickable class="text-black q-px-xs">
          <q-btn-dropdown
            class="notification-dropdown"
            flat
            unelevated
            content-class="notification-overflow"
            no-caps
            :dropdown-icon="false"
            @click="!notificationList && handleNotifications()"
          >
            <template v-slot:label>
              <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                <q-btn
                  color="white"
                  flat
                  padding="none"
                  size="md"
                  class="text-black"
                  icon="notifications_none"
                >
                  <q-badge rounded floating color="red" />
                </q-btn>
              </q-item-section>

              <q-item-section>Notifications</q-item-section>
            </template>
            <div class="relative" style="width: 320px" v-if="notificationList">
              <q-list class="notification-dropdown-list">
                <q-item
                  :href="notification.redirect_url"
                  target="_blank"
                  v-ripple
                  v-for="(notification, index) in notificationList"
                  :key="index"
                  style="border-bottom: 1px solid #dadada"
                >
                  <q-item-section avatar>
                    <q-img
                      :src="notification.image"
                      alt="notificaition-image"
                    />
                  </q-item-section>

                  <q-item-section class="text-primary">
                    <h4 class="text-body2 q-ma-none">
                      {{ notification.title }}
                    </h4>
                    <small>{{ notification.date_updated }}</small>
                  </q-item-section>
                </q-item>
              </q-list>
                <q-item :href="`${drIqUrl}secure/list-notifications`" class="justify-center gp-content-header">
              <div class="see-all absoute text-primary text-center q-py-sm">
                See all notifications
              </div>
                </q-item>
            </div>
            <q-list style="width: 320px; max-height: 300px" v-else>
              <q-item
                v-for="(sekelton, index) in 6"
                :key="index"
                class="q-mb-sm"
                style="border-bottom: 1px solid #dadada"
              >
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton height="10px" type="QSlider" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item>
        <q-item>
          <q-btn-dropdown
            flat
            padding="none"
            :rounded="false"
            unelevated
            no-caps
            dropdown-icon="expand_more"
            color="grey"
          >
            <template v-slot:label>
              <q-avatar size="md">
                <img
                  :src="
                    userInfo.profile_image
                      ? userInfo.profile_image 
                      : 'https://qa-app.dr-iq.com/assets/img/dashboard/user.svg'
                  "
                  alt="no"
                />
              </q-avatar>
            </template>
            <q-list class="header-dropdown-list" style="width: 220px">
              <q-item class="q-py-xs min-height">
                <q-item-section style="font-size: 13px">
                  <q-item-label class="text-primary"
                    >You are login as
                    <span class="text-capitalize">{{
                      userInfo.logged_in_as
                    }}</span></q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                clickable
                class="q-py-xs min-height"
                :href="`${drIqUrl}secure/profile`"
              >
                <q-item-section avatar>
                  <q-item-label class="text-primary"
                    ><q-icon name="person" size="xs" class="q-mr-sm" />
                    Profile</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                clickable
                class="q-py-xs min-height"
                v-close-popup
                :href="`${drIqUrl}secure/change-password`"
              >
                <q-item-section>
                  <q-item-label class="text-primary"
                    ><q-icon name="lock" size="xs" class="q-mr-sm" /> Change
                    Password</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-separator />
              <!-- <p>dd</p> -->
              <q-item
                clickable
                class="q-py-xs min-height"
                v-close-popup
                :href="`${drIqUrl}logout`"
              >
                <q-item-section>
                  <q-item-label class="text-primary">
                    <q-icon name="logout" size="xs" class="q-mr-sm" />
                    Logout
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item>
      </q-list>
    </div>
  </q-header>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { inject } from 'vue'
import { onMounted } from "@vue/runtime-core";
import icon from "../assets/Images/onlineconsultation_notifcation-icon.png";
import {getUserToken,onMessageListener} from '../firebase'
import { useNotificationStore } from "../stores/notifications";
const props = defineProps({
  userInfo: Object,
});

const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;
 const store = useNotificationStore();
const notificationList = ref(null);

const handleNotifications = () => {
  store
    .getNotifications()
    .then((response) => {
      notificationList.value = response.data.notifications;
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(()=>{
  handleNotifications()
  // getUserToken()
  // onMessageListener().then(payload => {
  //   // setShow(true);
  //   // setNotification({title: payload.notification.title, body: payload.notification.body})
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));
 
//  if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('firebase-messaging-sw.js')
//     .then(reg => {
//       console.log(`Service Worker Registration (Scope: ${reg.scope})`);
//     })
//     .catch(error => {
//       const msg = `Service Worker Error (${error})`;
//       console.error(msg);
//     });
// } else {
//   // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
//   console.warn('Service Worker not available');
// }
 
 })
 
 
 
</script>

<style scoped>
.min-height {
  min-height: 36px;
}
.see-all {
  bottom: 0;
  z-index: 2;
  left: 0;
  right: 0;
}
</style>
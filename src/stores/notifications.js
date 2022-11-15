import { defineStore } from 'pinia'
import { privateUrl } from '../axiosIntegration';

export const useNotificationStore = defineStore('notifications', {
    state: () => {
        return {
            notification: null,
        }
    },

    actions: {
        async getNotifications() {
            return await privateUrl.get('notifications');
        }
    }
})
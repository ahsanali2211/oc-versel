<template>

    <q-banner v-if="warningZone" inline-actions rounded class="alert alert-warning alert1 ">
        You will be logout after 1 min move your mouse on screen to reset Logout timer
    </q-banner>

</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const warningZone = ref(false)
        const warningTimer = ref(null)
        const interval = ref(null)
        const logoutTimer = ref(null)
        const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;
        return {
            warningZone,
            drIqUrl,
            warningTimer,
            interval,
            logoutTimer,
            event: ['click',
                'mousemove',
                'mousedown',
                'keypress',
                'scroll',
                'load']
        }
    },

    mounted() {
        this.event.forEach(function (event) {
            window.addEventListener(event, this.resetTimer)
        }, this)
        this.setTimer()
    },
    unmounted() {
        this.event.forEach(function (event) {
            window.removeEventListener(event, this.resetTimer)
        }, this)
        this.resetTimer()
    },
    methods: {
        setTimer() {
            this.warningTimer = setTimeout(this.warningMessage, 59 * 60 * 1000)
            this.logoutTimer = setTimeout(this.LogOutUser, 60 * 60 * 1000)
            if (this.warningZone == true) {
                setTimeout(() => {
                    this.warningZone = false
                }, 3000)
            }

            this.interval = setInterval(() => {
                // console.log('checkLogout');
            }, 1000)
        },
        warningMessage() {
            this.warningZone = true
        },
        resetTimer() {
            clearTimeout(this.warningTimer)
            clearTimeout(this.logoutTimer)
            // console.log('reset');
            clearInterval(this.interval)
            this.setTimer()
        },
        LogOutUser() {
            window.open(`${this.drIqUrl}logout`, '_self')
        }
    }
}
</script>

<style  scoped>
.alert1 {
    border: 1px solid transparent;
    border-radius: 8px;

}

.alert {
    position: sticky;
    top: 8px;
    width: calc(50vw - 38px);
    z-index: 15;
}


.alert-warning {
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
}
</style>
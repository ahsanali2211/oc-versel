<template>
    <div>
        <video width="248" controls  :id="videoId" :class="sourceProps.isSend ? 'left' :'right'"  class="video-radius" controlsList = "playbackrate download fullscreen"  @play="playVideo">
                <source :src="sourceProps.src" type="video/mp4">
                <source :src="sourceProps.src" type="video/ogg">
                <track label="English" kind="subtitles" srclang="en" src="">
                Your browser does not support HTML video.

              </video>
             
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    props:['src'],
    setup (props) {
        const sourceProps = props
        return {
            sourceProps,
            videoId:`video-${Math.floor(Math.random() * 1111)}`
        }
    }, 
    methods: {
        playVideo() {
            let element = document.getElementById(this.videoId)
            this.$emit('stopOtherVideo',element)
        }
    },
}
</script>

<style   scoped>
    .right{
        border-radius: 4px 18px 0px 0px;
    }
    .left{
        border-radius: 18px 4px 0px 0px;
    }

</style>
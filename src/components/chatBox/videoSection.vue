<template>
    <div>
        <div class="flex justify-center">
            <div class="video-main">
                <video v-show="video.recording" id="preview" width="248" height="186" autoplay muted></video>
                <video v-show="!video.recording" id="display" width="248" height="186" muted controls></video>
                <div class="timer flex items-center" v-if="video.recording">
                    <q-icon size="12px" color="red" name="fiber_manual_record"></q-icon> {{ new Date(video.timer *
                            1000).toISOString().substr(14, 5)
                    }}
                </div>
                <q-btn class="stop-btn" @click="stopVideoRecording" v-if="video.recording">
                    <q-icon name="stop" size="sm" color="red" class="q-pa-none" />
                    <!-- <img src="src\assets\Images\video\stop-video.svg" alt="ghj"> -->
                </q-btn>
            </div>
        </div>
        <q-card-section class="flex justify-between items-center pa-ten">

            <div>
                <q-btn class="q-pa-none q-pr-xs" @click="closeVideoSection">
                    <img :src="cancelImg" alt="cli" v-if="video.recording">
                    <img :src="deleteImg" alt="del" v-else>
                </q-btn>
            </div>
            <div>
                <q-btn color="primary" size="11.6px" class="text-capitalize q-pl-sm q-pr-xs" label="Send"
                    @click="handleSendVideo" :loading="videoLoader" :disable="video.recording">
                    <q-icon class="send-msg-icon" size="14px" name="send" />
                </q-btn>

            </div>

        </q-card-section>
    </div>

</template>
<script>
import cancelImg from '../../assets/Images/video/cancel-video.svg';
import deleteImg from '../../assets/Images/video/delete-video.svg';
// const imageUrl = new URL('../../assets/Images/video/cancel-video.svg', import.meta.url)
export default {
    props: ['closeVideoSection'],
    data() {
        return {
            cancelImg: cancelImg,
            deleteImg: deleteImg,
            videoLoader: false,
            videoRecLimit: Number(import.meta.env.VITE_VIDEO_RECORDING_LIMIT),
            video: {
                recording: false,
                recorder: null,
                timer: 0,
                recordedChunks: [],
                videoStreams: null,
            }
        }
    },
    methods: {
        handleSendVideo() {
            this.videoLoader = true
            let videoBlob = new Blob(this.video.recordedChunks, { type: "video/mp4" });
            const fileName = Math.random().toString().substr(2) + ".mp4";
            let file = new File([videoBlob], fileName, { type: "video/mp4" });
            this.$emit('SendVideo', { file, fileName })

        },
        startVideoRecording() {
            this.video.recording = true;
            this.video.recordedChunks = []

            navigator.mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then((stream) => {
                    let preview = document.getElementById("preview");
                    preview.muted = true;
                    this.video.recorder = new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp8'});
                    this.video.recorder.ondataavailable = (e) => {
                        this.video.recordedChunks.push(e.data);
                        if (this.video.timer === this.videoRecLimit) {
                            this.stopVideoRecording()
                        }
                        this.video.timer++;
                    };
                    this.video.recorder.start(1000);
                    this.video.videoStreams = stream;
                    preview.srcObject = stream;
                    preview.captureStream =
                        preview.captureStream || preview.mozCaptureStream;
                    return new Promise((resolve) => (preview.onplaying = resolve));
                })
                .catch((errors) => console.log(errors));
        },
        stopVideoRecording() {
            if (this.video.videoStreams) {
                this.video.recording = false;
                this.video.timer = 0;
                let display = document.getElementById("display")
                let videoBlob = new Blob(this.video.recordedChunks, { type: "video/mp4" });
                const videoUrl = URL.createObjectURL(videoBlob);
                display.src = videoUrl;
                display.load();
                // display.pause();
                // display.currentTime = 1;
                this.video.recorder.stop();
                this.video.videoStreams.getTracks().forEach((track) => track.stop());
                this.video.videoStreams = null;
            }
        },
    },
    mounted() {
         this.startVideoRecording()
     },
    beforeUnmount() {
        if (this.video.videoStreams) {
            this.video.recorder.stop();
            this.video.videoStreams.getTracks().forEach((track) => track.stop());
        }
    },

}
</script>
<style scoped>
.video-main {
    position: relative;
    width: 250px;
    height: 188px;
    border-radius: 4px;
}

.stop-btn {
    background: black;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid white;
    bottom: 5px;
    position: absolute;
    right: 42%;
}

.video-main video {
    border-radius: 4px;
    border: 2px solid #00A886;
    position: absolute;
    left: 0;
    top: 0;
}

.timer {
    color: #fff;
    -webkit-backdrop-filter: blur(1.2px);
    backdrop-filter: blur(1.2px);
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 1;
    position: absolute;
    right: 0;
    margin: 8px;
    font-size: 12px;
    padding: 4px;
    font-weight: 600;
    padding-inline: 6px;
    padding-block: 3px;
    border-radius: 4px;
}

.send-msg-icon {
    transform: rotate(-40deg);
    padding: 0 0 0 6px;
}

.timer .dot {
    height: 10px;
    width: 10px;
    background-color: red;
    /* display: inline-block; */
}
</style>

<template>
    <audio controls class="audiplay" style="width:248px;height:40px">
        <source :src="src.fileLocation" type="audio/ogg">
        <source :src="src.fileLocation" type="audio/mpeg">
        No audio support.
    </audio>
    <!-- <div class="flex items-center justify-between" style="scroll-behavior: smooth;">
        <div>
            <q-btn class="q-pa-none" @click="handlePlayPause">
                <q-icon size="30px" :color="!isSend ? 'white' : 'primary'"
                    :name="!checkIsPlaying ? 'play_circle_filled' : 'pause_circle_filled'" />
            </q-btn>
        </div>
        <div :id="wavesurferId" class="wave-surfer"></div>
        <div @click="handlePlayBack" class="play-rate" :style="{ 'background-image': `url(${bgcircle})` }">
             <span class="set-playback " :class="!isSend && 'text-white'">{{ playRate }}x</span>
        </div>
    </div>  -->
    <!-- <div class="flex justify-center items-center">
        <div class="flex time-date items-center justify-between" :class="!isSend && 'text-white'">
            <div>{{ computeAudioTime }}</div>
        </div>
        <div class="download-icon" @click="downloadAttachment(src)">
            <q-icon name="file_download" :color="!isSend ? 'white' : 'grey'" />
        </div>
    </div>  -->

</template>
<script>
import WaveSurfer from 'wavesurfer.js'
import { v4 as uuidv4 } from 'uuid';
import bgcircle from '../../assets/Images/audio/bg-circle.svg'
export default {
    props: ['src', 'isSend', 'downloadAttachment'],
    data() {
        return {
            wavesurfer: null,
            wavesurferId: `wavesurfer-${uuidv4()}`,
            checkPlay: false,
            audioTime: 0,
            bgcircle: bgcircle,
            playRate: 1
        }
    },
    unmounted() {
        // this.wavesurfer.destroy();
    },
    mounted() {

        let token = localStorage.getItem('token')
        let xhr = {
            cache: 'default',
            mode: 'cors',
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            referrer: 'client',
            headers: [
                { key: 'Authorization', value: `Bearer ${token}` },
                { key: 'Access-Control-Allow-Origin', value: 'origin-list' }
            ]
        }
        // this.wavesurfer = WaveSurfer.create({
        //     container: `#${this.wavesurferId}`,
        //     backend: 'WebAudio',
        //     hideScrollbar: true,
        //     maxCanvasWidth: 180,
        //     height: 18,
        //     barGap: 2,
        //     height: 18,
        //     hideCursor: false,
        //     cursorWidth: 0,
        //     waveColor: this.isSend ? '#d4d4d4' : '#cccccc',
        //     progressColor: this.isSend ? '#4c78ff' : '#fff',
        //     barWidth: 2,
        //     barHeight: 3,
        //     barMinHeight: 1,
        // });
        // this.wavesurfer.load(this.src.fileLocation)
        // this.wavesurfer.on('ready', () => {
        //     this.audioTime = Math.floor(this.wavesurfer.getDuration())
        // });
    },
    computed: {
        checkIsPlaying() {
            if (this.wavesurfer) {
                this.wavesurfer.on('ready', () => {
                    this.isPlay()
                });
                this.wavesurfer.on('pause', () => {
                    this.isPlay()
                });
                this.wavesurfer.on('audioprocess', () => {
                    this.isPlay()
                });
                this.wavesurfer.on('finish', () => {
                    this.isPlay()
                    this.wavesurfer.stop()
                });
                return this.checkPlay
            }
        },
        computeAudioTime() {
            if (this.wavesurfer) {
                this.wavesurfer.on('audioprocess', () => {
                    this.audioCurrentTime()
                });
                return new Date(this.audioTime * 1000).toISOString().substr(14, 5)
            }
        }
    },
    methods: {
        async getFilefromURL() {

            var filename = this.src.fileLocation.substring(this.src.fileLocation.lastIndexOf("/") + 1).split("?")[0];
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                console.log(window.URL.createObjectURL(xhr.response));
                // var a = document.createElement('a');
                // a.href = window.URL.createObjectURL(xhr.response);
                // a.download = filename;
                // a.style.display = 'none';
                // document.body.appendChild(a);
                // a.click();
            };
            xhr.open('GET', this.src.fileLocation);
            xhr.send();

         return
            let file = await fetch('https://d2mpld65q5jp7w.cloudfront.net/1662652847904-33521244962046104.mp4')
                .then(r => r.blob())
                .then(blobFile => URL.createObjectURL(blobFile))
                .catch(err => console.log(err))
            console.log(file);

            this.wavesurfer.load(this.src.fileLocation)
        },
        handlePlayBack() {
            this.playRate = this.playRate == 2 ? 0.5 : this.playRate + 0.5
            console.log(this.wavesurfer);
            this.wavesurfer.setPlaybackRate(this.playRate)

        },
        audioCurrentTime() {
            this.audioTime = Math.floor(this.wavesurfer.getCurrentTime())
        },
        audioGetDuration() {
            if (
                this.wavesurfer
            ) {
                // this.audioTime = Math.floor(this.wavesurfer.getDuration())
                console.log(this.wavesurfer.getDuration());
                let duration = Math.floor(this.wavesurfer.getDuration())
                if (duration >= Infinity) { // streaming audio
                    console.log(this.wavesurfer.backend.getDuration())
                    duration = this.wavesurfer.getDuration()
                }
                this.audioTime = duration
            }
        },
        getDuration() {
            let duration = (this.buffer || this.media).duration;
            if (duration >= Infinity) { // streaming audio
                duration = this.media.seekable.end(0);
            }
            return duration;
        },
        handlePlayPause() {

            this.wavesurfer.playPause()
            this.$emit('StopOthers', this.wavesurfer)
        },
        isPlay() {
            this.checkPlay = this.wavesurfer.isPlaying()

        }
    },
}
</script>
<style scoped>
.set-playback {
    font-size: 10px;
    cursor: context-menu;
}

.wave-surfer {
    width: 168px;
    height: 18px;
    /* position: relative; */
}

.time-date {
    width: 180px;
    font-size: 12px;
}

.play-rate {
    height: 30px;
    /* background-image: url('src/assets/Images/audio/bg-circle.svg'); */
    background-repeat: no-repeat;
    width: 30px;
    background-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.download-icon {
    padding-inline: 3px;
    cursor: pointer;
}
</style>

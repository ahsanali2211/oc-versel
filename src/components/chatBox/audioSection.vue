<template>
    <div class="flex items-center justify-between">
        <div>
            <q-btn class="q-pa-none" @click="stopRecoding" v-if="audio.recording">
                <img :src="stopAudioRecordingImg" alt="img" height="26" width="26">
            </q-btn>
            <q-btn class="q-pa-none" @click="playPauseAudio" v-else>
                <img :src="playAudioImg" alt="img" height="26" width="26" v-if="!checkIsPlaying">
                <img :src="pauseaudioImg" alt="img" height="26" width="26" v-else>
            </q-btn>
        </div>
        <div id="waveform"></div>
        <div class="timer">
            <span v-if="audio.recording">{{ computeRecordTimer }}</span>
            <span v-else>{{ computeAudioTime }}</span>
        </div>
        <div>
            <q-btn class="q-pa-none" @click="closeAudioSection" :disable="audio.recording">
                <img :src="trashAudioImg" alt="img">
            </q-btn>
        </div>
        <q-separator vertical inset />
        <div>
            <q-btn class="q-pa-none" @click="handleSendAudio" :loading="audioLoader" :disable="audio.recording">
                <img :src="sendAudioImg" alt="sd-img" height="26" width="26">
            </q-btn>
        </div>
    </div>

</template>
<script>
import WaveSurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone'
import stopAudioRecording from '../../assets/Images/audio/stop-audio-recording.svg'
import playAudio from '../../assets/Images/audio/play-audio.svg'
import pauseaudio from '../../assets/Images/audio/pause-audio.svg'
import trashAudio from '../../assets/Images/audio/trash-audio.svg'
import sendAudio from '../../assets/Images/audio/send-audio.svg'
import Best_flute from '../../assets/Images/audio/Best_flute.mp3';
export default {
    props: ['closeAudioSection'],
    data() {
        return {
            stopAudioRecordingImg: stopAudioRecording,
            playAudioImg: playAudio,
            pauseaudioImg: pauseaudio,
            trashAudioImg: trashAudio,
            sendAudioImg: sendAudio,
            audioLoader: false,
            message: 'this is message',
            recordTimer: 0,
            audioRecLimit: Number(import.meta.env.VITE_AUDIO_RECORDING_LIMIT),
            audioTime: 0,
            wavesurfer: null,
            mediaRecorder: null,
            audio: {
                audioChunks: [],
                recording: false,
                recorded: false
            },
            interval: null
        }
    },
    computed: {
        checkIsPlaying() {
            if (this.wavesurfer) {
                return this.wavesurfer.isPlaying()
            }

        },
        computeRecordTimer() {
            return new Date(this.recordTimer * 1000).toISOString().substr(14, 5)
        },
        computeAudioTime() {
            if (this.wavesurfer) {
                this.wavesurfer.on('ready', () => {
                    this.audioGetDuration()
                });
                this.wavesurfer.on('audioprocess', () => {
                    this.audioCurrentTime()
                });
                return new Date(this.audioTime * 1000).toISOString().substr(14, 5)
            }
        }
    },
    methods: {
        audioCurrentTime() {
            this.audioTime = this.wavesurfer.getCurrentTime()
        },
        audioGetDuration() {
            this.audioTime = this.wavesurfer.getDuration()
        },
        handleSendAudio() {
            this.audioLoader = true
            let blob = new Blob(this.audio.audioChunks, { type: 'audio/mpeg'})
            const fileName = Math.random().toString().substr(2) + '.mp3'
            let file = new File([blob], fileName, { type: 'audio/mpeg' });
            console.log(file);
             
            this.$emit('SendAudio', { file, fileName })
        },
        startRecording() {
            this.audio.recording = true
            this.audio.recorded = false
            const audioChunks = []
            this.wavesurfer.microphone.start();
            this.interval = setInterval(() => {
                if (this.recordTimer === this.audioRecLimit) {
                    this.stopRecoding()
                }
                this.recordTimer++
            }, 1000);
            this.wavesurfer.microphone.on('deviceReady', (stream) => {
                console.info('Device ready!',stream)
                this.mediaRecorder = new MediaRecorder(stream,{mimeType:'audio/webm'});
                this.mediaRecorder.start();
                this.mediaRecorder.addEventListener('dataavailable', event => {
                    console.log(event.data);
                    audioChunks.push(event.data);
                })
                this.audio.audioChunks = audioChunks
            })
        },
        stopRecoding() {
            this.audio.recording = false
            this.audio.recorded = true
            this.wavesurfer.microphone.stop()
            const audioChunks = this.audio.audioChunks
            clearInterval(this.interval)
            this.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                // const audio = new Audio(audioUrl);
                this.wavesurfer.load(audioUrl)
            });
        },

        playPauseAudio() {
            this.wavesurfer.playPause();
        }

    },
    unmounted() {
        this.wavesurfer.destroy();
    },
    mounted() {
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            hideScrollbar: true,
            maxCanvasWidth: 180,
            height: 18,
            barGap: 2,
            hideCursor: false,
            cursorWidth: 0,
            waveColor: '#d4d4d4',
            progressColor: '#4c78ff',
            barWidth: 2,
            barHeight: 8,
            barMinHeight: 1,
            plugins: [
                MicrophonePlugin.create({})
            ],
        });
        this.wavesurfer.load(Best_flute);
        this.startRecording()
    },
}
</script>
<style scoped>
#waveform {
    position: relative;
    width: 180px;
    height: 18px;
}

.timer span {
    font-size: 10px;
    font-weight: 600;
    color: #000;
}
</style>

// import Vue from 'vue'
import moment from 'moment-timezone'
// import Echo from 'laravel-echo'

const calculateAge = (date) => {
    const currentDate = moment()
    return Math.round(moment.duration(currentDate.diff(date)).asYears())
}

const format = (timestamp, fmt) => {
    return moment(timestamp).format(fmt)
}

const fromNow = (timestamp) => {
    return moment(timestamp).fromNow()
}

const fileExtension = (file) => {
    return file.split('.').pop().toLowerCase()
}

const attachmentLink = (mime) => {
    switch (mime) {
        case 'pdf':
        case 'doc':
        case 'docx':
            return '@/assets/img/msg/.'+mime
    }
}

const isAudio = (extension) => {
    return ['m4a', 'mpga', 'aac', 'webm', 'mp3', 'wav'].includes(extension)
}

const isVideo = (extension) => {
    return ['mp4', 'avi', 'mpg', 'mov', 'ogg', 'mpeg'].includes(extension)
}

const isFile = (extension) => {
    return ['doc', 'docx', 'pdf', 'txt'].includes(extension)
}

const isImage = (extension) => {
    return ['jpeg', 'jpg', 'png', 'svg'].includes(extension)
}

const setAttachmentLink = (type) => {
    let link = null
    switch (type) {
        case 'application/msword':
            link = require('@/assets/img/msg/doc.svg')
            break
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            link = require('@/assets/img/msg/docx.svg')
            break
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            link = require('@/assets/img/msg/docx.svg')
            break
        case 'application/pdf':
            link = require('@/assets/img/msg/pdf.svg')
            break
        case 'audio/mpeg':
            link = require('@/assets/img/msg/mp3.svg')
            break
        case 'audio/aac':
            link = require('@/assets/img/msg/aac.svg')
            break
        case 'video/mp4':
            link = require('@/assets/img/msg/mp4.svg')
            break
        case 'image/jpeg':
            link = require('@/assets/img/msg/jpeg.svg')
            break
        case 'image/jpg':
            link = require('@/assets/img/msg/jpg.svg')
            break
        case 'image/png':
            link = require('@/assets/img/msg/png.svg')
            break
    }
    return link
}

// const initiateEchoServer = () => {
//     window.io = require('socket.io-client')
//     window.Echo = new Echo({
//         broadcaster: 'socket.io',
//         host: window.location.hostname + ':6001',
//         auth: {headers: {Authorization: localStorage.getItem('token')}}
//     })

//     Vue.prototype.$echo = window.Echo
// }

// const EventBus = new Vue()
const unreadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="9.851" height="9.076" viewBox="0 0 9.851 9.076">
<g data-name="Group 8548" transform="translate(7547.851 -21333)">
    <path data-name="Path 3526" d="M-7540.811 21333.925h-5.187a1.855 1.855 0 0 0-1.853 1.853v4.446a1.855 1.855 0 0 0 1.853 1.853h5.187a1.855 1.855 0 0 0 1.853-1.853v-4.446a1.855 1.855 0 0 0-1.853-1.853zm-5.187.741h5.187a1.112 1.112 0 0 1 1.03.7l-2.838 2.837a1.114 1.114 0 0 1-1.572 0l-2.837-2.838a1.112 1.112 0 0 1 1.03-.699zm5.187 6.669h-5.187a1.112 1.112 0 0 1-1.112-1.111v-3.89l2.395 2.393a1.855 1.855 0 0 0 2.62 0l2.395-2.393v3.89a1.112 1.112 0 0 1-1.111 1.111z"/>
    <circle data-name="Ellipse 146" cx="1.5" cy="1.5" r="1.5" transform="translate(-7541 21333)" style="fill:#e83a53"/>
</g>
</svg>`
const deleteMsgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="7.19" height="8.629" viewBox="0 0 7.19 8.629">
<g data-name="Group 8546">
    <path data-name="Path 3523" d="M6.833 1.438H5.716A1.8 1.8 0 0 0 3.954 0h-.721a1.8 1.8 0 0 0-1.762 1.438H.359a.36.36 0 0 0 0 .719h.359V6.83a1.8 1.8 0 0 0 1.8 1.8h2.155a1.8 1.8 0 0 0 1.8-1.8V2.157h.36a.36.36 0 0 0 0-.719zm-3.6-.719h.719a1.081 1.081 0 0 1 1.017.719H2.218A1.081 1.081 0 0 1 3.233.719zM5.752 6.83a1.078 1.078 0 0 1-1.079 1.079H2.516A1.078 1.078 0 0 1 1.433 6.83V2.157h4.314z"/>
    <path data-name="Path 3524" d="M2.875 6.471a.36.36 0 0 0 .36-.359V3.955a.36.36 0 1 0-.719 0v2.157a.359.359 0 0 0 .359.359z"/>
    <path data-name="Path 3525" d="M4.314 6.471a.359.359 0 0 0 .359-.359V3.955a.36.36 0 1 0-.719 0v2.157a.359.359 0 0 0 .36.359z"/>
</g>
</svg>`

export {
    calculateAge,
    unreadSvg,
    deleteMsgSvg,
    format,
    fromNow,
    fileExtension,
    attachmentLink,
    isAudio,
    isVideo,
    isFile,
    isImage,
    setAttachmentLink,
    // initiateEchoServer
}

// export default EventBus

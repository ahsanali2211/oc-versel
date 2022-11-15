
export const setAttachmentLink = (type) => {
    let link = null
    switch (type) {
        case 'application/msword':
            link = 'src/assets/Images/msg/doc.svg';
            break
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            link = 'src/assets/Images/msg/docx.svg';
            break
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            link = 'src/assets/Images/msg/docx.svg';
            break
        case 'application/pdf':
            link = 'src/assets/Images/msg/pdf.svg';
            break
        case 'audio/mpeg':
            link = 'src/assets/Images/msg/mp3.svg';
            break
        case 'audio/aac':
            link = 'src/assets/Images/msg/aac.svg';
            break
        case 'video/mp4':
            link = 'src/assets/Images/msg/mp4.svg';
            break
        case 'image/jpeg':
            link = 'src/assets/Images/msg/jpeg.svg';
            break
        case 'image/jpg':
            link = 'src/assets/Images/msg/jpg.svg';
            break
        case 'image/png':
            link ='src/assets/Images/msg/png.svg';
            break
    }
    return link
}

<template>
  <q-card flat bordered class="">
    <q-card-section class="q-py-sm bg-primary" style="border-radius: 4px 4px 0 0">
      <div class="flex justify-between items-center">
        <div class="text-subtitle1 text-white text-weight-bold">
          Consultation Summary
        </div>
        <div>
          <q-btn color="white" class="text-capitalize text-weight-bold summary-head-btn" text-color="black" size="sm"
            :disable="
              !ocSummary || disableCopySumBtn || !patientDemographicsData
            " label="Copy Summary" icon-right="content_copy" @click="copySummaryToClipboard()">
          </q-btn>
          <q-btn color="white" label="Download PDF" size="sm" :loading="downloadPdfLoading" icon-right="download"
            :disable="
              !ocSummary || disableDownloadPdfBtn || !patientDemographicsData
            " class="q-ml-sm text-capitalize text-weight-bold summary-head-btn" text-color="black"
            @click="downloadpdf" />
        </div>
      </div>
    </q-card-section>
    <div class="summary-height" id="container">
      <div id="content" style="height:auto;overflow:hidden">
        <q-card-section class="flex no-wrap items-center justify-between bg-red-1 custom-red-border">
          <div class="q-mr-sm">
            <div>
              <strong class="text-danger">Please tell us why you want to change your previously selected
                answer for this e-consultation:
              </strong>
            </div>
            <div>
              <span class="text-danger">
                I want to complete this e-consultation and will call
                <a href="https://111.nhs.uk" style="color: #842128">111</a>
                for urgent help as well.
              </span>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="21.245" height="19.414" viewBox="0 0 21.245 19.414">
            <path
              d="M374.014 298.844a1.738 1.738 0 0 1 .055 1.628 1.662 1.662 0 0 1-1.306.93v.01h-18.17a1.654 1.654 0 0 1-1.338-.793 1.739 1.739 0 0 1-.122-1.579l.007-.012a1.715 1.715 0 0 1 .176-.315l8.778-15.678a1.709 1.709 0 0 1 .193-.345l.016-.028h.005a1.642 1.642 0 0 1 1.577-.64 1.672 1.672 0 0 1 1.3 1.113l8.829 15.712zm-8.734-10.092a1.734 1.734 0 0 1-.049.316l-.859 5.536h-1.557l-.81-5.571a1.74 1.74 0 0 1-.04-.278V288.641a1.662 1.662 0 1 1 3.323 0v.088zm-1.658 6.707a1.7 1.7 0 1 1-1.661 1.7 1.682 1.682 0 0 1 1.662-1.7z"
              transform="translate(-353 -281.998)" style="fill: #842128; fill-rule: evenodd" data-name="Group 7521" />
          </svg>
        </q-card-section>
        <q-card-section class="text-center q-px-none q-pt-none" v-if="!ocSummary">
          <q-card-section v-for="n in 4" :key="n" class="custom-grey-border">
            <q-skeleton height="21px" type="text" class="q-mb-xs" />
            <q-skeleton height="21px" type="text" />
          </q-card-section>
        </q-card-section>

        <q-card-section v-for="(oc, index) in ocSummary" :key="index" :class="{ 'custom-grey-border': index != ocSummary.length-1}" v-else>
          <div v-if="ocSummary && !ocSummary.length">
            <NoData />
          </div>
          <div v-else>
            <div>
              <span v-html="oc.question" class="summary-question"> </span>
            </div>
            <div>
              <span v-if="!Array.isArray(oc.selected_choice)" v-html="oc.selected_choice"
                class="summary-selected-choice text-primary break-word">
              </span>
              <span v-else v-for="item in oc.selected_choice" :key="item.link">
                <span @click="checkExtention(item.link)" class="q-pr-sm text-primary link">
                  View Attachment
                </span>
              </span>
            </div>

            <q-chip class="q-mx-none items-start custom-chip" v-if="oc.is_question_clinical_tooltip == '1'"
              ref="customChip">
              <q-avatar size="24px" class="text-white">
                <q-icon size="xs" style="margin: 3px">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#a0d2de" viewBox="0 0 576 512">
                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M480 112c-44.18 0-80 35.82-80 80c0 32.84 19.81 60.98 48.11 73.31v78.7c0 57.25-50.25 104-112 104c-60 0-109.3-44.1-111.9-99.23C296.1 333.8 352 269.3 352 191.1V36.59c0-11.38-8.15-21.38-19.28-23.5L269.8 .4775c-13-2.625-25.54 5.766-28.16 18.77L238.4 34.99c-2.625 13 5.812 25.59 18.81 28.22l30.69 6.059L287.9 190.7c0 52.88-42.13 96.63-95.13 97.13c-53.38 .5-96.81-42.56-96.81-95.93L95.89 69.37l30.72-6.112c13-2.5 21.41-15.15 18.78-28.15L142.3 19.37c-2.5-13-15.15-21.41-28.15-18.78L51.28 12.99C40.15 15.24 32 25.09 32 36.59v155.4c0 77.25 55.11 142 128.1 156.8C162.7 439.3 240.6 512 336 512c97 0 176-75.37 176-168V265.3c28.23-12.36 48-40.46 48-73.25C560 147.8 524.2 112 480 112zM480 216c-13.25 0-24-10.75-24-24S466.7 168 480 168S504 178.7 504 192S493.3 216 480 216z" />
                  </svg>
                </q-icon>
              </q-avatar>
              <div class="" style="margin-top: 2px">
                {{ oc.question_clinical_tooltip }}
              </div>
            </q-chip>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
  <q-dialog v-model="imageDialog">
    <q-card style="width: 750px">
      <q-card-section>
        <div v-close-popup class="text-right">
          <q-icon size="sm"   name="close"></q-icon>
        </div>
        <div class="flex justify-center">
          <img :src="imageLink" alt="no image" style="max-height:500px; border-radius:8px" />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="downloadImageBtn text-capitalize q-px-sm" label="Download" color="primary"
          @click="downloadAttachment(imageLink)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
    
<script setup>
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "@vue/runtime-core";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import { useProcessedTabsStore } from "../../stores/processedTabs";
import { useNotesStore } from "../../stores/notes";
import imgData from "../../assets/Images/logo-text.png";
import drLogoPdf from "../../assets/Images/icon.svg";
import { jsPDF } from "jspdf";

import "pdfmake/build/vfs_fonts.js";
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
// import * as pdfFonts from '../../assets/js/vfs_fonts'
import htmlToPdfmake from "html-to-pdfmake";
import NoData from "../../views/noData.vue";
import { usepatientDemographicsStore } from "../../stores/patientDemographics";
const patientDemograpics = usepatientDemographicsStore();
const patientDemographicsData = computed(
  () => patientDemograpics.patientDemographicsData
);
// const {encoded_id}=patientDemograpics.patientDemographicsData
const drIqUrl = import.meta.env.VITE_DR_IQ_WEBSITE;
const emits = defineEmits(["createPdfMethod", "delete"]);
const store = useOnlineConsultationStore();
const notesStore = useNotesStore();
const procsstab = useProcessedTabsStore();
const downloadPdfLoading = ref(false);
const disableDownloadPdfBtn = ref(false);
const disableCopySumBtn = ref(false);
const imageDialog = ref(false);
const showPdf = ref(true);
const imageLink = ref("");
const customChip = ref(null);
const ocReview = computed(() => procsstab.ocReview);
const ocSummary = computed(() => store.ocSummary);
const ocSummaryData = computed(() => store.ocSummaryData);
const notes = computed(() => notesStore.notes);
// this watch is use for max-height of summary-section
watch(ocSummary,()=>{
  nextTick(()=>{
    let height = document.getElementById('content').clientHeight
    document.getElementById('container').style.maxHeight = `${height}px`
  })
})
const copySummary = ref(false);
const DownloadComp = ref(null);
const htmlToText = (html) => {
  var regexBr = /(\<br[\s]*\/?\>[\s]*)+/g;
  var temp = document.createElement('div');
  temp.innerHTML = html.replace(regexBr, '\n');
  return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}
const copySummaryToClipboard = () => {
  disableCopySumBtn.value = true;
  let string = `User ID: ${ocSummaryData.value.encoded_id}\n`;
  if (notes.value.length) {
    notes.value.filter((note) => {
      if (note.file_in_record) {
        string += `Action requested by ${note.note_by} (${note.practice_role}) at ${note.note_date}: ${note.note}\n`;
      }
    });
  }

  if (ocSummaryData.value.clinical_annotation) {
    string +=
      "--------------------------------------------------------------------------------------------------\n";
    string += `${htmlToText(ocSummaryData.value.clinical_annotation)}\n`;
    string +=
      "--------------------------------------------------------------------------------------------------\n";
  }
  for (const element of ocSummaryData.value.summary) {
    var mySelf = /This e-consultation is for myself/i;
    var re =
      /You may upload 3 photos if you think this will help us to answer your query | Please upload an image by tapping the button bellow |You can upload a maximum of 5 pictures related to this e-consultation|Please upload a copy of the prescription you have been given|Please take some close up pictures and some further back|You may upload photos if you think this will help us to answer your query. (Optional)|Please upload the images below |Please upload/i;
    if (mySelf.test(element.selected_choice)) continue;
    if (element.selected_choice) {
      if (
        element.question.includes(
          "It would really help the clinician if you could upload some photos"
        )
      ) {
        string += `Q: Uploading photos Would you like to upload some photos?\n`;
      } else {
        if (!re.test(element.question)) {
          string += `Q: ${htmlToText(element.question)}\n`;
        }
      }
      if (!Array.isArray(element.selected_choice)) {
        string += `A: ${htmlToText(element.selected_choice)}\n`;
      } else {
        // 'handle array case'
        for (const index in element.selected_choice) {
          let fileName = element.selected_choice[index].link.split("/").pop();
          if (
            ["jpg", "jpeg", "gif", "png", "tiff", "bmp", "svg"].includes(
              element.selected_choice[index].type
            )
          ) {
            string += `${drIqUrl}secure/show/asset/img?keyName=${fileName} \n`;
          } else {
            string += `${index == 0 ? "A:" : ""
              }${drIqUrl}secure/download?keyName=${fileName} \n`;
          }
        }
      }
    } else {
      string += `INFO: ${htmlToText(element.question)}\n`;
    }
  }
  let resultString = string.replace(/\n\n/g, "\n");
  resultString += `Status: ${ocSummaryData.value.status}\nSubmitted Date :${ocSummaryData.value.submitted_date}\n`;
  if (ocSummaryData.value.status == "Processed") {
    resultString += `Processed Date: ${ocSummaryData.value.processed_date
      }\nAction By: ${ocReview.value.first_name +
      " " +
      ocReview.value.last_name +
      " | " +
      ocReview.value.role
      }\nOutcome: ${ocReview.value.outcome}\nMessage: ${ocReview.value.message ? `${htmlToText(ocReview.value.message)}` : 'N/A'}`;
  }
  navigator.clipboard.writeText(resultString);
  store.setNotificationAlert({
    show: true,
    text: "You have successfully copied the summary to the clipboard",
    type: "success",
  });
  setTimeout(() => {
    disableCopySumBtn.value = false;
  }, 2000);
  copySummary.value = true;
};
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
function preparePDF(yourHTML, tClass) {
  let htmltoPDFData = [];
  if (tClass == "q-class") {
    yourHTML = yourHTML
      .replace(/(<br\ ?\/?>)+/g, "<br />")
      .replace(/<br\s*[\/]?>/g, `</div><div>`);
  }
  const html = `<div class="${tClass}" style="word-break: break-word;">${yourHTML}</div>`;
  htmltoPDFData = htmlToPdfmake(html);
  return htmltoPDFData;
}
const changeLink = (item) => {
  let fileName = item.link.split("/").pop();
  return `${drIqUrl}secure/download?keyName=${fileName}`;
};
const showImageDiv = (item) => {
  let show = true;
  if (["jpg", "jpeg", "gif", "png", "tiff", "bmp", "svg"].includes(item.type)) {
    show = false;
  }
  return show;
};
const downloadpdf = async () => {
  disableDownloadPdfBtn.value = true;
  downloadPdfLoading.value = true;
  let {
    id,
    encoded_id,
    first_name,
    last_name,
    practice,
    nhs_number,
    gender,
    dob,
    email,
    phone,
  } = patientDemographicsData.value;
  const downloadPdfRoute = `${drIqUrl}secure/online-cons/userpdfV2/${id}?condition-id=${store.conditionId}&archive=${store.archive}`
  const fileName = ocSummaryData.value.name;
  var el = await document.createElement("a");
   el.setAttribute("download", fileName);
  el.setAttribute("href", downloadPdfRoute);
  document.body.appendChild(el);
 await el.click();
 await el.remove();
 setTimeout(()=>{
   downloadPdfLoading.value = false;
      store.setNotificationAlert({
        show: true,
        text: "You have successfully downloaded the PDF in your local storage",
        type: "success",
      });
      setTimeout(() => {
    disableDownloadPdfBtn.value = false;
  }, 2000);
 },2000)
 return
 
  // the blew method also download pdf which only has one issue. it draw an extra line at end of page 
  // 
 
 let patDemoBody = [
    [
      {
        text: "User ID",
        style: "patientlabel",
      },
      {
        text: encoded_id,
        style: "patientValue",
      },
    ],
    [
      {
        text: "First Name",
        style: "patientlabel",
      },
      {
        text: first_name,
        style: "patientValue",
      },
    ],

    [
      {
        text: "Last Name",
        style: "patientlabel",
      },
      {
        text: last_name,
        style: "patientValue",
      },
    ],
    [
      {
        text: "Reason",
        style: "patientlabel",
      },
      {
        text: ocSummaryData.value.label,
        style: "patientValue",
      },
    ],

    [
      {
        text: "Practice Name",
        style: "patientlabel",
      },
      {
        text: practice,
        style: "patientValue",
      },
    ],
    [
      {
        text: "NHS Number",
        style: "patientlabel",
      },
      {
        text: nhs_number ? nhs_number : "N/A",
        style: "patientValue",
      },
    ],
    [
      {
        text: "Gender",
        style: "patientlabel",
      },
      {
        text: gender,
        style: "patientValue",
      },
    ],
    [
      {
        text: "DOB",
        style: "patientlabel",
      },
      {
        text: dob,
        style: "patientValue",
      },
    ],
    [
      {
        text: "Email Address",
        style: "patientlabel",
      },
      {
        text: email,
        style: "patientValue",
        link: `mailto:${email}`,
      },
    ],
    [
      {
        text: "Contact Number",
        style: "patientlabel",
      },
      {
        text: phone ? phone : "N/A",
        style: "patientValue",
      },
    ],
    [
      {
        text: "Submitted Date",
        style: "patientlabel",
      },
      {
        text: ocSummaryData.value.submitted_date,
        style: "patientValue",
      },
    ],
    [
      {
        text: "Status",
        style: "patientlabel",
      },
      {
        text: ocSummaryData.value.status,
        style: "patientValue",
      },
    ],
  ];
  if (ocSummaryData.value.status == "Processed") {
    patDemoBody.splice(11, 0, [
      {
        text: "Processed Date",
        style: "patientlabel",
      },
      {
        text: ocSummaryData.value.processed_date,
        style: "patientValue",
      },
    ]);
  }
  let sumPdfArray = [];
  ocSummary.value.forEach((item) => {
    let arrInside = [];
    let question = preparePDF(item.question, "q-class");
    let answer = [];
    if (!Array.isArray(item.selected_choice)) {
      if (item.selected_choice.split(' ')[0].length > 80) {
        // this is condition is uesd to break work from end of the table without this this is over flowing
        answer = preparePDF(item.selected_choice.split('').join('\u200b'), "a-class");
      } else {
        answer = preparePDF(item.selected_choice, "a-class");
      }
    } else {
      let str = " ";
      item.selected_choice.forEach((arrItem, index) => {
        // if (showImageDiv(arrItem)) {
        str += `<a href="${changeLink(
          arrItem
        )}" style="color:#000000;">${changeLink(arrItem)}</a>${index !== item.selected_choice.length - 1 ? "<br />" : ""
          }`;
        // }
      });
      answer = preparePDF(str, "a-class");
    }
    let newQ = question.map((item) => {
      return [{ ...item, style: "q-class" }];
    });
    arrInside.push(...newQ, answer);
    sumPdfArray.push({
      margin: [0, 0, 0, 5],
      // heights:["*","*"],
      fontSize: 9,
      unbreakable: false,
      layout: {

        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0.1;
          }
          return (i === node.table.headerRows) ? 0.1 : 0;
        },
        vLineWidth: function (i, node) {
          return 0.1;
        },
        hLineColor: function (i, node) {
          return "#dddddd";
        },
        vLineColor: function (i, node) {
          return "#dddddd";
        },
      },
      table: {
        widths: ["100%"],
        heights: 10,
        body: arrInside,
        dontBreakRows: false
      },
    });
    arrInside = [];
  });
  toDataURL(imgData, (dataUrl) => {
    const documentDefinition = {

      // by default we use portrait, you can change it to landscape if you wish

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      defaultStyle: {
        // font: "Lato",
      },
      background: [
        {
          image: dataUrl,
          width: 580,
          opacity: 0.2,
          absolutePosition: { x: 25, y: 130 },
        },
      ],
      content: [

        {
          margin: [0, 0, 0, 15],

          columns: [
            {
              // you can also fit the svg inside a rectangle
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="445.907" height="131.728" viewBox="0 0 445.907 131.728"><g data-name="Group 7513"><g data-name="Group 7511"><g data-name="Group 7509"><path data-name="Path 2850" d="M123.68 437.783a66.31 66.31 0 0 0 84.554 7.68l-22.116-22.116a35.979 35.979 0 1 1-30.568-65.14v-31.878a66.3 66.3 0 0 0-31.87 111.454zm72.308-72.308a35.98 35.98 0 0 1 7.777 39.271l22.348 22.348a66.309 66.309 0 0 0-44.931-101.622v31.067a35.8 35.8 0 0 1 14.806 8.935z" transform="translate(-104.264 -325.471)" style="fill:#36c"/></g><g data-name="Group 7510" transform="translate(48.057 47.63)"><circle data-name="Ellipse 136" cx="18.234" cy="18.234" r="18.234" style="fill:#36c"/>
            </g>
          </g>
          <g data-name="Group 7512">
            <path data-name="Path 2851" d="M1325.986 613.254v-73.992h29.243q17.469 0 28.4 10.21t10.932 26.731q0 16.738-10.878 26.894t-28.346 10.156zm15.763-13.867h13.433q10.67 0 16.927-6.663a23.208 23.208 0 0 0 6.256-16.521q0-10.075-6.04-16.575t-17.036-6.5h-13.542z" transform="translate(-1148.802 -508.257)" style="fill:#36c"/>
            <path data-name="Path 2852" d="M1872.777 725.656v-53.571h14.083v7.462a25.56 25.56 0 0 1 7.692-6.305 19.462 19.462 0 0 1 9.425-2.511v14.192a19.678 19.678 0 0 0-3.9-.325 18.639 18.639 0 0 0-7.556 1.769 12.818 12.818 0 0 0-5.66 4.288v35z" transform="translate(-1616.293 -620.659)" style="fill:#36c"/>
            <path data-name="Path 2853" d="M2071.915 949.344a8.666 8.666 0 0 1-2.681-6.338 8.577 8.577 0 0 1 2.681-6.31 8.711 8.711 0 0 1 6.338-2.654 9.064 9.064 0 0 1 8.965 8.965 8.711 8.711 0 0 1-2.654 6.338 8.577 8.577 0 0 1-6.311 2.681 8.666 8.666 0 0 1-6.338-2.682z" transform="translate(-1784.258 -845.782)" style="fill:#36c"/>
            <path data-name="Path 2854" d="M2467.438 538.942a8.433 8.433 0 0 1-2.3-5.931 8.246 8.246 0 0 1 2.3-5.877 7.3 7.3 0 0 1 5.5-2.437 8.3 8.3 0 0 1 8.4 8.315 8.214 8.214 0 0 1-2.422 5.931 8 8 0 0 1-5.974 2.492 7.233 7.233 0 0 1-5.504-2.493zm-1.492 61.859v-53.572h14.083V600.8z" transform="translate(-2122.741 -495.803)" style="fill:#36c"/>
            <path data-name="Path 2855" d="M2656.819 596.484q-10.916-10.778-10.915-27.517t10.915-27.517q10.914-10.778 27.76-10.779 16.738 0 27.679 10.849t10.942 27.5q0 15.46-9.642 26.2l5.417 6.288-10.942 8.976-6.013-6.879a41.556 41.556 0 0 1-17.442 3.655q-16.846.003-27.759-10.776zm11.429-45.056q-6.148 6.891-6.148 17.512t6.2 17.539q6.2 6.918 16.277 6.917a23.72 23.72 0 0 0 7.692-1.253l-8.125-9.587 11-9.042 8.071 9.587A26.1 26.1 0 0 0 2707 568.94q0-10.621-6.148-17.512t-16.277-6.89q-10.18 0-16.327 6.89z" transform="translate(-2277.294 -500.911)" style="fill:#36c"/></g></g></svg>`,
              fit: [120, 80],
            },
            {
              width: "50%",
              text: "Consultation Report",
              alignment: "right",
              color: "#cccccc",
              fontSize: 18,
              margin: [0, 10, 0, 5],
              bold: true,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },

        {
          text: "Patient Details",
          alignment: "center",
          color: "#000000",
          fontSize: 12,
          margin: [0, 0, 0, 5],
          bold: true,
        },
        {
          style: "tableExample",
          table: {
            widths: ["50%", "50%"],
            heights: 10,
            body: patDemoBody,
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 0.1 : 0;
            },
            hLineColor: function (i, node) {
              return "#dddddd";
            },
            vLineColor: function (i, node) {
              return "#dddddd";
            },
          },
        },
        {
          text: "Consultation Summary",
          alignment: "center",
          color: "#000000",
          fontSize: 12,
          margin: [0, 15, 0, 5],

          bold: true,
        },
        ...sumPdfArray,
        // ...html
      ],

      styles: {
        patientlabel: {
          bold: true,
          margin: [5, 5, 0, 5],
          fontSize: 9,
          color: "#3366cc",
        },
        patientValue: {
          margin: [0, 5, 0, 5],
          fontSize: 9,
          color: "#000000",
        },
        "q-class": {
          color: "#3366cc",
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 0],
        },
        "n-class": {
          color: "#3366cc",
          fontSize: 10,
          margin: [0, 0, 0, 0],
        },
        "a-class": {
          color: "#000000",
          fontSize: 9,
          margin: [0, 0, 0, 5],
        },
        "html-a": {
          color: "red",
        },
      },
    };
    pdfMake
      .createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs)
      .download(ocSummaryData.value.name);
    downloadPdfLoading.value = false;
    store.setNotificationAlert({
      show: true,
      text: "You have successfully downloaded the PDF in your local storage",
      type: "success",
    });
  });
  setTimeout(() => {
    disableDownloadPdfBtn.value = false;
  }, 2000);
};

const checkExtention = async (Url) => {
  const checkIsImage = await isImgLink(Url);
  if (!checkIsImage) {
    downloadAttachment(Url);
  } else {
    imageLink.value = await Url;
    imageDialog.value = true;
  }
};
const isImgLink = (url) => {
  if (typeof url !== "string") {
    return false;
  }
  return (
    url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg)(\?(.*))?$/gim) !==
    null
  );
};
const downloadAttachment = (source) => {
  const fileName = source.split("/").pop();
  var el = document.createElement("a");
  let newSource = `${drIqUrl}secure/download?keyName=${fileName}`;
  el.setAttribute("download", fileName);
  el.setAttribute("href", newSource);
  document.body.appendChild(el);
  el.click();
  el.remove();
};

const resetCopy = () => {
  setTimeout(() => {
    copySummary.value = false;
  }, 100);
};
</script>
    
<style scoped>
.cus-br-rl {
  border-right: 1px solid #d4d4d4;
  border-left: 1px solid #d4d4d4;
}

.summary-height {
  border-radius: 4px;
  height: 50vh;
  min-height: 20vh;
  resize: vertical;
  overflow: hidden;
}

.summary-height:hover {
  overflow: auto;
}

.text-danger {
  color: #842128;
}

.custom-red-border {
  border-bottom: 1px solid #f5c4c8;
}

.custom-grey-border {
  /* border-right: 1px solid #d4d4d4;
  border-left: 1px solid #d4d4d4; */
  border-bottom: 1px solid #d4d4d4;
}

.text-shadow {
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.downloadImageBtn {
  border-radius: 0 !important;
}

.downloadImageBtn:hover {
  box-shadow: 0px 2px 2px 0px #4d4d4d !important;
}

.summary-question {
  font-family: Lato;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}
</style>

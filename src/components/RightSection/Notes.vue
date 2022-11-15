<template>
  <q-expansion-item :group="props.group" v-model="noteModel" class="my-ten bg-custom-yellow rounded-borders "
    :header-class="`custom-border-on-notes ${noteModel ? 'custom-top-border-radius text-weight-bold' : 'custom-border-radius text-weight-bold'
    }`" default-opened expand-icon-class="text-black ">
    <template v-slot:header>
      <div class="notes-header">
        <div>NOTES</div>
        <div class="bell-notifi" v-if="notes && countUrgentNotes.length">
          <q-icon name="notifications_active" style="color: #842128;"/>
          <span style="margin-left:4px">{{countUrgentNotes.length}}</span>
          </div>
      </div>
    </template>
    <q-card bordered style="border-top: none">
      <div v-if="notes">
        <div v-if="notes.length > 0" id="notes-area" class="note-main-height">
          <template v-for="(note, ind) in notes" :key="note.id">
            <q-card-section class="pa-ten">
              <div class="flex items-center justify-between">
                <div class="text-grey">
                  <q-icon name="fiber_manual_record" :style="{ color: note.role_color }" size="sm"
                    class="q-pl-none text-weight-bold" />
                  {{ note.note_by }}
                </div>
                <div class="text-caption text-grey">{{ note.note_date }}</div>
              </div>
              <div class="oc-notes-tooltip-text">
                <p class="custom-text-underline note-height q-mb-none q-pb-none" :contenteditable="
                  !note.disabled && !note.file_in_record && archive != 1
                " @input="(event) => onInput(event, ind)" @focusout="handleUpdateNote(note, ind)"
                  @keydown="(event) => onKeyDwn(event)">
                  <strong :class="note.is_urgent && 'text-red'" :id="`content-${ind}`" class="break-word">{{ note.note
                  }}
                  </strong>
                  <q-btn class="float-right" size="xs" :loading="true" v-if="contenteditableIndex == ind" />
                </p>
                <hr class="q-my-xs" style="border-top: 1px solid #dadada;">
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <q-btn flat size="sm" :loading="ind == deleteLoadingIndex" :disable="
                    note.disabled || note.file_in_record || archive == 1
                  " class="q-pa-none q-px-sm" @click="handleDeleteNote(ind, note.id)">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11.634" height="12.386" viewBox="0 0 9.634 10.386"
                        style="vertical-align: middle">
                        <path data-name="Icon material-delete"
                          d="M8.188 13.51a1.38 1.38 0 0 0 1.376 1.376h5.5a1.38 1.38 0 0 0 1.376-1.376V7.252H8.188zm8.946-8.322h-2.409l-.688-.688H10.6l-.688.688H7.5v1.376h9.634z"
                          transform="translate(-7.5 -4.5)" />
                      </svg>
                      <q-tooltip v-if="note.file_in_record" class="bg-black text-body2" anchor="bottom right"
                        self="center start">
                        You cannot delete a note that has been <br />
                        selected for “File in record”.
                      </q-tooltip>
                    </span>
                  </q-btn>
                </div>
                <div class="text-caption text-grey">
                  <q-btn size="sm" class="text-capitalize q-pl-sm" :loading="fileInRecordLoadingIndex == ind">
                    <q-checkbox dense size="xs" label="File in record" :model-value="note.file_in_record"
                      @update:model-value="handleFileInRecord(note, ind)"
                      :disable="note.disabled || archive == 1 || note.file_in_record" />
                    <template v-slot:loading>
                      <div class="flex items-center">
                        <div class="q-pr-xs">
                          <svg class="q-spinner q-spinner-mat" width="1em" height="1em" viewBox="25 25 50 50">
                            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke="currentColor"
                              stroke-width="5" stroke-miterlimit="10"></circle>
                          </svg>
                        </div>
                        <div class="text-weight-regular">File in record</div>
                      </div>
                    </template>
                  </q-btn>
                  <q-btn size="sm" class="text-capitalize q-pl-sm q-pr-none" :loading="markAsUrgentLoadingIndex == ind">
                    <q-checkbox :model-value="note.is_urgent" @update:model-value="handleMarkAsUrgent(note, ind)" dense
                      :disable="note.disabled || archive == 1 || note.file_in_record" size="xs"
                      label="Mark as urgent" />
                    <template v-slot:loading>
                      <div class="flex items-center">
                        <div class="q-pr-xs">
                          <svg class="q-spinner q-spinner-mat" width="1em" height="1em" viewBox="25 25 50 50">
                            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke="currentColor"
                              stroke-width="5" stroke-miterlimit="10"></circle>
                          </svg>
                        </div>
                        <div class="text-weight-regular">Mark as urgent</div>
                      </div>
                    </template>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator v-if="ind !== notes.length - 1" color="yellow-8" />
          </template>

        </div>

        <template v-else-if="!notes.length">
          <no-data :text="'Type text blow and tab save'" />
          <!-- <q-separator color="yellow-8" v-if="archive != 1" /> -->
        </template>
      </div>

      <div v-else>
        <!-- notes skeleton -->
        <q-card-section class="pa-ten">
          <div class="flex justify-between q-pb-sm">
            <q-skeleton height="15px" width="100px" />
            <q-skeleton height="15px" width="150px" />
          </div>
          <q-skeleton class="q-mb-sm" height="25px" />
          <q-separator color="grey-5" />
          <q-skeleton class="q-mt-sm" height="25px" />
        </q-card-section>
      </div>
      <q-separator color="yellow-8" v-if="archive != 1" />
      <q-card-section class="q-py-none px-ten" v-if="archive != 1">

        <div id="message-conatainer" style="max-height:70px !important ;overflow-y:auto">
          <q-input ref="textAreaRef" borderless dense autogrow type="textarea" :maxlength="500" v-model.trim="noteText"
            :rows="1" @keydown="handleScroll" placeholder="Type Note here..." />

        </div>
        <div class="flex justify-end items-start pb-ten">
          <div class="q-pa-xs">
            <strong class="q-pr-sm">{{ 500 - noteText.length }}/500</strong>
            <q-btn color="primary" size="sm" class="q-py-none text-capitalize" label="Save" :disable="!noteText.length"
              :loading="addNoteLoading" @click="handleAddNote" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
    
<script setup>
import { computed, ref } from "vue";
import { useNotesStore } from "../../stores/notes";
import { useOnlineConsultationStore } from "../../stores/onlineConsultation";
import NoData from "../../views/noData.vue";
const OCstore = useOnlineConsultationStore();
const notesStore = useNotesStore();
const onKeyDwn = (e) => {
  const maxLength = 500
  const currentTextLength = e.target.outerText.length;
  if (currentTextLength === maxLength && e.keyCode != 8) {
    e.preventDefault();
  }
}
const props = defineProps(["group"]);
const handleScroll = () => {
  const element = document.getElementById("message-conatainer");
  element.scrollTop = element.scrollHeight
}

const {
  updateFileInRecord,
  updateMarkAsUrgent,
  addNote,
  getNotesList,
  deleteNote,
  updateNote,
} = notesStore;
const notes = ref(computed(() => notesStore.notes));
const archive = ref(computed(() => OCstore.archive));
const noteText = ref("");
const textAreaRef = ref("");
const addNoteLoading = ref(false);
const noteModel = ref(true);
const contenteditableIndex = ref(-1);
const deleteLoadingIndex = ref(-1);
const markAsUrgentLoadingIndex = ref(-1);
const fileInRecordLoadingIndex = ref(-1);

const onInput = (event, index) => {
  const value = event.target.textContent;
  notes.value[index].note = value
};

const handleAddNote = async () => {
  try {
    addNoteLoading.value = true;
    await addNote(noteText.value, OCstore.conditionId);
    await getNotesList(OCstore.conditionId);
    var myDiv = document.getElementById("notes-area");
    myDiv.scrollTop = 0;
    noteText.value = "";
    addNoteLoading.value = false;
  } catch (e) {
    addNoteLoading.value = false;
  }
};
const handleDeleteNote = async (index, noteID) => {
  deleteLoadingIndex.value = index;
  await deleteNote(noteID);
  await getNotesList(OCstore.conditionId);
  deleteLoadingIndex.value = -1;
};
const handleUpdateNote = async (note, index) => {
  contenteditableIndex.value = index;
  const data = {
    note: note.note,
    note_id: note.id,
  };
  await updateNote(data);
  contenteditableIndex.value = -1;
  await getNotesList(OCstore.conditionId);
};
const handleFileInRecord = async ({ id, file_in_record }, index) => {
  fileInRecordLoadingIndex.value = index;
  const data = {
    note_id: id,
    file_in_record: ~~!file_in_record,
  };
  updateFileInRecord(data).then(() => {
    notes.value[index].file_in_record = !file_in_record;
    fileInRecordLoadingIndex.value = -1;
    // getNotesList();
  });
};
const handleMarkAsUrgent = async ({ id, is_urgent }, index) => {
  markAsUrgentLoadingIndex.value = index;
  const data = {
    note_id: id,
    is_urgent: ~~!is_urgent,
  };
  updateMarkAsUrgent(data).then(() => {
    notes.value[index].is_urgent = !is_urgent;
    markAsUrgentLoadingIndex.value = -1;
    // getNotesList();
  });
};
const countUrgentNotes =computed(()=>notesStore.notes ?notesStore.notes.filter((note)=>note.is_urgent) :[])
</script>
 
    
<style scoped>
::v-deep .q-item__section{
  padding-right:0 !important;
}
.notes-header{
  display:flex;
  align-items: center;
  width:100%
}
.custom-text-underline {
  /* word-break: break-all; */
  line-height: 25px;
  color: #333;
  text-align: justify;

  /* text-decoration:underline; */
  /* background-image: repeating-linear-gradient(
    180deg,
    transparent,
    transparent 24px,
    #6e6c6c 25px
  ); */
}

.q-btn.disabled svg {
  fill: #c7c7c7;
}

.bg-custom-yellow {
  background-color: #fff0b1;
}
.bell-notifi{
  color: #842128;
  background-color: #ffebed;
  border: 1px solid #f5c4c8;
  margin-left: 4px;
  border-radius: 25px;
  padding-inline: 10px;
  padding-block: 2px;
}
.bell-notifi span{
  font-size: 12px;
  margin-left: 2px;
}

.scroll-note-list {
  max-height: 210px;
  overflow-y: auto;
}

textarea {
  border: none;
  overflow: auto;
  outline: none;
  padding-top: 17px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
  /*remove the resize handle on the bottom right*/
}

.note-height {
  max-height: 90px;
  overflow: hidden;
    padding-right: 10px;
}

.note-height:hover {
  overflow: auto;
  /* padding-right: 10px; */
}

.note-main-height {
  max-height: 210px;
  overflow: hidden;
}

.note-main-height:hover {
  overflow: auto;
}
</style>
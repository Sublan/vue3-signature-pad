<script setup>
import { useSignaturePad } from './compositions/signaturePad.js';
import { ref } from 'vue';

const userSignatureDrawingPad = ref(null);
const assessorSignatureDrawingPad = ref(null);
const signOffUserSignature = ref(null);
const signOffAssessorSignature = ref(null);

const {
  startDrawing: startDrawingUserSignature,
  stopDrawing: stopDrawingUserSignature,
  draw: drawUserSignature,
  clearCanvas: clearCanvasUserSignature,
  resizeCanvas: resizeCanvasUserSignature,
  saveSignature: saveUserSignatureImage,
  isEmpty: isEmptyUserSignature,
} = useSignaturePad(userSignatureDrawingPad);

const {
  startDrawing: startDrawingAssessorSignature,
  stopDrawing: stopDrawingAssessorSignature,
  draw: drawAssessorSignature,
  clearCanvas: clearCanvasAssessorSignature,
  resizeCanvas: resizeCanvasAssessorSignature,
  saveSignature: saveAssessorSignature,
  isEmpty: isEmptyAssessorSignature,
} = useSignaturePad(assessorSignatureDrawingPad);
</script>

<template>
  <div>
    <div class="signature-container">
      <h3>User Signature</h3>
      <img 
        v-if="signOffUserSignature"
        :src="signOffUserSignature" 
        alt="User Signature"
        class="signature-image"
      />
      <div>
        <canvas
          ref="userSignatureDrawingPad"
          class="signature-pad"
          @mousedown="startDrawingUserSignature"
          @mouseup="stopDrawingUserSignature"
          @mousemove="drawUserSignature"
          @touchstart="startDrawingUserSignature"
          @touchend="stopDrawingUserSignature"
          @touchmove="drawUserSignature"
          @mouseleave="stopDrawingUserSignature">
        </canvas>
        <button 
          @click="clearCanvasUserSignature"
          class="clear-btn"
        >
          Clear
        </button>
        <button 
          @click="saveUserSignatureImage"
          class="clear-btn"
        >
          Save
        </button>
      </div>
    </div>

    <div class="signature-container">
      <h3>Assessor Signature</h3>
      <img 
        v-if="signOffAssessorSignature"
        :src="signOffAssessorSignature" 
        alt="Assessor Signature"
        class="signature-image"
      />
      <div>
        <canvas
          ref="assessorSignatureDrawingPad"
          class="signature-pad"
          @mousedown="startDrawingAssessorSignature"
          @mouseup="stopDrawingAssessorSignature"
          @mousemove="drawAssessorSignature"
          @touchstart="startDrawingAssessorSignature"
          @touchend="stopDrawingAssessorSignature"
          @touchmove="drawAssessorSignature"
          @mouseleave="stopDrawingAssessorSignature">
        </canvas>
        <button 
          @click="clearCanvasAssessorSignature"
          class="clear-btn"
        >
          Clear
        </button>
        <button 
          @click="saveAssessorSignature"
          class="clear-btn"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signature-container {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 24px;
}

.signature-image {
  width: 100%;
  max-height: 100px;
  object-fit: contain;
  cursor: pointer;
}

.signature-pad {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
}

.clear-btn {
  margin: 10px;
  padding: 8px 16px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
}

.clear-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useSignaturePad(canvasRef) {
  const isDrawing = ref(false);
  const ctx = ref(null);

  const resizeCanvas = () => {
    const container = canvasRef.value.parentElement;
    container.style.padding = '0';
    container.style.margin = '0';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    const { width } = container.getBoundingClientRect();
    const adjustedWidth = Math.floor(width);
    canvasRef.value.width = adjustedWidth;
    canvasRef.value.height = 200;
    canvasRef.value.style.width = `${adjustedWidth}px`;
    canvasRef.value.style.height = '200px';
    canvasRef.value.style.display = 'block';
    canvasRef.value.style.margin = '0 auto';
    canvasRef.value.style.border = '1px solid black';
    canvasRef.value.style.boxSizing = 'box-sizing';
  };

  const getPosition = (event) => {
    const rect = canvasRef.value.getBoundingClientRect();
    let clientX;
    let clientY;

    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return { x, y };
  };

  const startDrawing = (event) => {
    isDrawing.value = true;
    ctx.value.beginPath();
    const pos = getPosition(event);
    ctx.value.moveTo(pos.x, pos.y);
  };

  const stopDrawing = () => {
    isDrawing.value = false;
    ctx.value.closePath();
  };

  const draw = (event) => {
    if (!isDrawing.value) return;
    const pos = getPosition(event);
    ctx.value.lineTo(pos.x, pos.y);
    ctx.value.stroke();
  };

  const clearCanvas = () => {
    ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  };

  const getSignature = () => {
    return new Promise((resolve) => {
      canvasRef.value.toBlob((blob) => resolve(blob), 'image/jpg');
    });
  };

  const saveSignature = () => {
    getSignature().then((blob) => {
      if (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'signature.jpg';
        link.click();
        URL.revokeObjectURL(link.href);
      }
    });
  };

  const isEmpty = () => {
    const canvas = canvasRef.value;
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
    );
    return !pixelBuffer.some((color) => color !== 0);
  };

  onMounted(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    ctx.value = canvasRef.value.getContext('2d');
    ctx.value.lineWidth = 2;
    ctx.value.lineCap = 'round';
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas);
  });

  return {
    startDrawing,
    stopDrawing,
    draw,
    clearCanvas,
    getSignature,
    saveSignature,
    resizeCanvas,
    isEmpty,
  };
}

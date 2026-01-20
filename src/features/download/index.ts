  export const downloadImage = (
    canvas: HTMLCanvasElement,
  ) => {
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'i-climbed.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1); // JPEG с качеством 100%
    link.click();
  };
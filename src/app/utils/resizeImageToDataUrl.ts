const DEFAULT_MAX_WIDTH = 512;

export function resizeImageFileToDataUrl(file: File, maxWidth: number = DEFAULT_MAX_WIDTH): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas unsupported'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      try {
        resolve(canvas.toDataURL('image/png'));
      } catch {
        reject(new Error('Could not encode image'));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Invalid image file'));
    };
    img.src = url;
  });
}

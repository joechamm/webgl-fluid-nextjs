export function getImageFromURL(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function getImageFromURLSync(url: string): HTMLImageElement {
  try {
    const img = new Image();
    img.src = url;
    return img;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
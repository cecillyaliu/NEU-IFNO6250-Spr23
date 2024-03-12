function ResizeImage(file) {
  const reader = new FileReader();
  const image = new Image();

  return new Promise((resolve) => {
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      image.src = event.target.result;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg", 0.8);
      };
    };
  });
}

export default ResizeImage;

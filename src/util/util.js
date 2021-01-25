const checkForNullEntries = (slides) => {
    if (slides.length > 1) {
        for (let i = slides.length - 1; i >= 0; i--) {
            if (slides.length === 1) {
                return slides;
            }
            let photo = slides[i];
            if (photo.img_data.trim() === '') {
                slides.splice(i, 1);
            }
        }
    }
    return slides;
};

export {
    checkForNullEntries
};
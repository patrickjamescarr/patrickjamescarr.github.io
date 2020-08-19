export default class ImageLoader {

    constructor() {
        this.fileSelector = this.buildFileSelector();
        this.image = new Image();
    }

    buildFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('accept', '.jpg, .jpeg, .png');
        fileSelector.addEventListener('change', (event) => {
            this.readImageFile(event);
        });
        return fileSelector;
    }

    readImageFile(event) {
        const files = event.target.files;
        var reader = new FileReader();

        reader.onload = (e) => {
            this.image.src = e.target.result;
        };

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    }

    getImage() {
        return this.image;
    }

    select() {
        this.fileSelector.click();
    }
};




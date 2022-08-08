import {Cloudinary} from "@cloudinary/url-gen";

const ShowImage = (id) => {

    const cld = new Cloudinary({
        cloud: {
        cloudName: 'eventplanningtool'
        }
    });

    const image = cld.image(id);

    const imageUrl = image.toURL();

    return imageUrl
}

export default ShowImage;


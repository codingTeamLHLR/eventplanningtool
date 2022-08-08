import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const CloudinaryWidget = (props) => {
  const [imageName, setImageName] = useState(null);
  const [imageFormat, setImageFormat] = useState(null);
  const [ widget, setWidget] = useState(null)

useEffect (() => {
  setWidget(window.cloudinary.createUploadWidget(
    {
      cloudName: "eventplanningtool",
      uploadPreset: "vj6p2rdn",
      sources: [
        "local",
        "url",
        "image_search",
        "google_drive",
        "dropbox",
        "instagram",
        "facebook",
      ],
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        props.setImage(result.info.public_id);
        setImageName(result.info.original_filename);
        setImageFormat(result.info.format);
        return;
      }

      if (error) {
        console.log(error);
      }
    }
  ))
}, [props])

  const openWidget = (event) => {
    event.preventDefault();

    widget.open();
  };

  return (
    <div className="ImageUpload">
      <Button
        variant="outlined"
        startIcon={<FileUploadIcon />}
        onClick={openWidget}
      >
        Upload Files
      </Button>
      {imageName && imageFormat && (
        <Typography variant="body2" color="text.secondary">
          {imageName}.{imageFormat}
        </Typography>
      )}
    </div>
  );
};

export default CloudinaryWidget;

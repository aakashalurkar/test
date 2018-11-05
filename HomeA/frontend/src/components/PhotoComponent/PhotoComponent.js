import React, { Component } from "react";
import ImageUploader from "react-images-upload";

import axios from "axios";
import { Button } from "@material-ui/core";

class PhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      selectedFile: [],
      imageView: ""
    };
  }
  onChange = (picture, pictureDataURLs) => {
    this.setState({
      selectedFile: picture.concat(picture)
    });
  };

  onSubmit = e => {
    console.log("On Submit");
    e.preventDefault();
    const { description, selectedFile } = this.state;

    for (let size = 0; size < selectedFile.length / 2; size++) {
      let formData = new FormData();
      console.log("File Selected: " + selectedFile[size]);

      formData.append("selectedFile", selectedFile[size]);

      axios.post("http://54.219.175.186:3001/photoupload", formData).then(result => {
        // access results...
      });
    }
  };

  render() {
    const { description, selectedFile } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <ImageUploader
            withIcon={true}
            type="file"
            name="selectedFile"
            onChange={this.onChange}
            imgExtension={[".jpg", ".png",  "jpeg"]}
            withPreview
            multiple
          />
                    <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
          >
            SUBMIT IMAGE
          </Button>
          <Button type="submit">Submit</Button>
          
        </form>
      </div>
    );
  }
}

export default PhotoComponent;
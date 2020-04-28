import React from "react";
import ReactDOM from 'react-dom'
import axios from 'axios'
import {userId} from '../pages/AllGamesPage'
export let file;
let imagePreviewUrl
    let $imagePreview 
export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    let reader = new FileReader();
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit() {
    // TODO: do something with -> this.state.file
    const data = new FormData()
    data.append('file', this.state.file)
    data.append('userId', userId)
    // request("/api/link/upload", "POST", this.state.file);
    console.log('handle uploading-', this.state.file);
    console.log(userId)
    // for (var key of data.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }
    axios.post("http://188.225.78.253:3000/upload", data, { 
      // receive two    parameter endpoint url ,form data
    })
    .then(res => { // then print response status
      console.log(res.statusText)
    })
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this._handleSubmit(e)
    }
    console.log('file', file)

    
    reader.readAsDataURL(e.target.files[0])
  }

  render() {
    imagePreviewUrl = this.state.imagePreviewUrl;
    $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img src={require(`../avatars/${userId}.jpg`)}/>)
    }

    return (
    

        <form onSubmit={(e)=>this._handleSubmit(e)}>
        <div className="elipse3">
          <input className="fileInput" name="avatar" id="fileInput"
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
            <div className="imgPreview">
              {$imagePreview}
            </div>
            </div>
        </form>
        

      
    )
  }
}
  

                  //// <form action='http://localhost:3000/upload' >
                  // <input
                  //     type="file"
                  //     name="avatar"
                  //     id="file"
                  //     onChange={changeHandler}
                  // />
                  // </form>
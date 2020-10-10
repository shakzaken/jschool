import React from "react";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone,{IDropzoneProps,IFileWithMeta,StatusValue} from "react-dropzone-uploader";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Image} from "semantic-ui-react";
import "./user-image.scss";

interface UserImageEditProps {
  rootStore?:RootStore
}



@inject("rootStore")
@observer
export class UserImageEdit extends React.Component<UserImageEditProps> {

  userEditStore = this.props.rootStore.usersStore.userEditStore;

  constructor(props:any){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ifiles: IFileWithMeta[], allFiles: IFileWithMeta[]){
    const files = ifiles.map(ifile => ifile.file);
    await this.userEditStore.saveUserFiles(files);
    allFiles.forEach(f => f.remove());
  };



  componentDidMount(){
    this.userEditStore.fetchUserImage();
  }


  render(){
    return (
    <div className="user-image-container">
      <h3>Edit User Image</h3>
      <div className="user-image">
        <div className="dropzone">
          <Dropzone
            onSubmit={this.handleSubmit}
            maxFiles={1}
            inputContent="Drop 1 File"
            submitButtonContent={this.userEditStore.submitButtonName}
            inputWithFilesContent={files => `${3 - files.length} more`}
            submitButtonDisabled={files => files.length < 1}
          />
        </div>

        <div className="image">
          <h4 className="image-title">Current Image</h4>
          <Image size="medium" src={this.userEditStore.imageSrc} bordered centered />
        </div>
      </div>


    </div>
    )
  }


}

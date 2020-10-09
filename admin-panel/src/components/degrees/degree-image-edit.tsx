import React from "react";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone,{IDropzoneProps,IFileWithMeta,StatusValue} from "react-dropzone-uploader";
import "./degree-image.scss";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Image} from "semantic-ui-react";

interface DegreeImageEditProps {
  rootStore?:RootStore
}



@inject("rootStore")
@observer
export class DegreeImageEdit extends React.Component<DegreeImageEditProps> {

  degreeEditStore = this.props.rootStore.degreesStore.degreeEditStore;

  constructor(props:any){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ifiles: IFileWithMeta[], allFiles: IFileWithMeta[]){
    const files = ifiles.map(ifile => ifile.file);
    await this.degreeEditStore.saveDegreeFiles(files);
    allFiles.forEach(f => f.remove());
  };



  componentDidMount(){
    this.degreeEditStore.fetchDegreeImage();
  }


  render(){
    return (
    <div className="degree-image-container">
      <h3>Edit Degree Image</h3>
      <div className="degree-image">
        <div className="dropzone">
          <Dropzone
            onSubmit={this.handleSubmit}
            maxFiles={1}
            inputContent="Drop 3 Files"
            submitButtonContent={this.degreeEditStore.submitButtonName}
            inputWithFilesContent={files => `${3 - files.length} more`}
            submitButtonDisabled={files => files.length < 1}
          />
        </div>

        <div className="image">
          <h4 className="image-title">Current Image</h4>
          <Image size="medium" src={this.degreeEditStore.imageSrc} bordered centered />
        </div>
      </div>


    </div>
    )
  }


}

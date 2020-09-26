import React from "react";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone,{IDropzoneProps,IFileWithMeta,StatusValue} from "react-dropzone-uploader";
import "./course-image.scss";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";

interface CourseImageEditProps {
  rootStore?:RootStore
}



@inject("rootStore")
@observer
export class CourseImageEdit extends React.Component<CourseImageEditProps> {

  courseEditStore = this.props.rootStore.coursesStore.courseEditStore;

  constructor(props:any){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  async handleSubmit(ifiles: IFileWithMeta[], allFiles: IFileWithMeta[]){

    const files = ifiles.map(ifile => ifile.file);
    await this.courseEditStore.saveCourseFiles(files);
    allFiles.forEach(f => f.remove());
  };

  handleChangeStatus(file:IFileWithMeta,status:StatusValue){
    console.log(file,status);
  }


  render(){
    return (
    <div>
      <Dropzone
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        maxFiles={3}
        inputContent="Drop 3 Files"
        inputWithFilesContent={files => `${3 - files.length} more`}
        submitButtonDisabled={files => files.length < 1}
      />

    </div>
    )
  }


}

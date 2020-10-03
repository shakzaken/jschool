import React from "react";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone,{IDropzoneProps,IFileWithMeta,StatusValue} from "react-dropzone-uploader";
import "./course-image.scss";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Image} from "semantic-ui-react";

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
  }

  async handleSubmit(ifiles: IFileWithMeta[], allFiles: IFileWithMeta[]){
    const files = ifiles.map(ifile => ifile.file);
    await this.courseEditStore.saveCourseFiles(files);
    allFiles.forEach(f => f.remove());
  };



  componentDidMount(){
    this.courseEditStore.fetchCourseImage();
  }


  render(){
    return (
    <div className="course-image">
      <div className="dropzone">
        <Dropzone
          onSubmit={this.handleSubmit}
          maxFiles={1}
          inputContent="Drop 3 Files"
          submitButtonContent={this.courseEditStore.submitButtonName}
          inputWithFilesContent={files => `${3 - files.length} more`}
          submitButtonDisabled={files => files.length < 1}
        />
      </div>

      <div className="image">
        <h4 className="image-title">Current Image</h4>
        <Image size="medium" src={this.courseEditStore.imageSrc} bordered centered />
      </div>

    </div>
    )
  }


}

import React from "react";
import {Button,Form,Table,Dropdown} from "semantic-ui-react";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {DegreeEditStore} from "../../store/degree-edit-store";


interface DegreeCoursesEditProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class DegreeCoursesEdit extends React.Component<DegreeCoursesEditProps,{}> {

  private degreeEditStore : DegreeEditStore = this.props.rootStore.degreesStore.degreeEditStore;

  constructor(props: DegreeCoursesEditProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
      this.degreeEditStore.fetchDegreeCourses();
  }

  onChange(event:any,changeObject:any){
    console.log(changeObject);
    const courses = changeObject.value.filter((value:any) => value!=null);
    console.log(courses);
    this.degreeEditStore.setSelectedCourses(courses)
  }

  render() {
    const degreesEditStore = this.props.rootStore.degreesStore.degreeEditStore;
    const degree = degreesEditStore.degree;
    
    return (
      <div>
        <h3>Degree Courses</h3>
        <Form>
            <Form.Field>
              <Dropdown
                  multiple
                  fluid
                  selection
                  onChange={this.onChange}
                  value={this.degreeEditStore.selectedCourses}
                  options={this.degreeEditStore.allCoursesInUI}
              />
            </Form.Field>
          <Button
            type="submit"
            onClick={event => degreesEditStore.saveDegreeCourses(event)}>Save
          </Button>
        </Form>

      </div>
    )
  }
}

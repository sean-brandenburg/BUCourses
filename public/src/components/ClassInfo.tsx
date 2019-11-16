import * as React from "react";


// Define custom type/interface for classInfo later
type ClassInfoProps = { classInfo : any ; isLoading : boolean};

export class ClassInfo extends React.Component<ClassInfoProps,{}> {
    constructor(props: ClassInfoProps) {
        super(props);
    }

    
    render() {
        if (this.props.isLoading) {
            return (
                <div>
                    Enter a course :)
                </div>
            )
        } else {
            return (
                <div>
                    Code: {this.props.classInfo.Code}
                    <br/>
                    Credits: {this.props.classInfo.Credits}
                    <br/>
                    Description: {this.props.classInfo.Description}
                    <br/>
                    Prerequisites: {this.props.classInfo.Prerequisites}
                </div>
            )
        }

    }

}
import * as React from "react";
import { ClassSearch } from "./ClassSearch";
import { ClassInfo } from "./ClassInfo";

type ClassBundleState = { classInfo: any; isLoading: boolean};


export class ClassBundle extends React.Component<null,ClassBundleState> {
    constructor(props: null) {
        super(props);

        this.state = {
            classInfo: null,
            isLoading: true
        }
    };

    private getClassData = (data: object): void => {
        this.setState({ classInfo: data , isLoading: false });
    }

    render() {
        return(
            <React.Fragment>
                <ClassSearch callback={this.getClassData}/>
                <ClassInfo classInfo={this.state.classInfo} isLoading={this.state.isLoading}/>
            </React.Fragment>

        )
    }

}
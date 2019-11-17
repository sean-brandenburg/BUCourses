import * as React from "react";
import { MainContentContainer } from '../styles/AppStyles';
import { ClassList } from './ClassList';
import { Filter2 } from './Filter2';
import { SingleClass } from "../types/SingleClassType";

type ClassTopLevelState = { currentSelections : Array<SingleClass>};

export class ClassTopLevel extends React.Component<{},ClassTopLevelState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentSelections : []
        }
    }

    componentDidMount() {
        let host : string = 'https://bucourses.appspot.com';
        let query : string = '/class?limit=10';
        fetch(host + query)
            .then( res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Could not connect');
                }
            })
            .then( resJson => {
                this.setState({
                    currentSelections : resJson
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    private setCurrentSelections = ( newCurrentSelections : Array<SingleClass> ) : void => {
        this.setState({
            currentSelections : newCurrentSelections
        });
    }

    render() {
        return (
            <div style={MainContentContainer}>
                <ClassList classes={this.state.currentSelections}/>
                <Filter2 callback={this.setCurrentSelections}/>
            </div>
        )
    }
}
import * as React from "react";
import { MainContentContainer } from '../styles/AppStyles';
import { ClassList } from './ClassList';
import { Filter2 } from './Filter2';
import { SingleClass } from "../types/SingleClassType";

type ClassTopLevelState = { currentSelections : Array<SingleClass>, splitSelections : Array<SingleClass>, index : number};

export class ClassTopLevel extends React.Component<{},ClassTopLevelState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentSelections : [],
            splitSelections : [],
            index : 0
        }
    }

    componentDidMount() {
        let host : string = 'http://localhost:3000';
        let query : string = '/class?';//limit=10';
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
                    currentSelections : resJson,
                    splitSelections : resJson.slice(0, 10),
                    index : 0
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    private setCurrentSelections = ( newCurrentSelections : Array<SingleClass> ) : void => {
        let maxIndex: number = 10;
        if (newCurrentSelections.length < 10) {
            maxIndex = newCurrentSelections.length;
        }

        this.setState({
            currentSelections : newCurrentSelections,
            splitSelections : newCurrentSelections.slice(0, maxIndex),
            index : 0
        });
    }

    private getNextElements = ( addIndex : number ) : void => {
        let prevIndex: number = this.state.index;
        let newIndex: number = addIndex + this.state.index;
        let maxIndex: number = this.state.currentSelections.length - 1;

        let currentSelections: Array<SingleClass> = this.state.currentSelections;

        let startIndex: number;
        let endIndex: number;

        if (newIndex < 0) {
            startIndex = 0;
            endIndex = (maxIndex < 9) ? maxIndex : 9;
        } else if (newIndex > maxIndex) {
            startIndex = prevIndex;
            endIndex = maxIndex;
        } else {
            if (addIndex > 0) {
                startIndex = newIndex;
                endIndex = ((newIndex + 9) < maxIndex) ? (newIndex + 9): maxIndex;
            } else {
                startIndex = ((newIndex - 9) < 0) ? 0: newIndex;
                endIndex = prevIndex - 1;
            }
        }

        this.setState({currentSelections: currentSelections,
                       splitSelections: currentSelections.slice(startIndex, endIndex + 1),
                       index: startIndex})
    }

    render() {
        return (
            <div style={MainContentContainer}>
                <ClassList classes={this.state.splitSelections}/>
                <Filter2 callback={this.setCurrentSelections} callbackPrevNext={this.getNextElements}/>
            </div>
        )
    }
}
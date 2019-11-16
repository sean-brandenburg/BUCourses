import * as React from "react";
import { NavBar } from './NavBar';
import { Filter } from './Filter';
import { Dropdown } from "./Dropdown";
import { Filter2 } from "./Filter2";
import { ClassList } from "./ClassList";
import { ClassTopLevel } from "./ClassTopLevel";
import { MainContentContainer } from '../styles/AppStyles';
// Top level component
// State should probably be the current page we are looking at

export class App extends React.Component<{},{}> {
    
    render() {
        return (
            <React.Fragment>
                <ClassTopLevel/>
            </React.Fragment>
        )
        
    }

}
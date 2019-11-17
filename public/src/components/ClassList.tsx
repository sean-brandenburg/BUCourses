import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import { SingleClassDisplay} from "./SingleClassDisplay";
import { ClassListContainer } from "../styles/ClassListStyles";

type ClassListProps = { classes : Array<SingleClass>};

export class ClassList extends React.Component<ClassListProps> {
    constructor(props: ClassListProps) {
        super(props);

        this.state = {
            isLoading : true
        }
    }

    render() {
        {
            return (
                <div style={ClassListContainer}>
                    <ul>
                        {this.props.classes.map( (classInfo : SingleClass, i : number) => {
                            return (
                                // <li style={{listStyle : "none"}} key={i}>
                                    <SingleClassDisplay classInfo={classInfo} key={i} />
                                // </li>
                            )   
                        })}
                    </ul>
                </div>
            )
        }
    }

}
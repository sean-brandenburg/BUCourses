import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import { Schedule } from "./Schedule";
import * as Styles from "../styles/SingleClassStyles";
import { Link } from "react-router-dom";

type SingleClassDisplayProps = { classInfo : SingleClass, displaySections : boolean};

export class SingleClassDisplay extends React.Component<SingleClassDisplayProps, {}> {
    constructor(props: SingleClassDisplayProps) {
        super(props);

    }

    
    private detectClasses = (text : string) : Array<string | JSX.Element> => {
        let classRegex = /[a-zA-Z]{3}[ -][a-zA-Z]{2}[ -]\d{3}/g;
        let tildas = text.replace(classRegex, function(blah) {
                return '~' + blah + '~';
        });
        let splitted = tildas.split(/~/g);
        let formatted = splitted.map(function(blah2) {
            if (classRegex.test(blah2)) {
                let newBlah = blah2.toLowerCase();
                newBlah = newBlah.replace(/ /g, '-');
                return <Link to={"/class/" + newBlah}>{blah2}</Link>
            } else {
                return blah2;
            }
        });
        return formatted;
    }

    private renderSchedule = () : JSX.Element => {
        if (this.props.displaySections == true) {
            console.log(this.props.classInfo.Sections)
            return <Schedule sections={this.props.classInfo.Sections}></Schedule>
        }
    }
    

    render() {
        let newCode : string = this.props.classInfo.Code.replace(/-/g, " ").toUpperCase();

        return (
            <div style={Styles.SingleClassContainer}>
                <h4 ><Link style={Styles.ClassName} to={"/class/" + this.props.classInfo.Code}>{this.props.classInfo.ClassName}</Link></h4>
                <h5 style={Styles.Code}>{newCode}</h5>
                <h5 style={Styles.College}>{this.props.classInfo.College}</h5>
                <h5 style={Styles.Credits}>{this.props.classInfo.Credits} Credits</h5>                
                <h6 style={Styles.Description}>{this.detectClasses(this.props.classInfo.Description)}</h6>
                {this.renderSchedule()}
            </div>
        )
    }
}
import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import { Schedule } from "./Schedule";
import * as Styles from "../styles/SingleClassStyles";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

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
        let college : string = newCode.split(" ")[0];

        return (
            <Paper elevation={1} square={true} style={Styles.SingleClassContainer}>
                <Grid
                    container
                    direction="column"
                    justify="center">
                        <Avatar variant="square" style={Styles.Avatar}>{college}</Avatar>
                        <h5 style={Styles.ClassName}><Link style={Styles.Link} to={"/class/" + this.props.classInfo.Code}>{this.props.classInfo.ClassName}</Link></h5>
                        <h5 style={Styles.Code}>{newCode} · {this.props.classInfo.College} · {this.props.classInfo.Credits} Credits</h5>
                        <h6 style={Styles.Description}>{this.props.classInfo.Description}</h6>

                </Grid>
            </Paper>
        )
    }
}
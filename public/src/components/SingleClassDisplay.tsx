import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import { Schedule } from "./Schedule";
import { SectionList } from "./SectionList";
import * as Styles from "../styles/SingleClassStyles";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const style1 = {
    marginLeft: '2vw',
    width: '50vw',
    marginBottom : '10px'
}

const style2 = {

}

const containerStyle = {
    display : 'flex',
    height: 'calc(100vh - 80px)',
    overflow : 'hidden',
    position : 'relative' as 'relative',
}

const calendarStyle = {
    flexGrow : 1,
    marginRight: '2vw',
    overflow : 'hidden',
    position : 'relative' as 'relative',
    height : 'calc(100%-10px)',
    marginBottom: '10px'
}

const testStyle = {
    marginLeft: 'auto',
    marginRight: '10px',
    width : '200px'
}

type SingleClassDisplayProps = { classInfo : SingleClass, displaySections : boolean, displayButton : boolean};

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

    private renderButton = () : JSX.Element => {
        if (this.props.displayButton == true) {
            return <Button variant="contained" color="default" style={testStyle}>Track this class</Button>
        }
    }
    

    render() {
        let newCode : string = this.props.classInfo.Code.replace(/-/g, " ").toUpperCase();
        let college : string = newCode.split(" ")[0];

        let calendar: JSX.Element;
        let blah123 : JSX.Element;

        if (this.props.displaySections) {
            calendar = <Schedule test={this.props.classInfo}></Schedule>;
            blah123 = <SectionList blah={this.props.classInfo}></SectionList>
        } else {
            calendar = <div></div>;
            blah123 = <div></div>;
        }

        return (
            <div style={this.props.displaySections ? containerStyle : {}}>
                <div style={this.props.displaySections ? style1 : {}}>
                    <Paper elevation={1} square={true} style={Styles.SingleClassContainer}>
                        <Grid
                            container
                            direction="column"
                            justify="center">
                                <Avatar variant="square" style={Styles.Avatar}>{college}</Avatar>
                                <h5 style={Styles.ClassName}><Link style={Styles.Link} to={"/class/" + this.props.classInfo.Code}>{this.props.classInfo.ClassName}</Link></h5>
                                <h5 style={Styles.Code}>{newCode} · {this.props.classInfo.College} · {this.props.classInfo.Credits} Credits</h5>
                                <h6 style={Styles.Description}>{this.props.classInfo.Description}</h6>
                                {this.renderButton()}
                        </Grid>
                    </Paper>
                    {blah123}
                </div>
                <div style={this.props.displaySections ? calendarStyle : {}}>
                    {calendar}
                </div>
            </div>
        )
    }
}
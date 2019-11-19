import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';




type SectionListProps = {
    blah : SingleClass
}

export class SectionList extends React.Component<SectionListProps, {}> {
    constructor(props: SectionListProps) {
        super(props);
    }

    private formatData = (Instructor : string, Location : string, Notes : string, Schedule : string, Section : string, Semester : string) : any => {
        return {Instructor, Location, Notes, Schedule, Section, Semester};
    }


    render() {
        let data : Array<any> = this.props.blah.Sections.map( (thing : any) => {
            if (thing.Semester == "SPRG 2020") {
                return this.formatData(thing.Instructor, thing.Location, thing.Notes, thing.Schedule, thing.Section, thing.Semester)
                //return <Paper><h6 style={{margin: "10px 10px"}}>{thing.Instructor} {thing.Location} {thing.Notes} {thing.Schedule} {thing.Section} {thing.Semester}</h6></Paper>
            } else {
                return null;
            }
        })

        data = data.filter(row => row != null);

        return (
            <Paper style={{overflowY: 'auto'}}>
                <Table aria-label="Sections">
                    <TableHead>
                        <TableRow>
                            <TableCell>Instructor</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Schedule</TableCell>
                            <TableCell>Section</TableCell>
                            <TableCell>Semester</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map( row => (
                                <TableRow>
                                    <TableCell>{row.Instructor}</TableCell>
                                    <TableCell>{row.Location}</TableCell>
                                    <TableCell>{row.Notes}</TableCell>
                                    <TableCell>{row.Schedule}</TableCell>
                                    <TableCell>{row.Section}</TableCell>
                                    <TableCell>{row.Semester}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}
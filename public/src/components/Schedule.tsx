import * as React from "react";

type ScheduleProps = {sections: any};

export class Schedule extends React.Component<ScheduleProps, {}> {
    constructor(props: ScheduleProps) {
        super(props);
    }

    render() {
        return (
            <h5>this is the schedule</h5>
        )
    }
}
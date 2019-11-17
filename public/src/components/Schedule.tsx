// import * as React from "react";

// type ScheduleProps = {sections: any};

// export class Schedule extends React.Component<ScheduleProps, {}> {
//     constructor(props: ScheduleProps) {
//         super(props);
//     }

//     render() {
//         return (
//             <h5>this is the schedule</h5>
//         )
//     }
// }


import * as React from "react";
import { render } from "react-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

type Data = {title: string,
             startDate: Date,
             endDate: Date,
             allDay: boolean,
             id: number,
             location: string};


export class Schedule extends React.Component<{}, Array<Data>> {
  constructor(props: Data) {
    super(props);

    // this.state = {
    //   data: []
    // };
  }
  render() {
    // const { data } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
          <Container style={{marginTop: "80px", marginBottom: "20px"}}>
            <Paper style={{marginLeft: "70px", marginRight: "70px", marginTop: "60px", marginBottom: "20px"}}>
            <Scheduler>
                <WeekView startDayHour={8} endDayHour={22} />
            </Scheduler>
            </Paper>
        </Container>
      </MuiThemeProvider>
    );
  }
}

// render(<App />, document.getElementById("root"));
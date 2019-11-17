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


import { SingleClass } from "../types/SingleClassType";
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

type ScheduleProps = {
  test : SingleClass
}


export class Schedule extends React.Component<ScheduleProps,{}> {
  constructor(props: ScheduleProps) {
    super(props);
    // this.state = {
    //   data: []
    // };
  }

  private blah(date: any, test: any):string {
    return "deez nuts";
  }

  render() {
    // const { data } = this.state;

    let test : React.ComponentType<WeekView.TimeScaleLabelProps>;
    let test2 : any = <WeekView.TimeScaleLabel formatDate={this.blah}></WeekView.TimeScaleLabel>
    let date : string = "2019-11-17";

    let sections : Array<any> = this.props.test.Sections;
    console.log(sections);

    let data : Array<any> = [];

    let SPRG2020 : Array<any> = sections.map( (thing) => {
      if (thing.Semester == "SPRG 2020") {
        console.log("yo");
        console.log(thing.Schedule);
        let days = thing.Schedule.substr(0, thing.Schedule.indexOf(' '));
        let times = thing.Schedule.substr(thing.Schedule.indexOf(' ') + 1);
        console.log(days);
        console.log(times);
        let startTime = times.substr(0, times.indexOf('-'));
        let endTime = times.substr(times.indexOf('-')+1);
        if (startTime.endsWith('pm') || startTime.endsWith('PM')) {
          console.log("yoooooo");
          let hour = startTime.substr(0, startTime.indexOf(':'));
          let minutes = startTime.substr(startTime.indexOf(':') + 1, startTime.indexOf(':') + 1);
          console.log(startTime.indexOf(":"))
          console.log(hour);
          console.log(minutes);
          hour = (parseInt(hour, 10) + 12).toString();
          startTime = hour + ":" + minutes;
        } else {
          startTime = startTime.substr(0, startTime.indexOf(' '));
        }

        if (endTime.endsWith('pm') || endTime.endsWith('PM')) {
          let hour = endTime.substr(0, endTime.indexOf(':'));
          let minutes = endTime.substr(endTime.indexOf(':') + 1, endTime.indexOf(':') + 1);
          hour = (parseInt(hour, 10) + 12).toString();
          endTime = hour + ":" + minutes;
        } else {
          endTime = endTime.substr(0, endTime.indexOf(' '));
        }
        console.log(startTime);
        console.log(endTime);

        for (var i = 0; i < days.length; i++) {
          let day : string;
          if (days[i] == "M") {
            day = "2019-11-18";
          } else if (days[i] == "T") {
            day = "2019-11-19";
          } else if (days[i] == "W") {
            day = "2019-11-20";
          } else if (days[i] == "R") {
            day = "2019-11-21";
          } else if (days[i] == "F") {
            day = "2019-11-22";
          }
          data.push({startDate : day + " " + startTime, endDate : day + " " + endTime, title : thing.Instructor + " " + thing.Section});
        }
        
        console.log("HELLO!!");
        console.log(data);

        return "hello";
      }
    })

    //let data : any = [{startDate : date + " " + "10:00", endDate : date + " " + "14:00", title : "class"}]
    return (
      <MuiThemeProvider theme={theme}>
          <Container style={{marginTop: "80px", marginBottom: "20px"}}>
            <Paper style={{marginLeft: "70px", marginRight: "70px", marginTop: "60px", marginBottom: "20px"}}>
            <Scheduler firstDayOfWeek={0} data={data}>
               <ViewState currentDate={date}/>
               <WeekView startDayHour={8} endDayHour={22}/>
               <Appointments/>
            </Scheduler>
            </Paper>
        </Container>
      </MuiThemeProvider>
    );
  }
}

// render(<App />, document.getElementById("root"));
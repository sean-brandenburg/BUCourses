import * as React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';


type NotifyState = {isOpen: boolean, phoneNumber: number};

export class Notify extends React.Component<any, any>{
  constructor(props: {}) {
      super(props);
      this.state = {isOpen: true, phoneNumber: ""};
  }

  handleClose = () => {
    this.setState({isOpen: false});
  }

  handleConfirm = () => {
    this.setState({isOpen: false});
  }

  handleChange = (event: any): void => {
    this.setState({isOpen: this.state.isOpen, phoneNumber: event.target.value});
    console.log(this.state.phoneNumber);
  }

  sendSMS = () => {
    let num = this.state.phoneNumber;
    let fetchString = 'http://localhost:3000/messages?num=' + num;
    fetch(fetchString)
      .then((message) => {
        console.log(message);
        this.handleClose;
      })
  }

  componentDidMount() {
    console.log("Hey gamers.")
  }

  render(){
    return(
      <div>
      <Dialog open={this.state.isOpen}
              onClose={this.handleClose}
              disableBackdropClick={true}
              >
        <DialogTitle>SMS Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your phone number to recieve SMS notifications.
          </DialogContentText>
          <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              id="number"
              label="Please enter your phone number."
              type="tel"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Skip
          </Button>
          <Button onClick={this.sendSMS} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }
}

import * as React from "react";
import * as Styles from '../styles/AuthStyles';

const GOOGLE_BUTTON_ID = "google-sign-in-button";

export class Authentication extends React.Component<{},{didLogin: boolean, name: String}> {
    constructor(props: {}) {
        super(props);
        this.state = {didLogin: false, name: ""};
    }

    private signOut = () : void => {
        var auth2 : any = gapi.auth2.getAuthInstance();
        console.log(auth2.currentUser.Ab.w3.U3);
        auth2.signOut().then(() => {
            console.log('User signed out');
        });
        this.setState({ didLogin: false, name: "" });
    }
    
    onSuccess = (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        this.setState({ didLogin: true, name: profile.getName() });
        console.log("Name: " + profile.getName());
      }

    componentDidMount() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: "27000856552-tk70ev4o6nk5pln2ei93ni92semnndjk.apps.googleusercontent.com"
            }).then(() => {
                gapi.signin2.render(GOOGLE_BUTTON_ID, 
                    {
                        'width': 90,
                        'height': 30,

                        // 'longtitle': false,
                        'onsuccess': this.onSuccess
                    });
            })
        })
      }
      
      render() {
        return (
          <div style={Styles.buttonStyle} id={GOOGLE_BUTTON_ID}/>
        );
      }
}
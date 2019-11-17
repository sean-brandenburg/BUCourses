import * as React from "react";
import * as Styles from "../styles/AuthStyles";

const GOOGLE_BUTTON_ID = "google-sign-in-button";


export class Auth2 extends React.Component<any,any> {
    constructor(props : any) {
        super(props);

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

                        'onsuccess': this.tryRegister
                    }
                );
            })
        })
    }

    private tryRegister = (googleUser : any) : void => {
        let profile = googleUser.getBasicProfile();
        let email = profile.U3;
        let fetchString : string = 'http://localhost:3000/users/newUser?email=' + email;
        fetch(fetchString)
            .then( (response) => {
                alert(response.status);
            })
    }
    
    render() {
        return (
            <div  style={Styles.buttonStyle} id={GOOGLE_BUTTON_ID}></div>
        )
    }
}







import * as React from "react";
import { Link } from 'react-router-dom';
import * as Styles from '../styles/NavBarStyles';
import { Authentication } from './Authentication';
import { Auth2 } from './Auth2';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/styles";

// State should be which link we're on right now probably

type NavBarState = { loggedIn: boolean, name: String };

export class NavBar extends React.Component<{}, NavBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false,
            name: ""
        }
    }

    render() {
        return (
            <AppBar elevation={0} style={Styles.bar}>
                <Toolbar>
                    <IconButton edge="start" style={Styles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <img src={require("./LogoWithDog.png")} style={{maxHeight: "60px"}}/>
                    <div style={Styles.title}></div>
                    {/*<Button color="inherit">Login</Button>*/}
                    {/* <Auth2/> */}
                </Toolbar>
            </AppBar>
            // <nav style={Styles.NavBarBackground} className="navbar fixed-top navbar-expand-lg navbar-light">
            //     <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            //     data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
            //     aria-label="Toggle navigation">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>
            //     {
            //     <Link className="navbar-brand" to='/'>
            //         BUCourses
            //     </Link>
            //     }

            //     <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            //         <ul className="navbar-nav ml-auto">
            //             <li className="nav-item">
            //                 <Link style={Styles.NavBarLink} className="nav-link" to='/search'>Courses
            //                     <span className="sr-only">(current)</span>
            //                 </Link>
            //             </li>
            //             <li className="nav-item">
            //                 <a style={Styles.NavBarLink} className="nav-link" href="#!">Link</a>
            //             </li>
            //             <li className="nav-item">
            //                 <Authentication></Authentication>
            //                 {/* <Link style={Styles.NavBarLink} className="nav-link" to='/auth'>Sign In</Link> */}
            //             </li>
            //         </ul>
            //     </div>
            // </nav>
        )
    }
}


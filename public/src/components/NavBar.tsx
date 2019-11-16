import * as React from "react";
import { Link } from 'react-router-dom';
import * as Styles from '../styles/NavBarStyles';
import { Authentication } from './Authentication'

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
            <nav style={Styles.NavBarBackground} className="navbar fixed-top navbar-expand-lg navbar-light">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                <Link className="navbar-brand" to='/'>
                    BUCourses
                </Link>
                }

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link style={Styles.NavBarLink} className="nav-link" to='/search'>Courses
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a style={Styles.NavBarLink} className="nav-link" href="#!">Link</a>
                        </li>
                        <li className="nav-item">
                            <Authentication></Authentication>
                            {/* <Link style={Styles.NavBarLink} className="nav-link" to='/auth'>Sign In</Link> */}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


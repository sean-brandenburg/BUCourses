import * as React from "react";
import { SingleClass } from '../types/SingleClassType';
import { SingleClassDisplay } from "./SingleClassDisplay";

type ClassPageState = { code : string; isLoading : boolean; classInfo : SingleClass | undefined};

export class ClassPage extends React.Component<any,ClassPageState> {
    constructor(props : any) {
        super(props);        
        this.state = {
            code : this.props.match.params.code,
            isLoading : true,
            classInfo : undefined
        }
    }

    componentDidMount() {
        let host : string = 'https://bucourses.appspot.com'
        let query : string = '/class?code=' + this.state.code;
        fetch(host + query)
            .then( res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Could not connect');
                }
            })
            .then( resJson => {
                this.setState({
                    classInfo : resJson,
                    isLoading : false
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        } else {
            return (
                <SingleClassDisplay classInfo={this.state.classInfo} displaySections={true}/>
            )
        }
    }
}
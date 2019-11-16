import * as React from "react";

type HelloProps = { code: string; };
type HelloState = { classInfo: {}; isLoading: boolean};
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props);
        this.state = {
            classInfo: {},
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/class?code=cas-cs-411')
            .then(res => res.json())
            .then(result => this.setState({classInfo: result, isLoading: false}))
    }
    
    render() {
        console.log(this.state.isLoading)
        console.log(this.state.classInfo)
        return (
            <div>
                {this.props.code}
            </div>
        )
    }
    
}
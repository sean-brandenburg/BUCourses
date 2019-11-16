import * as React from "react";

type CheckboxProps = { option : string; isDropdown : boolean; propogateState : (option : string, checked : boolean) => void};
type CheckboxState = { checked : boolean};

export class Checkbox extends React.Component<CheckboxProps,CheckboxState> {
    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            checked : false
        };
    }

    private handleChange = () : void => {
        this.props.propogateState(this.props.option, !this.state.checked);
        this.setState({ checked : !this.state.checked});
    }

    render() {
        return (
            <div className={"custom-control custom-checkbox" + this.props.isDropdown ? " dropdown-item" : ""}>
                <input type="checkbox" className="custom-control-input" id={this.props.option} checked={this.state.checked} onChange={this.handleChange}/>
                <label className="custom-control-label" htmlFor={this.props.option}>{this.props.option}</label>
            </div>
        )
    }
}
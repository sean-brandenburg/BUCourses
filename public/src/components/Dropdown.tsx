import * as React from "react";
import { Checkbox } from './Checkbox';
import * as $ from 'jquery';
import { DropdownChecklist, DropdownButton , DropdownListDiv} from '../styles/DropdownStyles';

interface checkedMap {[key: string] : boolean};
type DropdownProps = { name: string; options: Array<string>; identifier: string; propogateState : (dropdownState : checkedMap, queryCategory : string) => void };
type DropdownState = { showing: boolean; checkedOptions: checkedMap};

export class Dropdown extends React.Component<DropdownProps,DropdownState> {
    constructor(props: DropdownProps) {
        super(props);

        let checkedOptions : checkedMap = this.props.options.reduce((a, key) => Object.assign(a, {[key]: false}), {});

        this.state = {
            showing : false,
            checkedOptions : checkedOptions
        }
    }

    componentDidMount() {
        $('.btn-group').on('hide.bs.dropdown', (e : any) => {
            let DropdownClick : boolean = !e.hasOwnProperty('clickEvent');
            
            if (DropdownClick) {
                return true;
            }

            let li : any = document.getElementsByClassName(this.props.identifier)[0];
            let target : any = e.clickEvent.target;

            if (!li.contains(target)) {
                return true;
            } else {
                return false;
            }

        })
    }

    private setCheckedOption = (option : string, checked : boolean) : void => {
        let updatedCheckedOptions : checkedMap = Object.assign({}, this.state.checkedOptions, {[option]: checked});
        this.setState({checkedOptions : updatedCheckedOptions}, () => this.props.propogateState(this.state.checkedOptions, this.props.identifier));
    }

        render() {
            return (
                <div style={DropdownChecklist} className="btn-group">
                    <button style={DropdownButton} type="button" className="btn btn-primary dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.name}
                    </button>
                    <div className="dropdown-menu" x-placement="bottom-start" style={DropdownListDiv}>
                    <form>
                    <ul className={this.props.identifier}>
                        {
                            this.props.options.map( (option, i) => {
                                return (
                                    <li key={i} style={{listStyle: "none"}}>
                                        <Checkbox isDropdown={true} option={option} propogateState={this.setCheckedOption}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </form>
                    </div>
                </div>

            )
        }
}
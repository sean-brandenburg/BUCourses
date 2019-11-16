import * as React from "react";
import * as $ from 'jquery';
import { string } from "prop-types";

const Colleges : Array<string> = [
    'Arts and Sciences',
    'Communication',
    'Engineering',
    'Questrom',
    'Fine Arts',
    'General Studies',
    'Sargeant',
    'Wheelock',
    'Hospitality Administration',
    'Kilachand Honors College',
    'Graduate Medical Sciences',
    'Graduate Arts and Sciences',
    'Dental Medicine',
    'Metropolitan College',
    'Law',
    'Medicine',
    'Public Health',
    'Social Work',
    'Theology'
];

const CreditOptions : Array<string> = [
    '0-1',
    '2',
    '3',
    '4',
    '5+'
]

const dropdownListStyle: any = {
    height: '300px',
    overflowX: 'hidden',
    position: "absolute", 
    willChange: "transform",
    top: "0px", 
    left: "0px", 
    transform: "translate3d(0px,38px,0px)"
};

interface Checks { [key: string] : boolean};

interface FilterState { 
                     checkedCredits: Checks;
                     checkedColleges: Checks;
                   };

export class Filter extends React.Component<{},FilterState> {
    constructor(props: {}) {
        super(props);

        let checkedColleges : Checks = Colleges.reduce((a, key) => Object.assign(a, {[key]: false}), {});
        let checkedCredits : Checks = CreditOptions.reduce((a, key) => Object.assign(a, {[key]: false}), {});

        console.log(checkedColleges);
        console.log(checkedCredits);

        this.state = {
            checkedColleges : checkedColleges,
            checkedCredits : checkedCredits
        };
    }
    
    
    componentDidMount() {
        // This stuff prevents the dropdown from closing after you check a box. Don't know how to do it
        // without Jquery unfortunately..
        /*
        $('.dropdown-menu').on('click', function(e: JQuery.Event) {
            
            e.stopPropagation();
        });
        */
    }
    

    private testMethod = (event: React.MouseEvent<HTMLLIElement>) : void => {
        console.log('hi');
    }
    
/*
    private handleInputChange = (event: React.ChangeEvent<HTMLLIElement>) : void => {
        console.log('hello');
        const checkState : boolean = event.target.checked;
        const college : string = event.target.name;
        let updatedCheckedCollege : Checks = Object.assign({}, this.state.checkedColleges, {[college]: checkState});
        this.setState({ 'checkedColleges' : updatedCheckedCollege});
        console.log(checkState);
        console.log(college);
    }
*/
    render() {
        return (
            <div>
                Filter
                <br/>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">
                        Filter by College...
                    </button>
                    <div className="dropdown-menu" x-placement="bottom-start" style={dropdownListStyle}>
                        <form>
                        <ul style={{listStyle : "none"}}>
                            {
                            Colleges.map( (college, i) => {
                                return (
                                    <li className="custom-control custom-checkbox dropdown-item" key={i} onClick={this.testMethod}>
                                        <input type="checkbox" className="custom-control-input" id={"collegeOptionCheck" + i} name={college}/>
                                        <label className="custom-control-label" htmlFor={"collegeOptionCheck" + i}>{college}</label>
                                    </li>
                                )
                            })
                            }
                        </ul>
                        </form>
                    </div>                   
                </div>
                <br/>
                Department
                <br/>
                Credits
                <br/>
                <ul style={{listStyle : "none"}}>
                    {
                    CreditOptions.map( (option, i) => {
                        return (
                            <li className="custom-control custom-checkbox dropdown-item" key={i}>
                                <input type="checkbox" className="custom-control-input" id={"creditOptionCheck" + i}/>
                                <label className="custom-control-label" htmlFor={"creditOptionCheck" + i}>{option}</label>
                            </li>
                        )
                    })
                    }
                </ul>

                <br/>
                <br/>
                <br/>

                <button onClick={()=>console.log(this.state)}>test</button>
                     
                     

            </div>
        )
    }
}
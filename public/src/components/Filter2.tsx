import * as React from "react";

import { Dropdown } from "./Dropdown";
import { SingleClass } from "../types/SingleClassType";
import { FilterContainer } from '../styles/FilterStyles';
import { Button } from "@material-ui/core";

interface depObjInner {
    [key : string] : string
}

interface depObj {
    [key : string] : depObjInner 
}

const departmentsObject : depObj = {
    "CAS": {
      "AA": "African American Studies",
      "AH": "History of Art & Architecture",
      "AI": "Asian Studies",
      "AL": "Applied Linguistics",
      "AM": "American & New England Studies, including Preservation Studies",
      "AN": "Anthropology",
      "AR": "Archaeology",
      "AS": "Astronomy",
      "BB": "Biochemistry & Molecular Biology",
      "BF": "Bioinformatics",
      "BI": "Biology",
      "CC": "Core Curriculum",
      "CG": "Modern Greek",
      "CH": "Chemistry",
      "CI": "Cinema & Media Studies",
      "CL": "Classical Studies",
      "CS": "Computer Science",
      "EC": "Economics",
      "EE": "Earth & Environment",
      "EI": "Editorial Studies",
      "EN": "English",
      "ES": "Earth & Environment",
      "FR": "French Studies (International Programs only)",
      "FY": "First Year Experience",
      "GE": "Earth & Environment",
      "HI": "History",
      "HU": "Humanities",
      "ID": "Interdisciplinary Studies",
      "IN": "Internships",
      "IP": "International Programs",
      "IR": "International Relations",
      "IT": "Italian Studies (International Programs only)",
      "LA": "Hausa",
      "LC": "Chinese",
      "LD": "Amharic, Igbo, Mandinka/Bambara, Setswana/Sesotho, isiZulu, Other African Languages and Linguistics",
      "LE": "Swahili (Kiswahili)",
      "LF": "French",
      "LG": "German",
      "LH": "Hebrew",
      "LI": "Italian",
      "LJ": "Japanese",
      "LK": "Korean",
      "LL": "Language Learning",
      "LM": "isiXosha",
      "LN": "Hindi-Urdu",
      "LO": "Yoruba",
      "LP": "Portuguese",
      "LR": "Russian",
      "LS": "Spanish",
      "LT": "Turkish",
      "LU": "Pulaar",
      "LW": "Wolof, Akan Twi",
      "LX": "Linguistics",
      "LY": "Arabic",
      "LZ": "Persian (Farsi)",
      "MA": "Mathematics & Statistics",
      "ME": "Middle East & North Africa Studies",
      "MR": "Marine Science",
      "MS": "Medical Science",
      "MU": "Music",
      "NE": "Neuroscience",
      "NG": "Nigerien Studies (International Programs only)",
      "NS": "Natural Sciences",
      "PH": "Philosophy",
      "PO": "Political Science",
      "PS": "Psychological & Brain Sciences",
      "PY": "Physics",
      "QU": "Spanish Studies (Quito only)",
      "RN": "Religion",
      "RO": "Romance Studies",
      "SO": "Sociology",
      "SP": "Special Programs",
      "SS": "Social Sciences",
      "SY": "Senior-Year Development",
      "WR": "Writing",
      "WS": "Women’s, Gender, & Sexuality Studies",
      "XL": "Comparative Literature"
    },
    "CFA": {
      "AR": "Visual Arts",
      "TH": "Theatre",
      "FA": "CFA Courses",
      "ML": "Applied Lessons",
      "MU": "Music",
      "PS": "Child Growth & Development"
    },
    "CGS": {
      "HU": "Humanities",
      "MA": "Mathematics",
      "NS": "Natural Science",
      "RH": "Rhetoric",
      "SS": "Social Science"
    },
    "COM": {
      "CI": "Cinema & Media Studies",
      "CM": "Mass Communication, Advertising & Public Relations",
      "CO": "Core Courses",
      "EM": "Emerging Media Studies",
      "FT": "Film & Television",
      "JO": "Journalism"
    },
    "ENG": {
      "BE": "Biomedical Engineering",
      "BF": "Bioinformatics",
      "EC": "Electrical & Computer Engineering",
      "EK": "Engineering Core",
      "ME": "Mechanical Engineering",
      "MS": "Materials Science & Engineering",
      "SE": "Systems Engineering"
    },
    "GMS": {
      "AN": "Anatomy and Neurobiology",
      "BC": "Healthcare Emergency Management",
      "BI": "Biochemistry",
      "BN": "Behavioral Neuroscience",
      "BY": "Biophysics",
      "CI": "Clinical Investigation",
      "CM": "Cell & Molecular Biology",
      "FA": "Forensic Anthropology",
      "FS": "Biomedical Forensic Sciences",
      "GC": "Genetic Counseling",
      "GE": "Genetics and Genomics",
      "IM": "Bioimaging",
      "MA": "Medical Anthropology & Cross Cultural Practice",
      "MH": "Mental Health Counseling and Behavioral Medicine",
      "MI": "Microbiology",
      "MM": "Molecular Medicine",
      "MS": "Medical Sciences",
      "NU": "Nutrition & Metabolism",
      "OB": "Oral Biology",
      "OH": "Oral Health Sciences",
      "PA": "Pathology & Laboratory Medicine",
      "PH": "Physiology",
      "PM": "Pharmacology & Experimental Therapeutics"
    },
    "LAW": {
      "AM": "American Law",
      "BK": "Banking",
      "JD": "Juris Doctor",
      "XB": "Business Law",
      "TX": "Tax Law"
    },
    "MET": {
      "AD": "Administrative Sciences",
      "AH": "Art History",
      "AM": "American & New England Studies",
      "AN": "Anthropology",
      "AR": "Arts Administration",
      "AT": "Actuarial Science",
      "BI": "Biology",
      "BT": "Biomedical Laboratory & Clinical Sciences",
      "CH": "Chemistry",
      "CJ": "Criminal Justice",
      "CM": "Communications/Advertising",
      "CS": "Computer Science",
      "EC": "Economics",
      "EN": "English",
      "ES": "Earth Sciences",
      "HC": "Health Communication",
      "HI": "History",
      "HU": "Humanities",
      "IS": "Interdisciplinary Studies",
      "LD": "Leadership",
      "LF": "French",
      "LS": "Spanish",
      "LX": "Linguistics",
      "MA": "Mathematics, Statistics",
      "MG": "Management",
      "ML": "Gastronomy",
      "PH": "Philosophy",
      "PO": "Political Science",
      "PS": "Psychology",
      "PY": "Physics",
      "RN": "Religion",
      "SO": "Sociology",
      "UA": "Urban Affairs"
    },
    "OTP": {
      "AS": "Aerospace Studies (Air Force)",
      "MS": "Military Science (Army)",
      "NS": "Naval Science (Navy)"
    },
    "PDP": {
      "AQ": "Aquatics",
      "CS": "Court Sports",
      "DA": "Dance",
      "ER": "Emergency Medical Response",
      "FT": "Fitness",
      "GS": "General Sports",
      "HE": "Health Education",
      "MA": "Martial Arts",
      "MB": "Mind and Body",
      "NT": "Nutrition",
      "OE": "Outdoor Exercise",
      "PE": "Physical Education",
      "SK": "Skating",
      "WF": "Rowing/Sailing"
    },
    "QST": {
      "AC": "Accounting",
      "DS": "Doctoral Dissertation Section",
      "ES": "Executive Skills",
      "FE": "Finance",
      "FI": "MSIM",
      "HM": "Health Sector",
      "IM": "International Management",
      "IS": "Management Information Systems",
      "LA": "Law",
      "MF": "Math Finance",
      "MK": "Marketing",
      "OB": "Organizational Behavior",
      "OM": "Operations & Technology Management",
      "PL": "Markets, Public Policy & Law",
      "QM": "Quantitative Modeling",
      "SI": "Strategy & Innovation",
      "SM": "Management Core"
    },
    "SAR": {
      "AT": "Athletic Training",
      "HP": "Health Professions",
      "HS": "Health Sciences",
      "OT": "Occupational Therapy",
      "PT": "Physical Therapy",
      "RS": "Rehabilitation Sciences",
      "SH": "Speech, Language & Hearing Sciences"
    },
    "SDM": {
      "EN": "Endodontics",
      "GD": "General Dentistry",
      "MB": "Molecular Biology",
      "MD": "Dental Medicine",
      "OB": "Oral Biology",
      "OD": "Oral Diagnosis",
      "OP": "Operative Dentistry",
      "OR": "Orthodontics & Dentofacial Orthopedics",
      "OS": "Oral & Maxillofacial Surgery",
      "PA": "Oral & Maxillofacial Pathology",
      "PD": "Pediatric Dentistry",
      "PE": "Periodontology",
      "PH": "Dental Public Health",
      "PR": "Prosthodontics",
      "RS": "Restorative Dentistry"
    },
    "SED": {
      "AP": "Policy, Planning & Administration",
      "BI": "English as a Second Language",
      "CE": "Counseling & Counseling Psychology",
      "CH": "Childhood Education",
      "CL": "Latin & Classical Studies Education",
      "CT": "Curriculum & Teaching",
      "DE": "Deaf Studies",
      "DS": "Human Development & Education",
      "EC": "Early Childhood Education",
      "ED": "Required across all programs (undergraduate or graduate level as noted)",
      "EM": "Educational Media & Technology",
      "EN": "English & Language Arts Education",
      "HE": "Health Education",
      "HR": "Human Resource Education",
      "IE": "International Education",
      "LC": "Independent Study",
      "LR": "Reading (formerly RE Reading Education)",
      "LS": "Language & Literacy Studies",
      "LW": "Writing",
      "ME": "Mathematics Education",
      "PE": "Physical Education & Coaching",
      "RS": "Research",
      "SC": "Science Education",
      "SE": "Special Education",
      "SO": "Social Studies Education",
      "TL": "Teaching English to Speakers of Other Languages (TESOL) & Modern Foreign Language Education"
    },
    "SHA": {
      "HF": "Hospitality"
    },
    "SPH": {
      "BS": "Biostatistics",
      "EH": "Environmental Health",
      "EP": "Epidemiology",
      "HC": "International Health Practice (Philippines)",
      "IH": "International Health",
      "LW": "Health Law, Bioethics & Human Rights",
      "MC": "Maternal & Child Health",
      "PH": "General Public Health",
      "PM": "Health Policy & Management",
      "SB": "Social & Behavioral Sciences"
    },
    "SSW": {
      "CP": "Clinical Practice",
      "FE": "Field Education",
      "HB": "Human Behavior",
      "MP": "Macro Practice",
      "SP": "Social Work Practice",
      "SR": "Social Work Research",
      "WP": "Social Welfare Policy"
    },
    "STH": {
      "TA": "Sacred Music and the Arts",
      "TC": "Preaching, Worship, Administration, Evangelism, and Spirituality",
      "TE": "Religious Education",
      "TF": "Interdisciplinary Studies",
      "TH": "History of Christianity",
      "TJ": "Practical Theology",
      "TM": "Mission Studies",
      "TN": "New Testament",
      "TO": "Hebrew Scripture",
      "TR": "Sociology of Religion",
      "TS": "Ethics",
      "TT": "Philosophy and Systematic Theology",
      "TY": "Pastoral Psychology and Psychology of Religion",
      "TZ": "Research Methods and Professional Development"
    }
};

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

const collegeCodes : Array<string> = Object.keys(departmentsObject);

let allDepartments : Array<string> = [];

const collegeMap : any = {
    'Arts and Sciences' : 'CAS',
    'Communication' : 'COM',
    'Engineering' : 'ENG',
    'Questrom' : 'QST',
    'Fine Arts' : 'CFA',
    'General Studies' : 'CGS',
    'Sargeant' : 'SAR',
    'Wheelock' : 'SED',
    'Hospitality Administration' : 'SHA',
    'Kilachand Honors College' : '',
    'Graduate Medical Sciences' : 'GMS',
    'Graduate Arts and Sciences' : 'GRS',
    'Dental Medicine' : 'SDM',
    'Metropolitan College' : 'MET',
    'Law' : 'LAW',
    'Medicine' : '',
    'Public Health' : 'SPH',
    'Social Work' : 'SSW',
    'Theology' : 'STH'
}

const CreditOptions : Array<string> = [
    '0-1',
    '2',
    '3',
    '4',
    '5+'
];

const Level : Array<string> = [
    '000',
    '100',
    '200',
    '300',
    '400',
    '500+'
];

const Hub : Array<string> = [
    'Aesthetic Exploration',
    'Creativity/Innovation',
    'Critical Thinking',
    'Digital/Multimedia Expression',
    'Ethical Reasoning',
    'First-Year Writing Seminar',
    'Global Citizenship and Intercultural Literacy',
    'Historical Consciousness',
    'Life Skills',
    'Oral and/or Signed Communication',
    'Part of a Hub sequence',
    "Philosophical Inquiry and Life's Meanings",
    'Quantitative Reasoning I',
    'Quantitative Reasoning II',
    'Research and Information Literacy',
    'Scientific Inquiry I',
    'Scientific Inquiry II',
    'Social Inquiry I',
    'Social Inquiry II',
    'Teamwork/Collaboration',
    'The Individual in Community',
    'Writing, Research, and Inquiry',
    'Writing-Intensive Course'
];

interface checkedMap {[key: string] : boolean};
interface queryParameters {[key: string] : Array<any>};

type Filter2State = { queryObject: queryParameters , listedDepartments : Array<string>};
type Filter2Props = { callback : ( newCurrentSelections : Array<SingleClass> ) => void, callbackPrevNext: ( addIndex : number ) => void };

export class Filter2 extends React.Component<Filter2Props,Filter2State> {
    constructor(props: Filter2Props) {
        super(props);

        collegeCodes.forEach( (code : string) => {
            let current : depObjInner = departmentsObject[code];
            let currentKeys : Array<string> = Object.keys(current);
            currentKeys.forEach( (departmentCode : string) => {
                allDepartments.push(current[departmentCode]);
            });
        })

        let queryObject : queryParameters = {
            College : [],
            Credits : [],
            CreditsMin: [],
            Level: [],
            LevelMin: [],
            Hub: [],
            Departments: []
        }

        this.state = {
            queryObject : queryObject,
            listedDepartments : allDepartments
        }
    }

    private setQueryFromDropdown = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        Object.keys(dropdownState).forEach( (college) => {
            if (dropdownState[college] == true) {
                newQuery.push(college);
            }
        });

        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery});
        this.setState({ queryObject : updatedQueryObject}, this.sendGetRequest);
    }

    private setQueryFromDropdownCollege = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        let newListedDepartments : string[] = [];
        Object.keys(dropdownState).forEach( (college) => {
            if (dropdownState[college] == true) {
                newQuery.push(college);
                let innerObj : depObjInner = departmentsObject[collegeMap[college]];
                Object.keys(innerObj).forEach( (departmentCode) => {
                    newListedDepartments.push(innerObj[departmentCode]);
                })
            }
        });

        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery});
        this.setState({ queryObject : updatedQueryObject, listedDepartments : newListedDepartments}, this.sendGetRequest);
    }

    private setQueryFromDropdownCredits = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        let newQuery2 : string[] = [];
        Object.keys(dropdownState).forEach( (creditOption) => {
            if (dropdownState[creditOption] == true) {
                if (creditOption == '5+') {
                    newQuery2.push('5');
                }
                else if (creditOption == '0-1') {
                    newQuery.push('0');
                    newQuery.push('1');
                }
                else {
                    newQuery.push(creditOption);
                }
            }
        });
        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery, ['CreditsMin']: newQuery2});
        this.setState({ queryObject: updatedQueryObject}, this.sendGetRequest);
    }

    private setQueryFromDropdownLevels = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        let newQuery2 : string[] = [];
        Object.keys(dropdownState).forEach( (levelOption) => {
            if (dropdownState[levelOption] == true) {
                if (levelOption == '500+') {
                    newQuery2.push('500');
                }
                else {
                    newQuery.push(levelOption);
                }
            }
        });
        console.log(this.state.queryObject)
        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery, ['LevelMin']: newQuery2});
        this.setState({ queryObject: updatedQueryObject}, this.sendGetRequest);
    }    

    private getParameterString = (Parameter : string) : string => {
        let ParameterString : string = "";
        this.state.queryObject[Parameter].forEach( (element : string) => {
            ParameterString += ('&' + Parameter.toLowerCase() + '=' + encodeURIComponent(element));
        })
        return ParameterString;
    }

    private sendGetRequest = () : void => {
        let host : string = 'https://bucourses.appspot.com';
        let query : string = '/class?';
        //let query : string = '/class?limit=10' + this.getParameterString('College');
        Object.keys(this.state.queryObject).forEach(parameter => {
            query += this.getParameterString(parameter);
        });
                
        fetch(host + query)
            .then( res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error('Could not connect');
                }
            })
            .then( resJson => {
                this.props.callback(resJson);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div style={FilterContainer}>
                <Dropdown name="Filter by College" options={Colleges} identifier={'College'} propogateState={this.setQueryFromDropdownCollege}/>
                <Dropdown name="Filter by Department" options={this.state.listedDepartments} identifier={'Department'} propogateState={this.setQueryFromDropdown}/>
                <Dropdown name="Filter by Level" options={Level} identifier={'Level'} propogateState={this.setQueryFromDropdownLevels}/>
                <Dropdown name="Filter by Credits" options={CreditOptions} identifier={'Credits'} propogateState={this.setQueryFromDropdownCredits}/>
                <Dropdown name="Filter by Hub Requirements" options={Hub} identifier={'Hub'} propogateState={this.setQueryFromDropdown}/>
                <Button variant="contained" onClick={() => this.props.callbackPrevNext(-10)}>
                    Prev
                </Button>
                <Button variant="contained" onClick={() => this.props.callbackPrevNext(10)}>
                    Next
                </Button>
            </div>
        )
    }



}
import * as React from "react";

// Maybe later the props will be the result. So we pass back result to parent, then to sibling (class display component)
type ClassSearchState = { code: string; };
type ClassSearchProps = { callback: any; };

export class ClassSearch extends React.Component<ClassSearchProps, ClassSearchState> {
    constructor(props: ClassSearchProps) {
        super(props);
        this.state = {
            code: ''
        };

    }
    private handleSubmit = (): void => {
        let fetchString: string = 'http://localhost:3000/class?code=' + this.state.code;
        fetch(fetchString)
            .then(( response ) => {
                return response.json();
            })
            .then( (jsonResponse) => {
                this.props.callback(jsonResponse);
            });
    }

    private handleChange = (event: any): void => {
        this.setState({ code: event.target.value });
    }

    render() {
        return (
            <div>
                    Class Code: <input type="text" value={this.state.code} onChange={this.handleChange}></input>
                    <button type="button" onClick={this.handleSubmit} className="ht-tm-element btn btn-primary">Search</button>
            </div>
        )
    }
}
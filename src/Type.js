import React, { Component } from 'react';

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { checkWordTyped } = this.props;
        checkWordTyped(this.state.value);
        this.setState({ value: "" })
    }

    render() {
        return (
            <div className="Type">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" autoFocus={true} value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" style={{display:"none"}} />
                </form>
            </div>
        );
    }
}

export default Type;
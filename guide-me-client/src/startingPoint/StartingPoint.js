import React, { Component } from 'react';
import './StartingPoint.css';
import {postUserStartingPoint} from "../util/APIUtils";
import Alert from "react-s-alert";

class StartingPoint extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            input: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setUserStartingPoint = this.setUserStartingPoint.bind(this);
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    handleClick() {
        console.log(this.state.input);
    }

    render() {
        return (
            <div className="starting-point-container">
                <div className="starting-point-input-container">
                    <div className="input-group mb-3">
                        <div className="starting-point-title"><h2> Insert your starting point address </h2></div>
                        <br/>
                        <input type="text" className="form-control starting-point-input"
                               placeholder="Street name and number"
                               aria-label="Street name and number" aria-describedby="button-addon2"
                               onChange={this.handleChange}/>
                        <div className="starting-point-button input-group-append">
                            <button className="btn btn-outline-secondary" onClick={this.setUserStartingPoint} type="button"
                                    id="button-addon2">Set Starting Point
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    setUserStartingPoint() {
        const address = this.state.input;

        let userStartingPointRequest = {
            address: address,
            userId: this.props.currentUser.id
        };

        postUserStartingPoint(userStartingPointRequest)
            .then(response => {
                Alert.success("Starting point successfully set!");
                this.props.loadUserStartingPoints(this.props.currentUser.id);
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    };
}

export default StartingPoint
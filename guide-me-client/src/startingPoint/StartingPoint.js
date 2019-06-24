import React, { Component } from 'react';
import './StartingPoint.css';

class StartingPoint extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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
                               aria-label="Street name and number" aria-describedby="button-addon2"/>
                        <div className="starting-point-button input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StartingPoint
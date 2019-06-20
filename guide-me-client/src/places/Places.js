import React, { Component } from 'react';
import './Places.css';

class Places extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { categories: [], places: [] };
    }

    componentDidMount() {

    }

    render() {
        return (
            <p>Test</p>
        );
    }
}

export default Places
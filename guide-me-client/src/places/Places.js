import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './Places.css';

var _ = require('lodash');

class Place extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.place.name}</td>
                <td>{this.props.place.address}</td>
                <td>{this.props.place.latitude}</td>
                <td>{this.props.place.longitude}</td>
            </tr>
        )
    }
}

class CategoryTabName extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <Tab>{this.props.name}</Tab>
        )
    }
}

class CategoryTabPane extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const places = this.props.places.map(place =>
           <Place key={place.id} place={place}/>
        );
        return (
            <TabPanel>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    {places}
                    </tbody>
                </table>
            </TabPanel>
        )
    }
}

class PlacesList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const categoryNames = this.props.categories.map(category =>
            <CategoryTabName key={category.id} name={category.name}/>
        );
        const categoryTabPanes = this.props.categories.map(category =>
            <CategoryTabPane key={category.id} places={category.places}/>
        );
        return (
            <Tabs>
                <TabList>
                    {categoryNames}
                </TabList>
                {categoryTabPanes}
            </Tabs>
        )
    }
}

export default PlacesList
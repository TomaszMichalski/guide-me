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

class CategoryTabPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const places = this.props.places.map(place =>
           <Place key={place.id} place={place}/>
        );
        return (
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
        )
    }
}

class PlacesList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        // remove slice(0, 3), it's only for development
        const categoryNames = this.props.categories.slice(0, 3).map(category =>
            <Tab>{category.name}</Tab>
        );
        const categoryTabPanels = this.props.categories.slice(0, 3).map(category =>
            <TabPanel>
                <CategoryTabPanel key={category.id} places={category.places}/>
            </TabPanel>
        );
        return (
            <Tabs>
                <TabList>
                    {categoryNames}
                </TabList>
                {categoryTabPanels}
            </Tabs>
        )
    }
}

export default PlacesList
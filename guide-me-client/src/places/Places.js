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
            <Tab>this.props.name</Tab>
        )
    }
}

class CategoryTabPane extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
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
                    {this.props.places}
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
        // sth about selected tab index
    }

    render() {
        const categoryNames = this.props.categories.map(category =>
            <CategoryTabName name={category.name}/>
        );
        const categoryPlaces = _.groupBy(this.props.places, function(place) {
            return place.category.id;
        });
        var categoryTabPanes = [];
        for (var category in Object.keys(categoryPlaces)) {
            categoryTabPanes.push(<CategoryTabPane places={categoryPlaces[category]}/>)
        }
        return (
            <Tabs>
                {categoryNames}
                {/*{categoryTabs}*/}
            </Tabs>
        )
    }
}

export default PlacesList
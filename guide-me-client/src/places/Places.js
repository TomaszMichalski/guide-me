import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {getDistance} from '../util/APIUtils';
import ReactTable from 'react-table';
import "react-tabs/style/react-tabs.css";
import 'react-table/react-table.css';
import './Places.css';
import Alert from "react-s-alert";

class CategoryTabPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Address',
            accessor: 'address'
        }, {
            Header: 'Latitude',
            accessor: 'longitude'
        }, {
            Header: 'Longitude',
            accessor: 'latitude'
        }, {
            Header: 'Distance',
            accessor: 'distance'
        }];
        this.props.places.map(place =>
            getDistance(place.id, this.props.userId)
                .then(response => place.distance = response.distance
                ).catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                })
        );
        return (
            <ReactTable
                data={this.props.places}
                columns={columns}
            />
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
            <Tab>{category.name}</Tab>
        );
        const categoryTabPanels = this.props.categories.map(category =>
            <TabPanel>
                <CategoryTabPanel key={category.id} places={category.places} userId={this.props.currentUser.id}/>
            </TabPanel>
        );
        return (
            <Tabs defaultIndex={0}>
                <TabList>
                    {categoryNames}
                </TabList>
                {categoryTabPanels}
            </Tabs>
        )
    }
}

export default PlacesList
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {getDistance} from '../util/APIUtils';
import ReactTable from 'react-table';
import "react-tabs/style/react-tabs.css";
import 'react-table/react-table.css';
import './Places.css';
import LoadingIndicator from "../common/LoadingIndicator";

class CategoryTabPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            loading: true
        }

        this.loadDistances = this.loadDistances.bind(this);
        this.loadDistances();
    }

    loadDistances() {
        const promises = this.props.places.map(place =>
            getDistance(place.id, this.props.userId)
        );

        Promise.all(promises).then((results) => {
            this.props.places.map(place =>
                place.distance = results.find(result => place.id === result.placeTo.id).distance
            );
            this.setState({
                loading: false
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }

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
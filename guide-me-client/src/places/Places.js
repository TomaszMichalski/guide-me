import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTable from 'react-table';
import "react-tabs/style/react-tabs.css";
import 'react-table/react-table.css';
import './Places.css';

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
                <CategoryTabPanel key={category.id} places={category.places}/>
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
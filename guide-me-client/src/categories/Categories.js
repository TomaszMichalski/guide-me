import React, { Component } from 'react';

class Category extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.category.id}</td>
                <td>{this.props.category.name}</td>
                <td>{this.props.category.address}</td>
                <td>{this.props.category.latitude}</td>
                <td>{this.props.category.longitude}</td>

            </tr>
        )
    }
}

class CategoryList extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const categories = this.props.categories.map(category =>
            <Category key={category._links.self.href} category={category}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                {categories}
                </tbody>
            </table>
        )
    }
}

export default CategoryList
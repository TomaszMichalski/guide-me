const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Place extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.place.id}</td>
                <td>{this.props.place.name}</td>
                <td>{this.props.place.address}</td>
                <td>{this.props.place.latitude}</td>
                <td>{this.props.place.longitude}</td>

            </tr>
        )
    }
}

class PlaceList extends React.Component {
    render() {
        const places = this.props.places.map(place =>
            <Place key={place._links.self.href} place={place}/>
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
                {places}
                </tbody>
            </table>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {places: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/places'}).done(response => {
            this.setState({places: response.entity.places});
        });
    }

    render() {
        return (
            <PlaceList places={this.state.places}/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
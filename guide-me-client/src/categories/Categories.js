import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import Muzea from '../img/Muzea.jpg';
import Uczelnie from '../img/Uczelnie.jpg';
import Dworce from '../img/Dworce.jpg';
import Galerie from '../img/Galerie.jpg';
import './Categories.css';

class Category extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            canAdd: false
        };

        this.isInUserCategories = this.isInUserCategories.bind(this);
    }

    render() {
        const picUrl = Category.resolvePic(this.props.category.name);
        return (
                <div className="card flex-item" style={{width: "18rem"}}>
                    <img className="card-img-top" src={picUrl} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.category.name}</h5>
                            <a href="#" className="btn btn-primary btn-block" hidden={this.isInUserCategories(this.props.category)}>Dodaj</a>
                            <a href="#" className="btn btn-block" style={{background: "red", color: "white"}} hidden={!this.isInUserCategories(this.props.category)}>Usuń</a>

                        </div>
                </div>
        )
    }

    componentDidMount() {
        this.state = {
            canAdd: this.isInUserCategories(this.props.category)
        }
    }

    isInUserCategories(category) {
        let categoriesIds = this.props.userCategories.map(cat => cat.id);
        return categoriesIds.includes(category.id);
    }

    static resolvePic(name) {
        switch (name) {
            case "Uczelnie": return Uczelnie;
            case "Muzea": return Muzea;
            case "Dworce autobusowe": return Dworce;
            case "Galerie handlowe": return Galerie;
        }
    }
}

class CategoryList extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const categories = this.props.categories.map(category =>
            <Category key={category.id} category={category} userCategories={this.props.userCategories}/>
        );

        return (
                <div className="flex-container">
                {categories}
                </div>

        )
    }
}

export default CategoryList
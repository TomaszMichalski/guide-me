import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import Muzea from '../img/Muzea.jpg';
import Uczelnie from '../img/Uczelnie.jpg';
import Dworce from '../img/Dworce.jpg';
import Galerie from '../img/Galerie.jpg';
import './Categories.css';
import {deleteUserCategory, postUserCategory} from "../util/APIUtils";
import Alert from "react-s-alert";

class Category extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            canAdd: false
        };

        this.isInUserCategories = this.isInUserCategories.bind(this);
        this.addUserCategory = this.addUserCategory.bind(this);
        this.removeUserCategory = this.removeUserCategory.bind(this);
    }

    render() {
        const picUrl = Category.resolvePic(this.props.category.name);
        return (
                <div className="card flex-item" style={{width: "18rem"}}>
                    <img className="card-img-top" src={picUrl} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.category.name}</h5>
                            <a href="#"
                               className="btn btn-primary btn-block"
                               hidden={this.isInUserCategories(this.props.category)}
                               onClick={() => this.addUserCategory(this.props.category)}>Dodaj</a>
                            <a href="#" className="btn btn-block" style={{background: "red", color: "white"}}
                               hidden={!this.isInUserCategories(this.props.category)}
                               onClick={() => this.removeUserCategory(this.props.category)}>Usuń</a>

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

    addUserCategory(category) {
        let userCategoryRequest = {
            category: category,
            userId: this.props.currentUser.id
        };

        postUserCategory(userCategoryRequest)
            .then(response => {
                Alert.success("Category successfully added!");
                this.props.loadUserCategories(this.props.currentUser.id);
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    };

    removeUserCategory(category) {
        let userCategoryRequest = {
            category: category,
            userId: this.props.currentUser.id
        };

        deleteUserCategory(userCategoryRequest)
            .then(response => {
                Alert.success("Category successfully deleted!");
                this.props.loadUserCategories(this.props.currentUser.id);
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    };

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
            <Category key={category.id} category={category}
                      userCategories={this.props.userCategories}
                      currentUser={this.props.currentUser}
                      loadUserCategories={this.props.loadUserCategories}/>
        );

        return (
                <div className="flex-container">
                {categories}
                </div>

        )
    }
}

export default CategoryList
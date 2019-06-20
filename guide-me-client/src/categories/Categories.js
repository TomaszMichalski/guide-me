import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import Muzea from '../img/Muzea.jpg';
import Uczelnie from '../img/Uczelnie.jpg';
import Dworce from '../img/Dworce.jpg';
import Galerie from '../img/Galerie.jpg';
import './Categories.css';



class Category extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        const picUrl = Category.resolvePic(this.props.category.name);
        return (
                <div className="card flex-item" style={{width: "18rem"}}>
                    <img className="card-img-top" src={picUrl} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.category.name}</h5>
                            <a href="#" className="btn btn-primary btn-block">Dodaj</a>
                            <a href="#" className="btn btn-block" style={{background: "red", color: "white"}}>Usun</a>

                        </div>
                </div>
        )
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
            <Category key={category._links.self.href} category={category}/>
        );
        return (
                <div className="flex-container">
                {categories}
                </div>

        )
    }
}

export default CategoryList
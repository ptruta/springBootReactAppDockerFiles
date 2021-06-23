import React, { Component } from 'react';
import AddCountryForm from "./AddCountryForm";

const addCountry = country => {
  country.id = this.props.countries.length + 1
  country.user = this.props.currentUser
  addNewCountry(country)
       .then(response => {
            console.log("hihi"+response);
       });
}

export default class Countries extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="add-countries-container">
                <div className="container">
                    <div className="flex-row">
                        <h2> Add new Country </h2>
                        <AddCountryForm addUser={addCountry} countries={this.props.countries} />
                    </div>
                </div>
            </div>
        );
    }
}

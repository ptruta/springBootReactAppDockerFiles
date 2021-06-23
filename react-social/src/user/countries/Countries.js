import React, { Component } from 'react';
import CountryTable from "./CountryTable";
import AddCountryForm from "./AddCountryForm";
import { getCountriesForCurrentlyLoggedInUser } from '../../util/APIUtils';
import { deleteCountry } from '../../util/APIUtils';

export default class Countries extends Component {
    constructor(props) {
        super(props);
        console.log("in countries");
        console.log(props);
        this.state = {
          countries: this.props.countries
        }
        this.loadCountriesForCurrentlyLoggedInUser = this.loadCountriesForCurrentlyLoggedInUser.bind(this);
    }

    loadCountriesForCurrentlyLoggedInUser() {
           getCountriesForCurrentlyLoggedInUser()
                 .then(response => {
                      console.log(response);
                       this.setState({
                             countries: response
                       });
                 });
    }

    render() {
        const onDeleteCountry = countryId => {
          console.log(countryId)
          deleteCountry(countryId)
             .then(response => {
                  console.log(response);
                  console.log("MINUNE");
                  console.log(this.props);
                  this.loadCountriesForCurrentlyLoggedInUser();
             });

        }

        return (
            <div className="countries-container">
                <div className="container">
                    <div className="flex-row">
                        <h2> Add new Country </h2>
                        <AddCountryForm countries={this.state.countries}
                            loadCountriesForCurrentlyLoggedInUser={this.loadCountriesForCurrentlyLoggedInUser.bind(this)}/>
                    </div>
                    <div className="flex-row">
                        <h2> List of countries </h2>
                        <CountryTable countries={this.state.countries}
                            onDeleteCountry={onDeleteCountry}
                            loadCountriesForCurrentlyLoggedInUser={this.loadCountriesForCurrentlyLoggedInUser.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

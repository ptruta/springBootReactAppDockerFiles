import React, { Component } from 'react';
import { addNewCountry } from '../../util/APIUtils';
import Alert from 'react-s-alert';

export default class AddCountryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("spercamergi");
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const countryRequest = Object.assign({}, this.state);
        countryRequest.id = this.props.countries.length + 1
        countryRequest.user = this.props.currentUser
        console.log("lala"+countryRequest);
        addNewCountry(countryRequest)
            .then(response => {
                console.log(response);
                Alert.success("You're successfully added new country to list!");
                this.props.loadCountriesForCurrentlyLoggedInUser();
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name"
                        className="form-control" placeholder="City"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Add new Country</button>
                </div>
            </form>

        );
    }
}

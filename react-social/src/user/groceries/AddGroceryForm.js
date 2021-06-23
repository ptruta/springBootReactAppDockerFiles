import React, { Component } from 'react';
import { addNewGrocery } from '../../util/APIUtils';
import Alert from 'react-s-alert';

export default class AddGroceryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const groceryRequest = Object.assign({}, this.state);
        groceryRequest.id = this.props.groceries.length + 1
        groceryRequest.user = this.props.currentUser
        addNewGrocery(groceryRequest)
            .then(response => {
                console.log(response);
                Alert.success("You're successfully added new grocery to list!");
                this.props.loadGroceriesForCurrentlyLoggedInUser();
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name"
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Add new Grocery</button>
                </div>
            </form>

        );
    }
}

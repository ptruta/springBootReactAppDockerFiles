import React, { Component } from 'react';
import GroceryTable from "./GroceryTable";
import AddGroceryForm from "./AddGroceryForm";
import { getGroceriesForCurrentlyLoggedInUser } from '../../util/APIUtils';
import { deleteGrocery } from '../../util/APIUtils';

export default class Groceries extends Component {
    constructor(props) {
        super(props);
        console.log("in groceries");
        console.log(props);
        this.state = {
          groceries: this.props.groceries
        }
        this.loadGroceriesForCurrentlyLoggedInUser = this.loadGroceriesForCurrentlyLoggedInUser.bind(this);
    }

    loadGroceriesForCurrentlyLoggedInUser() {
           getGroceriesForCurrentlyLoggedInUser()
                 .then(response => {
                      console.log(response);
                       this.setState({
                             groceries: response
                       });
                 });
    }

    render() {
        const onDeleteGrocery = groceryId => {
          console.log(groceryId)
          deleteGrocery(groceryId)
             .then(response => {
                  console.log(response);
                  console.log("MINUNE");
                  console.log(this.props);
                  this.loadGroceriesForCurrentlyLoggedInUser();
             });

        }

        return (
            <div className="groceries-container">
                <div className="container">
                    <div className="flex-row">
                        <h2> Add new grocery </h2>
                        <AddGroceryForm groceries={this.state.groceries}
                            loadGroceriesForCurrentlyLoggedInUser={this.loadGroceriesForCurrentlyLoggedInUser.bind(this)}/>
                    </div>
                    <div className="flex-row">
                        <h2> List of groceries </h2>
                        <GroceryTable groceries={this.state.groceries}
                            onDeleteGrocery={onDeleteGrocery}
                            loadGroceriesForCurrentlyLoggedInUser={this.loadGroceriesForCurrentlyLoggedInUser.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

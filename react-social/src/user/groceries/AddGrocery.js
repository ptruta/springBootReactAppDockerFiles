import React, { Component } from 'react';
import GroceryList from "./GroceryList";
import GroceryTable from "./GroceryTable";
import AddGroceryForm from "./AddGroceryForm";

const addGrocery = grocery => {
  grocery.id = this.props.groceries.length + 1
  grocery.user = this.props.currentUser
  addNewGrocery(grocery)
       .then(response => {
            console.log(response);
       });
}

export default class Groceries extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="add-groceries-container">
                <div className="container">
                    <div className="flex-row">
                        <h2> Add new grocery </h2>
                        <AddGroceryForm addUser={addGrocery} groceries={this.props.groceries} />
                    </div>
                </div>
            </div>
        );
    }
}

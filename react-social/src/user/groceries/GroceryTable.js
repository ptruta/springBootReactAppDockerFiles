import React from 'react'

const GroceryTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.groceries.length > 0 ? (
        props.groceries.map(grocery => (
          <tr key={grocery.id}>
            <td>{grocery.name}</td>
            <td>
              <button onClick={() => props.onDeleteGrocery(grocery.id)} className="button muted-button">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No more groceries</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default GroceryTable
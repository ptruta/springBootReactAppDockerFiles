import React from 'react'

const CountryTable = props => (
  <table>
    <thead>
      <tr>
        <th>City</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.countries.length > 0 ? (
        props.countries.map(country => (
          <tr key={country.id}>
            <td>{country.name}</td>
            <td>
              <button onClick={() => props.onDeleteCountry(country.id)} className="button muted-button">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No more countries</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default CountryTable
import React from "react";

import Country from "./Country";

function CountryList(props) {
  return (
    <div>
      {props.countries.map(c => <Country key={c.id} name={c.name}/>)}
     </div>
  );
}

export default CountryList;
import React from "react";

import Grocery from "./Grocery";

function GroceryList(props) {
  return (
    <div>
      {props.groceries.map(c => <Grocery key={c.id} name={c.name}/>)}
     </div>
  );
}

export default GroceryList;
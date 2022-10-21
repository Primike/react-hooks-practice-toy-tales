import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, deleteToy, likeToy}) {
  let list = toys.map(toy => {
    return (
      <ToyCard key = {toy.id} toy = {toy} deleteToy = {deleteToy} likeToy = {likeToy}/>
    )
  })

  return (
    <div id="toy-collection">{list}</div>
  );
}

export default ToyContainer;

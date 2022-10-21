import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetchToys()
  }, [])
  function fetchToys() {
    fetch(`http://localhost:3001/toys`)
      .then(response => response.json())
      .then(json => setToys(json))
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function createToy(e) {
    e.preventDefault()

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.target[0].value,
        name: e.target[0].value,
        image: e.target[1].value,
        likes: 0,
      }),
    })
    .then((response) => {
      if(response.status === 500) {
        alert('Toy Already Exists!')
        return
      }
      fetchToys()
    })
  }

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => fetchToys())
  }

  function likeToy(id, likes) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,
      }),
    })
    .then(() => fetchToys())
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm createToy = {createToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys = {toys} deleteToy = {deleteToy} likeToy = {likeToy}/>
    </>
  );
}

export default App;

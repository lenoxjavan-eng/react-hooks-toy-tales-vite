import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const TOYS_URL = "http://localhost:3001/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(TOYS_URL)
      .then((response) => response.json())
      .then(setToys)
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(toyData) {
    return fetch(TOYS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toyData, likes: 0 }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        setToys((currentToys) => [...currentToys, newToy]);
        return newToy;
      });
  }

  function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`${TOYS_URL}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((currentToy) =>
            currentToy.id === updatedToy.id ? updatedToy : currentToy
          )
        );
      })
      .catch((error) => console.error("Error updating likes:", error));
  }

  function handleDeleteToy(toyId) {
    fetch(`${TOYS_URL}/${toyId}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== toyId)
        );
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;

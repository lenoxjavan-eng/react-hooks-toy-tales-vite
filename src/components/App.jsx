import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const TOYS_URL = "http://localhost:3001/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TOYS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys from server");
        }
        return response.json();
      })
      .then((data) => {
        setToys(data);
        setIsLoading(false);
      })
      .catch((loadError) => {
        console.error("Error fetching toys:", loadError);
        setError("Unable to load toys. Make sure the server is running.");
        setIsLoading(false);
      });
  }, []);

  function handleClick() {
    setShowForm((prevShowForm) => !prevShowForm);
  }

  function handleAddToy(toyData) {
    return fetch(TOYS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toyData, likes: 0 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add toy");
        }
        return response.json();
      })
      .then((newToy) => {
        setToys((currentToys) => [...currentToys, newToy]);
        return newToy;
      })
      .catch((addError) => {
        console.error("Error adding toy:", addError);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update toy likes");
        }
        return response.json();
      })
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }
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
        <button onClick={handleClick} type="button">
          Add a Toy
        </button>
      </div>
      {isLoading ? (
        <p>Loading toys...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ToyContainer
          toys={toys}
          onLikeToy={handleLikeToy}
          onDeleteToy={handleDeleteToy}
        />
      )}
    </>
  );
}

export default App;

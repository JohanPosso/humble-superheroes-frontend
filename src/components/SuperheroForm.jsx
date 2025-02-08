import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const SuperheroForm = ({ superhero, onSave }) => {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState(5);
  const [message, setMessage] = useState("");

  const toast = useRef(null);

  useEffect(() => {
    if (superhero) {
      setName(superhero.name);
      setSuperpower(superhero.superpower);
      setHumilityScore(superhero.humilityScore);
    }
  }, [superhero]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSuperhero = { name, superpower, humilityScore };
    try {
      if (superhero) {
        await axios.put(
          `${REACT_APP_BACKEND_URL}/superheroes/${superhero.id}`,
          newSuperhero
        );
        setMessage("Superhero updated successfully!");
      } else {
        await axios.post(`${REACT_APP_BACKEND_URL}/superheroes`, newSuperhero);
        setMessage("Superhero added successfully!");
      }
      onSave();
      toast.current.show({ severity: "success", summary: message });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h3>{superhero ? "Edit Superhero" : "Add New Superhero"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="superpower">Superpower</label>
          <InputText
            id="superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="humilityScore">Humility Score</label>
          <Rating
            id="humilityScore"
            value={humilityScore}
            onChange={(e) => setHumilityScore(e.value)}
            stars={10}
            cancel={false}
          />
        </div>
        <Button
          label={superhero ? "Update" : "Add"}
          icon="pi pi-check"
          type="submit"
        />
      </form>
    </div>
  );
};

export default SuperheroForm;

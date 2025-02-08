import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import SuperheroForm from "./SuperheroForm";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [selectedSuperhero, setSelectedSuperhero] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/superheroes`);
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const handleAdd = () => {
    setSelectedSuperhero(null);
    setShowForm(true);
  };

  const handleEdit = (superhero) => {
    setSelectedSuperhero(superhero);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/superheroes/${id}`);
      fetchSuperheroes();
    } catch (error) {
      console.error("Error deleting superhero:", error);
    }
  };

  return (
    <div className="container py-5">
      <Button
        label="Add New Superhero"
        icon="pi pi-plus"
        onClick={handleAdd}
        className="p-mb-3"
      />

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
        className="p-grid p-justify-center container py-5"
      >
        {superheroes.map((superhero) => (
          <div key={superhero.id}>
            <Card title={superhero.name} style={{ width: "100%" }}>
              <p>
                <strong>Superpower:</strong> {superhero.superpower}
              </p>
              <p>
                <strong>Humility Score:</strong>
              </p>
              <Rating
                value={superhero.humilityScore}
                readOnly
                stars={10}
                cancel={false}
              />
              <div className="p-mt-2 d-flex justify-content-space-evenly py-2">
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit(superhero)}
                  className="p-mr-2"
                />
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  onClick={() => handleDelete(superhero.id)}
                  className="p-button-danger"
                />
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal para el formulario de agregar/editar superhéroe */}
      <Dialog
        visible={showForm}
        style={{ width: "50vw" }}
        header={selectedSuperhero ? "Edit Superhero" : "Add New Superhero"}
        onHide={() => setShowForm(false)}
      >
        <SuperheroForm
          superhero={selectedSuperhero}
          onSave={() => {
            setShowForm(false);
            fetchSuperheroes();
          }}
        />
      </Dialog>
    </div>
  );
};

export default SuperheroList;

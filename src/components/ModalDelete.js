import React from "react";
import "../assets/style/modalForm.css";

const ModalDelete = ({ close }) => {
  return (
    <div className="modal-container">
      <div className="modal-delete">
        <h1>Usuario eliminado </h1>
        <button onClick={close}>Aceptar</button>
      </div>
      <div className="overlay-delete"></div>
    </div>
  );
};

export default ModalDelete;

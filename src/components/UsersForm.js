import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style/modalForm.css";

const UsersForm = ({
  getUsers,
  userSelected,
  deselectUser,
  close,
  titleModal,
  textButton,
  setShowModal,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (userSelected !== null) {
      setFirstName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setBirthday(userSelected.birthday);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setBirthday("");
    }
  }, [userSelected]);

  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      birthday,
    };
    // editar
    if (userSelected !== null) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id} /`,
          user
        )
        .then(() => {
          getUsers();
          deselectUser();
          alert("Usuario editado");
          setShowModal(false);
        });
    } else {
      // crear
      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => {
          getUsers();
          alert("Usuario agregado");
          setShowModal(false);
        })
        .catch((error) => console.log(error.response));
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="modal-container">
        <div className="modal">
          <div className="titleModal">
            <h1>{titleModal}</h1>
            <button onClick={close}>x</button>
          </div>
          <div>
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label htmlFor="email">Correo</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="text"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label htmlFor="birthday">Cumpleaños</label>
            <input
              type="date"
              id="birthday"
              onChange={(e) => setBirthday(e.target.value)}
              value={birthday}
            />
          </div>
          <button type="submit" className="submit">
            {textButton}
          </button>
        </div>
        <div className="overlay" onClick={close}></div>
      </div>
    </form>
  );
};

export default UsersForm;

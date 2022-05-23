import { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";
import ModalDelete from "./components/ModalDelete";
import axios from "axios";
import "./assets/style/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [titleModal, setTitleModal] = useState("");
  const [textButton, setTextButton] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  // funcion para actualizar listado
  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  const selectUser = (user) => {
    setUserSelected(user);
    setShowModal(true);
  };

  const deselectUser = () => {
    setUserSelected(null);
  };

  const removeProduct = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id} /`)
      .then(() => getUsers())
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Usuarios</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setTitleModal("Crear");
            setTextButton("Agregar nuevo usuario");
            deselectUser();
          }}
        >
          + Crear nuevo usuario
        </button>
      </div>

      {showModal && (
        <UsersForm
          close={() => setShowModal(false)}
          getUsers={getUsers}
          userSelected={userSelected}
          deselectUser={deselectUser}
          titleModal={titleModal}
          textButton={textButton}
          users={users}
          setShowModal={setShowModal}
        />
      )}

      {showModalDelete && (
        <ModalDelete close={() => setShowModalDelete(false)} />
      )}

      <UsersList
        setTitleModal={setTitleModal}
        setShowModalDelete={setShowModalDelete}
        users={users}
        selectUser={selectUser}
        removeProduct={removeProduct}
        setTextButton={setTextButton}
      />
    </div>
  );
}

export default App;

import "../assets/style/userList.css";

const UsersList = ({
  users,
  selectUser,
  removeProduct,
  setTitleModal,
  setShowModalDelete,
  setTextButton,
}) => {
  return (
    <div className="container">
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>
              {user.first_name} {user.last_name}
            </h2>
            <div className="line"></div>
            <p className="gray">CORREO</p>
            <p>{user.email}</p>
            <p className="gray">CUMPLEAÑOS</p>
            <p>{user.birthday}</p>
            <div className="line"></div>

            <div className="buttons">
              <button
                onClick={() => {
                  selectUser(user);
                  setTitleModal("Editar");
                  setTextButton("Editar usuario")
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                onClick={() => {
                  removeProduct(user.id);
                  setShowModalDelete(true);
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

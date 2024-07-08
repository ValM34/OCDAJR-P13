import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { userSlice } from "../redux/userSlice.js";
import { getUser } from "../redux/selectors.js";

function UpdateProfil({ toggleEditNameForm }) {
  const user = useSelector(getUser);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(
          userSlice.actions.updateProfile({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
          })
        );
        toggleEditNameForm();
      });
  };

  return (
    <section>
      <h1 style={{ fontSize: "2em" }}>
        Welcome back
        <br />
      </h1>
      <form>
        <div className="update-profile-inputs-container">
          <input
            className="update-profile-input"
            ref={firstNameRef}
            type="text"
            name="firstName"
            defaultValue={user && user.firstName}
          />
          <input
            className="update-profile-input"
            ref={lastNameRef}
            type="text"
            name="lastName"
            defaultValue={user && user.lastName}
          />
        </div>
        <div className="update-profile-buttons-container">
          <button
            className="update-profile-validation-button"
            onClick={handleForm}
            type="submit"
          >
            Save
          </button>
          <button
            className="update-profile-validation-button"
            onClick={toggleEditNameForm}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

UpdateProfil.propTypes = {
  toggleEditNameForm: () => {},
};

export default UpdateProfil;

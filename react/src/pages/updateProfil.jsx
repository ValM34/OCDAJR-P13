import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../redux/userSlice.js";
import { getUser } from "../redux/selectors.js";

function UpdateProfil() {
  const user = useSelector(getUser);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const navigate = useNavigate();
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
        navigate("/user");
      });
  };

  return (
    <>
      <Header />
      <h1>Modifier le profil</h1>
      <section className="update-profile-content">
        <form>
          <div className="input-wrapper">
            <label htmlFor="firstName">Prénom</label>
            <input
              ref={firstNameRef}
              type="text"
              name="firstName"
              defaultValue={user && user.firstName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Nom</label>
            <input
              ref={lastNameRef}
              type="text"
              name="lastName"
              defaultValue={user && user.lastName}
            />
          </div>
          <button
            onClick={handleForm}
            type="submit"
            className="update-profile-button"
          >
            Modifier
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default UpdateProfil;

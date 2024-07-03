import Footer from "../layouts/footer";
import Header from "../layouts/header";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../redux/userSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../redux/selectors.js";

function User() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToUpdateProfil = () => {
    navigate('/user/update');
  }

  useEffect(() => {
    if(!user || user.token === null) {
      navigate('/sign-in');
    } else {
      if(!user.firstName && !user.lastName) {
        fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            dispatch(userSlice.actions.updateProfile(data.body));
          });
      }
    }
  }, [navigate, user, dispatch]);

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user && user.firstName && user.lastName ? user.firstName + " " + user.lastName : ""}!
          </h1>
          <button onClick={navigateToUpdateProfil} className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;

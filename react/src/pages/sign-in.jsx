import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // // Save token in local storage
        // localStorage.removeItem("token");
        // localStorage.setItem("token", data.body.token);
        dispatch(userSlice.actions.login(data.body.token));
        navigate("/user");
      });
  }

  console.log(user)

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input ref={usernameRef} type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input ref={passwordRef} type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button onClick={signIn} className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;

import { useEffect, useState } from "react";
import Button from "../Button";
import "./scss/Login.css";
import axios from "axios";
import { saveUserInLocalStorage } from "../../Services/Services";
import { Navigate, useNavigate } from "react-router";
import { login } from "../../Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (Email: string, Password: string) => {
    setError("");
    Email = Email.toLowerCase();
    axios
      .post("http://localhost:3001/Login", {
        Email: Email,
        Password: Password,
      })
      .then((res) => {
        const userData = {
          id: res.data.user_id,
          email: res.data.email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          imageUrl: res.data.image_url,
          token: res.data.token,
        };
        dispatch(login(userData));
        navigate("/");
      })
      .catch((err) => {
        console.log("Login Failed Error:" + err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Invalid email or password");
          } else {
            setError("Login failed. Please try again.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
      });
  };

  useEffect(() => {
    if (Email.trim() === "") {
      setEmailError("");
    } else if (!Email.includes("@") || !Email.includes(".")) {
      setEmailError("Email is Wrong");
    } else {
      setEmailError("");
    }
    if (Password.trim() === "") {
      setPasswordError("");
    } else if (Password.length < 4) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
    const isEmailValid =
      Email.trim() !== "" && Email.includes("@") && Email.includes(".");
    const isPasswordValid = Password.trim() !== "" && Password.length >= 4;
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [Email, Password]);

  return (
    <div className="LoginContainer">
      <form>
        <h2>Login</h2>
        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "10px",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{
            borderColor: emailError ? "red" : "",
            outline: emailError ? "1px solid red" : "",
          }}
        ></input>
        <input
          type="Password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderColor: passwordError ? "red" : "",
            outline: passwordError ? "1px solid red" : "",
          }}
        ></input>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.2rem",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.8rem" }}>Don’t Have An Account?</span>
            <span className="SignUp">Sign Up</span>
          </div>
          <Button
            Text="Login"
            BGcolor="#f21e1e"
            TextColor="White"
            disabled={!isFormValid}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleLogin(Email, Password);
            }}
          ></Button>
        </div>
      </form>
    </div>
  );
};

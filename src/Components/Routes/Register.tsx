import { useEffect, useState } from "react";
import Button from "../Button";
import "./scss/Login.css"; // Reuse the same styles as Login
import axios from "axios";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error states
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (email.trim() === "") {
      setEmailError("");
    } else {
      const atIndex = email.indexOf("@");
      const hasDotAfterAt =
        atIndex !== -1 && email.indexOf(".", atIndex) > atIndex;

      if (!email.includes("@")) {
        setEmailError("Email must include @");
      } else if (!hasDotAfterAt) {
        setEmailError("Email must include a domain (e.g., .com)");
      } else {
        setEmailError("");
      }
    }
    if (password.trim() === "") {
      setPasswordError("");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter");
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must include at least one number");
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError("Password must include at least one special character");
    } else {
      setPasswordError("");
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
    if (firstName.trim() === "") {
      setFirstNameError("");
    } else if (firstName.length < 2) {
      setFirstNameError("First name must be at least 2 characters");
    } else {
      setFirstNameError("");
    }
    if (lastName.trim() === "") {
      setLastNameError("");
    } else if (lastName.length < 2) {
      setLastNameError("Last name must be at least 2 characters");
    } else {
      setLastNameError("");
    }

    const atIndex = email.indexOf("@");
    const hasDotAfterAt =
      atIndex !== -1 && email.indexOf(".", atIndex) > atIndex;

    const isEmailValid =
      email.trim() !== "" && email.includes("@") && hasDotAfterAt;
    const isPasswordValid =
      password.trim() !== "" &&
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isConfirmPasswordValid =
      confirmPassword === password && confirmPassword !== "";
    const isFirstNameValid = firstName.trim() !== "" && firstName.length >= 2;
    const isLastNameValid = lastName.trim() !== "" && lastName.length >= 2;

    setIsFormValid(
      isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isFirstNameValid &&
        isLastNameValid
    );
  }, [email, password, confirmPassword, firstName, lastName]);

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:3001/register", {
        email: email.toLowerCase(),
        password: password,
        image_url: "./Avatar.jpg",
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        setSuccess("Registration successful! Please log in.");
        setTimeout(() => {
          navigate("/login", { state: { registeredEmail: email } });
        }, 2000);

        navigate("/login");
      })
      .catch((err) => {
        console.log("Registration Error:", err);
        if (err.response) {
          if (err.response.status === 409) {
            setError("Email already in use");
          } else {
            setError("Registration failed. Please try again.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
      });
  };

  return (
    <div className="LoginContainer">
      <form>
        <h2>Register</h2>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderColor: emailError ? "red" : "",
            outline: emailError ? "1px solid red" : "",
          }}
        />
        <div style={{ width: "100%" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderColor: passwordError ? "red" : "",
              outline: passwordError ? "1px solid red" : "",
            }}
          />
          <div
            className="error-text"
            style={{
              color: "red",
              fontSize: "0.8rem",
              textAlign: "left",
            }}
          >
            {passwordError}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              borderColor: confirmPasswordError ? "red" : "",
              outline: confirmPasswordError ? "1px solid red" : "",
            }}
          />
          <div
            className="error-text"
            style={{
              color: "red",
              fontSize: "0.8rem",
              textAlign: "left",
            }}
          >
            {confirmPasswordError}
          </div>
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            borderColor: firstNameError ? "red" : "",
            outline: firstNameError ? "1px solid red" : "",
          }}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{
            borderColor: lastNameError ? "red" : "",
            outline: lastNameError ? "1px solid red" : "",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1rem",
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
            <span style={{ fontSize: "0.8rem" }}>Already have an account?</span>
            <span
              className="SignUp"
              style={{ cursor: "pointer", color: "#f21e1e" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
          <Button
            Text="Register"
            BGcolor="#f21e1e"
            TextColor="White"
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;

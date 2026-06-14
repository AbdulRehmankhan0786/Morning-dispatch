import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful");

        // redirect to login page
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);

      } else {
        setMessage(data.message || "Signup failed");
      }

    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Signup</button>

      </form>

      <p>{message}</p>

    </div>
  );
}
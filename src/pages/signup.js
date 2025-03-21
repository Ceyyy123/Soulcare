import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantMail, setWantMail] = useState(false);
  const [notificationTimes, setNotificationTimes] = useState(["07:00", "19:00"]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTimeChange = (index, value) => {
    let newTimes = [...notificationTimes];
    newTimes[index] = value;

    // Zeiten in Stunden umwandeln
    const [h1, m1] = newTimes[0].split(":").map(Number);
    const [h2, m2] = newTimes[1].split(":").map(Number);
    const timeDiff = Math.abs((h1 + m1 / 60) - (h2 + m2 / 60));

    if (timeDiff !== 12) {
      setError("Die Zeiten müssen genau 12 Stunden auseinander liegen!");
    } else {
      setError("");
    }

    setNotificationTimes(newTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      alert(error);
      return;
    }

    const userData = {
      email,
      password,
      wantMail,
      notificationTimes: wantMail ? notificationTimes : undefined,
    };

    try {
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!signupResponse.ok) {
        throw new Error("Fehler bei der Registrierung");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={wantMail}
              onChange={() => setWantMail(!wantMail)}
            />
            Erinnerungen per E-Mail erhalten?
          </label>
        </div>
        {wantMail && (
          <div className="form-group">
            <label>Erinnerungszeiten (müssen 12h auseinander liegen):</label>
            <input
              type="time"
              value={notificationTimes[0]}
              onChange={(e) => handleTimeChange(0, e.target.value)}
            />
            <input
              type="time"
              value={notificationTimes[1]}
              onChange={(e) => handleTimeChange(1, e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

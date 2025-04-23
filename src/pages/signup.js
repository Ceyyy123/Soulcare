import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantMail, setWantMail] = useState(false);
  const [notificationTimes, setNotificationTimes] = useState(["07:00", "19:00"]);
  const [error, setError] = useState("");       // allgemeiner Fehler (z. B. von Server)
  const [timeError, setTimeError] = useState(""); // spezieller Zeitfehler
  const router = useRouter();

  const handleTimeChange = (index, value) => {
    const newTimes = [...notificationTimes];
    newTimes[index] = value;

    // Differenz berechnen
    const [h1, m1] = newTimes[0].split(":").map(Number);
    const [h2, m2] = newTimes[1].split(":").map(Number);
    const diff = Math.abs((h1 + m1 / 60) - (h2 + m2 / 60));
    const rounded = Math.round(diff * 100) / 100;

    if (rounded !== 12) {
      setTimeError("Die Zeiten müssen genau 12 Stunden auseinander liegen!");
    } else {
      setTimeError("");
    }

    setNotificationTimes(newTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zeitprüfung
    if (timeError) {
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
        const errorMessage = await signupResponse.json();
        throw new Error(errorMessage.error || "Fehler bei der Registrierung");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>

      {/* Server-/allgemeiner Fehler */}
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

            {/* Nur dieser Fehler hier unten */}
            {timeError && <p style={{ color: "red" }}>{timeError}</p>}
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

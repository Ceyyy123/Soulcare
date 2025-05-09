import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantMail, setWantMail] = useState(false);
  const [notificationTimes, setNotificationTimes] = useState(["07:00", "19:00"]);
  const [error, setError] = useState("");       // allgemeiner Fehler (z. B. von Server)
  const router = useRouter();

  const handleTimeChange = (index, value) => {
    const newTimes = [...notificationTimes];
    newTimes[index] = value;

    // Berechne die Differenz zwischen den beiden Zeiten
    const [h1, m1] = newTimes[0].split(":").map(Number);
    let [h2, m2] = newTimes[1].split(":").map(Number);

    // Wenn die erste Zeit geändert wird, berechne automatisch die zweite Zeit
    if (index === 0) {
      const newTime = new Date();
      newTime.setHours(h1);
      newTime.setMinutes(m1);

      // Addiere 12 Stunden zur ersten Zeit
      newTime.setHours(newTime.getHours() + 12);

      // Setze die zweite Zeit automatisch
      newTimes[1] = `${newTime.getHours().toString().padStart(2, "0")}:${newTime.getMinutes().toString().padStart(2, "0")}`;
    }

    setNotificationTimes(newTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zeitprüfung
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
              disabled
            />
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

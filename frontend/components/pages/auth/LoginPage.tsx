"use client";

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const LoginPage : React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter(); // Utilisation du router pour la redirection

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", { email, password });

            if (response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                setSuccess("Connexion réussie !");
                setError("");
                console.log("Token JWT:", response.data.token);

                setTimeout(() => router.push("/dashboard"), 1500);
            } else {
                setError("Réponse invalide du serveur.");
            }
        } catch (err: any) {
            setError("Erreur : " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Connexion</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <button className="btn btn-primary w-100" onClick={handleLogin}>Se connecter</button>
                <div className="text-center mt-3">
                    <a href="/register">Créer un compte</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

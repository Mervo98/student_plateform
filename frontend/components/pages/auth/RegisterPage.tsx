import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthPage: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        if (!isLogin && password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const url = isLogin ? "http://localhost:8081/api/auth/login" : "http://localhost:8081/api/auth/register";
            const response = await axios.post(url, { email, password });
            setSuccess(isLogin ? "Connexion réussie !" : "Inscription réussie !");
            setError("");
        } catch (err: any) {
            setError("Erreur : " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">{isLogin ? "Connexion" : "Inscription"}</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
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
                    />
                </div>
                {!isLogin && (
                    <div className="mb-3">
                        <label className="form-label">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez votre mot de passe"
                        />
                    </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
                <div className="text-center mt-3">
                    <a href={isLogin ? "/register" : "/login"}>
                        {isLogin ? "Créer un compte" : "Déjà un compte ? Connectez-vous"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

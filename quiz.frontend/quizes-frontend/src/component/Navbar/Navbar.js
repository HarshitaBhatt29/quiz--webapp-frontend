import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuiz } from "../../context";

export const Navbar = ({ route }) => {
  const navigate = useNavigate();
  const { quizDispatch } = useQuiz();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("autharization");
      setToken(token);
    };
    getToken();
  }, []);
  console.log(token, "Navbar");
  const handleAuthClick = () => {
    if (token) {
      localStorage.clear();
      quizDispatch({
        type: "QUIT",
      });
    }
    navigate("/");
  };
  const handleEndGameClick = () => {
    quizDispatch({
      type: "QUIT",
    });
  };
  return (
    <header className="heading d-flex grow-shrink-basis align-center">
      <div className="heading-title-icon d-flex grow-shrink-basis align-center">
        <img className="icon mr-1" src="/assets/image.png" alt="lightbul" />
        <h1 className="heading-title">
          {route === "home" || route === "login" || route === "quiz" ? (
            <Link to="/" className="link">
              Quizify
            </Link>
          ) : (
            "Quizify"
          )}
        </h1>
      </div>
      <nav className="navigation">
        <ul className="list-non-bullet">
          {route === "home" && (
            <li className="list-item-inline">
              <Link
                to="/auth/login"
                className="link cursor"
                onClick={handleAuthClick}
              >
                {token ? "Login" : "Logout"}
              </Link>
            </li>
          )}
          {route === "result" && (
            <Fragment>
              <li className="list-item-inline">
                <Link
                  to="/"
                  className="link cursor"
                  onClick={handleEndGameClick}
                >
                  Home
                </Link>
              </li>
              <li className="list-item-inline">
                <span className="link-cursor" onClick={handleAuthClick}>
                  Logout
                </span>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

import { useNavigate } from "react-router-dom";
import "./quizCard.css";
import { useAuth, useQuiz } from "../context";
import { useEffect, useState } from "react";
export const QuizCard = ({ quizCategory }) => {
  const { image, title, description, category } = quizCategory;
  const [token, setToken] = useState();
  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("autharization");
      setToken(token);
    };
    getToken();
  }, []);
  // const token = localStorage.getItem("token")
  const { quizDispatch } = useQuiz();
  const navigate = useNavigate();

  const handlePlayNowClick = async () => {
    if (token) {
      quizDispatch({
        type: "CATEGORY",
        payload: category,
      });
      await localStorage.setItem("category", category);
      navigate("/quiz");
    } else {
      navigate("/auth/login");
    }
  };
  return (
    <div className="container d-flex direction-column">
      <div className="img-box">
        <img className="img" src={image} alt="quizcard" />
      </div>
      <div className="details">
        <h3 className="title">{title}</h3>
        <span>{description}</span>
      </div>
      <button
        className="button play-now-btn btn-primary cursor "
        onClick={handlePlayNowClick}
      >
        Play Now
      </button>
    </div>
  );
};

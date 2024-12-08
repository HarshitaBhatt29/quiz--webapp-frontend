import "./QNA.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context";
import { useEffect } from "react";

export const QuestionAndOptions = ({ quizData }) => {
  const currentQuiz = quizData?.[0] || { title: "", quiz: [] };
  const { title, quiz } = currentQuiz;
  const navigate = useNavigate();

  const { index = 0, score = 0, quizDispatch, selectedOption,isCorrect } = useQuiz();

  console.log("quizData:", quizData);
  console.log(selectedOption,isCorrect, "so");
  // Ensure `quiz[index]` is defined
  const currentQuestion = quiz[index] || { question: "", options: [] };
  const handleNextQuestionClick = () => {
    if (index !== quiz.length - 1) {
      quizDispatch({
        type: "NEXT_QUESTION",
      });
    } else {
      quizDispatch({
        type: "SUBMIT",
      });
      navigate("/result");
    }
  };
  const handleAnswerClick = (idx, isCorrectoption) => {
    console.log("Selected Option:", idx, "Is Correct:");

    const isCorrect=isCorrectoption==="true"||isCorrectoption===true?
    true:isCorrectoption==="false"||isCorrectoption===true?false:null

    quizDispatch({
      type: "SET_SELECTED_OPTION",
      payload: { idx, isCorrect },
    });
  };
 const handleQuitClick =()=>{
  quizDispatch({
    type:"QUIT"
  })
  navigate("/")
 }
  useEffect(()=>{
  localStorage.setItem("option",selectedOption);
  localStorage.setItem("score",score)
 },[selectedOption])
  return (
    <main className="d-flex justify-center qns-main">
      <section className="question-dialog container-flex">
        <h2 className="d-flex justify-center qns-title">{title}</h2>
        <div className="qsn-scr">
          <span>
            Question: {index + 1}/{quiz.length}
          </span>
          <span className="score">Score: {score}</span>
        </div>
        <div className="question">
          <span>
            Q{index + 1}: {currentQuestion.question}
          </span>
        </div>
        <div className="options-box">
          {currentQuestion.options.map((item, idx) => (
            <button
              key={idx}
              className={`button option d-flex justify-center  ${
                selectedOption ?  selectedOption === item.id && (isCorrect==='true' || isCorrect===true)
                  ? "success"
                  : selectedOption === item.id ? "error":"":""
              }
           `}
              onClick={() => handleAnswerClick(item.id, item.isCorrect)}
              disabled={selectedOption && selectedOption !== null}
            >
              {String.fromCharCode(65 + idx)}.{item.option}
            </button>
          ))}

          {/* {
                        quiz[index]?.options.map(({id, option, isCorrect}) => 
                        <button key={id} className={`button option d-flex justify-center ${selectedOption && isCorrect ? "success" : ""} ${selectedOption && selectedOption === id && !isCorrect ? "error" : ""}`} onClick={() => handleAnswerClick(id, isCorrect)} disabled={selectedOption !== null}>{option}</button>
                        )
                    }  */}
        </div>
        <div className="nxt-btn-container">
          <div className="d-flex gap">
            <button className="play-btn button btn-secondary cursor" onClick={handleQuitClick}>
              Quit
            </button>
            <button
              className="nxt-qstn play-now-btn button btn-primary cursor"
              onClick={handleNextQuestionClick}
            >
              {index === quiz.length - 1 ? "Submit" : "Next Question"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

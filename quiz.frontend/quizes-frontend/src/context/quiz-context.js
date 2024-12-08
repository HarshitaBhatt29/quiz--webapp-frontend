import { createContext,useContext,useReducer,useEffect, } from "react";
import { quizReducer } from "../reducer/quiz-reducer";

const initialState = {
    index:0,
    score:0,
    quizCategory: "",
    selectedOption:"",
    isCorrect:false,
    quiz:[]
}
const QuizContext = createContext();


const QuizProvider = ({children})=>{
    const [{index,score,quizCategory,selectedOption,isCorrect,quiz},quizDispatch]=useReducer(quizReducer,initialState)
    useEffect(() => {
        const currentIndex = Number(localStorage.getItem("index")) || 0;
        const currentScore = Number(localStorage.getItem("score")) || 0;
        const currentOption = localStorage.getItem("option") || null;
        const currentCategory = localStorage.getItem("category") || "";
        const currentQuiz = JSON.parse(localStorage.getItem("quiz")) || [];
      
        quizDispatch({
          type: "INITIAL_STATE",
          payload: {
            currentIndex,
            currentOption,
            currentScore,
            currentCategory,
            currentQuiz,
          },
        });
      }, []);
    return(
        <QuizContext.Provider value={{index,score,quizCategory,selectedOption,quizDispatch,isCorrect,quiz}}> 
        {children}
        </QuizContext.Provider>

    )
}

const useQuiz =()=> useContext(QuizContext);
export {useQuiz,QuizProvider}

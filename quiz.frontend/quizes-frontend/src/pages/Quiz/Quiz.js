import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Navbar, QuestionAndOptions } from "../../component";
import { useQuiz } from "../../context";
import { json } from "react-router-dom";
export const Quiz = () => {
  const { quizCategory, quiz, quizDispatch } = useQuiz();
  const [quizData,setQuizData]=useState([]);
  // console.log(quizCategory,'ccccccccccc')
  useEffect(() => {
  const fun=  async () => {
      try {
        const {
          data: { data },
        } = await axios.get("http://localhost:3000/quiz", {
          headers: { authorization: localStorage.getItem("autharization") },
        });
        console.log("from quiz", data,quizCategory);
        const filteredData = data.filter(
          ({ category }) => category === quizCategory
        );
        if (filteredData && filteredData.length > 0) {
          quizDispatch({
            type: "SET_QUIZ",
            Payload: filteredData,
          });
          setQuizData(filteredData);
          localStorage.setItem("quiz", JSON.stringify(filteredData));
        }
      } catch (err) {
        console.log(err);
      }
    }
    fun();
  }, [quizCategory]);

  return (
    <Fragment>
      <Navbar route="quiz" />
      {quizData.length>0 && <QuestionAndOptions quizData={quizData} />}
    </Fragment>
  );
};

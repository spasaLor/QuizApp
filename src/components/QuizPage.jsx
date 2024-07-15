import { useEffect, useState } from "react";
import he from "he";
import { Circles } from "react-loading-icons";
import '../styles/quiz.css';

function shuffleList(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export default function QuizPage({setPage,questions,answers,setQuestions,setAnswers}){

    useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(resp => resp.json())
        .then(data =>{
            setQuestions(()=>{
                return data.results.map((res)=>{
                    let answers=[...res.incorrect_answers];
                    answers.push(he.decode(res.correct_answer));
                    const shuffledAnswers = shuffleList(answers);
                    console.log(shuffledAnswers);
                    return {question:he.decode(res.question), answers:shuffledAnswers, correct:res.correct_answer}
                });
            }
        )})
        .catch(error => console.error('Error fetching data:', error));

    },[]);

    const handleChange = (index,answer)=>{
        setAnswers((prev)=>({
            ...prev,
            [index]:answer,
        }))
    }

    return(
        questions.length >0 ?
        <div className="questions-container">
            {
            questions.map((q,index)=>(
            <div className="question" key={index}>
                <h2 className="title">{q.question}</h2>
                <div className="answers">
                {q.answers.map((a,id)=>(
                    <div className="answer-item">
                        <input type="radio" name={"question"+index} id={a} key={"q"+id} value={a} checked={answers[index] === a} onChange={()=>handleChange(index,a)}/>
                        <label htmlFor={a} key={"lbl"+id}>{a}</label>
                    </div>
                ))}
                </div>
            </div>
        ))}
        <button type="button" onClick={()=>{setPage("Check")}}>Check Answers</button>
        </div>
        :
        <div className="loading">
             <p>Loading Questions...</p>
             <Circles fill='var(--dark-blue)' speed={1}/>
        </div>
       
    );
}
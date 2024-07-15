import { useEffect, useState } from "react";
import '../styles/check.css';

export default function CheckPage({setPage,questions,answers,setQuestions,setAnswers}){
    const [correct,setCorrect]=useState(0);

    const handleCorrect=()=>{
        let c=0;
        questions.map((q,index)=>{
            if(q.correct === answers[index])
                c++;
        })
        return c;
    }
    useEffect(()=>{
        setCorrect(handleCorrect());
    },[])

    const resetQuiz = () =>{
        setQuestions([]);
        setAnswers({});
    }

    return(
        <>
            <div className="check-container">
                {
                questions.map((q,index)=>(
                <div className="question" key={index}>
                    <h2 className="title">{q.question}</h2>
                    <div className="answers">
                        {q.answers.map((a,id)=>(
                            <div className="answer-item">
                                <input type="radio" name={"question"+index} id={a} key={"q"+id} />
                                <label htmlFor={a} key={"lbl"+id} style={questions[index].correct === a ? {backgroundColor:'var(--green)', border:'none'} : (answers[index] === a ? {backgroundColor:'red', border:'none',opacity:'0.5'}:{opacity:'0.5'})}>{a}</label>
                            </div>
                        ))}
                    </div>
                    
                </div>
            ))}
                <div className="bottom">
                    <h2>You scored {correct}/5 correct answers</h2>
                    <button type="button" onClick={()=>{
                    resetQuiz();
                    setPage("Start")}
                    }>Play Again</button>
                    
                </div>
            </div>
        </>
    );
}
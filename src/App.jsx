import { useState } from 'react'
import './App.css'
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import CheckPage from './components/CheckPage';

function App() {
  const[pageShown,setPageShown]=useState("Start");
  const[questions,setQuestions]=useState([]);
  const[answers,setAnswers]=useState({});
  
    if(pageShown === 'Start'){
      return(
        <>
          <StartPage setPage={setPageShown}/>
        </>
      );
    }
    else if(pageShown === 'Quiz'){
      return(
      <>
        <QuizPage setPage={setPageShown} questions={questions} answers={answers} setQuestions={setQuestions} setAnswers={setAnswers} />
      </>
      );      
    }

    else if(pageShown === 'Check'){
      return(
        <>
          <CheckPage setPage={setPageShown} questions={questions} answers={answers} setQuestions={setQuestions} setAnswers={setAnswers}/>
        </>
        ); 
    }

}

export default App

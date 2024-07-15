import '../styles/start.css';

export default function StartPage({setPage}){
    return(
        <div className="start-content">
            <h1>Quizzical</h1>
            <p>Try to answer as many questions as you can!</p>
            <button type="button" onClick={()=>setPage("Quiz")}>Start quiz</button>
        </div>
    );
}
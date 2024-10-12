import { useState, useEffect } from 'react';

const questions = [
  {
    question: "Que signifie 'Dêmin-dêmin'?",
    optionA: "Manger à sa faim",
    optionB: "Se débrouiller",
    optionC: "Donner vie",
    optionD: "Parler trop",
    correctOption: "optionB"
  },
  {
    question: "Comment dire 'MANGER ENSEMBLE'?",
    optionA: "Le coulé",
    optionB: "Gbayé dans gbêve",
    optionC: "Daba en gbonhï",
    optionD: "Fraya",
    correctOption: "optionC"
  },
  // Ajoute d'autres questions ici
];

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [wrongAttempt, setWrongAttempt] = useState(0);
  const [indexNumber, setIndexNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Shuffle questions on mount
  useEffect(() => {
    handleQuestions();
  }, []);

  // Function to shuffle questions
  const handleQuestions = () => {
    const shuffled = [];
    while (shuffled.length < 10) {
      const random = questions[Math.floor(Math.random() * questions.length)];
      if (!shuffled.includes(random)) {
        shuffled.push(random);
      }
    }
    setShuffledQuestions(shuffled);
  };

  // Function to check for the answer
  const checkForAnswer = (selectedOption) => {
    const currentQuestion = shuffledQuestions[indexNumber];
    const correctOption = currentQuestion.correctOption;

    if (selectedOption === correctOption) {
      setPlayerScore(playerScore + 1);
    } else {
      setWrongAttempt(wrongAttempt + 1);
    }

    // Move to next question or end game
    if (indexNumber < 9) {
      setTimeout(() => {
        setQuestionNumber(questionNumber + 1);
        setIndexNumber(indexNumber + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
    }
  };

  // Reset the game
  const resetGame = () => {
    setQuestionNumber(1);
    setPlayerScore(0);
    setWrongAttempt(0);
    setIndexNumber(0);
    setShowResult(false);
    handleQuestions();
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Fin du Quiz</h2>
          <p>Score : {playerScore} / 10</p>
          <p>Bonnes réponses : {playerScore}</p>
          <p>Mauvaises réponses : {wrongAttempt}</p>
          <button onClick={resetGame}>Rejouer</button>
        </div>
      ) : (
        <div className="quiz">
          <h1>Question {questionNumber}</h1>
          {shuffledQuestions.length > 0 && (
            <div>
              <p>{shuffledQuestions[indexNumber].question}</p>
              <div className="options">
                <button onClick={() => checkForAnswer("optionA")}>
                  {shuffledQuestions[indexNumber].optionA}
                </button>
                <button onClick={() => checkForAnswer("optionB")}>
                  {shuffledQuestions[indexNumber].optionB}
                </button>
                <button onClick={() => checkForAnswer("optionC")}>
                  {shuffledQuestions[indexNumber].optionC}
                </button>
                <button onClick={() => checkForAnswer("optionD")}>
                  {shuffledQuestions[indexNumber].optionD}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>Quiz en Nouchi</h1>
      <Quiz />
    </div>
  );
}


// 📁 src/App.js
import React, { useState } from 'react';
import Timer from './Timer';
import AntiCheat from './AntiCheat';
import { questions } from './questions';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const App = () => {
  const [step, setStep] = useState('form');
  const [userInfo, setUserInfo] = useState({ name: '', telegram: '', twitter: '', wallet: '' });
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const filled = Object.values(userInfo).every((v) => v.trim() !== '');
    if (filled) setStep('quiz');
  };

  const handleNext = () => {
    setAnswers((prev) => [...prev, input]);
    setInput('');
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setStep('done');
      submitData();
    }
  };

  const submitData = async () => {
    try {
      await addDoc(collection(db, 'responses'), {
        ...userInfo,
        answers,
        timestamp: Timestamp.now(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  return (
    <div className="container">
      <AntiCheat />
      {step === 'form' && (
        <form className="form" onSubmit={handleFormSubmit}>
          <h2>Valdora Quiz</h2>
          <input placeholder="Full Name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
          <input placeholder="Telegram Username" onChange={(e) => setUserInfo({ ...userInfo, telegram: e.target.value })} />
          <input placeholder="Twitter (X) Username" onChange={(e) => setUserInfo({ ...userInfo, twitter: e.target.value })} />
          <input placeholder="Wallet Address" onChange={(e) => setUserInfo({ ...userInfo, wallet: e.target.value })} />
          <button type="submit">Start Quiz</button>
        </form>
      )}

      {step === 'quiz' && (
        <div className="quiz">
          <h3>Question {currentQ + 1} of {questions.length}</h3>
          <p>{questions[currentQ]}</p>
          <Timer duration={30} onTimeUp={handleNext} />
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Your answer here..." />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 'done' && (
        <div className="thankyou">
          <h2>Thank you for completing the Valdora Quiz!</h2>
          {submitted ? <p>Your answers have been submitted.</p> : <p>Submitting...</p>}
        </div>
      )}
    </div>
  );
};

export default App;

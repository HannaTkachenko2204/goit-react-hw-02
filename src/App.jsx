import { useEffect, useState } from 'react'
import './App.css'
import Description from './components/Description/Description';
import Feedback from './components/Feetback/Feetback';
import Options from './components/Options/Options';
import Notification from './components/Notification/Notification';

function App() {
const [feedback, setFeedback] = useState(
	() => {
    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
      return JSON.parse(savedFeedback);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    };
  }
);


useEffect(()=>{
localStorage.setItem('feedback', JSON.stringify(feedback))
}, [feedback]);

const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

const updateFeedback = feedbackType => {
  setFeedback({
		...feedback,
		[feedbackType]: feedback[feedbackType] + 1
	});
 }

const  resetFeedback= () => {
  setFeedback({
    good: 0,
    neutral: 0,
    bad: 0,
  })
};

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback}/>
      { totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} /> : <Notification /> }
    </>
  )
}

export default App

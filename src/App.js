import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds per question
  const [timerActive, setTimerActive] = useState(true);
  const [answersLog, setAnswersLog] = useState([]);

  // Enhanced quiz questions with 10 items
  const quizQuestions = [
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
      explanation: 'Mars appears red due to iron oxide (rust) on its surface.'
    },
    {
      question: 'What is the largest mammal on Earth?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
      correctAnswer: 'Blue Whale',
      explanation: 'The blue whale can reach up to 100 feet long and weigh over 200 tons.'
    },
    {
      question: 'Which element has the chemical symbol "O"?',
      options: ['Gold', 'Oxygen', 'Osmium', 'Oganesson'],
      correctAnswer: 'Oxygen',
      explanation: 'Oxygen is essential for respiration and makes up about 21% of Earth\'s atmosphere.'
    },
    {
      question: 'In which year did World War II end?',
      options: ['1943', '1945', '1947', '1950'],
      correctAnswer: '1945',
      explanation: 'WWII ended on September 2, 1945, with Japan\'s formal surrender.'
    },
    {
      question: 'What is the capital of Japan?',
      options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
      correctAnswer: 'Tokyo',
      explanation: 'Tokyo is one of the most populous metropolitan areas in the world.'
    },
    {
      question: 'Which famous scientist developed the theory of relativity?',
      options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
      correctAnswer: 'Albert Einstein',
      explanation: 'Einstein published his special theory of relativity in 1905 and general theory in 1915.'
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
      correctAnswer: 'Diamond',
      explanation: 'Diamond scores 10 on the Mohs scale of mineral hardness.'
    },
    {
      question: 'Which ocean is the largest on Earth?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 'Pacific',
      explanation: 'The Pacific Ocean covers about 63 million square miles.'
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci',
      explanation: 'Painted between 1503-1519, it\'s now displayed in the Louvre Museum.'
    },
    {
      question: 'What is the main component of the Sun?',
      options: ['Liquid Lava', 'Hydrogen', 'Oxygen', 'Carbon'],
      correctAnswer: 'Hydrogen',
      explanation: 'The Sun is about 70% hydrogen and 28% helium by mass.'
    }
  ];

  // Timer effect with more sophisticated handling
  useEffect(() => {
    if (!timerActive) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
    setTimerActive(false);

    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Log the answer for summary
    setAnswersLog([
      ...answersLog,
      {
        question: quizQuestions[currentQuestion].question,
        selected: answer,
        correct: quizQuestions[currentQuestion].correctAnswer,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    setTimerActive(true);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(20);
    setTimerActive(true);
    setAnswersLog([]);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: 100, rotateY: 90 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      rotateY: -90,
      transition: { 
        ease: 'easeInOut'
      }
    }
  };

  const optionVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: '0 5px 15px rgba(79, 172, 254, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 300
      }
    },
    tap: { scale: 0.98 }
  };

  const correctVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: ['0 0 0 rgba(40, 167, 69, 0)', '0 0 10px rgba(40, 167, 69, 0.5)', '0 0 0 rgba(40, 167, 69, 0)'],
      transition: {
        duration: 0.6,
        repeat: Infinity
      }
    }
  };

  return (
    <QuizContainer>
      {!quizCompleted ? (
        <AnimatePresence mode='wait'>
          <QuestionCard
            key={currentQuestion}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <TimerContainer>
              <TimerBar 
                initial={{ scaleX: 1 }}
                animate={{ scaleX: timeLeft/20 }}
                transition={{ duration: timeLeft, ease: "linear" }}
              />
              <TimerCircle>
                <motion.span
                  key={timeLeft}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {timeLeft}s
                </motion.span>
              </TimerCircle>
            </TimerContainer>

            <QuestionHeader>
              <QuestionCount>
                Question {currentQuestion + 1}<span>/{quizQuestions.length}</span>
              </QuestionCount>
              <ScoreDisplay>
                Score: <span>{score}</span>
              </ScoreDisplay>
            </QuestionHeader>

            <QuestionText>{quizQuestions[currentQuestion].question}</QuestionText>

            <OptionsContainer>
              {quizQuestions[currentQuestion].options.map((option, index) => {
                let optionState = '';
                if (showCorrectAnswer) {
                  if (option === quizQuestions[currentQuestion].correctAnswer) {
                    optionState = 'correct';
                  } else if (
                    option === selectedAnswer &&
                    option !== quizQuestions[currentQuestion].correctAnswer
                  ) {
                    optionState = 'incorrect';
                  }
                }
                return (
                  <Option
                    key={index}
                    onClick={() => !showCorrectAnswer && handleAnswerSelect(option)}
                    disabled={showCorrectAnswer}
                    state={optionState}
                    variants={optionState === 'correct' && showCorrectAnswer ? correctVariants : optionVariants}
                    initial="rest"
                    whileHover={!showCorrectAnswer ? "hover" : ""}
                    whileTap={!showCorrectAnswer ? "tap" : ""}
                    animate={optionState === 'correct' && showCorrectAnswer ? "pulse" : ""}
                  >
                    <OptionLetter>{String.fromCharCode(65 + index)}</OptionLetter>
                    <OptionText>{option}</OptionText>
                    {optionState === 'correct' && (
                      <CorrectIcon
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        ✓
                      </CorrectIcon>
                    )}
                    {optionState === 'incorrect' && (
                      <IncorrectIcon
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        ✗
                      </IncorrectIcon>
                    )}
                  </Option>
                );
              })}
            </OptionsContainer>

            {showCorrectAnswer && (
              <FeedbackContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FeedbackText correct={selectedAnswer === quizQuestions[currentQuestion].correctAnswer}>
                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                    <>
                      <span>Correct!</span> 🎉
                    </>
                  ) : (
                    <>
                      <span>Incorrect!</span> The correct answer is: {quizQuestions[currentQuestion].correctAnswer}
                    </>
                  )}
                </FeedbackText>
                <Explanation>{quizQuestions[currentQuestion].explanation}</Explanation>
                <NextButton
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 242, 254, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
                </NextButton>
              </FeedbackContainer>
            )}
          </QuestionCard>
        </AnimatePresence>
      ) : (
        <ResultsSection>
          <ResultsCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsTitle>Quiz Completed!</ResultsTitle>
            
            <ScoreCircle>
              <ScoreText>
                {score}<span>/{quizQuestions.length}</span>
              </ScoreText>
              <ScorePercentage>
                {Math.round((score / quizQuestions.length) * 100)}%
              </ScorePercentage>
            </ScoreCircle>

            <PerformanceMessage>
              {score === quizQuestions.length
                ? 'Perfect Score! You\'re a genius! 🎯'
                : score >= quizQuestions.length * 0.8
                ? 'Excellent! You know your stuff! 🌟'
                : score >= quizQuestions.length * 0.5
                ? 'Good job! Keep learning! 📚'
                : 'Keep practicing! You\'ll get better! 💪'}
            </PerformanceMessage>

            <ResetButton
              onClick={resetQuiz}
              whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(255, 117, 140, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              ↻ Take Quiz Again
            </ResetButton>
          </ResultsCard>

          <SummaryCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <SummaryTitle>Question Summary</SummaryTitle>
            <SummaryList>
              {answersLog.map((item, index) => (
                <SummaryItem key={index} correct={item.isCorrect}>
                  <QuestionNumber>Q{index + 1}</QuestionNumber>
                  <QuestionSummary>{item.question}</QuestionSummary>
                  <AnswerResult>
                    <YourAnswer>Your answer: {item.selected}</YourAnswer>
                    {!item.isCorrect && (
                      <CorrectAnswer>Correct answer: {item.correct}</CorrectAnswer>
                    )}
                    <ResultIndicator>
                      {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </ResultIndicator>
                  </AnswerResult>
                </SummaryItem>
              ))}
            </SummaryList>
          </SummaryCard>
        </ResultsSection>
      )}
    </QuizContainer>
  );
};

// Enhanced Styled Components
const QuizContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
`;

const TimerContainer = styled.div`
  position: relative;
  height: 6px;
  background: #e0e5ec;
  border-radius: 3px;
  margin-bottom: 2rem;
  overflow: visible;  // Changed from 'hidden' to 'visible'
`;

const TimerBar = styled(motion.div)`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #ff7eb3 0%, #ff758c 100%);
  border-radius: 3px;
  transform-origin: left center;
`;

const TimerCircle = styled.div`
  position: absolute;
  right: -25px;  // Adjusted to move it slightly outside
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border: 3px solid #ff758c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #ff758c;
  box-shadow: 0 3px 10px rgba(255, 117, 140, 0.3);
  z-index: 10;  // Added to ensure it's above other elements
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;

const QuestionCount = styled.div`
  font-size: 1.2rem;
  color: #4a4e69;
  font-weight: 600;
  
  span {
    color: #9a9bb2;
    font-weight: 400;
  }
`;

const ScoreDisplay = styled.div`
  font-size: 1.2rem;
  color: #4a4e69;
  
  span {
    color: #4facfe;
    font-weight: 700;
  }
`;

const QuestionText = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  color: #2b2d42;
  line-height: 1.4;
  font-weight: 600;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const Option = styled(motion.button)`
  padding: 1.2rem 1.5rem;
  border: 2px solid;
  border-color: ${props => 
    props.state === 'correct' 
      ? '#28a745' 
      : props.state === 'incorrect' 
        ? '#dc3545' 
        : '#e0e5ec'};
  border-radius: 12px;
  background: ${props => 
    props.state === 'correct' 
      ? 'rgba(40, 167, 69, 0.1)' 
      : props.state === 'incorrect' 
        ? 'rgba(220, 53, 69, 0.1)' 
        : 'white'};
  color: ${props => 
    props.state === 'correct' 
      ? '#28a745' 
      : props.state === 'incorrect' 
        ? '#dc3545' 
        : '#4a4e69'};
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
`;

const OptionLetter = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: ${props => 
    props.state === 'correct' 
      ? '#28a745' 
      : props.state === 'incorrect' 
        ? '#dc3545' 
        : '#4facfe'};
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const OptionText = styled.span`
  flex-grow: 1;
`;

const CorrectIcon = styled(motion.span)`
  color: #28a745;
  font-weight: bold;
  font-size: 1.2rem;
`;

const IncorrectIcon = styled(motion.span)`
  color: #dc3545;
  font-weight: bold;
  font-size: 1.2rem;
`;

const FeedbackContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9fa;
  border-left: 4px solid ${props => props.correct ? '#28a745' : '#dc3545'};
`;

const FeedbackText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2b2d42;
  font-weight: 500;
  
  span {
    color: ${props => props.correct ? '#28a745' : '#dc3545'};
    font-weight: 600;
  }
`;

const Explanation = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const NextButton = styled(motion.button)`
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ResultsCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const ResultsTitle = styled.h2`
  font-size: 2.2rem;
  color: #2b2d42;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  margin: 0 auto 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
`;

const ScoreText = styled.div`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  
  span {
    font-size: 1.5rem;
    opacity: 0.8;
  }
`;

const ScorePercentage = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
`;

const PerformanceMessage = styled.p`
  font-size: 1.3rem;
  color: #4a4e69;
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.4;
`;

const ResetButton = styled(motion.button)`
  background: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
`;

const SummaryCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const SummaryTitle = styled.h3`
  font-size: 1.5rem;
  color: #2b2d42;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SummaryItem = styled.li`
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: ${props => props.correct ? 'rgba(40, 167, 69, 0.05)' : 'rgba(220, 53, 69, 0.05)'};
  border-left: 4px solid ${props => props.correct ? '#28a745' : '#dc3545'};
`;

const QuestionNumber = styled.div`
  font-weight: 600;
  color: #4a4e69;
  margin-bottom: 0.5rem;
`;

const QuestionSummary = styled.div`
  font-size: 1.1rem;
  color: #2b2d42;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const AnswerResult = styled.div`
  font-size: 0.95rem;
`;

const YourAnswer = styled.div`
  color: ${props => props.correct ? '#28a745' : '#dc3545'};
  margin-bottom: 0.3rem;
`;

const CorrectAnswer = styled.div`
  color: #6c757d;
  margin-bottom: 0.3rem;
`;

const ResultIndicator = styled.div`
  font-weight: 600;
  color: ${props => props.correct ? '#28a745' : '#dc3545'};
  margin-top: 0.5rem;
`;

export default QuizApp;
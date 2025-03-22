import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Define interfaces for our data types
interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface Questions {
  [key: string]: Question;
}

interface AnsweredQuestion {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}

interface AnsweredQuestions {
  [key: string]: AnsweredQuestion;
}

interface SelectedAnswers {
  [key: string]: string;
}

// Styled components
const TestContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 20px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const QuestionNumber = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3498db;
`;

const Progress = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
`;

const QuestionText = styled.h2`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface OptionItemProps {
  answered: boolean;
  isSelected: boolean;
  isCorrect: boolean;
}

const OptionItem = styled.div<OptionItemProps>`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => {
    if (props.answered) {
      if (props.isCorrect && props.isSelected) return 'rgba(46, 204, 113, 0.2)';
      if (!props.isCorrect && props.isSelected) return 'rgba(231, 76, 60, 0.2)';
      if (props.isCorrect) return 'rgba(46, 204, 113, 0.2)';
    }
    return props.isSelected ? '#f0f7ff' : 'white';
  }};
  border-left: 4px solid ${props => {
    if (props.answered) {
      if (props.isCorrect && props.isSelected) return '#2ecc71';
      if (!props.isCorrect && props.isSelected) return '#e74c3c';
      if (props.isCorrect) return '#2ecc71';
    }
    return props.isSelected ? '#3498db' : '#ddd';
  }};
  
  &:hover {
    background-color: ${props => props.answered ? '' : '#f8f9fa'};
    transform: ${props => props.answered ? '' : 'translateX(5px)'};
  }
`;

const Explanation = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #3498db;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(Button)`
  background-color: #ecf0f1;
  color: #7f8c8d;
  
  &:hover:not(:disabled) {
    background-color: #dfe6e9;
  }
`;

interface NextButtonProps {
  answered: boolean;
}

const NextButton = styled(Button)<NextButtonProps>`
  background-color: ${props => props.answered ? '#2ecc71' : '#3498db'};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.answered ? '#27ae60' : '#2980b9'};
  }
`;

const SubmitButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c0392b;
  }
`;

// Add these new styled components
const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  font-size: 1.2rem;
`;

const NoQuestionsMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
`;

const StyledParagraph = styled.p`
  margin-bottom: 10px;
`;

const StrongText = styled.strong`
  font-weight: 600;
`;

const TestPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Questions>({});
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
        setQuestionIds(Object.keys(response.data));
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option: string): void => {
    if (answeredQuestions[questionIds[currentQuestionIndex]]) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIds[currentQuestionIndex]]: option
    });
  };

  const handleSubmitAnswer = async (): Promise<void> => {
    const currentQuestionId = questionIds[currentQuestionIndex];
    
    if (!selectedAnswers[currentQuestionId]) return;
    
    try {
      const response = await axios.post('http://localhost:5000/api/validate', {
        questionId: currentQuestionId,
        selectedAnswer: selectedAnswers[currentQuestionId]
      });
      
      setAnsweredQuestions({
        ...answeredQuestions,
        [currentQuestionId]: {
          isCorrect: response.data.isCorrect,
          correctAnswer: response.data.correctAnswer,
          explanation: response.data.explanation
        }
      });
    } catch (err) {
      console.error('Error validating answer:', err);
    }
  };

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < questionIds.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (Object.keys(answeredQuestions).length === questionIds.length) {
      // All questions answered, navigate to results
      const correctAnswers = Object.values(answeredQuestions).filter(a => a.isCorrect).length;
      navigate('/results', { 
        state: { 
          totalQuestions: questionIds.length,
          correctAnswers,
          isPassed: correctAnswers >= 40
        } 
      });
    }
  };

  const handlePrevQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading questions...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (questionIds.length === 0) {
    return <NoQuestionsMessage>No questions available.</NoQuestionsMessage>;
  }

  const currentQuestionId = questionIds[currentQuestionIndex];
  const currentQuestion = questions[currentQuestionId];
  const isAnswered = !!answeredQuestions[currentQuestionId];
  const selectedAnswer = selectedAnswers[currentQuestionId];
  const answeredQuestion = answeredQuestions[currentQuestionId];

  return (
    <TestContainer>
      <QuestionCard>
        <QuestionHeader>
          <QuestionNumber>Question {currentQuestionIndex + 1}</QuestionNumber>
          <Progress>{Object.keys(answeredQuestions).length} of {questionIds.length} answered</Progress>
        </QuestionHeader>
        
        <QuestionText>{currentQuestion.question}</QuestionText>
        
        <OptionsList>
          {currentQuestion.options.map((option, index) => (
            <OptionItem
              key={index}
              onClick={() => handleOptionSelect(option)}
              isSelected={selectedAnswer === option}
              answered={isAnswered}
              isCorrect={isAnswered && option === answeredQuestion?.correctAnswer}
            >
              {option}
            </OptionItem>
          ))}
        </OptionsList>
        
        {isAnswered && (
          <Explanation>
            <StyledParagraph><StrongText>{answeredQuestion.isCorrect ? 'Correct!' : 'Incorrect!'}</StrongText></StyledParagraph>
            <StyledParagraph>{answeredQuestion.explanation}</StyledParagraph>
          </Explanation>
        )}
      </QuestionCard>
      
      <ButtonContainer>
        <PrevButton 
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </PrevButton>
        
        {!isAnswered ? (
          <SubmitButton 
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
          >
            Submit Answer
          </SubmitButton>
        ) : (
          <NextButton 
            answered={isAnswered}
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === questionIds.length - 1 && Object.keys(answeredQuestions).length === questionIds.length 
              ? 'See Results' 
              : 'Next Question'}
          </NextButton>
        )}
      </ButtonContainer>
    </TestContainer>
  );
};

export default TestPage;
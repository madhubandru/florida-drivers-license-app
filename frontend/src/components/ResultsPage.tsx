import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LocationState {
  totalQuestions: number;
  correctAnswers: number;
  isPassed: boolean;
}

const ResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ResultsCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 20px;
`;

const ResultsHeader = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

interface ScoreDisplayProps {
  color: string;
}

const ScoreDisplay = styled.div<ScoreDisplayProps>`
  font-size: 4rem;
  font-weight: bold;
  margin: 30px 0;
  color: ${props => props.color};
`;

const ResultMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #7f8c8d;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  // Default values in case state is not provided
  const totalQuestions = state?.totalQuestions || 50; //MBQuestionsControl
  const correctAnswers = state?.correctAnswers || 0; //MBQuestionsControl
  const isPassed = state?.isPassed || false;
  
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const handleRetakeTest = () => {
    navigate('/test');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <ResultsContainer>
      <ResultsCard>
        <ResultsHeader>Test Results</ResultsHeader>
        
        <ScoreDisplay color={isPassed ? '#2ecc71' : '#e74c3c'}>
          {correctAnswers} / {totalQuestions}
        </ScoreDisplay>
        
        <ResultMessage>
          You scored {percentage}% on the test.
          {isPassed 
            ? ' Congratulations! You have passed the Florida Driver\'s License Exam.' 
            : ' Unfortunately, you did not pass. Please prepare well and try again.'}
        </ResultMessage>
        
        <ButtonContainer>
          <Button onClick={handleRetakeTest}>
            Retake Test
          </Button>
          <Button onClick={handleGoHome} style={{ backgroundColor: '#7f8c8d' }}>
            Go Home
          </Button>
        </ButtonContainer>
      </ResultsCard>
    </ResultsContainer>
  );
};

export default ResultsPage;
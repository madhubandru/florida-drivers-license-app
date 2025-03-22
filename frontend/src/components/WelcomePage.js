import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-weight: 400;
`;

const StartButton = styled.button`
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

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const FloridaImage = styled.div`
  margin: 30px 0;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };

  return (
    <WelcomeContainer>
      <Card>
        <Title>Florida Driver's License Exam Practice</Title>
        <Subtitle>Prepare for your Florida DMV written test with our practice exam</Subtitle>
        
        <FloridaImage>
          <img 
            src="https://www.flhsmv.gov/wp-content/uploads/logo-flhsmv.png" 
            alt="Florida Highway Safety and Motor Vehicles" 
          />
        </FloridaImage>
        
        <p>
          This practice test contains 50 random questions from the Florida Driver's Handbook.
          You need to answer at least 40 questions correctly to pass.
        </p>
        
        <p>
          Take your time, read each question carefully, and select the best answer.
          Good luck!
        </p>
        
        <StartButton onClick={handleStartTest}>
          Start Practice Test
        </StartButton>
      </Card>
    </WelcomeContainer>
  );
};

export default WelcomePage;
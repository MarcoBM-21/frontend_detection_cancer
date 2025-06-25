import React, { useState } from 'react';
import UserDataForm from './components/UserDataForm';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import { UserData, SkinAnalysisResult } from './types';
import { generateSkinAnalysis } from './utils/generateDiagnosis';

type AppState = 'form' | 'loading' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('form');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [analysis, setAnalysis] = useState<SkinAnalysisResult | null>(null);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentState('loading');
  };

  const handleLoadingComplete = () => {
    if (userData) {
      const analysisResult = generateSkinAnalysis(userData);
      setAnalysis(analysisResult);
      setCurrentState('results');
    }
  };

  const handleRestart = () => {
    setCurrentState('form');
    setUserData(null);
    setAnalysis(null);
  };

  switch (currentState) {
    case 'form':
      return <UserDataForm onSubmit={handleFormSubmit} />;
    
    case 'loading':
      return (
        <LoadingScreen 
          onComplete={handleLoadingComplete}
          userData={userData}
        />
      );
    
    case 'results':
      return (
        <ResultsScreen 
          userData={userData!}
          analysis={analysis!}
          onRestart={handleRestart}
        />
      );
    
    default:
      return <UserDataForm onSubmit={handleFormSubmit} />;
  }
}

export default App;
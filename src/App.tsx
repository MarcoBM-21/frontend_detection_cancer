import { useState } from 'react';
import UserDataForm from './components/UserDataForm';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import { UserData, SkinAnalysisResult, BackendResponse } from './types';
// import { generateSkinAnalysis } from './utils/generateDiagnosis';
import { predictSkinAnalysis } from './utils/api';
import { diagnosisInfo } from './utils/generateDiagnosis';

type AppState = 'form' | 'loading' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('form');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [analysis, setAnalysis] = useState<SkinAnalysisResult | null>(null);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentState('loading');
  };

  // const handleLoadingComplete = () => {
  //   if (userData) {
  //     const analysisResult = generateSkinAnalysis(userData);
  //     setAnalysis(analysisResult);
  //     setCurrentState('results');
  //   }
  // };

  const handleLoadingComplete = async () => {
    if (!userData) return;

    try {
      const formData = new FormData();
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('age', String(userData.age));
      formData.append('gender', userData.gender);
      formData.append('lesionArea', userData.lesionArea);
      formData.append('file', userData.image); // debe ser tipo File

      const backendResult: BackendResponse = await predictSkinAnalysis(formData);
      const diagInfo = diagnosisInfo[backendResult.diagnosis];

      const fullResult: SkinAnalysisResult = {
        ...backendResult,
        findings: diagInfo.findings,
        recommendations: diagInfo.recommendations,
        urgency: diagInfo.urgency,
        nextSteps: diagInfo.nextSteps,
        diagnosisName: diagInfo.name,
        description: diagInfo.description
      };

      setAnalysis(fullResult);
      setCurrentState('results');
    } catch (error) {
      console.error('Error al procesar el diagnóstico:', error);
      alert('Ocurrió un error al procesar el análisis. Inténtalo nuevamente.');
      setCurrentState('form');
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
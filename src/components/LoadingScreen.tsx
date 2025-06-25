import React, { useState, useEffect } from 'react';
import { Microscope, Scan, Brain, Shield } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  userData: any;
}

const analysisSteps = [
  { icon: Scan, text: 'Analizando imagen dermatológica...', duration: 3000 },
  { icon: Microscope, text: 'Evaluando características de la lesión...', duration: 3500 },
  { icon: Brain, text: 'Clasificando patrones dermatológicos...', duration: 2500 },
  { icon: Shield, text: 'Generando reporte diagnóstico...', duration: 2000 }
];

export default function LoadingScreen({ onComplete, userData }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 100);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);
    let accumulatedTime = 0;

    const stepTimers = analysisSteps.map((step, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
        setProgress(((accumulatedTime + step.duration) / totalDuration) * 100);
        
        if (index === analysisSteps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, step.duration);
        }
      }, accumulatedTime);
    });

    analysisSteps.forEach(step => {
      accumulatedTime += step.duration;
    });

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  const CurrentIcon = analysisSteps[currentStep]?.icon || Scan;
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${centiseconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-lg text-center">
        {/* User Info Header */}
        <div className="flex items-center justify-center space-x-4 mb-8 p-6 bg-white/20 rounded-2xl backdrop-blur-sm">
          {userData.image && (
            <img 
              src={userData.image} 
              alt="Lesión" 
              className="w-16 h-16 rounded-full object-cover border-3 border-white/40 shadow-lg"
            />
          )}
          <div className="text-white text-left">
            <p className="font-bold text-lg">{userData.firstName} {userData.lastName}</p>
            <p className="text-sm text-white/90">{userData.age} años • {userData.gender === 'male' ? 'Masculino' : userData.gender === 'female' ? 'Femenino' : 'Otro'}</p>
            <p className="text-xs text-white/80">Área: {userData.lesionArea}</p>
          </div>
        </div>

        {/* Analysis Animation */}
        <div className="mb-8">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-blue-400 transition-all duration-300"
              style={{ transform: `rotate(${progress * 3.6}deg)` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className="w-12 h-12 text-white animate-pulse drop-shadow-lg" />
            </div>
          </div>
          
          <div className="text-white mb-6">
            <p className="text-xl font-semibold mb-3">{analysisSteps[currentStep]?.text}</p>
            <p className="text-sm text-white/90 bg-white/10 rounded-lg px-4 py-2 inline-block">
              Tiempo de análisis: {formatTime(elapsedTime)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-white/80 text-sm font-medium">
            {Math.round(progress)}% completado
          </p>
        </div>

        {/* Analysis Steps Indicator */}
        <div className="flex justify-center space-x-3 mb-6">
          {analysisSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-blue-400 shadow-lg' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-xs text-white/80 leading-relaxed">
            Nuestro sistema está analizando la imagen utilizando algoritmos avanzados de clasificación dermatológica basados en redes neuronales convolucionales.
          </p>
        </div>
      </div>
    </div>
  );
}
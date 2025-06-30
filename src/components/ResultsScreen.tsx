import { UserData, SkinAnalysisResult } from '../types';
import { AlertTriangle, CheckCircle, Info, Shield, Clock, RotateCcw, Calendar, Phone, MapPin } from 'lucide-react';

interface ResultsScreenProps {
  userData: UserData;
  analysis: SkinAnalysisResult;
  onRestart: () => void;
}

export default function ResultsScreen({ userData, analysis, onRestart }: ResultsScreenProps) {
  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return AlertTriangle;
      case 'urgent': return AlertTriangle;
      case 'soon': return Info;
      case 'routine': return CheckCircle;
      default: return Info;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-700 bg-red-100 border-red-200';
      case 'urgent': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'soon': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'routine': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getUrgencyBadgeColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-600 text-white';
      case 'urgent': return 'bg-orange-600 text-white';
      case 'soon': return 'bg-yellow-600 text-white';
      case 'routine': return 'bg-green-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'Atención Inmediata';
      case 'urgent': return 'Atención Urgente';
      case 'soon': return 'Atención Pronto';
      case 'routine': return 'Atención de Rutina';
      default: return 'Evaluación Recomendada';
    }
  };

  const getDiagnosisColor = (diagnosis: string) => {
    switch (diagnosis) {
      case 'mel': return 'text-red-700 bg-red-50 border-red-200';
      case 'bcc': case 'akiec': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'nv': case 'bkl': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  const UrgencyIcon = getUrgencyIcon(analysis.urgency);

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header with User Info */}
        <div className="bg-white shadow-lg border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {userData.image && (
                    <img
                        src={URL.createObjectURL(userData.image)}
                        alt="Lesión dermatológica"
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-200 shadow-lg"
                    />
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <div className="flex items-center space-x-6 text-gray-600 mt-2">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{userData.age} años</span>
                  </span>
                    <span className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>{userData.gender === 'male' ? 'Masculino' : userData.gender === 'female' ? 'Femenino' : 'Otro'}</span>
                  </span>
                    <span className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.lesionLabel}</span>
                  </span>
                  </div>
                </div>
              </div>
              <button
                  onClick={onRestart}
                  className="flex items-center space-x-2 px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Nuevo Análisis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Diagnosis Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-4 rounded-2xl border-2 ${getUrgencyColor(analysis.urgency)}`}>
                  <UrgencyIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Resultado del Análisis</h2>
                  <p className="text-gray-600">Clasificación dermatológica automatizada</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Diagnosis Result */}
                <div className={`p-6 rounded-2xl border-2 ${getDiagnosisColor(analysis.diagnosis)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{analysis.diagnosisName}</h3>
                      <p className="text-sm opacity-80 mb-3">{analysis.description}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getUrgencyBadgeColor(analysis.urgency)}`}>
                    {getUrgencyText(analysis.urgency)}
                  </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{analysis.findings}</p>

                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Nivel de Confianza del Análisis</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {`${(analysis.confidence * 100).toFixed(2)}%`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 shadow-sm"
                          style={{ width: `${(analysis.confidence * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Código de clasificación: <span className="font-mono font-bold">{analysis.diagnosis.toUpperCase()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Recomendaciones</h3>
              </div>

              <div className="space-y-4 mb-6">
                {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{recommendation}</p>
                    </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Próximos Pasos
                </h4>
                <div className="space-y-3">
                  {analysis.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Summary */}
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Paciente</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userData.age}</div>
                <div className="text-sm text-gray-600">Años de edad</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="text-lg font-bold text-purple-600 mb-2 capitalize">{userData.gender === 'male' ? 'Masculino' : userData.gender === 'female' ? 'Femenino' : 'Otro'}</div>
                <div className="text-sm text-gray-600">Género</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-lg font-bold text-green-600 mb-2">{userData.lesionLabel}</div>
                <div className="text-sm text-gray-600">Área de la lesión</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="text-lg font-bold text-orange-600 mb-2">{analysis.diagnosis.toUpperCase()}</div>
                <div className="text-sm text-gray-600">Código diagnóstico</div>
              </div>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-800 mb-2">Aviso Médico Importante</h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Este análisis utiliza inteligencia artificial para clasificación dermatológica y es únicamente informativo.
                  <strong> NO constituye un diagnóstico médico definitivo.</strong> Es fundamental que consultes con un dermatólogo certificado
                  para obtener una evaluación profesional y confirmación diagnóstica, especialmente para lesiones sospechosas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
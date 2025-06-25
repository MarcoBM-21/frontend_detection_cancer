import React, { useState, useRef } from 'react';
import { User, Camera, Upload, ArrowRight, MapPin } from 'lucide-react';
import { UserData } from '../types';

interface UserDataFormProps {
  onSubmit: (data: UserData) => void;
}

export default function UserDataForm({ onSubmit }: UserDataFormProps) {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'male',
    image: undefined,
    lesionArea: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.age > 0 && formData.lesionArea) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.age > 0 && formData.lesionArea;

  const lesionAreas = [
    'Cara',
    'Cuello',
    'Pecho',
    'Espalda',
    'Brazo derecho',
    'Brazo izquierdo',
    'Mano derecha',
    'Mano izquierda',
    'Abdomen',
    'Pierna derecha',
    'Pierna izquierda',
    'Pie derecho',
    'Pie izquierdo',
    'Cuero cabelludo',
    'Otra área'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Camera className="text-blue-600 w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Análisis Dermatológico</h1>
          <p className="text-gray-600 max-w-md mx-auto">Proporciona tu información personal y la imagen de la lesión para un análisis especializado</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="María"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="González"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="35"
                  min="1"
                  max="120"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Área de la Lesión */}
          <div className="bg-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Área de la Lesión
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación de la lesión
              </label>
              <select
                value={formData.lesionArea}
                onChange={(e) => setFormData(prev => ({ ...prev, lesionArea: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Selecciona el área de la lesión</option>
                {lesionAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fotografía */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-blue-600" />
              Fotografía de la Lesión
            </h3>
            
            <div className="flex items-center space-x-6">
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Lesión dermatológica"
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-blue-200 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-3 -right-3 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 border-2 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-100 transition-all group"
                >
                  <Upload className="w-8 h-8 text-blue-400 group-hover:text-blue-500 mb-2" />
                  <span className="text-sm text-blue-600 font-medium">Subir foto</span>
                </button>
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2 font-medium">
                  Sube una imagen clara de la lesión dermatológica
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Buena iluminación natural</li>
                  <li>• Imagen enfocada y sin sombras</li>
                  <li>• JPG, PNG máximo 10MB</li>
                  <li>• Incluye área circundante para contexto</li>
                  <li>• Evita usar flash directo</li>
                </ul>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Este análisis es únicamente informativo y utiliza inteligencia artificial para clasificación dermatológica. 
              <strong> NO constituye un diagnóstico médico definitivo.</strong> Siempre consulta con un dermatólogo certificado para obtener una evaluación profesional.
            </p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Iniciar Análisis Dermatológico</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
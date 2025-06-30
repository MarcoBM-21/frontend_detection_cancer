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
    image: null as unknown as File,
    imageUrl: '',
    lesionArea: '',
    lesionLabel: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: previewUrl
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || formData.age <= 0 || !formData.lesionArea || !formData.image) return;
    onSubmit(formData);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.age > 0 && formData.lesionArea;

  const lesionAreas = [
    { label: 'Cara', value: 'face' },
    { label: 'Cuello', value: 'neck' },
    { label: 'Pecho', value: 'chest' },
    { label: 'Espalda', value: 'back' },
    { label: 'Brazo derecho', value: 'upper extremity' },
    { label: 'Brazo izquierdo', value: 'upper extremity' },
    { label: 'Mano derecha', value: 'hand' },
    { label: 'Mano izquierda', value: 'hand' },
    { label: 'Abdomen', value: 'abdomen' },
    { label: 'Pierna derecha', value: 'lower extremity' },
    { label: 'Pierna izquierda', value: 'lower extremity' },
    { label: 'Pie derecho', value: 'foot' },
    { label: 'Pie izquierdo', value: 'foot' },
    { label: 'Cuero cabelludo', value: 'scalp' },
    { label: 'Otra área', value: 'unknown' }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
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
                <input type="text" placeholder="Nombre" value={formData.firstName}
                       onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                       required className="px-4 py-3 border rounded-lg w-full" />
                <input type="text" placeholder="Apellidos" value={formData.lastName}
                       onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                       required className="px-4 py-3 border rounded-lg w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" placeholder="Edad" value={formData.age || ''}
                       onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                       min={1} max={120} required className="px-4 py-3 border rounded-lg w-full" />
                <select value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                        className="px-4 py-3 border rounded-lg w-full">
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </select>
              </div>
            </div>

            {/* Área de la lesión */}
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Área de la Lesión
              </h3>
              <select value={formData.lesionArea}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedLabel = lesionAreas.find(area => area.value === selectedValue && area.label === e.target.selectedOptions[0].text)?.label || '';
                        setFormData({
                          ...formData,
                          lesionArea: selectedValue,
                          lesionLabel: selectedLabel
                        });
                      }}
                      className="w-full px-4 py-3 border rounded-lg" required>
                <option value="">Selecciona el área de la lesión</option>
                {lesionAreas.map((area, index) => (
                    <option key={`${area.value}-${index}`} value={area.value}>{area.label}</option>
                ))}
              </select>
            </div>

            {/* Fotografía */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Fotografía de la Lesión
              </h3>
              <div className="flex items-center space-x-6">
                {formData.imageUrl ? (
                    <div className="relative">
                      <img src={formData.imageUrl} alt="Vista previa" className="w-32 h-32 object-cover rounded-2xl border-4 border-blue-200 shadow-lg" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-3 -right-3 bg-blue-500 p-3 rounded-full text-white shadow-lg hover:bg-blue-600">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                ) : (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-32 h-32 border-dashed border-2 border-blue-300 rounded-2xl flex flex-col items-center justify-center hover:bg-blue-100">
                      <Upload className="w-8 h-8 text-blue-400 mb-2" />
                      <span className="text-sm text-blue-600 font-medium">Subir foto</span>
                    </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>

            {/* Advertencia */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              <strong>Importante:</strong> Este análisis es informativo y no sustituye diagnóstico médico. Consulta con un dermatólogo.
            </div>

            {/* Botón */}
            <button type="submit" disabled={!isFormValid} className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 ${
                isFormValid
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
              <span>Iniciar Análisis Dermatológico</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
  );
}
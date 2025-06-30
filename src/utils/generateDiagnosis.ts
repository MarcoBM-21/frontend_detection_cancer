export const diagnosisInfo = {
  'nv': {
    name: 'Nevus Melanocítico',
    description: 'Lesión pigmentada benigna común, también conocida como lunar.',
    urgency: 'routine' as const,
    findings: 'Se observan características compatibles con un nevus melanocítico benigno. La lesión presenta patrones de pigmentación regulares y bordes bien definidos, consistentes con una lesión benigna.',
    recommendations: [
      'Autoexamen mensual de la piel',
      'Protección solar diaria con SPF 30+',
      'Revisión dermatológica anual de rutina',
      'Monitoreo de cambios en tamaño, color o forma',
      'Fotografía para seguimiento a largo plazo'
    ],
    nextSteps: [
      'Consulta dermatológica de rutina en 12 meses',
      'Autoexamen regular de toda la superficie corporal',
      'Educación sobre signos de alarma (regla ABCDE)'
    ]
  },
  'mel': {
    name: 'Melanoma',
    description: 'Tumor maligno de melanocitos que requiere atención médica inmediata.',
    urgency: 'immediate' as const,
    findings: 'Se detectan características altamente sugestivas de melanoma maligno. La lesión presenta asimetría, bordes irregulares, variación de color y/o diámetro aumentado, patrones que requieren evaluación médica urgente.',
    recommendations: [
      'CONSULTA DERMATOLÓGICA INMEDIATA',
      'No manipular ni traumatizar la lesión',
      'Evitar exposición solar directa',
      'Documentar cambios con fotografías',
      'Preparar historial médico completo',
      'Considerar segunda opinión oncológica'
    ],
    nextSteps: [
      'CONSULTA DERMATOLÓGICA URGENTE (24-48 horas)',
      'Biopsia para confirmación histológica',
      'Evaluación de extensión y estadificación',
      'Derivación a oncología dermatológica'
    ]
  },
  'bkl': {
    name: 'Queratosis Seborreica',
    description: 'Lesión benigna común relacionada con el envejecimiento cutáneo.',
    urgency: 'routine' as const,
    findings: 'Las características observadas son consistentes con queratosis seborreica, una lesión benigna común asociada al envejecimiento. Presenta superficie verrugosa y pigmentación característica.',
    recommendations: [
      'Revisión dermatológica anual',
      'Protección solar para prevenir nuevas lesiones',
      'Monitoreo de cambios significativos',
      'Considerar remoción si hay irritación frecuente',
      'Mantener la piel hidratada'
    ],
    nextSteps: [
      'Consulta dermatológica de rutina',
      'Evaluación para posible remoción cosmética',
      'Seguimiento anual de lesiones similares'
    ]
  },
  'bcc': {
    name: 'Carcinoma Basocelular',
    description: 'Cáncer de piel no melanoma, localmente invasivo pero raramente metastásico.',
    urgency: 'urgent' as const,
    findings: 'Se identifican características compatibles con carcinoma basocelular. Aunque es un cáncer de crecimiento lento y raramente metastásico, requiere tratamiento oportuno para prevenir invasión local.',
    recommendations: [
      'Consulta dermatológica urgente en 1-2 semanas',
      'Evitar exposición solar en el área afectada',
      'No aplicar productos irritantes',
      'Proteger la lesión de traumatismos',
      'Documentar cualquier cambio',
      'Revisar otras áreas expuestas al sol'
    ],
    nextSteps: [
      'Consulta dermatológica en 1-2 semanas',
      'Biopsia para confirmación diagnóstica',
      'Planificación de tratamiento (cirugía/otros)',
      'Evaluación de factores de riesgo'
    ]
  },
  'akiec': {
    name: 'Queratosis Actínica / Carcinoma Escamocelular in situ',
    description: 'Lesión precancerosa o cáncer temprano relacionado con daño solar.',
    urgency: 'urgent' as const,
    findings: 'Las características sugieren queratosis actínica o carcinoma escamocelular in situ. Estas lesiones representan daño solar acumulativo y tienen potencial de progresión maligna.',
    recommendations: [
      'Consulta dermatológica urgente',
      'Protección solar estricta (SPF 50+)',
      'Evitar exposición solar entre 10 AM - 4 PM',
      'Usar ropa protectora y sombreros',
      'Revisar toda la superficie corporal',
      'Considerar tratamiento preventivo'
    ],
    nextSteps: [
      'Consulta dermatológica en 1-2 semanas',
      'Biopsia para estadificación precisa',
      'Tratamiento según extensión (criocirugía, tópicos)',
      'Seguimiento estrecho post-tratamiento'
    ]
  },
  'vasc': {
    name: 'Lesión Vascular',
    description: 'Lesión de origen vascular, generalmente benigna.',
    urgency: 'routine' as const,
    findings: 'Se observan características compatibles con una lesión vascular benigna. Estas lesiones incluyen angiomas, hemangiomas o malformaciones vasculares menores.',
    recommendations: [
      'Consulta dermatológica de rutina',
      'Monitoreo de cambios en tamaño o color',
      'Protección contra traumatismos',
      'Considerar tratamiento cosmético si es necesario',
      'Mantener registro fotográfico'
    ],
    nextSteps: [
      'Consulta dermatológica en 3-6 meses',
      'Evaluación para tratamiento cosmético',
      'Seguimiento según evolución'
    ]
  },
  'df': {
    name: 'Dermatofibroma',
    description: 'Nódulo fibroso benigno común en extremidades.',
    urgency: 'routine' as const,
    findings: 'Las características son consistentes con dermatofibroma, una lesión fibrosa benigna común. Típicamente se presenta como un nódulo firme, bien delimitado.',
    recommendations: [
      'Consulta dermatológica de rutina',
      'Monitoreo de cambios significativos',
      'Evitar traumatismos repetidos',
      'Considerar remoción si hay molestias',
      'Protección solar general'
    ],
    nextSteps: [
      'Consulta dermatológica en 6-12 meses',
      'Evaluación para remoción si hay síntomas',
      'Seguimiento según preferencia del paciente'
    ]
  }
};

// export function generateSkinAnalysis(userData: UserData): SkinAnalysisResult {
//   // Simulate AI diagnosis selection (in real implementation, this would be ML model output)
//   const diagnoses: Array<keyof typeof diagnosisInfo> = ['nv', 'mel', 'bkl', 'bcc', 'akiec'];

//   // Weight probabilities based on common occurrence
//   const weights = {
//     'nv': 0.35,    // Most common
//     'bkl': 0.25,   // Common in older adults
//     'bcc': 0.15,   // Common skin cancer
//     'df': 0.10,    // Moderately common
//     'vasc': 0.08,  // Less common
//     'akiec': 0.05, // Precancerous
//     'mel': 0.02    // Least common but most serious
//   };

//   // Simulate weighted random selection
//   const random = Math.random();
//   let cumulative = 0;
//   let selectedDiagnosis: keyof typeof diagnosisInfo = 'nv';

//   for (const [diagnosis, weight] of Object.entries(weights)) {
//     cumulative += weight;
//     if (random <= cumulative) {
//       selectedDiagnosis = diagnosis as keyof typeof diagnosisInfo;
//       break;
//     }
//   }

//   const diagInfo = diagnosisInfo[selectedDiagnosis];

//   // Calculate confidence based on diagnosis type and image availability
//   let confidence = 75;

//   // Adjust confidence based on diagnosis complexity
//   if (selectedDiagnosis === 'mel') confidence = 85; // High confidence for melanoma detection
//   if (selectedDiagnosis === 'nv') confidence = 90;  // High confidence for common nevi
//   if (selectedDiagnosis === 'bkl') confidence = 88; // High confidence for seborrheic keratosis
//   if (selectedDiagnosis === 'bcc') confidence = 82; // Good confidence for BCC
//   if (selectedDiagnosis === 'akiec') confidence = 78; // Moderate confidence for precancerous
//   if (selectedDiagnosis === 'vasc') confidence = 85; // Good confidence for vascular
//   if (selectedDiagnosis === 'df') confidence = 87;  // Good confidence for dermatofibroma

//   // Boost confidence if image is provided
//   if (userData.image) {
//     confidence += 8;
//   }

//   // Add some realistic variation
//   const variation = Math.random() * 10 - 5; // ±5%
//   confidence = Math.max(70, Math.min(95, Math.round(confidence + variation)));

//   return {
//     diagnosis: selectedDiagnosis,
//     confidence,
//     findings: diagInfo.findings,
//     recommendations: diagInfo.recommendations,
//     urgency: diagInfo.urgency,
//     nextSteps: diagInfo.nextSteps,
//     diagnosisName: diagInfo.name,
//     description: diagInfo.description
//   };
// }
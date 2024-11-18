import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Check, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingFlow = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState('10:00');
  const [selectedDuration, setSelectedDuration] = useState(1);
  
  const direccion = {
    calle: "Av. Principal 123",
    colonia: "Centro",
    ciudad: "Ciudad de México",
    estado: "CDMX",
    cp: "01234"
  };
  
  const fechasDisponibles = [
    "2024-11-20",
    "2024-11-21",
    "2024-11-22",
    "2024-11-25",
    "2024-11-28",
    "2024-12-01",
    "2024-12-02",
    "2024-12-05"
  ];

  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const diasSemana = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
  ];

  const navigate = useNavigate()

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(`${dateString}T12:00:00`);
    const dia = diasSemana[date.getDay()];
    const numero = date.getDate();
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    return `${dia}, ${numero} de ${mes} de ${año}`;
  };

  const getCurrentMonth = () => {
    const date = new Date();
    return `${meses[date.getMonth()]} ${date.getFullYear()}`;
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: '', available: false, date: null });
    }
    
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isAvailable = fechasDisponibles.includes(dateString);
      
      days.push({
        day,
        available: isAvailable,
        date: dateString
      });
    }
    
    return days;
  };

  const horasDisponibles = Array.from({ length: 29 }, (_, i) => {
    const hour = Math.floor(i/2) + 8;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  });

  const handleReservar = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/profile');
    }, 3000);
  };

  const handleBackOrCancel = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/profile');
    }
  };

  // Calcular el costo total basado en la duración
  const calculateTotal = () => {
    const costoPorHora = 1000; // Precio por hora en MXN
    return costoPorHora * selectedDuration;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {showSuccess && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Se ha contactado al artista, te daremos seguimiento por correo
        </div>
      )}

<div className="mb-4">
        <button 
          onClick={handleBackOrCancel}
          className={`
            flex items-center px-4 py-2 rounded-lg transition-colors
            ${currentStep === 1 
              ? 'text-gray-600 hover:text-gray-700 hover:bg-gray-100' 
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }
          `}
        >
          {currentStep === 1 ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </>
          ) : (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar
            </>
          )}
        </button>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            onClick={() => step < currentStep && setCurrentStep(step)}
            className={`flex items-center ${step < currentStep ? 'cursor-pointer' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`h-1 w-16 mx-2 transition-colors ${
                currentStep > step ? 'bg-red-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border-2 border-red-100">
        <div className="p-6 border-b border-red-100">
          <h2 className="text-2xl font-bold text-red-900">
            {currentStep === 1 && "Selecciona la dirección"}
            {currentStep === 2 && "Elige la fecha"}
            {currentStep === 3 && "Selecciona la hora"}
            {currentStep === 4 && "Resumen de tu reserva"}
          </h2>
        </div>
        
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 border-2 border-red-100 rounded-lg hover:border-red-300 cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="text-red-600" />
                  <span className="font-medium">{direccion.calle}</span>
                </div>
                <div className="ml-6 text-gray-600">
                  {direccion.colonia}, {direccion.ciudad}, {direccion.estado} {direccion.cp}
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition-colors">
                Agregar nueva dirección
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="p-4 border-2 border-red-100 rounded-lg">
                <div className="mb-4 text-center font-medium text-lg text-red-900 capitalize">
                  {getCurrentMonth()}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(dia => (
                    <div key={dia} className="text-center font-medium text-sm text-gray-600">
                      {dia}
                    </div>
                  ))}
                  
                  {generateCalendarDays().map((dayInfo, index) => (
                    <div
                      key={index}
                      onClick={() => dayInfo.available && setSelectedDate(dayInfo.date)}
                      className={`
                        p-2 text-center rounded-lg transition-colors
                        ${!dayInfo.day ? 'invisible' : 'cursor-pointer'}
                        ${dayInfo.available && !selectedDate ? 'bg-red-50 hover:bg-red-100 text-red-900' : ''}
                        ${dayInfo.available && selectedDate === dayInfo.date ? 'bg-red-600 text-white' : ''}
                        ${!dayInfo.available && dayInfo.day ? 'text-gray-300' : ''}
                      `}
                    >
                      {dayInfo.day}
                    </div>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-red-600" />
                    <span className="font-medium text-red-900 capitalize">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hora de llegada
                </label>
                <select 
                  className="w-full p-2 border-2 border-red-100 rounded-lg"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                >
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Duración (horas)
                </label>
                <select 
                  className="w-full p-2 border-2 border-red-100 rounded-lg"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Dirección:</span>
                  <span className="font-medium">{direccion.calle}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium capitalize">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-medium">{selectedHour}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{selectedDuration} {selectedDuration === 1 ? 'hora' : 'horas'}</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toLocaleString()} MXN</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-red-100">
          <div className="w-full flex justify-end">
            {currentStep < 4 ? (
              <button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={currentStep === 2 && !selectedDate}
                className={`
                  flex items-center px-4 py-2 rounded-lg
                  ${currentStep === 2 && !selectedDate 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 text-white'}
                `}
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button 
                onClick={handleReservar}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Reservar
                <Check className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
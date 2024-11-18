import logo from '../../assets/logoAppImg.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const goToHome = () => navigate('/home');

  // Frases del carrusel
  const phrases = [
    "Conoce a los artistas que te rodean",
    "Encuentra musicos en crecimiento cerca de ti",
    "Conecta con el talento local"
  ];

  // Efecto para el carrusel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => 
        prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      {/* Diagonal division - using a pseudo-element */}
      <div 
        className="absolute top-0 left-0 w-[50%] h-screen bg-red-50 transform skew-x-6 origin-top"
        style={{ zIndex: 1 }}
      />

      {/* Left Side - Logo and Carousel */}
      <div className="hidden md:flex md:w-1/2 flex-col bg-red-50 items-center justify-center relative" style={{ zIndex: 2 }}>
      <div className="w-64 h-64 bg-red-600 flex items-center justify-center mb-8 overflow-hidden">
          <img src={logo} alt="" className="w-full h-full object-cover transform scale-110"/>
        </div>
        
        {/* Carousel */}
        <div className="w-4/5 h-20 overflow-hidden">
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentPhraseIndex * 33}%)` }}
          >
            {phrases.map((phrase, index) => (
              <div 
                key={index} 
                className="h-20 flex items-center justify-center text-center text-red-600 text-xl font-medium px-4"
              >
                {phrase}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative" style={{ zIndex: 2 }}>
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            {isLogin ? 'Iniciar Sesión' : 'Registro'}
          </h2>
          
          {/* Social Login Buttons */}
          <div className="space-y-4 mb-4">
            <button
              type="button"
              className="w-full p-3 border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              <span>Continuar con Google</span>
            </button>
            
            <button
              type="button"
              className="w-full p-3 border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <span>Continuar con Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white p-3 hover:bg-red-700 transition duration-200"
              onClick={goToHome}
            >
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-700 transition"
            >
              {isLogin 
                ? '¿No tienes cuenta? Regístrate' 
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
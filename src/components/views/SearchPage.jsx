import React, { useState } from 'react';
import { Search, MapPin, Calendar, Star, Music, ArrowLeft } from 'lucide-react';
import UnknownPP from '../../assets/unknownPP.jpg';
import knownPP from '../../assets/CarlosPP.jpg';
import logoApp from '../../assets/logoApp.jpg';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Ciudad de México');
  const navigate = useNavigate();
  
  // Mock data para músicos
  const musicians = [
    { id: 0, name: "Carlos Gómez", instruments: ["Saxofon"], genres: ["Jazz", "Blues", "Boleros"], rating: 4.8, image: knownPP, price: "$$", link: '/profile'},
    { id: 1, name: "Ana García", instruments: ["Guitarra", "Voz"], genres: ["Rock", "Pop"], rating: 4.8, image: null, price: "$$", link: null},
    { id: 2, name: "Carlos Ruiz", instruments: ["Piano"], genres: ["Clásica", "Jazz"], rating: 4.9, image: null, price: "$$$", link: null},
    { id: 3, name: "María López", instruments: ["Violín"], genres: ["Clásica"], rating: 4.7, image: null, price: "$$", link: null},
    { id: 4, name: "Juan Pérez", instruments: ["Batería"], genres: ["Rock", "Metal"], rating: 4.6, image: null, price: "$", link: null},
    { id: 5, name: "Sofia Torres", instruments: ["Bajo", "Voz"], genres: ["Jazz", "Blues"], rating: 4.9, image: null, price: "$$", link: null},
    { id: 6, name: "Diego Morales", instruments: ["Saxofón"], genres: ["Jazz", "Blues"], rating: 4.8, image: null, price: "$$$", link: null},
    { id: 7, name: "Laura Sánchez", instruments: ["Piano", "Voz"], genres: ["Pop", "Jazz"], rating: 4.7, image: null, price: "$$", link: null},
    { id: 8, name: "Roberto Díaz", instruments: ["Trompeta"], genres: ["Jazz", "Salsa"], rating: 4.6, image: null, price: "$", link: null},
    { id: 9, name: "Carmen Ortiz", instruments: ["Flauta"], genres: ["Clásica", "Folk"], rating: 4.8, image: null, price: "$$", link: null},
    { id: 10, name: "Miguel Ángel", instruments: ["Guitarra Eléctrica"], genres: ["Rock", "Metal"], rating: 4.9, image: null, price: "$$$", link: null}
  ];

  // Últimos 3 perfiles visitados (simulados)
  const recentlyViewed = musicians.slice(0, 3);

  const filterOptions = {
    price: ["$", "$$", "$$$"],
    genres: ["Rock", "Pop", "Jazz", "Clásica", "Blues", "Metal", "Folk", "Salsa"],
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleBack = () => {
    setIsSearchFocused(false);
    setIsSearching(false);
    setActiveFilters([]);
    setSearchQuery('');
  };

  const filteredMusicians = musicians.filter(musician => {
    if (activeFilters.length === 0) return true;
    
    const priceFilters = activeFilters.filter(filter => ['$', '$$', '$$$'].includes(filter));
    const genreFilters = activeFilters.filter(filter => !['$', '$$', '$$$'].includes(filter));
    
    // Si no hay filtros de un tipo específico, ese tipo se considera que pasa el filtro
    const passesPrice = priceFilters.length === 0 || priceFilters.includes(musician.price);
    const passesGenre = genreFilters.length === 0 || musician.genres.some(genre => genreFilters.includes(genre));
    
    return passesPrice && passesGenre;
  });

  const renderMusicianListItem = (musician) => {
    const handleClick = () => {
      if (musician.link) {
        navigate(musician.link); // Redirige a la página indicada por `link`
      }
    };

    return (
    <div
      key={musician.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 cursor-pointer flex items-center space-x-4"
      onClick={handleClick}
    >
      <img
        src={musician.image || UnknownPP}
        alt={musician.name}
        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl mb-1">{musician.name}</h3>
            <div className="text-sm text-gray-600 mb-2">
              {musician.instruments.map((instrument, index) => (
                <span key={instrument} className="inline-flex items-center mr-2">
                  <Music className="w-4 h-4 mr-1" />
                  {instrument}
                </span>
              ))}
            </div>
            <div className="flex items-center mb-2">
              {renderStars(musician.rating)}
              <span className="ml-2 text-sm text-gray-600">
                {musician.rating}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-red-600">{musician.price}</span>
            <div className="mt-2">
              {musician.genres.map(genre => (
                <span key={genre} className="inline-block px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm mr-2 mb-2">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )};

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-red-600 flex items-center justify-center rounded-lg">
          <img src={logoApp} alt="" className="w-full h-full object-cover transform scale-110 rounded-lg"/>
        </div>
      </div>

      {/* Back Button */}
      {(isSearchFocused || isSearching) && (
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Regresar
        </button>
      )}

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar músicos..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Additional Search Options */}
        {isSearchFocused && !isSearching && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate}
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={selectedLocation}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Buscar
            </button>
          </div>
        )}

        {/* Filter Section */}
        {isSearching && (
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Rango de Precio</h3>
              <div className="flex gap-2">
                {filterOptions.price.map(price => (
                  <button
                    key={price}
                    onClick={() => toggleFilter(price)}
                    className={`px-4 py-2 rounded-full border ${
                      activeFilters.includes(price)
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-300 hover:border-red-600'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleFilter(genre)}
                    className={`px-4 py-2 rounded-full border ${
                      activeFilters.includes(genre)
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-300 hover:border-red-600'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results List */}
      {isSearching && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda</h2>
          <div className="space-y-4">
            {filteredMusicians.map(musician => renderMusicianListItem(musician))}
          </div>
        </div>
      )}

      {/* Recently Viewed Musicians */}
      {!isSearchFocused && !isSearching && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Últimos Perfiles Visitados</h2>
          <div className="space-y-4">
            {recentlyViewed.map(musician => renderMusicianListItem(musician))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
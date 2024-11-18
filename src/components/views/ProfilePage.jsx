import React from 'react';
import { Star, MapPin, Music, Clock, Instagram, Facebook, Youtube, ArrowLeft } from 'lucide-react';
import CarlosPP from '../../assets/CarlosPP.jpg'
import { useNavigate } from 'react-router-dom';
import CarlosCover from '../../assets/CarlosCover.jpg';
import CarlosGal1 from '../../assets/CarlosGal1.jpg';
import CarlosGal2 from '../../assets/CarlosGal2.jpg';
import CarlosGal3 from '../../assets/CarlosGal3.jpg';
import CarlosGal4 from '../../assets/CarlosGal4.jpg';

const ProfilePage = () => {
  // Mock data - En un caso real esto vendría de una API o props
  const musician = {
    name: "Carlos Gómez",
    title: "Saxofonista Alto Tenor",
    location: "Ciudad de México",
    coverImage: CarlosCover,
    rating: 4.8,
    reviewCount: 67,
    description: "Saxofonista de alto y tenor, me encanta llevar música en vivo a momentos especiales como bodas, graduaciones y bautizos. Con cada presentación, busco crear un ambiente inolvidable y adaptarme al estilo de cada evento.",
    genres: ["Jazz", "Blues", "Boleros"],
    experience: "2 años",
    profileImage: CarlosPP,
    galleryImages: [
      CarlosGal1,
      CarlosGal2,
      CarlosGal3,
      CarlosGal4,
    ],
    reviews: [
      {
        id: 1,
        author: "María González",
        rating: 5,
        comment: "Excelente presentación en mi boda. Todos los invitados quedaron encantados.",
        date: "15/03/2024"
      },
      {
        id: 2,
        author: "Juan Pérez",
        rating: 5,
        comment: "Muy profesional y puntual. Gran repertorio de canciones.",
        date: "10/03/2024"
      },
      {
        id: 3,
        author: "Ana Torres",
        rating: 4,
        comment: "Buena música y ambiente. Recomendado para eventos corporativos.",
        date: "01/03/2024"
      }
    ]
  };

  const navigate = useNavigate()

  const gotoBooking = () => {navigate('/booking')}
  const gotoHome = () => {navigate('/home')}
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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Return section */}
      <div className="p-4 border-b">
        <a 
          onClick={gotoHome}
          className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Regresar
        </a>
      </div>
      {/* Header Section */}
      <div className="relative h-48 bg-red-600"
      style={{
        backgroundImage: `url(${musician.coverImage || '/api/placeholder/1200/400'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute -bottom-20 left-8 flex items-end">
          <img
            src={musician.profileImage}
            alt={musician.name}
            className="w-32 h-32 mb-4 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="ml-6 mb-2 text-black">
            <h1 className="text-4xl font-bold">{musician.name}</h1>
            <p className="ml-1 text-lg">{musician.title}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-20 px-8 flex gap-4">
        <Instagram className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600" />
        <Facebook className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600" />
        <Youtube className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600" />
      </div>

      {/* Info Section */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-6 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{musician.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4" />
            <span>{musician.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            {renderStars(musician.rating)}
            <span className="text-sm">({musician.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          {musician.description}
        </p>

        {/* Genres */}
        <div className="flex gap-2 mb-8">
          {musician.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {musician.galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {musician.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Button */}
        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200">
          <button 
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center gap-2"
          onClick={gotoBooking}>
            <Clock className="w-5 h-5" />
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
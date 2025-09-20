import React, { useState, useEffect } from 'react';

function Banner() {
  const banners = [
    'https://images.unsplash.com/photo-1598899134739-0e96ff12f1da?auto=format&fit=crop&w=980&q=80',
    'https://images.unsplash.com/photo-1608897013036-0bcd1e2d5d6c?auto=format&fit=crop&w=980&q=80',
    'https://images.unsplash.com/photo-1610878180933-659aaf26cabc?auto=format&fit=crop&w=980&q=80',
    'https://images.unsplash.com/photo-1581905764498-5c1f58a8f3b2?auto=format&fit=crop&w=980&q=80',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-72 md:h-96">
        {banners.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`banner-${i}`}
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 w-4/5 h-3/4 object-cover rounded-lg ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentIndex ? 'bg-red-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;

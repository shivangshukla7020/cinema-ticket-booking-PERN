import React from 'react';
import './styles.scss';

function Banner() {
  const banners = [
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/x/e/xem_phim_web_980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-tarot-series-2-980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-digital-team-diy-980x448.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-production-team-midnite-streetfood-980x448_3.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_1__10.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_18_.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/u/du_an_phim_ngan_cj.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/u/e/uefxcgv_980x448.jpg',
  ];

  return (
    <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((url, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval={1000}>
            <img src={url} className="mx-auto d-block w-75 h-75 img-banner" alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;

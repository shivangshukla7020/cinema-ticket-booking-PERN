import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';

function Event() {
  const events = [
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/n/9/n95_240x201_1.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/h/a/happy-new-year-240x201_1.png',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/o/doreamon_web_app_240x201.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-crm-team-chi-1-duoc-2-240x201_1.jpg',
    'https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv_79k_240x201_170920.png',
  ];

  const thumbnails = [
    'https://www.cgv.vn/media/wysiwyg/packages/214x245.jpg',
    'https://www.cgv.vn/media/wysiwyg/2021/U22_WEB_496x247.jpg',
    'https://www.cgv.vn/media/wysiwyg/2021/CGV-DIGITAL-HALL-RENTAL-214x245.png',
  ];

  return (
    <div className="text-center mt-6">
      <img
        src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_event.gif"
        alt="event-header"
        className="mx-auto mb-4"
      />

      <div className="w-3/4 mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={4}
          slidesPerGroup={1}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{ clickable: true }}
          navigation={true}
        >
          {events.map((url, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <img
                src={url}
                alt={`event-${i}`}
                className="w-[240px] h-[201px] object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-3/4 mx-auto mt-6 flex gap-4">
        {thumbnails.map((thumb, i) => (
          <div key={i} className="flex-1">
            <img
              src={thumb}
              alt={`thumb-${i}`}
              className="w-full h-auto object-cover rounded-md border"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;

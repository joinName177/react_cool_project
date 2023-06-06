import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.less";
import { Image, Spin } from "antd";
import { useRequest } from "ahooks";
import { queryCarousel } from "utils/interface";

export default function SwiperComp() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { data, loading, refresh } = useRequest(() => queryCarousel());
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  function renderSlide(arr: Array<any> | any) {
    const _arr = Array.isArray(arr) ? arr : [];
    return _arr.map(({ url, uid }: any) => (
      <SwiperSlide key={uid}>
        <Image preview={false} src={url} />
      </SwiperSlide>
    ));
  }

  return (
    <Spin spinning={loading}>
      <div style={{ width: 500, height: 368 }}>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper2"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {renderSlide(data)}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {renderSlide(data)}
        </Swiper>
      </div>
    </Spin>
  );
}

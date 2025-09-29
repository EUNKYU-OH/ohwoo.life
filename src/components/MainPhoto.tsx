import React from 'react';  
import { ImageWithFallback } from './figma/ImageWithFallback';
import mainPhotoSrc from './image/JEJ_4870.JPG';

// 💡 필수: 로컬 이미지를 React/Vite 빌드 시스템으로 가져옵니다.
// './image/JEJ_4870.JPG' 경로는 MainPhoto.jsx 파일의 위치를 기준으로 합니다.
import mainPhotoSrc from './image/JEJ_4870.JPG';

export function MainPhoto() {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <ImageWithFallback
        // ✅ import한 변수를 src에 사용해야 이미지가 정상적으로 배포됩니다.
        src={mainPhotoSrc} 
        alt="메인 웨딩 사진"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white text-center">
        <h1 className="text-2xl text-white mb-2">우리, 결혼합니다</h1>
        <p className="text-sm text-white/90">2025년 09월 29일</p>
      </div>
    </div>
  );
}
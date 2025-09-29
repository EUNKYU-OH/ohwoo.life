import { ImageWithFallback } from './figma/ImageWithFallback';

export function MainPhoto() {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <ImageWithFallback
        src="./image/JEJ_4870.jpg"
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
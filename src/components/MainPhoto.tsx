import { ImageWithFallback } from './figma/ImageWithFallback';

export function MainPhoto() {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1640672246333-66c7435f1266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFuZHMlMjByaW5nc3xlbnwxfHx8fDE3NTkwMzI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
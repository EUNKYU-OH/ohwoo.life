import React, { useState } from 'react';
import { X } from 'lucide-react';
// ImageWithFallback 컴포넌트의 import 경로를 환경에 맞게 조정합니다.
// 고객님의 기존 코드를 기반으로 유지합니다.
import { ImageWithFallback } from './figma/ImageWithFallback'; 

// ⭐️ 로컬 이미지 Import (Vite/Webpack으로 Asset을 처리)
import image1 from './image/first_01.jpg';
import image2 from './image/first_02.jpg';
import image3 from './image/second_01.jpg';
import image4 from './image/second_02.jpg';
// 💡 새로운 가족 사진 Import
import familyImage from './image/family_01.jpg'; 


// 갤러리 이미지 데이터 구조를 확장하여 colSpan(열 너비) 속성을 추가합니다.
// colSpan: 1 은 기본 2열 그리드에서 1칸을 차지하며,
// colSpan: 2 는 2칸(전체 너비)을 차지합니다.
const galleryImages = [
  { src: image1, alt: "옛날 사진1", colSpan: 1 },
  { src: image2, alt: "옛날 사진2", colSpan: 1 },
  { src: image3, alt: "최근 사진1", colSpan: 1 },
  { src: image4, alt: "최근 사진2", colSpan: 1 },
  { src: "https://images.unsplash.com/photo-1676132068619-f015a54cee3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBlbGVnYW50fGVufDF8fHx8MTc1OTAzMzE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "웨딩드레스", colSpan: 1 },
  { src: "https://images.unsplash.com/photo-1555475809-0cc59e0f1a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBtYWNyb3xlbnwxfHx8fDE3NTkwMzMxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "결혼반지", colSpan: 1 },
  { src: "https://images.unsplash.com/photo-1677691257237-3294c7fd18a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmlkYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkwMzMxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "신부 초상", colSpan: 1 },
  { src: "https://images.unsplash.com/photo-1613067532651-7075a620c900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc1OTAzMzE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "웨딩 장식", colSpan: 1 },
  // 💡 마지막 가족 사진 추가: colSpan을 2로 설정
  { src: familyImage, alt: "가족 사진", colSpan: 2 } 
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-xl">Gallery</h2>
        
        {/* 그리드 컨테이너 설정 */}
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              // 💡 colSpan 값에 따라 클래스를 동적으로 적용합니다.
              className={`
                ${image.colSpan === 2 ? 'col-span-2 aspect-[4/3]' : 'col-span-1 aspect-square'} 
                overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity
              `}
              onClick={() => setSelectedImage(index)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* 이미지 모달 */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-2 z-10"
            >
              <X className="text-white" size={20} />
            </button>
            <ImageWithFallback
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
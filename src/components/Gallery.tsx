import React, { useState } from 'react';
import { X } from 'lucide-react';
// ImageWithFallback 컴포넌트의 import 경로를 환경에 맞게 조정합니다.
import { ImageWithFallback } from './figma/ImageWithFallback'; 

// ⭐️ 로컬 이미지 Import (Vite/Webpack으로 Asset을 처리)
import image2 from './image/first_02.jpg';
import image1 from './image/first_01.jpg';
import image3 from './image/second_01.jpg';
import image4 from './image/second_02.jpg';
// ⭐️ 웨딩사진 Import (Vite/Webpack으로 Asset을 처리)
import image5 from './image/JEJ_5338.jpg';
import image6 from './image/JEJ_5370.jpg';
import image7 from './image/JMD00086.jpg';
import image8 from './image/JMD00234.jpg';
// 💡 새로운 가족 사진 Import
import familyImage from './image/family_01.jpg'; 


// 갤러리 이미지 데이터 구조를 확장하여 colSpan(열 너비) 속성을 추가합니다.
const galleryImages = [
  { src: image1, alt: "옛날 사진1", colSpan: 1 },
  { src: image2, alt: "옛날 사진2", colSpan: 1 },
  { src: image3, alt: "최근 사진1", colSpan: 1 },
  { src: image4, alt: "최근 사진2", colSpan: 1 },
  { src: image5, alt: "웨딩 사진1", colSpan: 1 },
  { src: image6, alt: "웨딩 사진2", colSpan: 1 },
  { src: image7, alt: "웨딩 사진3", colSpan: 1 },
  { src: image8, alt: "웨딩 사진4", colSpan: 1 },
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
                ${image.colSpan === 2 
                  // 💡 2열 차지 + 3175/2461 비율 적용 (약 1.29:1) + object-contain을 사용해 이미지가 잘리지 않게 함
                  ? 'col-span-2 aspect-[129/100] p-1' 
                  : 'col-span-1 aspect-square'
                } 
                overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity
              `}
              onClick={() => setSelectedImage(index)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                // 💡 colSpan=2 인 경우 object-contain을 사용해 이미지가 잘리지 않고 프레임에 맞춰 들어갑니다.
                className={`w-full h-full ${image.colSpan === 2 ? 'object-contain' : 'object-cover'}`}
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
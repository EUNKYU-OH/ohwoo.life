import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback'; 

// ⭐️ 로컬 이미지 Import
import image2 from './image/first_02.jpg';
import image1 from './image/first_01.jpg';
import image3 from './image/second_01.jpg';
import image4 from './image/second_02.jpg';
// ⭐️ 웨딩사진 Import
import image5 from './image/JEJ_5338.jpg';
import image6 from './image/JEJ_5370.jpg';
import image7 from './image/JMD00086.jpg';
import image8 from './image/JMD00234.jpg';
// 💡 가족 사진 Import
import familyImage1 from './image/family_01.jpg'; 
import familyImage2 from './image/family_02.jpg'; 

// 갤러리 이미지 리스트
const galleryImages = [
  { src: image2, alt: "옛날 사진2" },
  { src: image1, alt: "옛날 사진1" },
  { src: image3, alt: "최근 사진1" },
  { src: image4, alt: "최근 사진2" },
  { src: image5, alt: "웨딩 사진1" },
  { src: image6, alt: "웨딩 사진2" },
  { src: image7, alt: "웨딩 사진3" },
  { src: image8, alt: "웨딩 사진4" },
  { src: familyImage1, alt: "가족 사진1" },
  { src: familyImage2, alt: "가족 사진2" }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-xl">Gallery</h2>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="col-span-1 aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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

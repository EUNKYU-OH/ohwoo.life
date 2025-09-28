import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFuZHMlMjByaW5nc3xlbnwxfHx8fDE3NTkwMzI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "커플 사진 1"
  },
  {
    src: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXQlMjBlbGVnYW50fGVufDF8fHx8MTc1OTAzMjg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "꽃다발"
  },
  {
    src: "https://images.unsplash.com/photo-1740688055196-a836abca5518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjByb21hbnRpY3xlbnwxfHx8fDE3NTkwMzI4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "웨딩 세레모니"
  },
  {
    src: "https://images.unsplash.com/photo-1641938567172-7cc5f67e5d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwc3Vuc2V0fGVufDF8fHx8MTc1OTAzMjg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "석양 속 커플"
  },
  {
    src: "https://images.unsplash.com/photo-1676132068619-f015a54cee3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBlbGVnYW50fGVufDF8fHx8MTc1OTAzMzE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "웨딩드레스"
  },
  {
    src: "https://images.unsplash.com/photo-1555475809-0cc59e0f1a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBtYWNyb3xlbnwxfHx8fDE3NTkwMzMxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "결혼반지"
  },
  {
    src: "https://images.unsplash.com/photo-1677691257237-3294c7fd18a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkwMzMxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "신부 초상"
  },
  {
    src: "https://images.unsplash.com/photo-1613067532651-7075a620c900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc1OTAzMzE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "웨딩 장식"
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-xl">Gallery</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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
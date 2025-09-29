import { Heart } from 'lucide-react';

export function Storytelling() {
  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-8">
        <h2 className="text-xl flex items-center justify-center space-x-2">
          <Heart className="text-red-500" size={20} />
          <span>Our Story</span>
          <Heart className="text-red-500" size={20} />
        </h2>
        
        <div className="space-y-8">
          {/* 첫 만남 */}
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary">💕</span>
            </div>
            <h3 className="text-lg text-primary">첫 만남</h3>
            <p className="text-muted-foreground leading-relaxed">
              2015년 26, 24살 요가를 수련하며<br />
              함께 알게 된 누나 동생 사이가<br />
              아직 어른이 되기 전에 연인이 되어<br />
              행복한 2년 철없이 사랑하다<br />
              사회에 나와 자리를 잡으며 서로를 놓쳤습니다.<br />
            </p>
          </div>
          
          {/* 재회 */}
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary">🌟</span>
            </div>
            <h3 className="text-lg text-primary">운명의 재회</h3>
            <p className="text-muted-foreground leading-relaxed">
              서로가 없는 시간 속에 <br />
              정말 중요한 것이 무엇인지 알게 됐고<br />
              10년만인 36, 34살에 하늘이 저희를 다시 만나게 해줬습니다.<br />
            </p>
          </div>
          
          {/* 평생의 약속 */}
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary">💍</span>
            </div>
            <h3 className="text-lg text-primary">평생의 약속</h3>
            <p className="text-muted-foreground leading-relaxed">
              둘이 함께일 때 더욱 성장하며<br />
              같이 있을 때 가장 나다운 모습으로 즐겁고<br />
              서로 다른 모습에서 행복을 느끼는<br />
              이제는 누나, 동생, 여친, 남친이 아닌<br />
              아내, 남편, 가족이라는 이름으로<br />
              평생을 함께 하고자 합니다.<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
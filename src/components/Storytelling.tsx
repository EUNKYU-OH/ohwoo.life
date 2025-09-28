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
              2015년 요가를 수련하며<br />
              처음 만났습니다.<br />
              blabla<br />
              blabla
            </p>
          </div>
          
          {/* 재회 */}
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary">🌟</span>
            </div>
            <h3 className="text-lg text-primary">운명의 재회</h3>
            <p className="text-muted-foreground leading-relaxed">
              10년만에 하늘이 저희를 다시 만나게 해줬습니다.<br />
              blabla<br />
              blabla<br />
              blabla
            </p>
          </div>
          
          {/* 평생의 약속 */}
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-primary">💍</span>
            </div>
            <h3 className="text-lg text-primary">평생의 약속</h3>
            <p className="text-muted-foreground leading-relaxed">
              서로를 더 깊이 알아가며<br />
              함께하는 시간이 소중해졌습니다.<br />
              이제 평생을 함께 걸어가고자<br />
              약속을 나누려 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Calendar, Clock, MapPin } from 'lucide-react';

export function WeddingDate() {
  return (
    <div className="py-8 px-6 bg-secondary/30">
      <div className="text-center space-y-6">
        <h2 className="text-xl">Wedding Day</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Calendar size={20} />
            <span className="text-lg">2025년 09월 29일 월요일</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MapPin size={18} />
            <span>대전에서 태어났지만 서울에서</span>
          </div>
        
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span> 오랜 대화 끝에, 결혼식 대신 <br />
          조용히 새로운 출발을 하기로 했습니다.<br />
          직접 초대하여 인사드리지 못함을 <br />
          너그러이 이해해 주시길 바라며,<br />
          이 소식을 전할 수 있음에 깊이 감사드립니다.<br /></span>
          </div>
        </div>
        
        {/* 달력 */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-7 gap-1 text-sm">
            {/* 요일 헤더 */}
            <div className="text-center text-muted-foreground py-2">일</div>
            <div className="text-center text-muted-foreground py-2">월</div>
            <div className="text-center text-muted-foreground py-2">화</div>
            <div className="text-center text-muted-foreground py-2">수</div>
            <div className="text-center text-muted-foreground py-2">목</div>
            <div className="text-center text-muted-foreground py-2">금</div>
            <div className="text-center text-muted-foreground py-2">토</div>

            {/* 9월 1일이 월요일이므로, 첫 번째 일요일은 비움 */}
            <div className="text-center py-2 text-muted-foreground"></div>

            {/* 1 ~ 7 */}
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="text-center py-2">{day}</div>
            ))}

            {/* 8 ~ 14 */}
            {[8, 9, 10, 11, 12, 13, 14].map((day) => (
              <div key={day} className="text-center py-2">{day}</div>
            ))}

            {/* 15 ~ 21 */}
            {[15, 16, 17, 18, 19, 20, 21].map((day) => (
              <div key={day} className="text-center py-2">{day}</div>
            ))}

            {/* 22 ~ 28 */}
            {[22, 23, 24, 25, 26, 27, 28].map((day) => (
              <div key={day} className="text-center py-2">{day}</div>
            ))}

            {/* 29 (강조), 30 */}
            <div className="text-center py-2 bg-primary text-primary-foreground rounded-full">29</div>
            <div className="text-center py-2">30</div>
          </div>
        </div>
      </div>
    </div>
  );
}

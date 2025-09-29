export function CoupleInfo() {
  return (
    <div className="py-8 px-6 text-center">
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-8">
          {/* 신랑 */}
          <div className="space-y-2">
            <h3 className="text-lg">오씨네</h3>
            <h2 className="text-xl text-primary">오은규</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>아버지 오재환</p>
              <p>어머니 임충화</p>
              <p>의 아들</p>
            </div>
          </div>
          
          {/* 신부 */}
          <div className="space-y-2">
            <h3 className="text-lg">우씨네</h3>
            <h2 className="text-xl text-primary">우현지</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>아버지 우광제</p>
              <p>어머니 권은미</p>
              <p>의 딸</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <p className="text-center text-muted-foreground leading-relaxed">
          서로 다른 삶을 살아온 두 사람이<br />
          하나의 사랑으로 만나<br />
          평생을 함께 하고자 합니다.<br />
        </p>
      </div>
    </div>
  );
}
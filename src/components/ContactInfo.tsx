import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

export function ContactInfo() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSMS = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-xl">연락처</h2>
        
        <div className="space-y-6">
          {/* 신랑 연락처 */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#f3f0ff' }}>
            <h3 className="text-lg mb-3">신랑측</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">신랑 오은규</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-7165-5423')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-7165-5423')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">아버지 오재환</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-4627-5423')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-4627-5423')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">어머니 임충화</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-3457-4323')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-3457-4323')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 신부 연락처 */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#ebe5d8' }}>
            <h3 className="text-lg mb-3">신부측</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">신부 우현지</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-7932-9987')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-7932-9987')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">아버지 우광제</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-3458-8353')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-3458-8353')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">어머니 권은미</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall('010-4407-7397')}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    전화
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSMS('010-4407-7397')}
                    className="flex-1"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    문자
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          <p>감사합니다 💕</p>
        </div>
      </div>
    </div>
  );
}
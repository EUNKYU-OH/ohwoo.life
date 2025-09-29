import React, { useState } from 'react';
// lucide-react 아이콘 사용
import { MessageSquare, CreditCard, Clipboard, X } from 'lucide-react';
// Phone 아이콘은 제거됨

// ------------------------------------
// UI 유틸리티 컴포넌트 (외부 의존성 없이 내부 정의)
// ------------------------------------

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

// Custom Button Component (Tailwind CSS 기반)
const Button: React.FC<ButtonProps> = ({ 
  size = 'md', 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}) => {
  let sizeClasses = 'h-10 px-4 py-2';
  if (size === 'sm') sizeClasses = 'h-8 px-3 text-sm';
  if (size === 'lg') sizeClasses = 'h-12 px-6 text-lg';

  let variantClasses = 'bg-gray-900 text-white hover:bg-gray-800'; // default
  if (variant === 'outline') variantClasses = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100';
  if (variant === 'ghost') variantClasses = 'hover:bg-gray-100 text-gray-900';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${sizeClasses} ${variantClasses} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};


// ------------------------------------
// 1. 계좌 정보 데이터 정의
// ------------------------------------
interface Account {
  name: string;
  bank: string;
  number: string;
  isGroomSide: boolean; // 신랑/신부 측 구분
}

const accounts: Account[] = [
  // 신랑측 계좌 정보 (더미 데이터)
  { name: '신랑 오은규', bank: '카카오뱅크', number: '3333-01-1234567', isGroomSide: true },
  { name: '아버지 오재환', bank: '국민은행', number: '123456-02-789012', isGroomSide: true },
  { name: '어머니 임충화', bank: '신한은행', number: '110-345-678901', isGroomSide: true },
  // 신부측 계좌 정보 (더미 데이터)
  { name: '신부 우현지', bank: '우리은행', number: '1002-543-210987', isGroomSide: false },
  { name: '아버지 우광제', bank: '농협', number: '302-0000-1234-01', isGroomSide: false },
  { name: '어머니 권은미', bank: '하나은행', number: '999-888888-77777', isGroomSide: false },
];

// ------------------------------------
// 2. 계좌번호 복사 유틸리티 및 Toast
// ------------------------------------
// Custom Toast/Notification Function (alert 대체)
const showToast = (message: string, isError: boolean = false) => {
  console.log(message);
  const toastId = 'custom-toast-message';
  let toastEl = document.getElementById(toastId);

  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = "fixed bottom-5 left-1/2 -translate-x-1/2 p-3 rounded-lg shadow-lg text-sm text-white transition-opacity duration-300 z-[9999]";
    document.body.appendChild(toastEl);
  }

  // Fade out existing message quickly
  toastEl.style.opacity = '0';
  
  setTimeout(() => {
    toastEl!.textContent = message;
    // 신랑/신부 색상에 맞춘 토스트 색상
    toastEl!.style.backgroundColor = isError ? '#ef4444' : '#6366f1'; // red-500 or indigo-500
    toastEl!.style.transition = 'opacity 0.3s';
    toastEl!.style.opacity = '1';

    // 메시지 후 2초 뒤 사라짐
    setTimeout(() => {
      if (toastEl) {
        toastEl.style.opacity = '0';
      }
    }, 2000);
  }, 300); // Wait for fade out
};


const copyToClipboard = (text: string, name: string) => {
  // 계좌번호에 하이픈이 포함되어 있다면 복사 시 제거합니다.
  const rawText = text.replace(/-/g, '').trim(); 
  
  // document.execCommand('copy')를 사용하여 iFrame 환경 복사를 지원
  const el = document.createElement('textarea');
  el.value = rawText;
  
  // 요소 숨기고 추가
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  
  el.focus();
  el.select();
  el.setSelectionRange(0, 99999); // 모바일 대응
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast(`${name}님의 계좌번호 (${rawText})가 복사되었습니다!`);
    } else {
      showToast('복사에 실패했습니다.', true);
    }
  } catch (err) {
    showToast('복사 기능이 지원되지 않는 브라우저입니다.', true);
  }
  document.body.removeChild(el);
};


// ------------------------------------
// 5. AccountCard 컴포넌트 (개별 계좌 정보 표시 및 복사 기능)
//    - 이름, 은행명, 계좌번호 명시 및 전용 복사 버튼 포함
// ------------------------------------
interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  return (
    <div 
      className="border border-gray-200 p-3 rounded-lg flex items-center justify-between bg-white shadow-sm transition-shadow duration-150"
    >
      
      <div className="flex-1 min-w-0 pr-3">
        {/* 이름 (Name) 및 은행명 (Bank Name) */}
        <p className="font-semibold text-base mb-0.5 truncate text-gray-800">{account.name} ({account.bank})</p>
        {/* 계좌번호 (Account Number) 강조 */}
        <p className="text-sm text-indigo-600 font-bold truncate">{account.number}</p>
      </div>

      {/* 복사 버튼: 계좌번호 옆에 배치 */}
      <button 
        className="flex-shrink-0 p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => copyToClipboard(account.number, account.name)}
        aria-label={`${account.name} 계좌번호 복사`} // 접근성 향상
      >
        <Clipboard size={16} />
      </button>
    </div>
  );
};


// ------------------------------------
// 4. AccountModal 컴포넌트
// ------------------------------------
interface AccountModalProps {
  side: 'groom' | 'bride';
  accounts: Account[];
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ side, accounts, onClose }) => {
  const isGroom = side === 'groom';
  // 해당 측 계좌만 필터링
  const filteredAccounts = accounts.filter(acc => acc.isGroomSide === isGroom);
  
  const headerColor = isGroom ? 'text-indigo-800' : 'text-[#a37c35]'; // 신랑/신부 색상 구분

  return (
    // 모달 배경 및 중앙 정렬
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // 배경 클릭 시 모달 닫기
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`
        bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm 
        transform transition-all duration-300
      `}>
        <div className="flex justify-between items-start mb-5 pb-2 border-b">
          <h3 className={`text-xl font-bold ${headerColor}`}>
            {isGroom ? '신랑측' : '신부측'} 마음 전하실 곳
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {/* 필터링된 해당 측 계좌만 표시 */}
          {filteredAccounts.map((account, index) => (
            <AccountCard key={index} account={account} />
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
            <p className="text-gray-600 font-medium">
              복사 버튼을 누르면 계좌번호가 <span className="text-indigo-600">자동으로 복사</span>됩니다.
            </p>
        </div>

      </div>
    </div>
  );
};


// ------------------------------------
// 3. 메인 ContactInfo 컴포넌트
// ------------------------------------
export function ContactInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSide, setModalSide] = useState<'groom' | 'bride' | null>(null);

  const openAccountModal = (side: 'groom' | 'bride') => {
    setModalSide(side);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalSide(null);
  };

  // 문자(SMS) 기능만 유지
  const handleSMS = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  // 신부 연락처 
  const brideContacts = [
    { name: '신부 우현지', phone: '010-7932-9987' },
    { name: '아버지 우광제', phone: '010-3458-8353' },
    { name: '어머니 권은미', phone: '010-4407-7397' },
  ];
  
  // 신랑 연락처 
  const groomContacts = [
    { name: '신랑 오은규', phone: '010-7165-5423' },
    { name: '아버지 오재환', phone: '010-1234-5678' }, 
    { name: '어머니 임충화', phone: '010-8765-4321' }, 
  ];


  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold mb-6">연락처 및 마음 전하실 곳</h2>
        
        <div className="space-y-6">
          
          {/* 신랑측 영역 */}
          <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: '#f3f0ff' }}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">신랑측</h3>
            
            <div className="space-y-4">
              {/* 신랑측 모든 연락처 목록 */}
              {groomContacts.map((contact, index) => (
                <div key={index} className="space-y-2 p-2 border-b border-indigo-200">
                  <p className="text-sm text-indigo-700 font-medium">{contact.name}</p>
                  <div className="flex space-x-2">
                    
                    {/* LEFT BUTTON: 마음 전하실 곳 (계좌 모달 열기) */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openAccountModal('groom')} // 신랑측 계좌 모달 열기
                      className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                    >
                      <CreditCard size={14} className="mr-1" />
                      마음 전하실 곳
                    </Button>
                    
                    {/* RIGHT BUTTON: 문자 (기존 유지) */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSMS(contact.phone)}
                      className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      문자
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 신부측 영역 */}
          <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: '#ebe5d8' }}>
            <h3 className="text-xl font-semibold mb-4 text-[#a37c35]">신부측</h3>
            
            <div className="space-y-4">
              {/* 신부측 모든 연락처 목록 */}
              {brideContacts.map((contact, index) => (
                <div key={index} className="space-y-2 p-2 border-b border-[#d8c7ac]">
                  <p className="text-sm text-[#a37c35] font-medium">{contact.name}</p>
                  <div className="flex space-x-2">
                    
                    {/* LEFT BUTTON: 마음 전하실 곳 (계좌 모달 열기) */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openAccountModal('bride')} // 신부측 계좌 모달 열기
                      className="flex-1 bg-white hover:bg-[#fcf9f4] text-[#a37c35] border-[#d8c7ac]"
                    >
                      <CreditCard size={14} className="mr-1" />
                      마음 전하실 곳
                    </Button>
                    
                    {/* RIGHT BUTTON: 문자 (기존 유지) */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSMS(contact.phone)}
                      className="flex-1 bg-white hover:bg-[#fcf9f4] text-[#a37c35] border-[#d8c7ac]"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      문자
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 pt-6 border-t mt-6">
          <p className="text-lg font-medium text-gray-700">감사합니다 💕</p>
        </div>
      </div>

      {/* 계좌 정보 모달 팝업 렌더링 */}
      {isModalOpen && modalSide && (
        <AccountModal 
          side={modalSide} 
          accounts={accounts} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

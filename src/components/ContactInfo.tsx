import React, { useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom'; // 모달 렌더링을 위해 ReactDOM의 createPortal 사용
import { MessageSquare, CreditCard, Clipboard, X } from 'lucide-react';

// ------------------------------------
// UI 유틸리티 컴포넌트 (Button)
// ------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

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

  let variantClasses = 'bg-gray-900 text-white hover:bg-gray-800';
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
// 1. 계좌 정보 데이터 및 타입 정의
// ------------------------------------
interface Account {
  name: string;
  bank: string;
  number: string;
  isGroomSide: boolean;
}

const accounts: Account[] = [
  { name: '신랑 오은규', bank: '신한은행', number: '110 326 225187', isGroomSide: true },
  { name: '아버지 오재환', bank: '농협은행', number: '471 02 174262', isGroomSide: true },
  { name: '어머니 임충화', bank: '농협은행', number: '453141 56 047210', isGroomSide: true },
  { name: '신부 우현지', bank: '하나은행', number: '605 910266 33307', isGroomSide: false },
  { name: '아버지 우광제', bank: '농협은행', number: '302 144 580 7411', isGroomSide: false },
  { name: '어머니 권은미', bank: '하나은행', number: '623 094320 00307', isGroomSide: false },
];

// ------------------------------------
// 2. 계좌번호 복사 유틸리티 및 Toast
// ------------------------------------
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

  toastEl.style.opacity = '0';
  
  setTimeout(() => {
    toastEl!.textContent = message;
    toastEl!.style.backgroundColor = isError ? '#ef4444' : '#6366f1';
    toastEl!.style.transition = 'opacity 0.3s';
    toastEl!.style.opacity = '1';

    setTimeout(() => {
      if (toastEl) {
        toastEl.style.opacity = '0';
      }
    }, 2000);
  }, 300);
};

const copyToClipboard = (text: string, name: string) => {
  const rawText = text.replace(/ /g, '').replace(/-/g, '').trim(); 
  const el = document.createElement('textarea');
  el.value = rawText;
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  
  el.focus();
  el.select();
  el.setSelectionRange(0, 99999);
  
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
// 4. AccountModal (수정된 모달 컴포넌트)
// ------------------------------------
interface AccountModalProps {
  selectedAccounts: Account[];
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ selectedAccounts, onClose }) => {
  if (selectedAccounts.length === 0) return null;

  const firstAccount = selectedAccounts[0];
  const isGroom = firstAccount.isGroomSide;

  // 신랑/신부 측 색상 및 텍스트 정의
  const headerColor = isGroom ? 'text-indigo-800' : 'text-[#a37c35]';
  const headerTitle = `${firstAccount.name}님께 마음 전하실 곳`;
  const btnColor = isGroom ? 'text-indigo-600' : 'text-[#a37c35]';
  const btnHoverColor = isGroom ? 'hover:bg-indigo-50' : 'hover:bg-[#fcf5ec]';

  // ✅ 모달 본체 UI (배경 불투명도 및 z-index 수정)
  const modalContent = (
    <div
      // FIXED: 배경 불투명도를 bg-black/75로 높여 뒷배경을 확실히 어둡게 처리했습니다.
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      onClick={(e) => {
        // 배경 클릭 시 닫기
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all duration-300 z-50"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 배경 클릭 이벤트 방지
      >
        <div className="flex justify-between items-start mb-5 pb-2 border-b">
          <h3 className={`text-xl font-bold ${headerColor}`}>{headerTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors p-1"
            aria-label="모달 닫기"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {selectedAccounts.map((account, index) => (
            <div
              key={index}
              className="border border-gray-200 p-3 rounded-lg bg-gray-50 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">{account.bank} <span className="text-sm font-normal text-gray-600">({account.name})</span></p>
                <p className="text-lg font-bold text-indigo-600">{account.number}</p>
              </div>
              <button 
                className={`flex-shrink-0 p-2 rounded-lg bg-white border border-gray-300 ${btnColor} ${btnHoverColor} transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={() => copyToClipboard(account.number, account.name)}
                aria-label={`${account.name} 계좌번호 복사`}
              >
                <Clipboard size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
          <p className="text-gray-600 font-medium">
            복사 버튼을 누르면 계좌번호가 <span className="text-indigo-600 font-bold">자동으로 복사</span>됩니다.
          </p>
        </div>
      </div>
    </div>
  );

  // body에 바로 렌더링
  return createPortal(modalContent, document.body);
};


// ------------------------------------
// 3. 메인 App 컴포넌트
// ------------------------------------
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);

  const openAccountModal = useCallback((contactName: string) => {
    const targetAccounts = accounts.filter(acc => acc.name === contactName);

    if (targetAccounts.length > 0) {
      setSelectedAccounts(targetAccounts);
      setIsModalOpen(true);
    } else {
      showToast('해당 계좌 정보를 찾을 수 없습니다.', true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAccounts([]);
  }, []);

  const handleSMS = (phone: string) => {
    // 폰 번호에서 '-' 제거 후 SMS 앱 실행
    const rawPhone = phone.replace(/-/g, '').trim();
    window.location.href = `sms:${rawPhone}`;
  };

  const brideContacts = useMemo(() => [
    { name: '신부 우현지', phone: '010-7932-9987' },
    { name: '아버지 우광제', phone: '010-3458-8353' },
    { name: '어머니 권은미', phone: '010-4407-7397' },
  ], []);
  
  const groomContacts = useMemo(() => [
    { name: '신랑 오은규', phone: '010-7165-5423' },
    { name: '아버지 오재환', phone: '010-4607-5423' }, 
    { name: '어머니 임충화', phone: '010-3457-4323' }, 
  ], []);

  // 신부측 색상: #a37c35 (짙은 청동색 느낌), 배경: #ebe5d8 (밝은 베이지/돌 색)
  const brideColor = 'text-[#a37c35]';
  const groomColor = 'text-indigo-600';

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-b-lg">
        <div className="py-8 px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">연락처 및 마음 전하실 곳</h2>
            
            <div className="space-y-8">
              {/* 신랑측 */}
              <div className="rounded-2xl p-6 shadow-xl border border-indigo-100" style={{ backgroundColor: '#f3f0ff' }}>
                <h3 className="text-2xl font-bold mb-4 text-indigo-800 border-b pb-2 border-indigo-200">🤵 신랑측</h3>
                <div className="space-y-4">
                  {groomContacts.map((contact, index) => (
                    <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <p className={`text-base font-semibold w-full sm:w-28 flex items-center ${groomColor}`}>{contact.name}</p>
                      <div className="flex space-x-2 w-full">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openAccountModal(contact.name)}
                          className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-300 font-medium shadow-sm"
                        >
                          <CreditCard size={14} className="mr-1" />
                          마음 전하실 곳
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSMS(contact.phone)}
                          className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-300 font-medium shadow-sm"
                        >
                          <MessageSquare size={14} className="mr-1" />
                          문자
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 신부측 */}
              <div className="rounded-2xl p-6 shadow-xl border border-[#d8c7ac]" style={{ backgroundColor: '#ebe5d8' }}>
                <h3 className="text-2xl font-bold mb-4 text-[#a37c35] border-b pb-2 border-[#d8c7ac]">👰 신부측</h3>
                <div className="space-y-4">
                  {brideContacts.map((contact, index) => (
                    <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <p className={`text-base font-semibold w-full sm:w-28 flex items-center ${brideColor}`}>{contact.name}</p>
                      <div className="flex space-x-2 w-full">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openAccountModal(contact.name)}
                          className="flex-1 bg-[#fcf9f4] hover:bg-[#fcf5ec] text-[#a37c35] border-[#d8c7ac] font-medium shadow-sm"
                        >
                          <CreditCard size={14} className="mr-1" />
                          마음 전하실 곳
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSMS(contact.phone)}
                          className="flex-1 bg-[#fcf9f4] hover:bg-[#fcf5ec] text-[#a37c35] border-[#d8c7ac] font-medium shadow-sm"
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
            
            <div className="text-center text-xs text-gray-500 pt-6 border-t mt-8 border-gray-100">
              <p className="text-xl font-medium text-gray-700">오셔서 축복해 주시면 감사하겠습니다 💕</p>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && selectedAccounts.length > 0 && (
        <AccountModal 
          selectedAccounts={selectedAccounts} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

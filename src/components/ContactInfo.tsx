import React, { useState } from 'react';
// lucide-react 아이콘 사용
import { MessageSquare, CreditCard, Clipboard, X } from 'lucide-react';

// ------------------------------------
// UI 유틸리티 컴포넌트
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
// 1. 계좌 정보 데이터 정의
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
  const rawText = text.replace(/-/g, '').trim(); 
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
// 5. AccountCard
// ------------------------------------
interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const color = account.isGroomSide ? 'indigo' : '[#a37c35]'; 
  const hoverColor = account.isGroomSide ? 'indigo-100' : 'stone-100';

  return (
    <div className="border border-gray-200 p-3 rounded-lg flex items-center justify-between bg-white shadow-sm transition-shadow duration-150">
      <div className="flex-1 min-w-0 pr-3">
        <p className="font-semibold text-base mb-0.5 truncate text-gray-800">{account.name} ({account.bank})</p>
        <p className={`text-sm text-${color}-600 font-bold truncate`}>{account.number}</p>
      </div>
      <button 
        className={`flex-shrink-0 p-2 rounded-lg bg-${color}-50 text-${color}-600 hover:bg-${hoverColor} transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
        onClick={() => copyToClipboard(account.number, account.name)}
        aria-label={`${account.name} 계좌번호 복사`}
      >
        <Clipboard size={16} />
      </button>
    </div>
  );
};

// ------------------------------------
// 4. AccountModal
// ------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

interface Account {
  name: string;
  bank: string;
  number: string;
  isGroomSide: boolean;
}

interface AccountModalProps {
  selectedAccounts: Account[];
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ selectedAccounts, onClose }) => {
  if (selectedAccounts.length === 0) return null;

  const firstAccount = selectedAccounts[0];
  const isGroom = firstAccount.isGroomSide;
  const contactName = firstAccount.name;

  const headerColor = isGroom ? 'text-indigo-800' : 'text-[#a37c35]';
  const headerTitle = `${contactName}님께 마음 전하실 곳`;

  // ✅ 모달 본체 UI
  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all duration-300">
        <div className="flex justify-between items-start mb-5 pb-2 border-b">
          <h3 className={`text-xl font-bold ${headerColor}`}>{headerTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {selectedAccounts.map((account, index) => (
            <div
              key={index}
              className="border border-gray-200 p-3 rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">{account.bank} {account.number}</p>
              <p className="text-sm text-gray-600">{account.name}</p>
            </div>
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

  // ✅ body에 바로 렌더링
  return ReactDOM.createPortal(modalContent, document.body);
};

export default AccountModal;


// ------------------------------------
// 3. 메인 ContactInfo
// ------------------------------------
export function ContactInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);

  const openAccountModal = (contactName: string) => {
    const targetAccounts = accounts.filter(acc => acc.name === contactName);

    if (targetAccounts.length > 0) {
      setSelectedAccounts(targetAccounts);
      setIsModalOpen(true);
    } else {
      showToast('해당 계좌 정보를 찾을 수 없습니다.', true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccounts([]);
  };

  const handleSMS = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  const brideContacts = [
    { name: '신부 우현지', phone: '010-7932-9987' },
    { name: '아버지 우광제', phone: '010-3458-8353' },
    { name: '어머니 권은미', phone: '010-4407-7397' },
  ];
  
  const groomContacts = [
    { name: '신랑 오은규', phone: '010-7165-5423' },
    { name: '아버지 오재환', phone: '010-4607-5423' }, 
    { name: '어머니 임충화', phone: '010-3457-4323' }, 
  ];

  return (
    <div className="py-8 px-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold mb-6">연락처 및 마음 전하실 곳</h2>
        
        <div className="space-y-6">
          {/* 신랑측 */}
          <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: '#f3f0ff' }}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">신랑측</h3>
            <div className="space-y-4">
              {groomContacts.map((contact, index) => (
                <div key={index} className="space-y-2 p-2 border-b border-indigo-200">
                  <p className="text-sm text-indigo-700 font-medium">{contact.name}</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openAccountModal(contact.name)}
                      className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                    >
                      <CreditCard size={14} className="mr-1" />
                      마음 전하실 곳
                    </Button>
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
          
          {/* 신부측 */}
          <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: '#ebe5d8' }}>
            <h3 className="text-xl font-semibold mb-4 text-[#a37c35]">신부측</h3>
            <div className="space-y-4">
              {brideContacts.map((contact, index) => (
                <div key={index} className="space-y-2 p-2 border-b border-[#d8c7ac]">
                  <p className="text-sm text-[#a37c35] font-medium">{contact.name}</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openAccountModal(contact.name)}
                      className="flex-1 bg-white hover:bg-[#fcf9f4] text-[#a37c35] border-[#d8c7ac]"
                    >
                      <CreditCard size={14} className="mr-1" />
                      마음 전하실 곳
                    </Button>
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

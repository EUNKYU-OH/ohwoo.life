import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Heart, MessageCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

// ⭐️ Firestore 관련 모듈 Import
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  onSnapshot,
  serverTimestamp,
  QueryDocumentSnapshot,
  Timestamp 
} from 'firebase/firestore';

// --- 상수 및 설정 ---
const ENTRIES_PER_PAGE = 5; // 한 페이지당 표시할 메시지 수
const PAGE_RANGE = 2; // 현재 페이지 주변으로 표시할 페이지 번호 범위 (총 2*2 + 1 = 5개 표시)

// --- 데이터 구조 정의 ---
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  rawTimestamp: Timestamp; 
}

// --- Firebase 초기화 및 인증 로직 (VITE 환경 변수 사용) ---
// Cloudflare Pages에 설정한 VITE 환경 변수를 직접 읽어 Firebase Config 객체 생성
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// VITE_APP_ID를 Firestore 경로에 사용 (설정 필수)
const appId = import.meta.env.VITE_APP_ID || firebaseConfig.projectId || 'default-app-id';
// Config 필수 항목이 로드되었는지 확인
const isConfigLoaded = !!firebaseConfig.apiKey && !!firebaseConfig.projectId; 

let db: ReturnType<typeof getFirestore> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (isConfigLoaded) {
  try {
    // Config가 존재할 때만 Firebase 초기화
    const app = initializeApp(firebaseConfig as any); 
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (e) {
      console.error("Firebase Initialization Error:", e);
  }
}

// Firestore 스냅샷 데이터를 앱에서 사용 가능한 형식으로 변환하는 헬퍼 함수
const snapshotToEntry = (doc: QueryDocumentSnapshot): GuestbookEntry => {
    const data = doc.data();
    // Firestore Timestamp 필드가 없거나 유효하지 않을 경우, 현재 시간으로 대체합니다.
    const rawTimestamp: Timestamp = data.timestamp instanceof Timestamp ? data.timestamp : Timestamp.now();
    
    // 한국 시간 형식으로 포맷합니다.
    const displayDate = rawTimestamp.toDate().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return {
        id: doc.id,
        name: data.name || '익명',
        message: data.message || '메시지 없음',
        timestamp: displayDate,
        rawTimestamp: rawTimestamp,
    };
};


export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // --- 페이지네이션 상태 ---
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);

  // --- 1. 인증 및 데이터 리스너 설정 ---
  useEffect(() => {
    // Firebase 설정 로드 실패 시 에러 표시
    if (!db || !auth) {
      setSubmitError("Firebase 환경 변수 설정 오류. Cloudflare Pages 설정을 확인하세요.");
      setLoading(false);
      return;
    }

    const authenticateAndListen = async () => {
      try {
        // 익명 인증 시도
        await signInAnonymously(auth!);
        setIsAuthenticated(true);
        setSubmitError(null); 
        
        // Firestore 데이터 구독 시작
        // 경로: /artifacts/{appId}/public/data/guestbook
        const collectionPath = `artifacts/${appId}/public/data/guestbook`;
        const guestbookCollection = collection(db!, collectionPath);
        // 최신순 정렬 (timestamp 기준)
        const q = query(guestbookCollection, orderBy('timestamp', 'desc')); 
        
        // 실시간 스냅샷 리스너
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedEntries: GuestbookEntry[] = [];
          
          snapshot.forEach(doc => {
            fetchedEntries.push(snapshotToEntry(doc));
          });
          
          setEntries(fetchedEntries);
          setLoading(false);
          
          // 데이터가 줄어들었을 때(삭제 등) 현재 페이지를 벗어나지 않도록 조정
          const newTotalPages = Math.ceil(fetchedEntries.length / ENTRIES_PER_PAGE);
          if (currentPage > newTotalPages && newTotalPages > 0) {
              setCurrentPage(newTotalPages);
          } else if (newTotalPages === 0) {
              setCurrentPage(1);
          }
        }, (error) => {
            console.error("Firestore Data Load Error:", error);
            setSubmitError("방명록 데이터를 불러오는 중 오류가 발생했습니다. (보안 규칙 확인)");
            setLoading(false);
        });

        return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제

      } catch (error) {
        console.error("Authentication Failed:", error);
        setSubmitError("사용자 인증에 실패하여 방명록을 사용할 수 없습니다. (Firebase Auth 활성화 확인 필요)");
        setLoading(false);
      }
    };
    
    authenticateAndListen();
  }, [db, auth, appId, currentPage]); // currentPage가 변경되어도 재구독하지 않도록 의존성 제거

  // --- 2. 메시지 제출 핸들러 (Firestore에 쓰기) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !db || !isAuthenticated) {
        setSubmitError("이름과 메시지를 모두 입력해주세요.");
        return;
    }

    setSubmitError(null);
    
    try {
        const entryData = {
            name: name.trim(),
            message: message.trim(),
            // Firestore 서버 시간을 사용하여 정확한 기록
            timestamp: serverTimestamp(), 
        };
        
        const collectionPath = `artifacts/${appId}/public/data/guestbook`;
        await addDoc(collection(db, collectionPath), entryData);

        setName('');
        setMessage('');
        // 새 글 작성 후 최신 글을 보기 위해 1페이지로 이동
        setCurrentPage(1); 

    } catch (error) {
        console.error("Guestbook Submission Error:", error);
        setSubmitError("메시지 전송에 실패했습니다. (Firestore 권한 및 네트워크 확인)");
    }
  };
  
  // --- 3. 현재 페이지에 표시할 메시지 계산 ---
  const currentEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const endIndex = startIndex + ENTRIES_PER_PAGE;
    // 전체 목록(entries)에서 현재 페이지에 해당하는 항목만 잘라냅니다.
    return entries.slice(startIndex, endIndex);
  }, [entries, currentPage]);
  
  // --- 4. 페이지 번호 목록 계산 (예: 3 4 [5] 6 7) ---
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    
    // 표시할 페이지 번호의 시작과 끝을 계산합니다.
    let startPage = Math.max(1, currentPage - PAGE_RANGE);
    let endPage = Math.min(totalPages, currentPage + PAGE_RANGE);
    
    // 페이지 번호가 왼쪽으로 쏠리는 경우, 오른쪽을 채워 총 5개를 유지합니다.
    if (currentPage - PAGE_RANGE < 1) {
        endPage = Math.min(totalPages, endPage + (PAGE_RANGE - (currentPage - 1)));
    }
    // 페이지 번호가 오른쪽으로 쏠리는 경우, 왼쪽을 채워 총 5개를 유지합니다.
    if (currentPage + PAGE_RANGE > totalPages) {
        // totalPages가 5 미만일 경우 음수가 나올 수 있으므로 Math.max(1, ...)로 처리
        startPage = Math.max(1, startPage - (currentPage + PAGE_RANGE - totalPages));
    }
    // 최종적으로 다시 startPage와 endPage를 보정
    endPage = Math.min(totalPages, endPage);
    startPage = Math.max(1, startPage);


    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
  }, [totalPages, currentPage]);


  return (
    <div className="py-8 px-6 bg-secondary/20">
      <div className="space-y-6 max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl flex items-center justify-center space-x-2">
            <MessageCircle size={20} />
            <span>방명록 (페이지 {currentPage}/{totalPages === 0 ? 1 : totalPages})</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            축하의 마음을 전해주세요 (총 {entries.length}개)
          </p>
        </div>
        
        {/* 오류 메시지 표시 */}
        {submitError && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center text-sm">
                <AlertTriangle size={18} className="mr-2 flex-shrink-0" />
                <span>{submitError}</span>
            </div>
        )}
        
        {/* 방명록 작성 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card"
            disabled={loading || !isAuthenticated}
          />
          <Textarea
            placeholder="축하 메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-card min-h-20"
            disabled={loading || !isAuthenticated}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isAuthenticated}
          >
            <Heart className="mr-2" size={16} />
            {'축하 메시지 남기기'}
          </Button>
        </form>
        
        {/* 방명록 목록 */}
        <div className="space-y-4">
          {loading && isAuthenticated && entries.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">메시지 불러오는 중...</div>
          ) : currentEntries.length === 0 && entries.length > 0 ? (
             <div className="text-center text-muted-foreground py-8">해당 페이지에 메시지가 없습니다.</div>
          ) : currentEntries.length === 0 && entries.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p>축하 메시지를 남겨주신다면 <br />
                평생토록 감사한 마음과 함께 간직하겠습니다.</p>
            </div>
          ) : (
            currentEntries.map((entry, index) => (
              <div 
                key={entry.id} 
                className="bg-card rounded-lg p-4 shadow-md border-l-4 border-primary/70 transform hover:scale-[1.01] transition duration-150"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-primary font-semibold text-lg">
                    {/* 전체 목록 중 몇 번째 글인지 역순으로 계산하여 표시 */}
                    <span className="text-xs text-muted-foreground mr-2 font-normal">
                        #{entries.length - ((currentPage - 1) * ENTRIES_PER_PAGE) - index}
                    </span>
                    {entry.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                </div>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{entry.message}</p>
              </div>
            ))
          )}
        </div>
        
        {/* 페이지네이션 UI */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 pt-4">
                {/* 이전 버튼 */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1"
                >
                    <ChevronLeft size={20} />
                </Button>

                {/* 페이지 번호들 */}
                {pageNumbers.map(page => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 text-sm ${currentPage === page ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                    >
                        {page}
                    </Button>
                ))}

                {/* 다음 버튼 */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1"
                >
                    <ChevronRight size={20} />
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}

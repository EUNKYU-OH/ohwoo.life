import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Heart, MessageCircle } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('wedding-guestbook');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('wedding-guestbook', JSON.stringify(updatedEntries));
    
    setName('');
    setMessage('');
  };

  return (
    <div className="py-8 px-6 bg-secondary/20">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl flex items-center justify-center space-x-2">
            <MessageCircle size={20} />
            <span>방명록</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            축하의 마음을 전해주세요
          </p>
        </div>
        
        {/* 방명록 작성 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card"
          />
          <Textarea
            placeholder="축하 메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-card min-h-20"
          />
          <Button type="submit" className="w-full">
            <Heart className="mr-2" size={16} />
            축하 메시지 남기기
          </Button>
        </form>
        
        {/* 방명록 목록 */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p>축하 메시지를 남겨주신다면 <br />
                평생토록 감사한 마음과 함께 간직하겠습니다.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-card rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-primary">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
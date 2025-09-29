import { MainPhoto } from './components/MainPhoto';
import { CoupleInfo } from './components/CoupleInfo';
import { WeddingDate } from './components/WeddingDate';
import { Storytelling } from './components/Storytelling';
import { ThankYou } from './components/ThankYou';
import { Gallery } from './components/Gallery';
import { ContactInfo } from './components/ContactInfo';

export default function App() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-[360px] min-h-screen bg-background shadow-lg">
        <div className="space-y-0">
          <MainPhoto />
          <CoupleInfo />
          <WeddingDate />
          <Storytelling />
          <ThankYou />
          <Gallery />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
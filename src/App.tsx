import CustomLinksSection from "./components/CustomLinksSection";
import PhonePreview from "./components/PhonePreview";
import ProfileSection from "./components/ProfileSection";
import SocialSection from "./components/SocialSection";
import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  return (
    <ProfileProvider>
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex max-w-400 flex-col gap-8 px-6 py-10 lg:flex-row">
          <div className="flex-1 space-y-6">
            <ProfileSection />
            <SocialSection />
            <CustomLinksSection />
          </div>
          <aside className="w-full lg:w-170">
            <PhonePreview />
          </aside>
        </div>
      </main>
    </ProfileProvider>
  );
}

export default App;

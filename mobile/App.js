import BottomTabs from './navigation/BottomTabs';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <BottomTabs />
    </LanguageProvider>
  );
}

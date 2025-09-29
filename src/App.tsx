import CharCounter from './CharCounter';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CharCounter />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

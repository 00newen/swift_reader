import { Button } from './components/ui/button';
import { useState, useEffect, FormEvent } from 'react';
import { Switch } from './components/ui/switch';
import { Routes, Route, useNavigate } from 'react-router-dom';
import sun from './assets/icons/sun.svg';
import moon from './assets/icons/moon.svg';
import { api } from './lib/api';
import Session from './pages/Session';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSessionCode, setCurrentSessionCode] = useState('');
  const [sessionCodeInput, setSessionCodeInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  async function getNewSessionCode() {
    try {
      const response = await api.createSession();
      console.log(`Session code: ${response.code}`);
      setCurrentSessionCode(response.code);
      navigate(`/session/${response.code}`);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  }

  async function handleSubmitRestoreSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sessionCodeInput.trim()) {
      navigate(`/session/${sessionCodeInput.trim()}`);
    }
  }

  return (
    <div className='transition-colors duration-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-row absolute top-4 right-4'>
          <Switch id='color-theme' checked={isDarkMode} onCheckedChange={toggleDarkMode}>
            {isDarkMode ? 'sun' : 'moon'}
          </Switch>
          <label htmlFor='color-theme' className='ml-2'>
            {isDarkMode ? (
              <img src={moon} alt='moon icon' className='w-6 h-6' />
            ) : (
              <img src={sun} alt='sun icon' className='w-6 h-6' />
            )}
          </label>
        </div>
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <>
              <h1 className='text-red-300 mb-4 text-center text-6xl'>Swift Reader Practice</h1>
              <div className='flex flex-col gap-1'>
                <div>This is a website to motivate children to practice reading by keeping track of the time.</div>
                <div>The idea is that making a better time becomes a motivation for them to practice more.</div>
              </div>

              <Button className='mt-4' onClick={getNewSessionCode}>
                Start a new session
              </Button>

              <div>currentSessionCode: {currentSessionCode}</div>

              {/* print form to restore an existing session on the bottom of the page */}
              <form onSubmit={handleSubmitRestoreSession}>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='sessionCode' className='text-white'>
                    Enter Session Code:
                  </label>
                  <input
                    id='sessionCode'
                    type='text'
                    value={sessionCodeInput}
                    onChange={(e) => setSessionCodeInput(e.target.value)}
                    className='border-2 border-white bg-black text-white p-2 rounded-md'
                  />
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Restore Session
                  </button>
                </div>
              </form>
            </>
          }
        />
        <Route path='/session/:sessionCode' element={<Session />} />
      </Routes>
    </div>
  );
}

export default App;

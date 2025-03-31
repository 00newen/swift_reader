import { Button } from './components/ui/button';
import { useState, useEffect } from 'react';
import { Switch } from './components/ui/switch';
import sun from './assets/icons/sun.svg';
import moon from './assets/icons/moon.svg';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className=' transition-colors duration-200'>
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
      <h1 className='text-red-300 mb-4 text-center text-6xl'>Swift Reader Practice</h1>
      <div className='flex flex-col gap-1'>
        <div>This is a website to motivate children to practice reading by keeping track of the time.</div>
        <div>The idea is that making a better time becomes a motivation for them to practice more.</div>
      </div>

      <Button className='mt-4'>Start a new session</Button>

      {/* print form to restore an existing session on the bottom of the page */}
    </div>
  );
}

export default App;

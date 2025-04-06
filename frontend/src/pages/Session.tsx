import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { api, SessionData } from '../lib/api';

export default function Session() {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionCode) return;

      try {
        setIsLoading(true);
        const existingSession: SessionData = await api.getSession(sessionCode);
        console.log('🚀 ~ handleSubmitRestoreSession ~ existingSession:', existingSession);
        setSession(existingSession);
      } catch (err) {
        setError('Failed to load session');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [sessionCode]);

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>Loading session...</div>;
  }

  if (error) {
    return <div className='flex justify-center items-center h-screen text-red-500'>{error}</div>;
  }

  if (!session) {
    return <div className='flex justify-center items-center h-screen'>Session not found</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Reading Session: {session.code}</h1>

        <div className='text-center'>
          <Button onClick={() => navigate('/')} variant='outline'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

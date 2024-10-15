import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../lib/services/firebase';

function getAuthStatus() {
  const auth = getAuth(app);
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setAuthStatus(true);
        setUid(auth.currentUser.uid);
      } else {
        setAuthStatus(false);
      }
      setLoading(false);
    });
  }, [auth]);

  return { authStatus, loading, uid };
}

export default getAuthStatus;

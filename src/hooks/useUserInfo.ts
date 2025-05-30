import { useState, useEffect } from 'react';
import { getUserInfo, User } from '../services';
import { useParams } from 'react-router-dom';

export function useUserInfo() {
  const { userId } = useParams();

  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true);
  const [errorUserInfo, setErrorUserInfo] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User>({} as User);

  useEffect(() => {
    if (userId !== undefined && !isNaN(Number(userId))) {
      setLoadingUserInfo(true); // при нов userId да показваме loading
      getUserInfo(userId)
        .then(data => setUserInfo(data))
        .catch(err => setErrorUserInfo(err.message))
        .finally(() => setLoadingUserInfo(false));
    } else {
      setLoadingUserInfo(false);
    }
  }, [userId]); // ← извиква се само когато userId се промени

  return { userInfo, loadingUserInfo, errorUserInfo };
}

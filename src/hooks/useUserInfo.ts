import { useState, useEffect } from 'react';
import { getUserInfo } from '../services';
import { useParams } from 'react-router-dom';
import { User } from '../types';

export function useUserInfo() {
  const { userId } = useParams();

  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true);
  const [errorUserInfo, setErrorUserInfo] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User>({} as User);

  useEffect(() => {
    if (userId !== undefined && !isNaN(Number(userId))) {
      setLoadingUserInfo(true);
      getUserInfo(userId)
        .then(data => setUserInfo(data))
        .catch(err => setErrorUserInfo(err.message))
        .finally(() => setLoadingUserInfo(false));
    } else {
      setLoadingUserInfo(false);
    }
  }, [userId]);

  return { userInfo, loadingUserInfo, errorUserInfo };
}

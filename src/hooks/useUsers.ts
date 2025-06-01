/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, updateUserInfo } from '../services';
import { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const getUsers = useCallback(async () => {
    setLoading(true); 
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError('Error fetching users');
    } finally {
      // simulate a delay for loading state
      setTimeout(() => setLoading(false), 1000);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return { users, loading, error, refetch: getUsers };
}

export function useUpdateUser() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [errorUpdateUser, setErrorUpdateUser] = useState<string | null>(null);

  const updateUser = async (data: User) => {
    setIsUpdatingUser(true);
    try {
      const updatedUser = await updateUserInfo(data);
      setUserData(updatedUser);
    } catch (error) {
      setErrorUpdateUser('Failed to update user information');
    } finally {
      setIsUpdatingUser(false);
    }
  };

  return { userData, isUpdatingUser, errorUpdateUser, updateUser };
}


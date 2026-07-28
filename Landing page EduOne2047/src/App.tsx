import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { LoginModal } from './components/auth/LoginModal';
import { INITIAL_USERS } from './data/mockDatabase';
import { UserAccount } from './types';
import { getUsersFromFirestore } from './lib/firebase';

const redirectToCoreApp = (role?: string) => {
  const coreAppUrl = (import.meta as any).env?.VITE_CORE_APP_URL || 'https://eduone-2047-core.vercel.app';
  const url = role ? `${coreAppUrl}?role=${encodeURIComponent(role)}` : coreAppUrl;
  window.open(url, '_blank');
};

export default function App() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);

  useEffect(() => {
    async function loadData() {
      const loadedUsers = await getUsersFromFirestore(INITIAL_USERS);
      if (loadedUsers && loadedUsers.length > 0) {
        setUsers(loadedUsers);
      }
    }
    loadData();
  }, []);


  return (
    <>
      <LandingPage
        onOpenLogin={() => redirectToCoreApp()}
        onQuickRoleLogin={(role, userId, name) => {
          redirectToCoreApp(role);
        }}
      />
    </>
  );
}

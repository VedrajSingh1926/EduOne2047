import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { LoginModal } from './components/auth/LoginModal';
import { INITIAL_USERS } from './data/mockDatabase';
import { UserAccount } from './types';
import { getUsersFromFirestore } from './lib/firebase';

// Helper function to handle redirection to the Core App
const redirectToCoreApp = (user: UserAccount) => {
  // Store user info in localStorage or cookie if needed for cross-origin auth, 
  // but for this demo we'll just redirect to the core app's URL.
  // Assuming the core app will run on port 5174 during dev.
  const coreAppUrl = (import.meta as any).env?.VITE_CORE_APP_URL || 'https://eduone-2047-core.vercel.app';
  
  // You could pass the role as a query param for the demo, e.g., ?role=Admin
  window.location.href = `${coreAppUrl}?role=${encodeURIComponent(user.role)}`;
};

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
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

  const handleSelectUserAccount = (user: UserAccount) => {
    setIsLoginModalOpen(false);
    redirectToCoreApp(user);
  };

  return (
    <>
      <LandingPage
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onQuickRoleLogin={(role, userId, name) => {
          const matchedUser = users.find(u => u.id === userId) || users[0];
          redirectToCoreApp(matchedUser);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        users={users}
        onLoginSuccess={handleSelectUserAccount}
      />
    </>
  );
}

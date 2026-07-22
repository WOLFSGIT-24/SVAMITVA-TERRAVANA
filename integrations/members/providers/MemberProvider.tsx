import { ReactNode } from 'react';
import { MemberContext } from './MemberContext';

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    member: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    actions: {
      loadCurrentMember: async () => {},
      login: () => {},
      logout: () => {},
      clearMember: () => {},
    },
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
};

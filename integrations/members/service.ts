import { Member } from '.';

// No auth provider — always returns null
export const getCurrentMember = async (): Promise<Member | null> => {
  return null;
};

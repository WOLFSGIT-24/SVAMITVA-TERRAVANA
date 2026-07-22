import { ReactNode } from 'react';

interface MemberProtectedRouteProps {
  children: ReactNode;
  messageToSignIn?: string;
  messageToLoading?: string;
  signInTitle?: string;
  signInClassName?: string;
  loadingClassName?: string;
  signInProps?: object;
  loadingSpinnerProps?: object;
}

// Wix auth removed — renders children directly
export function MemberProtectedRoute({ children }: MemberProtectedRouteProps) {
  return <>{children}</>;
}

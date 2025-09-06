import ToastManager from '@/app/_components/Toast';
import { createContext, ReactNode } from 'react';

const ToastContext = createContext(null);

type ToastContextProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastContextProps) {
  return (
    <ToastContext.Provider value={null}>
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
}

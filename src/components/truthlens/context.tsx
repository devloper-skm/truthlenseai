import { createContext, useContext, useState, type ReactNode } from 'react';
import type { VerificationDraft } from '@/lib/verification';
const DraftContext = createContext<{ draft: VerificationDraft | null; setDraft: (draft: VerificationDraft) => void }>({ draft: null, setDraft: () => {} });
export function VerificationProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<VerificationDraft | null>(null);
  return <DraftContext.Provider value={{ draft, setDraft }}>{children}</DraftContext.Provider>;
}
export const useVerification = () => useContext(DraftContext);

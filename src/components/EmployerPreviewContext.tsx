import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Employer } from "~/data/employers";

interface EmployerPreviewContextType {
  isOpen: boolean;
  selectedEmployer: Employer | null;
  openModal: (employer: Employer) => void;
  closeModal: () => void;
}

const EmployerPreviewContext = createContext<EmployerPreviewContextType | null>(null);

export function EmployerPreviewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);

  const openModal = useCallback((employer: Employer) => {
    setSelectedEmployer(employer);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing the employer to allow fade-out animation
    setTimeout(() => setSelectedEmployer(null), 200);
  }, []);

  return (
    <EmployerPreviewContext.Provider value={{ isOpen, selectedEmployer, openModal, closeModal }}>
      {children}
    </EmployerPreviewContext.Provider>
  );
}

export function useEmployerPreview(): EmployerPreviewContextType {
  const ctx = useContext(EmployerPreviewContext);
  if (!ctx) {
    throw new Error("useEmployerPreview must be used within EmployerPreviewProvider");
  }
  return ctx;
}

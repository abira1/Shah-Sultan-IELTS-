import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollmentContextType {
  isEnrollmentModalOpen: boolean;
  selectedCourseId: string | undefined;
  openEnrollmentModal: (courseId?: string) => void;
  closeEnrollmentModal: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within EnrollmentProvider');
  }
  return context;
};

interface EnrollmentProviderProps {
  children: ReactNode;
}

export const EnrollmentProvider: React.FC<EnrollmentProviderProps> = ({ children }) => {
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const openEnrollmentModal = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsEnrollmentModalOpen(true);
  };

  const closeEnrollmentModal = () => {
    setIsEnrollmentModalOpen(false);
    setSelectedCourseId(undefined);
  };

  return (
    <EnrollmentContext.Provider
      value={{
        isEnrollmentModalOpen,
        selectedCourseId,
        openEnrollmentModal,
        closeEnrollmentModal,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

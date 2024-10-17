'use client';

import React from 'react';
import { ReviewType } from '@constants/common';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context shape
interface AppContextType {
  reviewType: string;
  updateReviewType: (newKeyValue: string) => void;
  accessToken: string;
  setAccessToken: (newKeyValue: string) => void;
  user: User;
  setUser: (newKeyValue: User) => void;
}

interface User {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('perf_review_token') || '';
  const id = localStorage.getItem('user_id');
  const given_name = localStorage.getItem('given_name');
  const family_name = localStorage.getItem('family_name');
  const email = localStorage.getItem('email');
  const picture = localStorage.getItem('picture');
  const user = { id, given_name, family_name, email, picture };

  const [state, setState] = useState({
    reviewType: ReviewType.perfReview,
    accessToken: token,
    user: user as User,
  });

  // Function to update the reviewType
  const updateReviewType = (reviewType: string) => {
    setState((prevState) => ({
      ...prevState,
      reviewType,
    }));
  };

  const setAccessToken = (accessToken: string) => {
    setState((prevState) => ({
      ...prevState,
      accessToken,
    }));
  };

  const setUser = (user: User) => {
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        reviewType: state.reviewType,
        updateReviewType,
        accessToken: state.accessToken,
        setAccessToken,
        user: state.user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

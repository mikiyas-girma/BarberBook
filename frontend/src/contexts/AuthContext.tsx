/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState } from '@/redux/store';
import axiosForApiCall  from '@/utils/axiosInstance';
import { userActions, UserState } from '@/redux/user/userSlice';
import { SignInFormData, SignUpFormData } from '@/types/form';
import { User } from '@/types/user';

const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  updateSuccess,
} = userActions;

interface AuthContextValue {

  user: {
    isAuthenticated: boolean;
    isProcessing: boolean;
    processFail: boolean;
    data: User | null;
  };

  signUp: (userData: SignUpFormData) => Promise<void>;
  signIn: (credentials: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (newData: Partial<User>) => Promise<void>;
  updateUserPassword: (passwords: { oldPassword: string; newPassword: string }) => Promise<void>;
  deleteUser: () => Promise<void>;
  saveLocation: (lat: number, lng: number) => Promise<void>;
  
};


export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isAuthenticated, loading, error } = useSelector<
    RootState,
    UserState
  >((state) => state.user);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(signInStart());
      try {
        const response = await axiosForApiCall.get('/auth/check');
        const normalizedUser = { ...response.data.user, id: response.data.user._id || response.data.user.id };
        console.log("Normalized user after check: ", normalizedUser)
        dispatch(signInSuccess(normalizedUser));
      } catch (err: any) {
        // Handle different types of errors
        if (err.response && err.response.status === 401) {
          // Unauthorized: Token is invalid or expired
          dispatch(signOutSuccess()); // Clear the user state
        } else {
          // Other errors (network issues, server errors, etc.)
          dispatch(signInFailure(err));
        }
      } finally {
        setIsInitialized(true);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const authContextValue = useMemo(() => {
    return {
      user: {
        isAuthenticated: isAuthenticated,
        isProcessing: loading,
        processFail: !!error,
        data: isAuthenticated ? currentUser : null,
      },
      signUp: async (userData: SignInFormData) => {
        dispatch(signUpStart());
        try {
          const response = await axiosForApiCall.post('/auth/signup', userData);
          dispatch(signUpSuccess());
        const normalizedUser = { ...response.data, id: response.data._id || response.data.id };
        dispatch(signInSuccess(normalizedUser));
        } catch (err) {
          console.error(err);
          dispatch(signUpFailure(err));
          throw new Error('An error occured while signing up, please retry');
        }
      },
      signIn: async (credentials: SignInFormData) => {
        dispatch(signInStart());
        try {
          const response = await axiosForApiCall.post(
            '/auth/login',
            credentials
          );
          const normalizedUser = {...response.data, id: response.data._id || response.data.id};
          dispatch(signInSuccess(normalizedUser));
        } catch (err) {
          dispatch(signInFailure(err));
          throw new Error('An error occured while signing in, please retry');
        }
      },
      signOut: async () => {
        dispatch(signOutStart());
        try {
          await axiosForApiCall.post('/auth/logout');
          dispatch(signOutSuccess());
          persistor.purge();
        } catch (err) {
          dispatch(signOutFailure(err));
          throw new Error('An error occured while signing out, please retry');
        }
      },
      updateUserProfile: async (newData: Partial<User>) => {
        try {
          const response = await axiosForApiCall.put('/user/update-profile', {
            ...newData,
          });
          dispatch(updateSuccess({ ...currentUser, ...response.data }));
        } catch (err: any) {
          throw new Error(
            'An error occured while updating user profile, please retry'
          );
        }
      },
      updateUserPassword: async (passwords: { oldPassword: string; newPassword: string }) => {
        try {
          await axiosForApiCall.put('/user/update-password', {
            ...passwords,
          });
          dispatch(updateSuccess(currentUser));
        } catch (err: any) {
          throw new Error(
            'An error occured while updating your profile, please retry'
          );
        }
      },
      deleteUser: async () => {
        try {
          //   dispatch(updateStart());
          await axiosForApiCall.post('/user/delete');
          dispatch(updateSuccess(null));

          persistor.purge();
        } catch (err) {
          console.log(err);
         //   dispatch(updateFailure(err));
          throw new Error(
            'An error occured while deleting your account, please retry'
          );
        }
      },
      saveLocation: async (lat: number, lng: number) => {
        try {
          await axiosForApiCall.post('/user/save-location', { lat, lng });
          console.log( lat, lng);
        } catch (err) {
          console.log(err);
          throw new Error('An error occurred while saving your location, please retry');
        }
      },      
    };
  }, [currentUser, dispatch, isAuthenticated, loading, error]);

  if (!isInitialized) {
    // You can return a loading component here if you want
    return null;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

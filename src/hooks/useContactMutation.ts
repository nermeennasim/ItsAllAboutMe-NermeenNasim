import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface MutationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: any | null;
}

interface UseContactMutationReturn {
  mutate: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: any | null;
  reset: () => void;
}

export const useContactMutation = (): UseContactMutationReturn => {
  const [state, setState] = useState<MutationState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  });

  const mutate = async (formData: ContactFormData) => {
    // Reset and start loading
    setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    });

    try {
      // API URL - use localhost:5000 in development
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:5000/api/contact'
        : '/api/contact';

      console.log('Sending to:', apiUrl);
      console.log('Form data:', formData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      // Success!
      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        data: responseData,
      });
    } catch (error) {
      console.error('Contact mutation error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try the Quick Email option.';
      
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: errorMessage,
        data: null,
      });
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    });
  };

  return {
    mutate,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
    data: state.data,
    reset,
  };
};
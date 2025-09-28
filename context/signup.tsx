import { SignupConbinedSchema } from '@/schemas/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FlatList } from 'react-native';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type SignupContextData = {
  address: Address | null;
  coords: Coordinates | null;
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
  setCoords: React.Dispatch<React.SetStateAction<Coordinates | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  flashListRef: React.RefObject<FlatList<any> | null>;
};

type Address = {
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

const SignupContext = createContext<SignupContextData>({} as SignupContextData);

type SignupProviderProps = {
  children: ReactNode;
};

export function SignupProvider({ children }: SignupProviderProps) {
  const [address, setAddress] = useState<Address | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const flashListRef = useRef<FlatList<any>>(null);

  const value = useMemo(
    () => ({
      address,
      coords,
      setAddress,
      setCoords,
      currentStep,
      setCurrentStep,
      flashListRef,
    }),
    [
      address,
      coords,
      setCoords,
      setAddress,
      currentStep,
      setCurrentStep,
      flashListRef,
    ],
  );

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(SignupConbinedSchema),
    defaultValues: {
      isProvider: false,
      hasCNPJ: false,
      code: ['', '', '', ''],
    },
  });

  return (
    <SignupContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </SignupContext.Provider>
  );
}

export function useSignup() {
  return useContext(SignupContext);
}

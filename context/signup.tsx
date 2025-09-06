import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
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

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

// Hook pra usar mais fácil
export function useSignup() {
  return useContext(SignupContext);
}

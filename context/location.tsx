import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationContextData = {
  address: Address | null;
  coords: Coordinates | null;
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
  setCoords: React.Dispatch<React.SetStateAction<Coordinates | null>>;
};

type Address = {
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

type LocationProviderProps = {
  children: ReactNode;
};

export function LocationProvider({ children }: LocationProviderProps) {
  const [address, setAddress] = useState<Address | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);

  const value = useMemo(
    () => ({ address, coords, setAddress, setCoords }),
    [address, coords, setCoords, setAddress],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook pra usar mais fácil
export function useLocation() {
  return useContext(LocationContext);
}

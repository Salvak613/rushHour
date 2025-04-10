import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { WantedGuy } from '../model/WantedGuy';

interface WantedGuysContextProps {
  data: WantedGuy[];
  loading: boolean;
  error: string | null;
  currentGuy: WantedGuy | null;
  setCurrentGuy: (guy: WantedGuy) => void;
}

export const WantedGuysContext = createContext<WantedGuysContextProps>({
  data: [],
  loading: true,
  error: null,
  currentGuy: null,
  setCurrentGuy: () => {},
});

export const WantedGuysProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WantedGuy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentGuy, setCurrentGuy] = useState<WantedGuy | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.fbi.gov/wanted/v1/list?pageSize=50');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Données brutes de l'API :", result);

        if (Array.isArray(result.items)) {
          const newWantedGuys: WantedGuy[] = result.items.map((newEntry) => {
            return new WantedGuy(
              newEntry.uid,
              newEntry.aliases || 'UNKNOWN',
              newEntry.details || 'N/A',
              newEntry.dates_of_birth_used || 'N/A',
              newEntry.subjects || [],
              newEntry.description || 'N/A',
              newEntry.images?.[0]?.original || null,
              newEntry.status || 'NO',
              newEntry.age_range || 'N/A',
              newEntry.reward_text || 'N/A',
              newEntry.sex || 'N/A',
              newEntry.race || 'N/A',
              newEntry.warning_message || 'N/A',
              newEntry.url || 'N/A',
              newEntry.hair || 'N/A',
              newEntry.field_offices || [],
              newEntry.title || 'N/A'
            );
          });
          setData(newWantedGuys);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WantedGuysContext.Provider value={{ data, loading, error, currentGuy, setCurrentGuy }}>
      {children}
    </WantedGuysContext.Provider>
  );
};

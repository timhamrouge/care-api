import { useState, useEffect } from 'react';

export const useFetchCareRecipients = () => {
  const [loading, setLoading] = useState(true);
  const [careRecipients, setCareRecipients] = useState<null | { id: string, name: string }[]>(null);

  useEffect(() => {
    const fetchCareRecipients = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/care-recipients`);
        const json = await response.json();
        setCareRecipients(json.data);
      } catch (error) {
        // would be nice to handle this better - set it as an error then do soemthing with it in the ui if it happens
        console.error("Error fetching care recipients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareRecipients();
  }, []);

  return { loading, careRecipients };
};

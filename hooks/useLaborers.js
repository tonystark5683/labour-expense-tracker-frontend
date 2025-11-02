import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useLaborers = (userId) => {
  const [laborers, setLaborers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLaborers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/laborers/${userId}`);
      const data = await response.json();
      setLaborers(data);
    } catch (error) {
      console.error("Error fetching laborers:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await fetchLaborers();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchLaborers, userId]);

  const createLaborer = async (laborerData) => {
    try {
      console.log('Creating laborer with data:', { ...laborerData, user_id: userId }); // Debug log

      const response = await fetch(`${API_URL}/laborers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...laborerData, user_id: userId }),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Debug log
        throw new Error(errorData.message || "Failed to create laborer");
      }

      const responseData = await response.json();
      console.log('Success response:', responseData); // Debug log

      await loadData();
      Alert.alert("Success", "Laborer added successfully");
      return true;
    } catch (error) {
      console.error("Error creating laborer:", error);
      Alert.alert("Error", error.message || "Failed to create laborer");
      return false;
    }
  };

  return { laborers, isLoading, loadData, createLaborer };
};
import { useQuery } from "@tanstack/react-query";

const useFetchBetweenAds = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const { data: betweenAds = [], refetch } = useQuery({
    queryKey: ["betweenAds"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API}/api/between-ads`);
        const data = await response.json();
        // console.log("useFetchBetweenAds ::", data);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return [betweenAds, refetch];
};

export default useFetchBetweenAds;

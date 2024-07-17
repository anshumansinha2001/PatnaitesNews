import { useQuery } from "@tanstack/react-query";

const useFetchBetweenAds = () => {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const {
    data: betweenAds = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["betweenAds"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/api/between-ads`);
        const data = await response.json();
        // console.log("useFetchBetweenAds ::", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [betweenAds, refetch, loading];
};

export default useFetchBetweenAds;

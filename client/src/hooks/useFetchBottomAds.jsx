import { useQuery } from "@tanstack/react-query";

const useFetchBottomAds = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const {
    data: bottomAds = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["bottomAds"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API}/api/bottom-ads`);
        const data = await response.json();
        // console.log("useFetchBottomAds ::", data);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return [bottomAds, refetch, loading];
};

export default useFetchBottomAds;

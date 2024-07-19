import { useQuery } from "@tanstack/react-query";

const useFetchBottomAds = () => {
  const {
    data: bottomAds = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["bottomAds"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/bottom-ads`);
        const data = await response.json();
        // console.log("useFetchBottomAds ::", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [bottomAds, refetch, loading];
};

export default useFetchBottomAds;

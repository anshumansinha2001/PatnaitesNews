import { useQuery } from "@tanstack/react-query";

const useFetchArticle = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const {
    data: articles = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API}/api/article`);
        const data = await response.json();
        // console.log("useFetchArticle ::", data);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return [articles, refetch, loading];
};

export default useFetchArticle;

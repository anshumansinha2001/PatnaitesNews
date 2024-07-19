import { useQuery } from "@tanstack/react-query";

const useFetchArticle = () => {
  const {
    data: articles = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/article`);
        const data = await response.json();
        // console.log("useFetchArticle ::", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [articles, refetch, loading];
};

export default useFetchArticle;

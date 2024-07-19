import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Profile data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/profile`);
        const data = await response.data;
        // console.log("useFetchProfile ::", data);
        setData(data);
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    })();
  }, []);

  return [data, loading, setLoading];
};

export default useFetchProfile;

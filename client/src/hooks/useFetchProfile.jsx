import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProfile = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Profile data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/api/profile`);
        const data = await response.data;
        // console.log("useFetchProfile ::", data);
        setData(data);
        setLoading(false);
        return data;
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    })();
  }, []);

  return [data, loading, setLoading];
};

export default useFetchProfile;

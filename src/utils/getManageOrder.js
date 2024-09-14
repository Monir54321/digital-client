import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config/global";

const useManageOrderData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.back_end_url}/manage-order-button`);
        setData(response.data.data); // Adjust this according to your data structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useManageOrderData;

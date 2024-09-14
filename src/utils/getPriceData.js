import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config/global";

const useGetPrice = () => {
  const [price, setPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `${config.back_end_url}/priceList/668f76383906559fe7ff631c`
        );
        setPrice(response.data?.data?.nidMake); // Adjust according to the actual data structure
      } catch (err) {
        setError(err.message);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrice();
  }, []); // Empty dependency array to fetch only once

  return { price, priceLoading, error };
};

export default useGetPrice;

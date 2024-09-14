import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import config from "../config/global";

const PriceList = () => {
  const [title, setTitle] = useState("");
  const [priceListData, setPriceListData] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log("price list data: ", priceListData);

  useEffect(() => {
    fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`)
      .then((response) => response.json())
      .then((data) => {
        setPriceListData(data?.data);
      });
  }, []);

  useEffect(() => {
    if (title && priceListData && priceListData[title] !== undefined) {
      setSelectedPrice(priceListData[title]);
    } else {
      setSelectedPrice(0); // or set to some default value
    }
  }, [title, priceListData]);

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleUpdatePrice = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      fetch(`${config.back_end_url}/priceList/668f76383906559fe7ff631c`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, nidAmount: selectedPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.modifiedCount === 1) {
            toast.success(data?.message);
            setSelectedPrice(0);
            setTitle("");
            setLoading(false);
          }
        });
    } catch (error) {
      toast.error("An error occurred while updating the price.");
      console.log("price update error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Select One</span>
        </div>
        <select
          onChange={(e) => setTitle(e.target.value)}
          className="select select-bordered"
          name="priceTile"
          id="priceTile"
          value={title}
        >
          {Object.keys(priceListData)
            .filter(
              (key) =>
                !["_id", "__v", "createdAt", "updatedAt", "title"].includes(key)
            ) // Exclude specific keys
            .map((key) => (
              <option key={key} value={key}>
                {key} {/* Display the key as the option label */}
              </option>
            ))}
        </select>
      </label>

      <form
        onSubmit={handleUpdatePrice}
        className="flex flex-col max-full mt-6 gap-2"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            required
            placeholder="amount"
            name="nidAmount"
            className="input input-bordered w-full"
            value={selectedPrice}
            onChange={handlePriceChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          {loading ? (
            <>
              <span className="loading loading-spinner text-white bg-primary"></span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default PriceList;

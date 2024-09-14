import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import config from "../config/global";
import useManageOrderData from "../utils/getManageOrder";

const ManageOrderButton = () => {
  const { data, loading, error } = useManageOrderData();

  const [selectedId, setSelectedId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("data", data);

  useEffect(() => {
    if (selectedId) {
      const selectedOrder = data.find((item) => item._id === selectedId);
      setSelectedStatus(selectedOrder?.status || "");
    }
  }, [selectedId, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedId && selectedStatus) {
      try {
        const updateResponse = await axios.patch(
          `${config.back_end_url}/manage-order-button/${selectedId}`,
          { status: selectedStatus }
        );
        if (updateResponse?.data?.data?.modifiedCount === 1) {
          setIsLoading(false);
          setSelectedId("");
          setSelectedStatus("");
          toast.success("Order status updated successfully");
        }
      } catch (error) {
        console.error("Update failed:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div className="w-full p-10 min-h-screen">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <h1 className="text-1xl md:text-3xl text-center">
            Manage Order Button
          </h1>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select Title:</span>
            </div>
            <select
              name="selectTitle"
              className="select select-bordered"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" disabled>
                Select Title
              </option>
              {data.map((item) => (
                <option key={item._id} value={item?._id}>
                  {item?.title}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Select Status:</span>
            </div>
            <select
              name="selectStatus"
              className="select select-bordered"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <button
            className="btn w-full mt-4 btn-primary text-white"
            type="submit"
            disabled={!selectedStatus} // Disable if either is not selected
          >
            {loading || isLoading ? (
              <>
                <span className="loading loading-spinner text-white bg-primary"></span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageOrderButton;

/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { MdDownload } from "react-icons/md";
import config from "../../config/global";

const MyOrdersUi = ({ myOrders }) => {
  return (
    <div className="mt-10">
      {myOrders && (
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <td>SUBMITTED</td>
                <td>STATUS</td>
                <td className="text-center">ACTION</td>
                <td>DATE</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((data) => (
                <tr key={data._id}>
                  <td className="text-[15px]">{data?.number}</td>
                  <td
                    className={`text-[15px] ${
                      data?.status === "Cancelled"
                        ? "text-red-500"
                        : data?.status === "Pending"
                        ? "text-red-500"
                        : data?.status === "Processing"
                        ? "text-yellow-600"
                        : "text-green-700"
                    }`}
                  >
                    {data?.status}
                  </td>
                  <td className="text-[15px]">
                    <div className="flex gap-4 items-center w-full h-full">
                      <div> {data?.reason}</div>
                      <div>
                        {data?.status == "Success" && (
                          <div className="flex justify-center items-center w-full h-full gap-2">
                            <p className="text-blue-700  font-semibold">
                              Download
                            </p>
                            <a
                              download
                              href={`${config.back_end_url}/files/${data?.pdf}`}
                              target="_blank" // Open in a new tab
                              rel="noopener noreferrer" // Security enhancement
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <MdDownload
                                className="w-8 h-8 font-semibold text-blue-600"
                                width={20}
                                height={20}
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-[15px]">
                    {format(data?.createdAt, "dd/MM/yyyy hh:mm:ss a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersUi;

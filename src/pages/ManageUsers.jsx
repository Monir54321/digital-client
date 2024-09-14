import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import config from "../config/global";

const ManageUsers = () => {
  const [usersData, setUsersData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [amount, setAmount] = useState({});
  const [reFetch, setReFetch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${config.back_end_url}/users/`)
      .then((res) => res.json())
      .then((data) => {
        setReFetch(false);
        setUsersData(data?.data);
        setFilteredUsers(data?.data);
        console.log(data.data);
      });
  }, [reFetch]);
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(usersData);
    } else {
      const filtered = usersData?.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, usersData]);

  console.log(amount);

  const handleAddMoney = async (email) => {
    const userAmount = amount[email];
    fetch(`${config.back_end_url}/users/bikash`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: userAmount, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "Success") {
          // setAmount(0);
          setReFetch(true);
          setAmount((prevAmounts) => ({ ...prevAmounts, [email]: 0 }));
          console.log(data.status);
          toast.success(data.message);
        }
      });
  };

  const handleDeleteUser = (email) => {
    console.log(email);

    const agreed = confirm("Are you sure to delete this account?");

    if (agreed) {
      fetch(`${config.back_end_url}/users/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status == "Success") {
            setReFetch(true);
            console.log(data.status);
            toast.success(data.message);
          }
        });
    }
  };

  return (
    <div className="overflow-x-scroll block m-5">
      <p className="text-center text-xl md:text-2xl my-5">Manage users </p>
      <div className="my-10 ms-2">
        <input
          type="text"
          placeholder="Search by username or email"
          className="input input-bordered w-full "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-scroll">
        <table className="table block table-xs table-pin-rows table-pin-cols overflow-x-scroll">
          <thead>
            <tr>
              <td>USER NAME</td>
              <td>EMAIL</td>
              <td>ROLE</td>
              <td>BALANCE</td>
              <td>DATE</td>
              <td>ADD MONEY</td>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredUsers?.map((data) => (
              <tr key={data._id}>
                <td className="text-[15px]">{data.name}</td>
                <td className="text-[15px]">{data.email}</td>
                <td className="text-[15px] uppercase">{data.role}</td>
                <td className="text-[15px] uppercase">{data.amount}</td>
                <td className="text-[15px]">
                  {data?.createdAt?.split("T")[0]}
                </td>

                <td className="text-[15px] flex flex-row items-center justify-start gap-2">
                  <label className="form-control ">
                    <input
                      // onChange={(e) => setAmount(e.target.value)}
                      onChange={(e) =>
                        setAmount({
                          ...amount,
                          [data.email]: Number(e.target.value),
                        })
                      }
                      value={amount[data.email] || ""}
                      type="number"
                      required
                      placeholder="amount"
                      name="number"
                      className="input input-bordered w-[100px]"
                    />
                  </label>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleAddMoney(data?.email)}
                  >
                    Add Money
                  </button>
                </td>

                <td className="text-[15px]">
                  <button onClick={() => handleDeleteUser(data?.email)}>
                    <MdDelete
                      className="w-5 h-5 font-semibold text-blue-600"
                      width={16}
                      height={16}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

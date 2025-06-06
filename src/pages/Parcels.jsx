import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useAuth } from "../Contexts/AuthContext";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // If not logged in, redirect to login
      navigate("/login");
      return;
    }

    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: currentUser.email,
        });
        setParcels(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getParcels();
  }, [currentUser, navigate]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "sendername", headerName: "Sender Name", width: 150 },
    { field: "recipientname", headerName: "Recipient Name", width: 150 },
    { field: "from", headerName: "From", width: 130 },
    { field: "to", headerName: "To", width: 130 },
    { field: "cost", headerName: "Cost ($)", type: "number", width: 130 },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-white h-auto w-[70vw] rounded-md p-[30px]">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[#444] text-[18px] m-2 cursor-pointer" />
        </Link>

        <div className="flex justify-between p-[10px]">
          <span className="text-[18px] text-[#444]">All Parcels</span>
          <span className="font-semibold text-[#444]">
            {currentUser?.fullname || "User"}
          </span>
        </div>

        <div className="p-3">
          <DataGrid 
            rows={parcels}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Parcels;

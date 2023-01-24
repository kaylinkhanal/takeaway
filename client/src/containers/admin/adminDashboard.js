import "../../App.css";
import CustomTable from "../../components/customTable";
import { Link } from "react-router-dom";
import AllOrdersList from "../../components/allOrdersList";

// import {logoutResetDetails} from "../../redux/actions/userAction"

const AdminDashboard = () => {
  return (
    <>
     <AllOrdersList/>
    </>
  );
};
export default AdminDashboard;

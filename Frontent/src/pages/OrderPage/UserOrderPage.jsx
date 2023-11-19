import NavBar from "../../features/navbar/Navbar";
import UserOrders from "../../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Orders</h1>
        <UserOrders />
      </div>
    </div>
  );
}

export default UserOrdersPage;

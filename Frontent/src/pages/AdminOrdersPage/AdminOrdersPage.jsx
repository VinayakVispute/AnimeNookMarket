import AdminOrders from "../../features/admin/components/AdminOrders";


function AdminOrdersPage() {
  return (
    <div className="bg-gray-100 min-h-screen min-w-screen px-16">   
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Orders</h1>
        <AdminOrders />
    </div>
  );
}

export default AdminOrdersPage;

import NavBar from "../../features/navbar/Navbar";
import UserProfile from "../../features/user/components/UserProfile";

function UserOrdersPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h3 className="text-4xl leading-6 font-medium text-gray-900 mb-2 py-4">
          User Profile
        </h3>
        <UserProfile />
      </div>
    </div>
  );
}

export default UserOrdersPage;

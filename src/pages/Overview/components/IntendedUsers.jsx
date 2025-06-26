import { Users, Store, Truck, Shield } from "lucide-react";

/**
 * Renders the section describing the intended users of the CropChain platform.
 * Details each user group and their role.
 */
function IntendedUsers() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-blue-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Intended Users</h2>
      </div>
      {/* User Groups */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <Users className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-xl font-bold text-green-800">Farmers (Crop Suppliers)</h3>
          </div>
          <p className="text-green-700">
            Small to medium-scale farmers looking to sell their produce directly to markets with fair pricing and
            reliable buyers.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <Store className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-blue-800">Buyers (Markets/Groceries)</h3>
          </div>
          <p className="text-blue-700">
            Local markets, grocery stores, and food retailers seeking consistent, quality produce supply from
            local farmers.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <Truck className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-purple-800">Logistics Team</h3>
          </div>
          <p className="text-purple-700">
            Transportation coordinators and logistics providers responsible for efficient crop delivery and route
            optimization.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <Shield className="w-6 h-6 text-orange-600 mr-2" />
            <h3 className="text-xl font-bold text-orange-800">Admin (Department of Agriculture)</h3>
          </div>
          <p className="text-orange-700">
            Government agencies and agricultural departments monitoring market efficiency and supporting farmer
            welfare programs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntendedUsers;

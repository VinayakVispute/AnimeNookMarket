const Address = require("../models/AddressModel");
const User = require("../models/UsersModel");

const addAddressToUser = async (req, res) => {
  const userId = req.user.id;

  const { name, email, country, street, city, state, phone, pinCode } =
    req.body;
  try {
    // Create a new Address
    const newAddress = new Address({
      name,
      email,
      country,
      street,
      city,
      state,
      pinCode,
      phone,
    });

    // Save the Address to the database
    const savedAddress = await newAddress.save();

    // Fetch the user by ID
    const user = await User.findById(userId, { password: 0, salt: 0 }).populate(
      "addresses"
    );

    // Push the saved address to the user's addresses array
    user.addresses.push(savedAddress);

    // Save the user to the database
    await user.save();

    // Respond with the saved address
    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error adding address to user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateAddressById = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const { name, email, country, street, city, state, pinCode, phone } =
    req.body; // Use a different variable name

  try {
    // Ensure the user exists
    const user = await User.findById(userId, { password: 0, salt: 0 }).populate(
      "addresses"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("user.addresses", user.addresses, "addressId", addressId);
    const indexOfAddress = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (indexOfAddress === -1) {
      return res.status(403).json({
        success: false,
        message: "Address not found",
      });
    }
    // Use findByIdAndUpdate to update the address
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { name, email, country, street, city, state, pinCode, phone },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    // Fetch the user again to get the updated user object
    const updatedUser = await User.findById(userId, {
      password: 0,
      salt: 0,
    }).populate("addresses");
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  console.log("addressId", addressId);
  try {
    // Find the user by ID
    const user = await User.findById(userId, { password: 0, salt: 0 }).populate(
      "addresses"
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the address by ID
    console.log("user.addresses", user.addresses, "addressId", addressId);
    const indexOfAddress = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    console.log("indexOfAddress", indexOfAddress);
    // Check if the address exists
    if (indexOfAddress === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Remove the address from the user's addresses array
    user.addresses.splice(indexOfAddress, 1);

    // Save the user without the address
    await user.save();

    // Delete the address from the Address collection
    await Address.findByIdAndDelete(addressId);

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { addAddressToUser, updateAddressById, deleteAddress };

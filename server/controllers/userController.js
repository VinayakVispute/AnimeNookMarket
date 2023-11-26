const User = require("../models/UsersModel");

async function getUserById(req, res) {
  const userId = req.user.id;

  try {
    // Fetch the user by ID, excluding "password" and "salt" fields
    const user = await User.findById(userId, { password: 0, salt: 0 });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Respond with the user data (excluding password and salt)
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function updateUserById(req, res) {
  const userId = req.user.id;
  const { password, salt, ...updateData } = req.body; // Exclude password and salt from updateData

  try {
    // Update the user by ID, excluding "password" and "salt" fields from the returned document
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Respond with the updated user data (excluding password and salt)
    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getUserById,
  updateUserById,
};

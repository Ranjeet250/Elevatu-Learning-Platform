import User from "../models/user.js";
import Course from "../models/course.js";
import Payment from "../models/payment.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({
            status: 200,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ status: 500, message: "Failed to fetch users" });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const { id } = req.params;

        if (!["student", "admin"].includes(role)) {
            return res.status(400).json({
                status: 400,
                message: "Role must be 'student' or 'admin'",
            });
        }

        // Prevent admin from changing their own role
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                status: 400,
                message: "You cannot change your own role",
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({
            status: 200,
            message: `User role updated to ${role}`,
            user,
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ status: 500, message: "Failed to update role" });
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                status: 400,
                message: "You cannot delete your own account",
            });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({
            status: 200,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ status: 500, message: "Failed to delete user" });
    }
};

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalAdmins = await User.countDocuments({ role: "admin" });

        const courses = await Course.find();
        const totalEnrollments = courses.reduce(
            (sum, c) => sum + (c.enrolledStudents?.length || 0),
            0
        );
        const totalRevenue = courses.reduce(
            (sum, c) =>
                sum + (c.price || 0) * (c.enrolledStudents?.length || 0),
            0
        );

        const recentUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            status: 200,
            stats: {
                totalUsers,
                totalCourses,
                totalStudents,
                totalAdmins,
                totalEnrollments,
                totalRevenue,
            },
            recentUsers,
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ status: 500, message: "Failed to fetch stats" });
    }
};

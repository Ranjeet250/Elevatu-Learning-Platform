import { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../services/axiosClient";
import AdminSidebar from "../components/AdminSidebar";
import { Users, Search, Shield, Trash2, ChevronDown, X } from "lucide-react";

export default function AdminUsers() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get("/admin/users");
            setUsers(res.data?.users || []);
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosClient.put(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(
                users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
            );
            toast.success(`Role updated to ${newRole}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update role");
        }
    };

    const handleDelete = async (userId, userName) => {
        if (
            !window.confirm(
                `Are you sure you want to delete user "${userName}"? This cannot be undone.`
            )
        )
            return;

        try {
            await axiosClient.delete(`/admin/users/${userId}`);
            setUsers(users.filter((u) => u._id !== userId));
            toast.success("User deleted");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/admin-login");
    };

    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const studentCount = users.filter((u) => u.role === "student").length;
    const adminCount = users.filter((u) => u.role === "admin").length;

    return (
        <div className="flex h-screen bg-surface-50">
            <AdminSidebar user={user} onLogout={handleLogout} />

            <div className="flex-1 overflow-auto">
                <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-surface-900">
                            User Management
                        </h1>
                        <p className="text-surface-500 mt-1">
                            Manage all registered users and their roles
                        </p>
                    </div>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="card p-4">
                            <p className="text-2xl font-bold text-surface-900">
                                {users.length}
                            </p>
                            <p className="text-sm text-surface-500">Total Users</p>
                        </div>
                        <div className="card p-4">
                            <p className="text-2xl font-bold text-surface-900">
                                {studentCount}
                            </p>
                            <p className="text-sm text-surface-500">Students</p>
                        </div>
                        <div className="card p-4">
                            <p className="text-2xl font-bold text-primary-600">
                                {adminCount}
                            </p>
                            <p className="text-sm text-surface-500">Admins</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="card p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field !pl-10"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="input-field !py-2.5 w-auto min-w-[140px]"
                            >
                                <option value="all">All Roles</option>
                                <option value="student">Students</option>
                                <option value="admin">Admins</option>
                            </select>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="card overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-surface-500">
                                Loading users...
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="p-12 text-center">
                                <Users className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                                <p className="text-surface-500">No users found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-surface-100 bg-surface-50">
                                            <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                                Joined
                                            </th>
                                            <th className="text-right px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((u) => {
                                            const isSelf = u._id === user?.id;
                                            return (
                                                <tr
                                                    key={u._id}
                                                    className="border-b border-surface-50 hover:bg-surface-50 transition-colors"
                                                >
                                                    <td className="px-5 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                                                {u.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-sm font-medium text-surface-900">
                                                                {u.name}
                                                                {isSelf && (
                                                                    <span className="ml-1.5 text-xs text-primary-600">
                                                                        (You)
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 text-sm text-surface-600">
                                                        {u.email}
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        {isSelf ? (
                                                            <span className="badge bg-primary-100 text-primary-700 flex items-center gap-1 w-fit">
                                                                <Shield className="w-3 h-3" />
                                                                admin
                                                            </span>
                                                        ) : (
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) =>
                                                                    handleRoleChange(u._id, e.target.value)
                                                                }
                                                                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${u.role === "admin"
                                                                        ? "bg-primary-50 border-primary-200 text-primary-700"
                                                                        : "bg-surface-50 border-surface-200 text-surface-700"
                                                                    }`}
                                                            >
                                                                <option value="student">Student</option>
                                                                <option value="admin">Admin</option>
                                                            </select>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-3 text-sm text-surface-500">
                                                        {u.createdAt
                                                            ? new Date(u.createdAt).toLocaleDateString()
                                                            : "-"}
                                                    </td>
                                                    <td className="px-5 py-3 text-right">
                                                        {!isSelf && (
                                                            <button
                                                                onClick={() => handleDelete(u._id, u.name)}
                                                                className="p-1.5 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-600 transition-colors"
                                                                title="Delete user"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {!loading && filteredUsers.length > 0 && (
                            <div className="px-5 py-3 border-t border-surface-100 text-sm text-surface-500">
                                Showing {filteredUsers.length} of {users.length} users
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

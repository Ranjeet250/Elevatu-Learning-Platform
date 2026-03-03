import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { CheckCircle2, Clock, XCircle, Receipt } from "lucide-react";

export default function PurchaseHistory() {
    // Placeholder data – will be fetched from API
    const purchases = [];

    const statusStyles = {
        completed: { color: "text-accent-700 bg-accent-100", icon: CheckCircle2 },
        pending: { color: "text-amber-700 bg-amber-100", icon: Clock },
        failed: { color: "text-red-700 bg-red-100", icon: XCircle },
    };

    return (
        <DashboardLayout>
            <div className="animate-fadeIn">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                        Purchase History
                    </h1>
                    <p className="text-surface-500">
                        View all your course purchases and transactions
                    </p>
                </div>

                {purchases.length > 0 ? (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-surface-100">
                                        <th className="text-left px-6 py-4 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-surface-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((p, i) => {
                                        const status = statusStyles[p.status] || statusStyles.pending;
                                        const StatusIcon = status.icon;
                                        return (
                                            <tr
                                                key={i}
                                                className="border-b border-surface-50 hover:bg-surface-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-surface-900">
                                                    {p.courseTitle}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-surface-700">
                                                    {p.amount === 0 ? "Free" : `₹${p.amount}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`badge ${status.color} flex items-center gap-1 w-fit`}
                                                    >
                                                        <StatusIcon className="w-3 h-3" />
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-surface-500">
                                                    {new Date(p.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="card text-center py-16">
                        <Receipt className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-surface-700 mb-2">
                            No purchases yet
                        </h3>
                        <p className="text-surface-500 mb-6">
                            Enroll in a course to see your purchase history
                        </p>
                        <Link to="/courses" className="btn-primary text-sm">
                            Browse Courses
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

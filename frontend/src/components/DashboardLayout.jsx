import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-surface-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <DashboardSidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed(!collapsed)}
                />
            </div>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-30">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative z-40 animate-slideInLeft">
                        <DashboardSidebar
                            collapsed={false}
                            onToggle={() => setMobileOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${collapsed ? "lg:ml-[72px]" : "lg:ml-64"
                    }`}
            >
                {/* Mobile Top Bar */}
                <div className="lg:hidden sticky top-0 z-20 h-14 bg-white border-b border-surface-100 flex items-center px-4">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 rounded-lg hover:bg-surface-50"
                    >
                        <Menu className="w-5 h-5 text-surface-700" />
                    </button>
                    <span className="ml-3 text-sm font-semibold text-surface-900">
                        ElevateU
                    </span>
                </div>

                {/* Content Area */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

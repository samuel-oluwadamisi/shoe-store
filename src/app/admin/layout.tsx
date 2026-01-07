/**
 * Admin Dashboard Layout
 * 
 * This layout wraps all admin pages and provides the sidebar navigation.
 * 
 * TODO: When authentication is implemented, add auth check here:
 * Example:
 *   const session = await getServerSession();
 *   if (!session?.user?.isAdmin) {
 *     redirect('/login');
 *   }
 */

import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />
            {/* Main content area - offset by sidebar width on desktop */}
            <main className="lg:ml-64 min-h-screen">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

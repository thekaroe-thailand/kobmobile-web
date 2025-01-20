import Sidebar from "./sidebar"

export default function BackOfficeLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-5 bg-gray-200 h-screen ml-64">
                <div className="bg-white p-5 rounded-lg shadow-lg shadow-gray-500">
                    {children}
                </div>
            </div>
        </div>
    )
}
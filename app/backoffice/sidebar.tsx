export default function Sidebar() {
    return (
        <div className="bg-teal-600 h-screen w-64">
            <div className="p-5 bg-teal-800 text-white text-xl">
                <h1>KobMobile Version 1.0</h1>
            </div>
            <div className="p-5 text-white text-xl flex flex-col gap-2">
                <div>Dashboard</div>
                <div>Company</div>
                <div>User</div>
            </div>
        </div>
    )
}
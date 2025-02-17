export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-xl font-bold">AI Board</div>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
                Signup
            </button>
        </nav>
    );
}
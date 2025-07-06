import { NavLink } from "react-router-dom"
import { Home, User, Settings, FilePlus2, BookOpenText, BookUser } from "lucide-react"

const navItems = [
    { label: "Home", icon: BookOpenText, path: "/" },
    { label: "My Blogs", icon: BookUser, path: "/my-blogs" },
    { label: "Create", icon: FilePlus2, path: "/create" },
    { label: "Profile", icon: User, path: "/profile" },
    { label: "Settings", icon: Settings, path: "/settings" },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-100 p-4 shadow-md z-50">
      <h2 className="text-2xl font-bold mb-6">Blogs</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold text-primary" : ""
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

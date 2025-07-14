import Sidebar from "./sidebar/Sidebar"

export default function Layout({ children }) {
  return (
    <div className=" md:ml-64 flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  )
}

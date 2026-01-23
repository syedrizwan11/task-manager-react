import { Outlet } from "react-router"

export const MainLayout = () => {
  return (
    <div className="overflow-hidden">
      <div className="text-2xl bg-blue-900 h-20 flex justify-center items-center text-white gap-4">
        <p className="sm:mr-0 mr-5">Task Management System</p>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

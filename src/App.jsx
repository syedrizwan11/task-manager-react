import "./App.css"
import { Routes, Route } from "react-router"
import { TasksPage } from "./pages/tasks/TasksPage"
import { SignupPage } from "./pages/auth/SignupPage"
import { MainLayout } from "./layouts/MainLayout"
import { LoginPage } from "./pages/auth/LoginPage"
import { AuthLayout } from "./layouts/AuthLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { AdminPage } from "./pages/admin/AdminPage"
import { UsersPage } from "./pages/user/UsersPage"
import { CreateUserFormPage } from "./pages/user/CreateUserFormPage"
import { UpdateUserProfilePage } from "./pages/user/UpdateUserProfilePage"
import { TaskFormPage } from "./pages/tasks/TaskFormPage"
import { UsersProvider } from "./context/users/UsersProvider"
import { Toaster } from "sonner"

function App() {
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<AuthLayout />}>
            <Route
              path="/tasks"
              element={
                <UsersProvider>
                  <TasksPage />
                </UsersProvider>
              }
            />
            <Route path="/tasks/form" element={<TaskFormPage />} />
            <Route path="/profile" element={<UpdateUserProfilePage />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin-page" element={<AdminPage key="admin" />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/form" element={<CreateUserFormPage />} />
            </Route>
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

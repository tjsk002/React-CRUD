import { Route, Routes } from 'react-router'

import AdminLayout from '@/pages/admins/auth/admin-layout.tsx'
import AuthLayout from '@/pages/admins/auth/auth-layout.tsx'
import Login from '@/pages/admins/auth/login.tsx'
import Main from '@/pages/admins/auth/main.tsx'
import MyPage from '@/pages/admins/auth/my-page.tsx'
import Signup from '@/pages/admins/auth/signup.tsx'
import All from '@/pages/admins/users/dashboard/all.tsx'
import UsersCreatePage from '@/pages/admins/users/users-create.tsx'
import UsersEditPage from '@/pages/admins/users/users-edit.tsx'
import UsersPage from '@/pages/admins/users/users-page.tsx'
import MovieMain from '@/pages/movie/main.tsx'

export default function Router() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<MovieMain />} />
                <Route path="/admin" element={<Main />} />
                <Route path="/admin/auth/login" element={<Login />} />
                <Route path="/admin/auth/signup" element={<Signup />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin/my" element={<MyPage />} />
                <Route path="/admin/users/list" element={<UsersPage />} />
                <Route path="/admin/users/create" element={<UsersCreatePage />} />
                <Route path="/admin/users/edit" element={<UsersEditPage />} />
                <Route path="/admin/users/all" element={<All />} />
            </Route>
        </Routes>
    )
}

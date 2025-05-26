import { Route, Routes } from 'react-router'

import Index from '@/pages'
import AdminAuthLayout from '@/pages/admins/auth/admin-auth-layout.tsx'
import AdminLayout from '@/pages/admins/auth/admin-layout.tsx'
import AdminLogin from '@/pages/admins/auth/admin-login.tsx'
import AdminMain from '@/pages/admins/auth/admin-main.tsx'
import AdminMyPage from '@/pages/admins/auth/admin-my-page.tsx'
import AdminSignup from '@/pages/admins/auth/admin-signup.tsx'
import UsersCreatePage from '@/pages/admins/users/admin-users-create.tsx'
import UsersEditPage from '@/pages/admins/users/admin-users-edit.tsx'
import AdminUsersPage from '@/pages/admins/users/admin-users-page.tsx'
import All from '@/pages/admins/users/dashboard/admin-all.tsx'
import AuthLayout from '@/pages/auth/auth-layout.tsx'
import Login from '@/pages/auth/login.tsx'
import Signup from '@/pages/auth/signup.tsx'
import BoardMain from '@/pages/service/board.tsx'
import MovieMain from '@/pages/service/movie.tsx'
import MyInfo from '@/pages/service/my-info.tsx'
import Notice from '@/pages/service/notice.tsx'

export default function Router() {
    return (
        <Routes>
            {/*ADMIN*/}
            <Route element={<AdminAuthLayout />}>
                <Route path="/admin" element={<AdminMain />} />
                <Route path="/admin/auth/login" element={<AdminLogin />} />
                <Route path="/admin/auth/signup" element={<AdminSignup />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin/my" element={<AdminMyPage />} />
                <Route path="/admin/users/list" element={<AdminUsersPage />} />
                <Route path="/admin/users/create" element={<UsersCreatePage />} />
                <Route path="/admin/users/edit" element={<UsersEditPage />} />
                <Route path="/admin/users/all" element={<All />} />
            </Route>

            {/*USER*/}
            <Route path="/" element={<Index />} />
            <Route path="/movie" element={<MovieMain />} />
            <Route path="/board" element={<BoardMain />} />
            <Route path="/my-info" element={<MyInfo />} />
            <Route path="/notice" element={<Notice />} />

            <Route element={<AuthLayout />}>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

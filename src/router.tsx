import { Route, Routes } from 'react-router'

import Index from '@/pages'
import AdminGuestOnlyRoute from '@/pages/admins/auth/admin-guest-only-route.tsx'
import AdminLogin from '@/pages/admins/auth/admin-login.tsx'
import AdminMain from '@/pages/admins/auth/admin-main.tsx'
import AdminMyPage from '@/pages/admins/auth/admin-my-page.tsx'
import AdminPrivateRoute from '@/pages/admins/auth/admin-private-route.tsx'
import AdminSignup from '@/pages/admins/auth/admin-signup.tsx'
import UsersCreatePage from '@/pages/admins/users/admin-users-create.tsx'
import UsersEditPage from '@/pages/admins/users/admin-users-edit.tsx'
import AdminUsersPage from '@/pages/admins/users/admin-users-page.tsx'
import AdminAll from '@/pages/admins/users/dashboard/admin-all.tsx'
import GuestOnlyRoute from '@/pages/auth/guest-only-route.tsx'
import Login from '@/pages/auth/login.tsx'
import PrivateOnlyRoute from '@/pages/auth/private-only-route.tsx'
import Signup from '@/pages/auth/signup.tsx'
import BoardMain from '@/pages/service/board/board.tsx'
import BoardCreate from '@/pages/service/board/create.tsx'
import BoardDetail from '@/pages/service/board/detail.tsx'
import MovieMain from '@/pages/service/movie/movie.tsx'
import MyInfo from '@/pages/service/my-info.tsx'
import Notice from '@/pages/service/notice.tsx'

export default function Router() {
    return (
        <Routes>
            {/*ADMIN 로그인 되어 있으면 접속 못하게 처리*/}
            <Route element={<AdminGuestOnlyRoute />}>
                <Route path="/admin" element={<AdminMain />} />
                <Route path="/admin/auth/login" element={<AdminLogin />} />
                <Route path="/admin/auth/signup" element={<AdminSignup />} />
            </Route>
            {/*ADMIN 로그인 접속자만 접근*/}
            <Route element={<AdminPrivateRoute />}>
                <Route path="/admin/my" element={<AdminMyPage />} />
                <Route path="/admin/users/list" element={<AdminUsersPage />} />
                <Route path="/admin/users/create" element={<UsersCreatePage />} />
                <Route path="/admin/users/edit" element={<UsersEditPage />} />
                <Route path="/admin/users/all" element={<AdminAll />} />
            </Route>

            {/*USER 로그인 하지 않아도 접근*/}
            <Route path="/" element={<Index />} />
            <Route path="/movie" element={<MovieMain />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/board" element={<BoardMain />} />
            <Route path="/board/:boardId" element={<BoardDetail />} />

            {/*USER 로그인 접속자만 접근*/}
            <Route element={<PrivateOnlyRoute />}>
                <Route path="/board/create" element={<BoardCreate />} />
                <Route path="/my-info" element={<MyInfo />} />
            </Route>

            {/*USER 로그인 되어 있으면 접속 못하게 처리*/}
            <Route element={<GuestOnlyRoute />}>
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

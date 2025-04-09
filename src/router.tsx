import { Route, Routes } from 'react-router'

import AuthLayout from '@/pages/auth/auth-layout.tsx'
import Login from '@/pages/auth/login.tsx'
import Main from '@/pages/auth/main.tsx'
import MyPage from '@/pages/auth/my-page.tsx'
import Signup from '@/pages/auth/signup.tsx'
import All from '@/pages/users/dashboard/all.tsx'
import UsersCreatePage from '@/pages/users/users-create.tsx'
import UsersEditPage from '@/pages/users/users-edit.tsx'
import UsersPage from '@/pages/users/users-page.tsx'

export default function Router() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="" element={<Main />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
            </Route>
            <Route path="/my" element={<MyPage />} />
            <Route path="/users/list" element={<UsersPage />} />
            <Route path="/users/create" element={<UsersCreatePage />} />
            <Route path="/users/edit" element={<UsersEditPage />} />
            <Route path="/users/all" element={<All />} />
        </Routes>
    )
}

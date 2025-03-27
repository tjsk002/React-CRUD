import { Route, Routes } from 'react-router'

import Login from '@/pages/auth/login.tsx'
import Main from '@/pages/auth/main.tsx'
import Signup from '@/pages/auth/signup.tsx'
import All from '@/pages/users/dashboard/all.tsx'
import UsersCreatePage from '@/pages/users/users-create.tsx'
import UsersEditPage from '@/pages/users/users-edit.tsx'
import UsersPage from '@/pages/users/users-page.tsx'

export default function Router() {
    return (
        <Routes>
            <Route path="" element={<Main />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/users/list" element={<UsersPage />} />
            <Route path="/users/create" element={<UsersCreatePage />} />
            <Route path="/users/edit" element={<UsersEditPage />} />
            <Route path="/users/all" element={<All />} />
        </Routes>
    )
}

import { Route, Routes } from 'react-router'

import All from '@/pages/users/dashboard/all.tsx'
import UsersCreatePage from '@/pages/users/users-create.tsx'
import UsersEditPage from '@/pages/users/users-edit.tsx'
import UsersPage from '@/pages/users/users-page.tsx'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users/create/" element={<UsersCreatePage />} />
            <Route path="/users/edit/" element={<UsersEditPage />} />
            <Route path="/users/all" element={<All />} />
        </Routes>
    )
}

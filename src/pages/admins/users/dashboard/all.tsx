import DashboardView from '@/pages/admins/users/dashboard/dashboard.tsx'
import Statistics from '@/pages/admins/users/dashboard/statistics.tsx'

export default function All() {
    return (
        <div className="bg-gray-200 p-8">
            <DashboardView></DashboardView>
            <Statistics></Statistics>
        </div>
    )
}

import { usersDashboardApiData } from '@/api/mock/users-dashboard-api-data.ts'

export default function DashboardView() {
    return (
        <div className="mx-2">
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <p className="text-5xl">
                        {usersDashboardApiData.resultData.content.currentDate}
                    </p>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <h2 className="text-lg">누적 회원가입 수</h2>
                    <p className="text-2xl">
                        {usersDashboardApiData.resultData.content.totalRegistrations}
                    </p>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <h2 className="text-lg">오늘 회원가입 수</h2>
                    <p className="text-2xl">
                        {usersDashboardApiData.resultData.content.todayRegistrations}
                    </p>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <h2 className="text-lg">탈퇴 회원 수</h2>
                    <p className="text-2xl">
                        {usersDashboardApiData.resultData.content.totalWithdrawn}
                    </p>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <h2 className="text-lg">비활성화 회원 수</h2>
                    <p className="text-2xl">
                        {usersDashboardApiData.resultData.content.inactiveMembers}
                    </p>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded font-bold">
                    <h2 className="text-lg">활성화 회원 수</h2>
                    <p className="text-2xl">
                        {usersDashboardApiData.resultData.content.activeMembers}
                    </p>
                </div>
            </div>
        </div>
    )
}

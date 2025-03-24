export const usersDashboardApiData = {
    resultCode: 'A200',
    resultMessage: 'Success',
    resultData: {
        content: {
            totalRegistrations: 1500, // 누적 회원가입 수
            todayRegistrations: 20, // 오늘 회원가입한 수
            totalWithdrawn: 300, // 탈퇴 회원 수
            inactiveMembers: 100, // 비활성화 회원 수
            activeMembers: 1100, // 활성화 회원 수
            currentDate: new Date().toISOString().split('T')[0], // 오늘 날짜
        },
    },
}

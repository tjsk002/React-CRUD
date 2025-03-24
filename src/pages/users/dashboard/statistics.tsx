import { Chart } from 'react-google-charts'

import { usersStatisticsApiData } from '@/api/mock/users-statistics-api-data.ts'

export default function Statistics() {
    const data = [
        [
            'Date',
            'New Registrations',
            'Withdrawn Users',
            'Inactive Members',
            'Active Members',
            'Total Registrations',
        ],
        ...usersStatisticsApiData.resultData.content.map((item) => [
            item.date,
            item.todayRegistrations,
            item.totalWithdrawn,
            item.inactiveMembers,
            item.activeMembers,
            item.totalRegistrations,
        ]),
    ]

    const options = {
        title: 'User Registration & Activity Statistics',
        vAxis: { title: 'Users Count' },
        hAxis: { title: 'Date' },
        seriesType: 'bars',
        series: { 4: { type: 'line', lineWidth: 2 } },
        bar: { groupWidth: '100%' },
        colors: ['#A8DADC', '#457B9D', '#E9C46A', '#F4A261', '#E76F51'],
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-[1600px] px-4">
                <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="calc(100vw * 0.3)"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}

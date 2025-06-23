import { getNotices } from '@/api/notice.ts'
import Header from '@/pages/common/header.tsx'
import NoticeList from '@/pages/service/notice/list.tsx'
import { useQuery } from '@tanstack/react-query'

export default function Notice() {
    const { data } = useQuery({
        queryKey: ['notices'],
        queryFn: () => getNotices(),
    })

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <h1 className="text-xl font-semibold text-gray-800 mb-8">공지 사항</h1>
                <NoticeList noticeList={data?.list} />
            </main>
        </div>
    )
}

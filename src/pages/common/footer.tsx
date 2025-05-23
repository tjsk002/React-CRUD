import { useNavigate } from 'react-router'

export default function Footer() {
    const navigate = useNavigate()
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <footer className="bg-white text-center text-sm text-gray-500 py-4 mt-10">
            <div className="flex flex-col items-center gap-1">
                회사소개 | 제휴안내 | 광고안내 | 이용약관 | 개인정보처리방침 | 청소년보호정책
                <p>© 2025 FeedSpot. All rights reserved.</p>
                <a onClick={handleAdmin} className="text-blue-500 hover:underline cursor-default">
                    관리자 페이지
                </a>
            </div>
        </footer>
    )
}

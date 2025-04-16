export default function SubHeader() {
    return (
        <div className="bg-white shadow-sm sticky top-16 z-10">
            <nav className="px-40 py-3 border-b border-gray-200 flex gap-6 text-gray-600 text-sm font-medium">
                <a href="/movie" className="hover:text-blue-600 transition-colors">
                    🎬 박스오피스
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                    💬 자유 게시물 (준비중)
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                    🔥 인기 토론 (준비중)
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                    📝 내가 쓴 글 (준비중)
                </a>
            </nav>
        </div>
    )
}

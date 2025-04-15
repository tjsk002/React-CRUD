import { useState } from 'react'

interface User {
    username: string
    nickName: string
}

interface AccountMenuProps {
    user: User
}

export default function AccountMenu({ user }: AccountMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="relative text-sm">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 w-40 py-3 text-sm rounded-md bg-gray-100 hover:bg-gray-300 transition text-center cursor-default"
            >
                {user.username} ({user.nickName}) 님
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md border border-gray-200">
                    <button className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition">
                        내 정보
                    </button>
                    <button className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition">
                        로그아웃
                    </button>
                </div>
            )}
        </div>
    )
}

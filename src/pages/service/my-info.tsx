import { useState } from 'react'

import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'

export default function Profile() {
    // 더미 데이터 (실제로는 API로 가져오는 정보들)
    const user = {
        id: 'user123',
        created_at: '2025-01-15 09:00',
        updated_at: '2025-05-20 10:30',
        deleted_at: null,
        description: '영화를 좋아하는 지나가는 사람입니다. 마저 지나가겠습니다.',
        gender: '남성',
        is_active: true,
        nick_name: 'Chulsoo',
        role: 'Admin',
        type: 'Regular',
        user_name: '김철수',
    }

    const [editing, setEditing] = useState(false)
    const [description, setDescription] = useState(user.description)
    const [nickName, setNickName] = useState(user.nick_name)
    const [editingNickName, setEditingNickName] = useState(false)

    const handleSave = () => {
        // 실제 저장 로직 추가 가능
        setEditing(false)
    }

    const handleSaveNickName = () => {
        // 닉네임 저장 로직
        setEditingNickName(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <section className="mb-12">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">내 정보</h1>

                    {/* 사용자 정보 */}
                    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-gray-700 font-medium">
                                <strong>사용자 이름:</strong> <span>{user.user_name}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>닉네임:</strong>
                                {editingNickName ? (
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={nickName}
                                            onChange={(e) => setNickName(e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md"
                                        />
                                        <button
                                            onClick={handleSaveNickName}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            저장
                                        </button>
                                    </div>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <span>{nickName}</span>
                                        <button
                                            onClick={() => setEditingNickName(true)}
                                            className="text-blue-500"
                                        >
                                            수정
                                        </button>
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>성별:</strong> <span>{user.gender}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>이메일:</strong> <span>{user.id}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>역할:</strong> <span>{user.role}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>유형:</strong> <span>{user.type}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>계정 상태:</strong>{' '}
                                <span
                                    className={user.is_active ? 'text-green-500' : 'text-red-500'}
                                >
                                    {user.is_active ? '활성화' : '비활성화'}
                                </span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>가입일:</strong> <span>{user.created_at}</span>
                            </div>
                            <div className="text-gray-700 font-medium">
                                <strong>최근 수정일:</strong> <span>{user.updated_at}</span>
                            </div>
                            {user.deleted_at && (
                                <div className="text-gray-700 font-medium">
                                    <strong>삭제일:</strong> <span>{user.deleted_at}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 자기소개 */}
                    <div className="bg-white shadow-sm rounded-lg p-6 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">자기소개</h2>
                            {editing ? (
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    저장
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    수정
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-md"
                                rows={6}
                            />
                        ) : (
                            <p className="text-gray-600">{description}</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

/**
 * API 요청으로 받은 데이터를 테이블로 표시
 * 데이터 로드 중에는 테이블 행에 'Loading...' 텍스트 표시
 */
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router'

import { api } from '@/api/axios.ts'
import '@/assets/css/pagination.css'
import ActionButton from '@/pages/common/action-button.tsx'
import { UserInfo } from '@/pages/users/schema/user-info-schema.tsx'

export default function UsersPage() {
    const navigate = useNavigate()
    const [users, setUsers] = useState<UserInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    const fetchUsers = async (page: number) => {
        setLoading(true)
        await api
            .get(`/users?page=${page}`, {})
            .then((response) => {
                setUsers(response.data.resultData.content)
                setTotalPage(response.data.resultData.pageInfo.totalPages)
                setPageSize(response.data.resultData.pageInfo.pageSize)
                setTotalElements(response.data.resultData.pageInfo.totalElements)
                setLoading(false)
            })
            .catch((error) => {
                alert('오류 발생했습니다. ' + error)
                console.log(error)
            })
    }

    const handlePageChange = (page: { selected: number }) => {
        const newPage = page.selected
        setCurrentPage(newPage)
        fetchUsers(newPage)
    }

    const handleEdit = (user: UserInfo) => {
        const updatedUser = {
            ...user,
        }
        navigate(`/users/edit`, { state: updatedUser })
    }

    const viewCreateUser = () => {
        navigate(`/users/create`)
    }

    const viewDashboard = () => {
        navigate(`/users/all`)
    }

    const handleDelete = async (user: UserInfo) => {
        if (!confirm(`${user.username}을(를) 탈퇴하시겠습니까?`)) return

        await api
            .delete(`/users/${user.userId}`)
            .then(() => {
                alert('사용자가 탈퇴되었습니다.')
                fetchUsers(currentPage)
            })
            .catch((error) => {
                console.error('탈퇴 실패:', error)
                alert('탈퇴 중 오류가 발생했습니다.')
            })
    }

    useEffect(() => {
        fetchUsers(currentPage)
    }, [currentPage])

    const genderOptions: Record<string, string> = { male: '남성', female: '여성' }
    const typeOptions: Record<string, string> = {
        back: 'Back-end',
        front: 'Front-end',
        infra: 'Infra',
        dba: 'DBA',
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 mt-10">사용자 목록</h1>
            <div className="flex justify-between items-center">
                <div>{loading ? <p>Loading...</p> : <p>(총 {totalElements}명)</p>}</div>
                <div>
                    <button
                        className="border p-2 px-3 py-1 mb-2 mr-2.5 rounded cursor-pointer hover:text-blue-600 transition"
                        onClick={() => viewDashboard()}
                    >
                        대시보드 구경하러 가기
                    </button>
                    <button
                        className="border p-2 px-3 py-1 mb-2 rounded cursor-pointer hover:text-blue-600 transition"
                        onClick={() => viewCreateUser()}
                    >
                        사용자 추가
                    </button>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        <th className="border p-2">이름</th>
                        <th className="border p-2">닉네임</th>
                        <th className="border p-2">성별</th>
                        <th className="border p-2">상태</th>
                        <th className="border p-2">유형</th>
                        <th className="border p-2">설명</th>
                        <th className="border p-2">수정/탈퇴</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center p-4">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.nickName}</td>
                                <td className="border p-2">
                                    {user.gender && genderOptions[user.gender]}
                                </td>
                                <td className="border p-2">{user.isActive ? '활성' : '비활성'}</td>
                                <td className="border p-2">{typeOptions[user.type] || '기타'}</td>
                                <td className="border p-2">{user.description}</td>
                                <td className="border p-2 text-center">
                                    <ActionButton
                                        text="수정"
                                        onClick={() => handleEdit(user)}
                                        className="hover:text-blue-600"
                                    />
                                    <ActionButton
                                        text="탈퇴"
                                        onClick={() => handleDelete(user)}
                                        className="hover:text-red-600"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={totalPage}
                pageRangeDisplayed={pageSize}
                marginPagesDisplayed={1}
                breakLabel={'...'}
                previousLabel={'<'}
                nextLabel={'>'}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                containerClassName={'pagination'}
                activeClassName={'current-page'}
                previousClassName={'pageLabel-btn'}
                nextClassName={'pageLabel-btn'}
            />
        </div>
    )
}

import { useNavigate } from 'react-router'

interface ButtonProps {
    type: 'button' | 'submit'
    onClick?: () => void
    text: string
    className?: string
}

interface FormButtonProps {
    mode: 'create' | 'edit'
}

const ActionButton: React.FC<ButtonProps> = ({ type, onClick, text, className }) => {
    const baseClass = 'px-4 py-2 rounded text-white hover:bg-opacity-80'
    const buttonClass = className ? `${baseClass} ${className}` : baseClass

    return (
        <button type={type} onClick={onClick} className={buttonClass}>
            {text}
        </button>
    )
}

export default function FormButton({ mode }: FormButtonProps) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between mt-6">
            <ActionButton
                type="button"
                onClick={() => navigate(-1)}
                text="뒤로 가기"
                className="px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600"
            />
            <div className="flex gap-2">
                <ActionButton
                    type="submit"
                    text={mode === 'create' ? '등록' : '수정'}
                    className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700"
                />
            </div>
        </div>
    )
}

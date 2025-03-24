import * as React from 'react'

interface ActionButtonProps {
    text: string
    onClick: () => void
    className?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`border p-2 px-3 py-1 mx-2 rounded cursor-pointer transition ${className}`}
        >
            {text}
        </button>
    )
}

export default ActionButton

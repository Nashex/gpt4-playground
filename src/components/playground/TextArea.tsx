import React from 'react'

type Props = {
	title: string
	className?: string,
	placeholder?: string,
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
	title,
	onChange,
	placeholder,
	className = '',
}: Props) {
	return (
		<div
			className={`flex flex-col m-4 rounded border border-gray-300 p-4 ${className}`}
		>
			<label
				className="text-xs font-medium text-gray-700"
			>
				{title.toUpperCase()}
			</label>
			<textarea
				className="flex-1 mt-2 text-md text-gray-700 focus:outline-none resize-none"
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	)
}
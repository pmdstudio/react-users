import React, { useState, useEffect } from "react";

interface EditableTitleProps {
	title: string;
	onChange: (newTitle: string) => void;
}

export const EditableTitle: React.FC<EditableTitleProps> = ({
	title,
	onChange,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentTitle, setCurrentTitle] = useState(title);
	const [error, setError] = useState("");

	useEffect(() => {
		setCurrentTitle(title);
	}, [title]);

	const handleSave = () => {
		if (currentTitle.trim() === "") {
			setError("Title cannot be empty");
			return;
		}
		setError("");
		setIsEditing(false);
		onChange(currentTitle);
	};

	const handleCancel = () => {
		setCurrentTitle(title);
		setError("");
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			handleCancel();
		}
	};

	return (
		<>
			{isEditing ? (
				<>
					<input
						type='text'
						className={`form-control form-control-sm ${error ? "is-invalid" : ""} py-1 m-0`}
						value={currentTitle}
						autoFocus
						onChange={(e) => setCurrentTitle(e.target.value)}
						onBlur={handleSave}
						onKeyDown={handleKeyDown}
					/>
					{/* {error && <div className='invalid-feedback'>{error}</div>} */}
				</>
			) : (
				<div
					className='w-full h-full py-1 m-0 flex flex-grow-1 align-items-center'
					style={{ cursor: "pointer" }}
					onClick={() => {
						setIsEditing(true);
						setError("");
					}}>
					{currentTitle}
				</div>
			)}
		</>
	);
};

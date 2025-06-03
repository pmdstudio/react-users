import React from "react";

interface DeleteConfirmModalProps {
	show: boolean;
	onClose: () => void;
	onDeleteConfirm: () => void;
	itemName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
	show,
	onClose,
	onDeleteConfirm,
	itemName = "this item",
}) => {
	return (
		<div
			className={`modal fade ${show ? "show d-block" : ""}`}
			tabIndex={-1}
			role='dialog'
			style={{
				backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent",
			}}>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Delete</h5>
						<button
							type='button'
							className='btn-close'
							onClick={onClose}
							aria-label='Close'
						/>
					</div>
					<div className='modal-body'>
						<p>
							Are you sure you want to delete{" "}
							<strong>{itemName}</strong>?
						</p>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={onClose}>
							Cancel
						</button>
						<button
							type='button'
							className='btn btn-danger'
							onClick={onDeleteConfirm}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirmModal;

import React, { useEffect, useState } from "react";
import { User } from "../../../types";
import Loading from "../../../components/Loading";
import isEqual from "lodash.isequal";

type Props = {
	userData: User;
	onSubmit: (newUserData: User) => void;
	onClose: () => void;
};

const UserEdit: React.FC<Props> = ({ userData, onSubmit, onClose }) => {
	// local state to manage user data being edited, deep clone to avoid direct mutation
	const [editUserData, setEditUserData] = useState<User>(
		JSON.parse(JSON.stringify(userData))
	);

	const [invalidFields, setInvalidFields] = useState<string[]>([]);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [enableReset, setEnableReset] = useState<boolean>(false);
	const [enableSave, setEnableSave] = useState<boolean>(false);
	const [showValidationError, setShowValidationError] =
		useState<boolean>(false);

	// check if a field is valid
	const isValidField = React.useCallback(
		(name: string) => {
			return !invalidFields.includes(name);
		},
		[invalidFields]
	);

	// handle input changes and validation
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (value.trim() === "") {
			setInvalidFields((prev) => [...prev, name]);
		} else {
			setInvalidFields((prev) => prev.filter((field) => field !== name));
		}

		if (name === "street" || name === "suite" || name === "city") {
			setEditUserData((prev) => ({
				...prev,
				address: {
					...prev.address,
					[name]: value,
				},
			}));
		} else {
			setEditUserData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	// handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsEditing(true);

		// simulate loading state
		setTimeout(() => {
			onSubmit(editUserData);
			setIsEditing(false);
		}, 500);
	};

	// reset form to initial user data
	const handleReset = () => {
		setEditUserData(userData);
		setInvalidFields([]);
		setEnableReset(false);
		setEnableSave(false);
	};

	// track invalid fields and form changes
	useEffect(() => {
		// Only compare after initial mount to avoid isChanged being true on first render
		const isChanged = !isEqual(editUserData, userData);
		setEnableSave(isChanged && invalidFields.length === 0);
		setEnableReset(isChanged);
		setShowValidationError(invalidFields.length > 0);
	}, [editUserData, userData, invalidFields]);

	// Ensure editUserData is always in sync with userData
	useEffect(() => {
		setEditUserData(JSON.parse(JSON.stringify(userData)));
		setInvalidFields([]);
	}, [userData]);

	return (
		<div className='position-relative'>
			{isEditing && <Loading text='Updating user ...' />}

			<form onSubmit={handleSubmit} onReset={handleReset}>
				<div className='row'>
					<div className='col mb-3'>
						<label htmlFor='name' className='form-label'>
							<strong>Name: </strong>
						</label>
						<input
							type='text'
							className={`form-control ${!isValidField("name") ? "is-invalid" : ""}`}
							id='name'
							name='name'
							value={editUserData.name}
							onChange={handleChange}
						/>
					</div>
					<div className='col mb-3'>
						<label htmlFor='username' className='form-label'>
							<strong>Username:</strong>
						</label>
						<input
							type='text'
							className={`form-control ${!isValidField("username") ? "is-invalid" : ""}`}
							id='username'
							name='username'
							value={editUserData.username}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col mb-3'>
						<label htmlFor='email' className='form-label'>
							<strong>Email:</strong>
						</label>
						<input
							type='email'
							className={`form-control ${!isValidField("email") ? "is-invalid" : ""}`}
							id='email'
							name='email'
							value={editUserData.email}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col mb-3'>
						<label htmlFor='street' className='form-label'>
							<strong>Street:</strong>
						</label>
						<input
							type='text'
							className={`form-control ${!isValidField("street") ? "is-invalid" : ""}`}
							id='street'
							name='street'
							value={editUserData.address.street}
							onChange={handleChange}
						/>
					</div>
					<div className='col mb-3'>
						<label htmlFor='addressSuite' className='form-label'>
							<strong>Suite:</strong>
						</label>
						<input
							type='text'
							className={`form-control ${!isValidField("suite") ? "is-invalid" : ""}`}
							id='addressSuite'
							name='suite'
							value={editUserData.address.suite}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button
							type='submit'
							className='btn btn-primary'
							disabled={!enableSave}>
							Save Changes
						</button>
						{enableReset && (
							<button type='reset' className='btn btn-link'>
								Reset
							</button>
						)}
						{!enableReset && (
							<button
								className='btn btn-link text-danger'
								onClick={onClose}>
								Cancel
							</button>
						)}
					</div>
					<div className='col d-flex flex-column justify-content-center'>
						{showValidationError && (
							<span className='text-danger'>
								<em>Please fill all required fields</em>
							</span>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default UserEdit;

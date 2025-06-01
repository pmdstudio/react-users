import React, { useState } from 'react';
import { User } from '../../../types';
import Loading from '../../../components/Loading';

type Props = {
    userData: User;
    onSubmit: (newUserData: User) => void;
    onClose: () => void;
}

const UserEdit: React.FC<Props> = ({ userData, onSubmit, onClose }) => {

    const [editUserData, setEditUserData] = useState<User>({
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        address: {
            street: userData.address.street,
            suite: userData.address.suite,
            city: userData.address.city,
        },
    });

    // loading state for the form submission
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [enableButtons, setEnableButtons] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUserData(prev => ({
            ...prev,
            [name]: value
        }));
        setEnableButtons(true);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(true);
        // simulate loading state
        setTimeout(() => {
            onSubmit(editUserData);
            setIsEditing(false);
        }, 1000);
    };

    const handleReset = () => {
        setEditUserData(userData);
        setEnableButtons(false);
    };

    return (
        <div className='position-relative'>
        {isEditing && (
            <Loading text='Updating user ...'/>
        )}
        
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className='row'>
            <div className="col mb-3">
                <label htmlFor="name" className="form-label"><strong>Name: </strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editUserData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="col mb-3">
                <label htmlFor="username" className="form-label"><strong>Username:</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={editUserData.username}
                    onChange={handleChange}
                />
            </div>
            </div>
            <div className='row'>
            <div className="col mb-3">
                <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editUserData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="col mb-3">
                <label htmlFor="address" className="form-label"><strong>Address:</strong></label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={`${editUserData.address.street}, ${editUserData.address.suite}, ${editUserData.address.city}`}
                    onChange={handleChange}
                />
            </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!enableButtons}>Save Changes</button>
            {enableButtons && (
            <button type="reset" className="btn btn-link" disabled={!enableButtons}>Reset</button>
            )}
            {!enableButtons && (
               <button className="btn btn-link text-danger" onClick={onClose}>Cancel</button>
            )}
        </form>
        </div>

    );
};

export default UserEdit;
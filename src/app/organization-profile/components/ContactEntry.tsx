import { useState, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import XIcon from '@/components/icons/XIcon';
import ConfirmationModal from './ConfirmationModal';


interface ContactItemProps {
    name: string;
    phoneNumber: string;
    email: string;
    onEdit: (updatedContact: { name: string; phoneNumber: string; email: string }) => void;
    onDelete: () => void;
}

export default function ContactEntry({ name, phoneNumber, email, onEdit, onDelete}: ContactItemProps) {
    const [isNamePhoneEditable, setIsNamePhoneEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
    const [editedEmail, setEditedEmail] = useState(email);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const handleNamePhoneEditClick = () => {
        setIsNamePhoneEditable(true);
        setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 0);
    };

    const formatPhoneNumber = (phone: string): string => {
        const cleanedPhone = phone.replace(/\D/g, '');
        
        if (cleanedPhone.length <= 3) {
            return cleanedPhone;
        }
        
        if (cleanedPhone.length <= 6) {
            return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3)}`;
        }
        
        return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3, 6)}-${cleanedPhone.slice(6, 10)}`;
    };

    const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPhoneNumber(formatPhoneNumber(e.target.value));
    };

    const handleEmailEditClick = () => {
        setIsEmailEditable(true);
        setTimeout(() => emailInputRef.current && emailInputRef.current.focus(), 0);
    };
    
    const validatePhone = () => {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (phoneRegex && !phoneRegex.test(editedPhoneNumber)) {
            return false;
        }
        if (!editedPhoneNumber) {
            return false;
        }
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex && !emailRegex.test(editedEmail)) {
            return false;
        }
        if (!editedEmail) {
            return false;
        }
        return true;
    };

    const handleNamePhoneKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validatePhone()) {
            setIsNamePhoneEditable(false);
            onEdit({ name: editedName, phoneNumber: editedPhoneNumber, email: editedEmail });
        }
    };

    const handleEmailKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateEmail()) {
            setIsEmailEditable(false);
            onEdit({ name: editedName, phoneNumber: editedPhoneNumber, email: editedEmail });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const handleConfirmDelete = () => {
        onDelete();
        closeModal();
    };

    return (
        <div className="w-full mb-4">
            <div className="flex flex-row justify-between items-center pt-2">
                <div className="flex flex-row justify-between w-full space-x-4">
                    {isNamePhoneEditable ? (
                        <>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Name</h3>
                                <input
                                    type="text"
                                    value={editedName}
                                    ref={nameInputRef}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={handleNamePhoneKeyDown}
                                    className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 w-11/12 rounded bg-transparent"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Phone Number</h3>
                                <input
                                    type="tel"
                                    value={editedPhoneNumber}
                                    onChange={handlePhoneInputChange}
                                    onKeyDown={handleNamePhoneKeyDown}
                                    className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 w-full rounded bg-transparent"
                                />
                            </div> 
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Name</h3>
                                <p className="text-black text-2xl font-cabin-condensed">{name}</p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Phone Number</h3>
                                <p className="text-black text-2xl font-cabin-condensed">{phoneNumber}</p>
                            </div> 
                        </>
                    )}
                </div>

                <button className="self-start py-2 pr-2" onClick={handleNamePhoneEditClick}>
                    <EditIcon />
                </button>
            </div>

            <hr className="border-[#00000066] border-1 mt-2" />

            <div className="flex flex-row justify-between items-center pt-2">
                <div className="flex flex-row justify-between w-full space-x-4">
                    {isEmailEditable ? (
                        <>
                            <div className="flex flex-col w-full">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Email</h3>
                                    <input
                                        type="email"
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                        onKeyDown={handleEmailKeyDown}
                                        className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 w-full rounded bg-transparent"
                                    />
                            </div>  
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Email</h3>
                                <p className="text-black text-2xl font-cabin-condensed break-all whitespace-normal">{email}</p>
                            </div> 
                        </>
                    )}
                </div>

                <div className="self-start flex flex-col justify-end space-y-5">
                    <button className="ml-1" onClick={handleEmailEditClick}>
                        <EditIcon />
                    </button>
                    <button onClick={openModal}>
                        <XIcon />
                    </button>
                </div>
            </div>

            <hr className="border-[#00000066] border-1 mt-2" />
            
            <ConfirmationModal
                isOpen={isModalOpen}
                message='Are you sure you want to delete this contact?'
                onConfirm={handleConfirmDelete}
                confirmText='Yes'
                onCancel={closeModal}
                cancelText='No'
            />
        </div>
    );
}
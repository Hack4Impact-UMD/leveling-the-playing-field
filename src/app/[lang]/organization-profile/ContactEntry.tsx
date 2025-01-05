import { useState, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import XIcon from '@/components/icons/XIcon';
import ConfirmationModal from './ConfirmationModal';
import AttentionCircleIcon from '@/components/icons/AttentionCircleIcon';


interface ContactItemProps {
    dictLabels : any;
    dictErrors : any;
    name: string;
    phoneNumber: string;
    email: string;
    onEdit: (updatedContact: { name: string; phoneNumber: string; email: string }) => void;
    onDelete: () => void;
}

export default function ContactEntry({ dictLabels, dictErrors, name, phoneNumber, email, onEdit, onDelete}: ContactItemProps) {
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
    const [editedEmail, setEditedEmail] = useState(email);
    const [isInvalidName, setIsInvalidName] = useState(false);
    const [isInvalidPhone, setIsInvalidPhone] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const handleNameEditClick = () => {
        setIsNameEditable(true);
        setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 0);
    };

    const handlePhoneEditClick = () => {
        setIsPhoneEditable(true);
        setTimeout(() => phoneInputRef.current && phoneInputRef.current.focus(), 0);
    };

    const handleEmailEditClick = () => {
        setIsEmailEditable(true);
        setTimeout(() => emailInputRef.current && emailInputRef.current.focus(), 0);
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
    
    const validatePhone = () => {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (phoneRegex && !phoneRegex.test(editedPhoneNumber)) {
            setIsInvalidPhone(true)
            return false;
        }
        if (!editedPhoneNumber) {
            setIsInvalidPhone(true)
            return false;
        }
        setIsInvalidPhone(false)
        return true;
    };

    const validateName = () => {
        setIsInvalidName(!editedName.trim());
        return editedName.trim().length > 0;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex && !emailRegex.test(editedEmail)) {
            setIsInvalidEmail(true)
            return false;
        }
        if (!editedEmail) {
            setIsInvalidEmail(true)
            return false;
        }
        setIsInvalidEmail(false)
        return true;
    };

    const handleNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateName()) {
            setIsNameEditable(false);
            onEdit({ name: editedName, phoneNumber: editedPhoneNumber, email: editedEmail });
        }
    };

    const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validatePhone()) {
            setIsPhoneEditable(false);
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
            <div className="flex flex-row space-x-4 pt-2">
                <div className="basis-2/5">
                    <div className="flex items-center">
                        <div className="flex-grow flex flex-col">
                            <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dictLabels.name.text}</label>
                            {isNameEditable ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    ref={nameInputRef}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={handleNameKeyDown}
                                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalidName ? 'border-red-500' : 'border-gray-400'}`}
                                />
                            ) : (
                                <p className="text-black text-2xl font-cabin-condensed">{name}</p>
                            )}
                        </div>
                        <button className="self-start py-2 pr-2" onClick={handleNameEditClick}>
                            <EditIcon />
                        </button>
                    </div>
                    <hr className={`border-1 mt-2 ${isInvalidName ? 'border-red-500' : 'border-[#00000066]'}`} />
                    {isInvalidName && (
                        <div className="flex flex-row items-center space-x-1">
                            <AttentionCircleIcon />
                            <p className="text-[#00000066] text-[10px]">{dictErrors.contactName.text}</p>
                        </div>
                    )}
                </div>

                <div className="basis-3/5">
                    <div className="flex items-center">
                        <div className="flex-grow flex flex-col">
                            <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dictLabels.phone.text}</label>
                            {isPhoneEditable ? (
                                <input
                                    type="tel"
                                    value={editedPhoneNumber}
                                    ref={phoneInputRef}
                                    onChange={handlePhoneInputChange}
                                    onKeyDown={handlePhoneKeyDown}
                                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalidPhone ? 'border-red-500' : 'border-gray-400'}`}
                                />
                            ) : (
                                <p className="text-black text-2xl font-cabin-condensed">{phoneNumber}</p>
                            )}
                        </div>
                        <button className="self-start py-2 pr-2" onClick={handlePhoneEditClick}>
                            <EditIcon />
                        </button>
                    </div>
                    <hr className={`border-1 mt-2 ${isInvalidPhone ? 'border-red-500' : 'border-[#00000066]'}`} />
                    {isInvalidPhone && (
                        <div className="flex flex-row items-center space-x-1">
                            <AttentionCircleIcon />
                            <p className="text-[#00000066] text-[10px]">{dictErrors.contactPhoneNumber.text}r</p>
                        </div>
                    )}
                </div>                
            </div>



            <div className="flex items-center mt-4">
                <div className="flex-grow flex flex-col">
                    <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dictLabels.email.text}</label>
                    {isEmailEditable ? (
                        <input
                            type="email"
                            value={editedEmail}
                            ref={emailInputRef}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            onKeyDown={handleEmailKeyDown}
                            className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalidEmail ? 'border-red-500' : 'border-gray-400'}`}
                        />
                    ) : (
                        <p className="text-black text-2xl font-cabin-condensed break-words whitespace-normal">{email}</p>
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
            <hr className={`border-1 mt-2 ${isInvalidEmail ? 'border-red-500' : 'border-[#00000066]'}`} />
            {isInvalidEmail && (
                <div className="flex flex-row items-center space-x-1">
                    <AttentionCircleIcon />
                    <p className="text-[#00000066] text-[10px]">{dictErrors.contactEmail.text}</p>
                </div>
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                message={dictLabels.deletePopup.confirmationText.text}
                onConfirm={handleConfirmDelete}
                confirmText={dictLabels.deletePopup.yes.text}
                onCancel={closeModal}
                cancelText={dictLabels.deletePopup.no.text}
            />    
        </div>
    );
}
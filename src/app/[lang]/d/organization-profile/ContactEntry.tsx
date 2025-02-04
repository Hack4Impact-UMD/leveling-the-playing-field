import { useState, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import XIcon from '@/components/icons/XIcon';
import ConfirmationModal from './ConfirmationModal';
import AttentionCircleIcon from '@/components/icons/AttentionCircleIcon';
import { Contact } from '@/types/types';
import { useI18n } from '@/components/I18nProvider';


interface ContactItemProps {
    firstName: string;
    lastName: string
    phoneNumber: string;
    email: string;
    onEdit: (updatedContact: Partial<Contact>) => void;
    onDelete: () => void;
}

export default function ContactEntry({ firstName, lastName, phoneNumber, email, onEdit, onDelete}: ContactItemProps) {
    const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
    const [isLastNameEditable, setIsLastNameEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(firstName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
    const [editedEmail, setEditedEmail] = useState(email);
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
    const [isInvalidLastName, setIsInvalidLastName] = useState(false);
    const [isInvalidPhone, setIsInvalidPhone] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const { dict } = useI18n();

    const handleFirstNameEditClick = () => {
        setIsFirstNameEditable(true);
        setTimeout(() => firstNameInputRef.current && firstNameInputRef.current.focus(), 0);
    };

    const handleLastNameEditClick = () => {
        setIsLastNameEditable(true);
        setTimeout(() => lastNameInputRef.current && lastNameInputRef.current.focus(), 0);
    }

    const handlePhoneEditClick = () => {
        setIsPhoneEditable(true);
        console.log(phoneInputRef.current)
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

    const validateFirstName = () => {
        setIsInvalidFirstName(!editedFirstName.trim());
        return editedFirstName.trim().length > 0;
    };

    const validateLastName = () => {
      setIsInvalidLastName(!editedLastName.trim());
      return editedLastName.trim().length > 0;
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

    const handleFirstNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateFirstName()) {
            setIsFirstNameEditable(false);
            onEdit({ FirstName: editedFirstName });
        }
    };

    const handleLastNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateLastName()) {
            setIsLastNameEditable(false);
            onEdit({ LastName: editedLastName });
        }
    }

    const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validatePhone()) {
            setIsPhoneEditable(false);
            onEdit({ Phone: editedPhoneNumber });
        }
    };

    const handleEmailKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateEmail()) {
            setIsEmailEditable(false);
            onEdit({ Email: editedEmail });
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
                            <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dict.profilePage.contact.firstName.text}</label>
                            {isFirstNameEditable ? (
                                <input
                                    type="text"
                                    value={editedFirstName}
                                    ref={firstNameInputRef}
                                    onChange={(e) => setEditedFirstName(e.target.value)}
                                    onKeyDown={handleFirstNameKeyDown}
                                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalidFirstName ? 'border-red-500' : 'border-gray-400'}`}
                                />
                            ) : (
                                <p className="text-black text-2xl font-cabin-condensed">{firstName}</p>
                            )}
                        </div>
                        <button className="self-start py-2 pr-2" onClick={handleFirstNameEditClick}>
                            <EditIcon />
                        </button>
                    </div>
                    <hr className={`border-1 mt-2 ${isInvalidFirstName ? 'border-red-500' : 'border-[#00000066]'}`} />
                    {isInvalidFirstName && (
                        <div className="flex flex-row items-center space-x-1">
                            <AttentionCircleIcon />
                            <p className="text-[#00000066] text-[10px]">{dict.profilePage.errors.contactName.text}</p>
                        </div>
                    )}
                </div>
                <div className="basis-2/5">
                    <div className="flex items-center">
                        <div className="flex-grow flex flex-col">
                            <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dict.profilePage.contact.lastName.text}</label>
                            {isLastNameEditable ? (
                                <input
                                    type="text"
                                    value={editedLastName}
                                    ref={lastNameInputRef}
                                    onChange={(e) => setEditedLastName(e.target.value)}
                                    onKeyDown={handleLastNameKeyDown}
                                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalidLastName ? 'border-red-500' : 'border-gray-400'}`}
                                />
                            ) : (
                                <p className="text-black text-2xl font-cabin-condensed">{lastName}</p>
                            )}
                        </div>
                        <button className="self-start py-2 pr-2" onClick={handleLastNameEditClick}>
                            <EditIcon />
                        </button>
                    </div>
                    <hr className={`border-1 mt-2 ${isInvalidLastName ? 'border-red-500' : 'border-[#00000066]'}`} />
                    {isInvalidLastName && (
                        <div className="flex flex-row items-center space-x-1">
                            <AttentionCircleIcon />
                            <p className="text-[#00000066] text-[10px]">{dict.profilePage.errors.contactName.text}</p>
                        </div>
                    )}
                </div> 
                <button onClick={openModal}>
                    <XIcon />
                </button>
            </div>

            <div className="basis-3/5">
                <div className="flex items-center">
                    <div className="flex-grow flex flex-col">
                        <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dict.profilePage.contact.phone.text}</label>
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
                        <p className="text-[#00000066] text-[10px]">{dict.profilePage.errors.contactPhoneNumber.text}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center mt-4">
                <div className="flex-grow flex flex-col">
                    <label className="text-gray-500 text-lg font-cabin-condensed"><span className="text-red-500">*</span>{dict.profilePage.contact.email.text}</label>
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
                </div>
            </div>
            <hr className={`border-1 mt-2 ${isInvalidEmail ? 'border-red-500' : 'border-[#00000066]'}`} />
            {isInvalidEmail && (
                <div className="flex flex-row items-center space-x-1">
                    <AttentionCircleIcon />
                    <p className="text-[#00000066] text-[10px]">{dict.profilePage.errors.contactEmail.text}</p>
                </div>
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                message={dict.profilePage.contact.deletePopup.confirmationText.text}
                onConfirm={handleConfirmDelete}
                confirmText={dict.profilePage.contact.deletePopup.yes.text}
                onCancel={closeModal}
                cancelText={dict.profilePage.contact.deletePopup.no.text}
            />    
        </div>
    );
}
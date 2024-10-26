import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';

interface EditableFieldProps {
    label: string;
    value: string;
    type: string;
    pattern?: RegExp; 
    onSave: (newValue: string) => void;
}

export default function EditableField({ label, type, value, pattern, onSave }: EditableFieldProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const validateField = () => {
        if (pattern && !pattern.test(inputValue)) {
            return false;
        }
        if (!inputValue) {
            return false;
        }
        return true;
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

    const handleEditClick = () => {
        setIsEditable(true);
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && validateField()) {
            setIsEditable(false);
            onSave(inputValue); 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = type === 'tel' ? formatPhoneNumber(e.target.value) : e.target.value;
        setInputValue(formattedValue);
    };

    return (
        <div className="w-full pl-2">
            <div className="flex flex-row items-center py-2">
                <div className="flex flex-col flex-grow">
                    <h3 className="text-gray-500 text-lg font-cabin-condensed">{label}</h3>
                    {isEditable ? (
                        <>
                            <input
                                type={type}
                                value={inputValue}
                                ref={inputRef}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 rounded w-full bg-transparent"
                            />
                        </>
                    ) : (
                        <>
                            <p className="text-black text-2xl font-cabin-condensed break-words whitespace-normal">{value}</p>
                        </>
                    )}
                </div>

                <button className="self-start ml-2 mt-2" onClick={handleEditClick}>
                    <EditIcon />
                </button>
            </div>
            <hr className="border-[#00000066] border-1" />
        </div>
    );
};
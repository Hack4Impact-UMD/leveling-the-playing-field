import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import AttentionCircleIcon from '@/components/icons/AttentionCircleIcon';

interface EditableFieldProps {
    error: any;
    label: string;
    value: string;
    type: string;
    pattern?: RegExp; 
    onSave: (newValue: string) => void;
    required?: boolean;
}

export default function EditableField({ error, label, type, value, pattern, onSave, required}: EditableFieldProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [isInvalid, setIsInvalid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const validateField = () => {
        if ((required && !inputValue) || (pattern && !pattern.test(inputValue))) {
            setIsInvalid(true);
            return false;
        }
        setIsInvalid(false);
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
                    <h3 className="text-gray-500 text-lg font-cabin-condensed">
                        {required && <span className="text-red-500">* </span>}
                        {label}</h3>
                    {isEditable ? (
                        <>
                            <input
                                type={type}
                                value={inputValue}
                                ref={inputRef}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${isInvalid ? 'border-red-500' : 'border-gray-400'}`}
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
            <hr className={`border-1 ${isInvalid ? 'border-red-500' : 'border-[#00000066]'}`} />
            {isInvalid &&
                <div className="flex flex-row items-center space-x-1">
                    <AttentionCircleIcon />
                    <p className="text-[#00000066] text-[10px]">{error}</p>
                </div>
            }
        </div>
    );
};


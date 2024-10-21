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

    return (
        <div className="w-full pl-2">
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col w-full">
                    <h3 className="text-gray-500 text-lg font-cabin-condensed">{label}</h3>
                    {isEditable ? (
                        <>
                            <input
                                type={type}
                                value={inputValue}
                                ref={inputRef}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 rounded w-full bg-transparent"
                            />
                        </>
                    ) : (
                        <>
                            <p className="text-black text-2xl font-cabin-condensed">{value}</p>
                        </>
                    )}
                </div>

                <button className="self-start py-2 pr-2" onClick={handleEditClick}>
                    <EditIcon />
                </button>
            </div>
            <hr className="border-[#00000066] border-1" />
        </div>
    );
};
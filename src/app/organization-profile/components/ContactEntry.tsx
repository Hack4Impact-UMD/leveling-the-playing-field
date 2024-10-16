import { useState, useRef } from 'react';
import EditIcon from '@/components/icons/EditIcon';

interface ContactItemProps {
    name: string;
    email: string;
    onEdit: (updatedContact: { name: string; email: string }) => void;
}

export default function ContactEntry({ name, email, onEdit }: ContactItemProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        setIsEditable(true);
        setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditable(false);
            onEdit({ name: editedName, email: editedEmail });
        }
    };

    return (
        <div className="w-full mb-4">
            <div className="flex flex-row justify-between items-center pt-2">
                <div className="flex flex-row justify-between w-full space-x-4">
                    {isEditable ? (
                        <>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Name</h3>
                                <input
                                    type="text"
                                    value={editedName}
                                    ref={nameInputRef}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="text-black text-2xl font-cabin-condensed border-2 border-gray-400 w-11/12 rounded bg-transparent"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Email</h3>
                                <input
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
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
                                <h3 className="text-gray-500 text-lg font-cabin-condensed">Email</h3>
                                <p className="text-black text-2xl font-cabin-condensed">{email}</p>
                            </div> 
                        </>
                    )}
                </div>

                <button className="self-start py-2 pr-2" onClick={handleEditClick}>
                    <EditIcon />
                </button>
            </div>
            <hr className="border-[#00000066] border-1 mt-2" />
        </div>
    );
}
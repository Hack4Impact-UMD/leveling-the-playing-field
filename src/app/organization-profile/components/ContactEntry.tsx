import { Cabin_Condensed } from 'next/font/google';

const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

interface ContactItemProps {
    name: string;
    email: string;
}

export default function ContactEntry({ name, email }: ContactItemProps) {
    return (
        <div className="w-full mb-4">
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-col">
                    <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Name</h3>
                    <p className={`text-black text-2xl ${cabinCondensed.className}`}>{name}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className={`text-gray-500 text-lg ${cabinCondensed.className}`}>Email</h3>
                    <p className={`text-black text-2xl ${cabinCondensed.className}`}>{email}</p>
                </div>
            </div>
            <hr className="border-[#00000066] border-2" />
        </div>
    );
}
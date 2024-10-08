import { Cabin_Condensed } from 'next/font/google';

const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

interface GeneralHeaderProps {
    title: string;
}

export default function ProfileHeader({ title }: GeneralHeaderProps) {
    return (
        <div className="w-3/4 bg-[#14676B99] p-4 my-8 rounded-lg">
            <h2 className={`text-black text-2xl font-medium ${cabinCondensed.className}`}>{title}</h2>
        </div>
    );
}
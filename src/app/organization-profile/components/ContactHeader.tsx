import Image from 'next/image';
import { Cabin_Condensed } from 'next/font/google';
import add_button from "@/app/_images/add_button.svg";

const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

interface ContactHeaderProps {
    onAddContact: () => void;
}

export default function ContactHeader({ onAddContact }: ContactHeaderProps) {
    return (
        <div className="w-3/4 flex flex-row items-center justify-between bg-[#14676B99] p-4 rounded-lg">
            <h2 className={`text-black text-2xl font-medium ${cabinCondensed.className}`}>Points of contact</h2>
            <button onClick={onAddContact}> 
                <Image src={add_button} alt="add contact" width={24} height={24} />
            </button>
        </div>
    );
}
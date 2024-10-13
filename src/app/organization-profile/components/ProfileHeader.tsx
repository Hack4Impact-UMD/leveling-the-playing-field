interface GeneralHeaderProps {
    title: string;
}

export default function ProfileHeader({ title }: GeneralHeaderProps) {
    return (
        <div className="w-11/12 bg-[#14676B99] px-4 py-2 mt-6 rounded-lg">
            <h2 className="text-black text-2xl font-medium font-cabin-condensed">{title}</h2>
        </div>
    );
}
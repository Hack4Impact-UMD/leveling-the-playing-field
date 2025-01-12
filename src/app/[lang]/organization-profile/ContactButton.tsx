import PlusIcon from '@/components/icons/PlusIcon';

interface ContactButtonProps {
  label: string;
  className?: string;
}

export default function ContactButton({ label, className = '' }: ContactButtonProps) {
  return (
    <button className={`flex items-center text-black font-cabin-condensed h-[18px] w-auto border border-black rounded-full ${className}`}>
      <PlusIcon /> 
      <div className="w-full px-2">
        {label} 
      </div>
    </button>
  );
}
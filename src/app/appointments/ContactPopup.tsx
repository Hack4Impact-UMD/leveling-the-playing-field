import React, {useState, useEffect} from 'react';
import EditIcon from '@/components/icons/EditIcon';
import XIcon from '@/components/icons/XIcon';
import { getDict, Locale } from '@/lib/i18n/dictionaries';
import LoadingPage from '../[lang]/loading';

interface ContactPopupProps {
    onButtonClick: () => void; 
    lang: Locale
  }
  
const ContactPopup = ({ onButtonClick, lang }: ContactPopupProps) => {
  const [dict, setDict] = useState<{ [key: string]: any } | null>(null);
  useEffect(() => { 
    const loadDict = async () => {
      try {
        const loadedDict = await getDict(lang);
        setDict(loadedDict);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };
    loadDict();
 }, [lang]);
  
if (!dict) return <LoadingPage />;
    return (
        <div>
        <button className="absolute top-2 right-2" onClick={onButtonClick}>
            <XIcon />
        </button>
        <div className="bg-white-dark rounded-xl p-4 w-80 mx-auto shadow-lg text-black">
            <h1 className="text-md font-bold mb-3 text-center font-bree-serif">{dict.appointmentsPage.contactPopup.contactTitle.text}</h1>
           
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Name</h2>
                <EditIcon />
            </div>
            
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Phone Number</h2>
                <EditIcon />
            </div>
            
            <div className="flex items-center justify-center">
                <h2 className="text-md mr-2 font-cabin-condensed">Email</h2>
                <EditIcon />
            </div>

            <div className="flex justify-around text-black">
                <button className="bg-orange px-6 py-1 rounded-lg font-bree-serif"> {dict.appointmentsPage.contactPopup.yes.text}</button>
                <button className="bg-teal-light px-6 py-1  rounded-lg font-bree-serif"> {dict.appointmentsPage.contactPopup.no.text}</button>
            </div>
        </div>
        </div>
    );
}
export default ContactPopup;

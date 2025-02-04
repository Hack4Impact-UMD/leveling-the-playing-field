import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";
import ContactButton from "./ContactButton";
import { useState } from "react";
import AttentionCircleIcon from "@/components/icons/AttentionCircleIcon";
import { Contact } from "@/types/types";
import { useI18n } from "@/components/I18nProvider";

interface AddContactModalProps {
  handleAddContact: (newContact: Partial<Contact>) => void;
}

export default function AddContactModal(props: AddContactModalProps) {
  const { handleAddContact } = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isInvalidFirstName, setIsInvalidFirstName] = useState<boolean>(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState<boolean>(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);

  const { dict } = useI18n();

  const validatePhone = () => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (phoneRegex && !phoneRegex.test(phone)) {
      setIsInvalidPhone(true);
      return false;
    }
    if (!phone) {
      setIsInvalidPhone(true);
      return false;
    }
    setIsInvalidPhone(false);
    return true;
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleanedPhone = phone.replace(/\D/g, "");

    if (cleanedPhone.length <= 3) {
      return cleanedPhone;
    }

    if (cleanedPhone.length <= 6) {
      return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(3)}`;
    }

    return `${cleanedPhone.slice(0, 3)}-${cleanedPhone.slice(
      3,
      6
    )}-${cleanedPhone.slice(6, 10)}`;
  };

  const validateFirstName = () => {
    setIsInvalidFirstName(!firstName.trim());
    return firstName.trim().length > 0;
  };

  const validateLastName = () => {
    setIsInvalidLastName(!lastName.trim());
    return lastName.trim().length > 0;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex && !emailRegex.test(email)) {
      setIsInvalidEmail(true);
      return false;
    }
    if (!email) {
      setIsInvalidEmail(true);
      return false;
    }
    setIsInvalidEmail(false);
    return true;
  };

  const handleAddContactClick = async () => {
    if (!validateFirstName() || !validateLastName() || !validatePhone() || !validateEmail()) {
      return;
    }
    await handleAddContact({
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Email: email,
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <DialogTitle className="hidden">
          {dict.profilePage.contact.button.text}
        </DialogTitle>
        <ContactButton label={dict.profilePage.contact.button.text} />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between items-center w-4/5 h-2/5 rounded-lg bg-teal">
        <div className="w-full mb-4">
          <div className="flex flex-row space-x-4 pt-2">
            <div className="basis-1/2">
              <div className="flex items-center">
                <div className="flex-grow flex flex-col">
                  <label className="text-white text-lg font-cabin-condensed">
                    <span className="text-red-500">*</span>
                    {dict.profilePage.contact.firstName.text}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${
                      isInvalidFirstName ? "border-red-500" : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
              <hr
                className={`border-1 mt-2 ${
                  isInvalidFirstName ? "border-red-500" : "border-[#00000066]"
                }`}
              />
              {isInvalidFirstName && (
                <div className="flex flex-row items-center space-x-1">
                  <AttentionCircleIcon />
                  <p className="text-white text-[10px]">
                    {dict.profilePage.errors.contactName.text}
                  </p>
                </div>
              )}
            </div>
            <div className="basis-1/2">
              <div className="flex items-center">
                <div className="flex-grow flex flex-col">
                  <label className="text-white text-lg font-cabin-condensed">
                    <span className="text-red-500">*</span>
                    {dict.profilePage.contact.lastName.text}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${
                      isInvalidLastName ? "border-red-500" : "border-gray-400"
                    }`}
                  />
                </div>
              </div>
              <hr
                className={`border-1 mt-2 ${
                  isInvalidLastName ? "border-red-500" : "border-[#00000066]"
                }`}
              />
              {isInvalidLastName && (
                <div className="flex flex-row items-center space-x-1">
                  <AttentionCircleIcon />
                  <p className="text-white text-[10px]">
                    {dict.profilePage.errors.contactName.text}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="basis-3/5">
            <div className="flex items-center">
              <div className="flex-grow flex flex-col">
                <label className="text-white text-lg font-cabin-condensed">
                  <span className="text-red-500">*</span>
                  {dict.profilePage.contact.phone.text}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${
                    isInvalidPhone ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
            </div>
            <hr
              className={`border-1 mt-2 ${
                isInvalidPhone ? "border-red-500" : "border-[#00000066]"
              }`}
            />
            {isInvalidPhone && (
              <div className="flex flex-row items-center space-x-1">
                <AttentionCircleIcon />
                <p className="text-white text-[10px]">
                  {dict.profilePage.errors.contactPhoneNumber.text}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center mt-4">
            <div className="flex-grow flex flex-col">
              <label className="text-white text-lg font-cabin-condensed">
                <span className="text-red-500">*</span>
                {dict.profilePage.contact.email.text}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`text-black text-2xl font-cabin-condensed border-2 rounded w-full bg-transparent ${
                  isInvalidEmail ? "border-red-500" : "border-gray-400"
                }`}
              />
            </div>
          </div>
          <hr
            className={`border-1 mt-2 ${
              isInvalidEmail ? "border-red-500" : "border-[#00000066]"
            }`}
          />
          {isInvalidEmail && (
            <div className="flex flex-row items-center space-x-1">
              <AttentionCircleIcon />
              <p className="text-white text-[10px]">
                {dict.profilePage.errors.contactEmail.text}
              </p>
            </div>
          )}
        </div>
        <DialogClose className="w-1/2 h-3/4 bg-orange hover:bg-orange-light rounded-lg">
          <button onClick={handleAddContactClick}>
            {dict.profilePage.contact.button.text}
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

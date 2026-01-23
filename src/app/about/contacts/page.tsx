"use client";

import ContactForm from "@/components/forms/ContactForm";
import ContactsInfo from "@/components/cards/ContactsInfo";
import { useGetContactsQuery } from "@/services/strapiApi";

export default function ContactsPage() {
  const { data, isFetching } = useGetContactsQuery();
  const contactsData = data?.data ?? null;

  // Статические данные как fallback (из макета)
  const staticContacts = {
    address: "г. Липецк, ул. Советская, д. 7",
    phones: [
      "8(4742) 74-69-23 - Директор",
      "8(4742) 74-68-54 - Заместитель директора, отдел военно-патриотического воспитания",
      "8(4742) 22-78-24 – Отдел гражданско-патриотического воспитания",
    ],
    email: "cpv48@mail.ru",
    website: "патриот48.рф",
  };

  // Обработка данных из API
  const contacts = contactsData?.attributes?.main
    ? {
        address: contactsData.attributes.main.address,
        phones: contactsData.attributes.main.phones.map(
          (phone) => `${phone.number} - ${phone.label}`
        ),
        email: contactsData.attributes.main.email,
        website: contactsData.attributes.main.website,
      }
    : staticContacts;

  if (isFetching && !contactsData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-[12px] md:text-[16px] lg:text-[24px] font-montserrat font-normal text-gray-600">
            Загрузка контактов...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Контактная информация */}
      <ContactsInfo
        address={contacts.address}
        phones={contacts.phones}
        email={contacts.email}
        website={contacts.website}
      />

      {/* Форма обратной связи */}
      <ContactForm />
    </div>
  );
}

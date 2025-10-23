"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/forms/ContactForm";
import ContactsInfo from "@/components/cards/ContactsInfo";

// Интерфейс для данных контактов
interface ContactData {
  id: number;
  attributes: {
    main: {
      address: string;
      website: string;
      email: string;
      map_embed?: string;
      phones: Array<{
        id: number;
        label: string;
        number: string;
      }>;
    };
  };
}

interface ContactsResponse {
  data: ContactData | null;
  meta: Record<string, unknown>;
}

// Функция для получения данных контактов из Strapi
async function getContactsData(): Promise<ContactsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(
      `${apiUrl}/api/contact-page?populate[main][populate][phones]=true`,
      {
        cache: "no-store", // Всегда без кэша
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch contacts data:",
        res.status,
        res.statusText
      );
      return { data: null, meta: {} };
    }

    const data = await res.json();
    console.log("Contacts data from API:", data); // Для отладки
    return data;
  } catch (error) {
    console.error("Error fetching contacts data:", error);
    return { data: null, meta: {} };
  }
}

export default function ContactsPage() {
  const [contactsData, setContactsData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContactsData();
        setContactsData(data.data);
      } catch (error) {
        console.error("Error loading contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Загрузка контактов...</p>
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

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  question: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripCrlf(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    // Basic CSRF/abuse protection: in production, require same-origin requests (Origin header).
    const origin = request.headers.get("origin");
    const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.NODE_ENV === "production" && allowedOrigin && origin) {
      try {
        const o = new URL(origin);
        const a = new URL(allowedOrigin);
        if (o.origin !== a.origin) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const body: ContactFormData = await request.json();
    const { name, email, question } = body;

    // Валидация
    if (!name || !email || !question) {
      return NextResponse.json(
        { error: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный email адрес" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT!, 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const recipientEmail = process.env.CONTACT_EMAIL;

    if (
      !smtpHost ||
      !smtpPort ||
      !smtpUser ||
      !smtpPassword ||
      !recipientEmail
    ) {
      return NextResponse.json(
        { error: "Серверная ошибка: настройки почты не заданы" },
        { status: 500 }
      );
    }

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true для 465, false для других портов
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Normalize + cap user input
    const safeName = stripCrlf(String(name)).slice(0, 120);
    const safeEmail = stripCrlf(String(email)).slice(0, 254);
    const safeQuestionRaw = String(question).slice(0, 5000);

    // Escape for HTML email body (prevents HTML injection in email clients)
    const safeNameHtml = escapeHtml(safeName);
    const safeEmailHtml = escapeHtml(safeEmail);
    const safeQuestionHtml = escapeHtml(safeQuestionRaw);

    // Формируем письмо
    const mailOptions = {
      from: `"Форма обратной связи" <${smtpUser}>`,
      to: recipientEmail,
      subject: `Новое сообщение с формы обратной связи от ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C62828;">Новое сообщение с формы обратной связи</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Имя:</strong> ${safeNameHtml}</p>
            <p><strong>Email:</strong> ${safeEmailHtml}</p>
            <p><strong>Вопрос:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${safeQuestionHtml}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Это сообщение было отправлено автоматически с сайта.
          </p>
        </div>
      `,
      text: `
Новое сообщение с формы обратной связи

Имя: ${safeName}
Email: ${safeEmail}

Вопрос:
${safeQuestionRaw}
      `,
    };

    // Отправляем email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Сообщение успешно отправлено" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return NextResponse.json(
      {
        error: "Не удалось отправить сообщение. Попробуйте позже.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

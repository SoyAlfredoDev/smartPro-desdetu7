"use client";

import emailjs from "@emailjs/browser";

export const sendContactEmail = async (formElement) => {
  return emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
    formElement,
    {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY,
    },
  );
};

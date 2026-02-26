"use client";

import emailjs from "@emailjs/browser";

/**
 * Función para enviar correos usando EmailJS enviando un JSON
 * @param {Object} formData - El estado con los datos del formulario
 * @returns {Promise}
 */
export const sendContactEmail = async (formData) => {
  const serviceId = String(process.env.NEXT_PUBLIC_EMAILJS_SERVICE);
  const templateId = String(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE);
  const publicKey = String(process.env.NEXT_PUBLIC_EMAILJS_KEY);

  // Usamos send() en lugar de sendForm(), pasándole el objeto formData
  return emailjs.send(serviceId, templateId, formData, {
    publicKey: publicKey,
  });
};

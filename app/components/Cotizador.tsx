"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

// --- Componentes Reutilizables de UI ---

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `${label}${required ? "*" : ""}`}
      className="w-full p-3 bg-surface border border-gray-200 rounded-md text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
      required={required}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  options,
}) => (
  <div className="mb-4">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-surface border border-gray-200 rounded-md text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none transition-all cursor-pointer shadow-sm"
      required={required}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: `right 1rem center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `1.5em 1.5em`,
      }}
    >
      <option value="" disabled hidden>
        {label}
        {required ? "*" : ""}
      </option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${className}`}
  >
    {children}
  </button>
);

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`py-3 px-6 bg-surface border border-gray-300 text-text-muted hover:bg-gray-50 hover:text-primary font-semibold rounded-md shadow-sm transition-all duration-300 flex items-center justify-center ${className}`}
  >
    {children}
  </button>
);

// --- Componente del Indicador de Pasos ---
interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Datos Personales" },
    { id: 2, label: "Cotizar Isapre" },
    { id: 3, label: "Enviar Formulario" },
  ];

  return (
    <div className="relative bg-[url('/bg-cotizador.png')] bg-cover bg-center bg-no-repeat mb-8 px-2">
      {/* Línea de fondo */}
      <div className="absolute top-4 left-8 right-8 h-[2px] bg-gray-200 -z-10"></div>

      {/* Progreso activo */}
      <div
        className="absolute top-4 left-8 h-[2px] bg-primary -z-10 transition-all duration-500 ease-in-out"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          maxWidth: "calc(100% - 4rem)",
        }}
      ></div>

      <div className="flex justify-between items-start">
        {steps.map((step) => {
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          return (
            <div
              key={step.id}
              className="flex flex-col items-center z-10 w-20 sm:w-24"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center font-bold mb-2 transition-all duration-300
                  ${isActive ? "border-primary bg-surface text-primary" : "border-gray-300 bg-surface text-gray-400"}
                  ${isCurrent ? "ring-2 ring-primary/20 scale-110" : ""}
                `}
              >
                {step.id}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium text-center leading-tight transition-colors duration-300
                  ${isActive ? "text-primary" : "text-gray-400"}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL COTIZADOR ---
const Cotizador = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  interface FormData {
    nombreCompleto: string;
    rut: string;
    correo: string;
    celular: string;
    previsionActual: string;
    ufActual: string;
    regionResidencia: string;
    cargas: string;
    edadCargas: string;
    rentaImponible: string;
  }

  const initialFormData: FormData = {
    nombreCompleto: "",
    rut: "",
    correo: "",
    celular: "",
    previsionActual: "",
    ufActual: "",
    regionResidencia: "",
    cargas: "",
    edadCargas: "",
    rentaImponible: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // Configuración de animación
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 30 : -30, opacity: 0 }),
  };

  const [direction, setDirection] = useState<number>(0);
  const handleNext = (e: React.FormEvent) => {
    setDirection(1);
    nextStep(e);
  };
  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    // CONTENEDOR PRINCIPAL: Grid de 2 columnas (Texto Izq | Formulario Der)
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* --- COLUMNA IZQUIERDA: Textos --- */}
        <div className="text-center lg:text-left space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight tracking-tight">
            COTIZA EL MEJOR <br />
            <span className="text-text-main">PLAN DE ISAPRE</span>
          </h1>
          <p className="text-xl sm:text-2xl text-text-muted font-medium italic mt-4 pl-1">
            Desde tu 7%
          </p>
        </div>

        {/* --- COLUMNA DERECHA: El Formulario (Card Blanca) --- */}
        <div className="w-full">
          {/* Aquí comienza la "Card" del formulario */}
          <div className="bg-surface/90 backdrop-blur-sm border border-white/60 rounded-[1.5rem] shadow-2xl p-6 sm:p-10 relative">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-primary font-bold uppercase tracking-wider text-sm border-b-2 border-primary pb-1">
                    Cotizador Digital
                  </span>
                </div>

                <StepIndicator currentStep={currentStep} />

                <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
                  <div className="min-h-[320px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      {/* PASO 1 */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ type: "tween", duration: 0.3 }}
                        >
                          <div className="space-y-3">
                            <InputField
                              label="Nombre completo"
                              name="nombreCompleto"
                              value={formData.nombreCompleto}
                              onChange={handleChange}
                              required
                            />
                            <InputField
                              label="RUT"
                              name="rut"
                              value={formData.rut}
                              onChange={handleChange}
                              required
                            />
                            <InputField
                              label="Correo"
                              name="correo"
                              type="email"
                              value={formData.correo}
                              onChange={handleChange}
                              required
                            />
                            <InputField
                              label="Celular"
                              name="celular"
                              type="tel"
                              value={formData.celular}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mt-8">
                            <PrimaryButton type="submit">
                              Siguiente
                            </PrimaryButton>
                          </div>
                        </motion.div>
                      )}

                      {/* PASO 2 */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ type: "tween", duration: 0.3 }}
                        >
                          <div className="space-y-3">
                            <SelectField
                              label="Selecciona previsión actual"
                              name="previsionActual"
                              value={formData.previsionActual}
                              onChange={handleChange}
                              required
                              options={[
                                { value: "fonasa", label: "Fonasa" },
                                {
                                  value: "isapre_vida_tres",
                                  label: "Isapre Vida Tres",
                                },
                                {
                                  value: "isapre_consalud",
                                  label: "Isapre Consalud",
                                },
                                {
                                  value: "isapre_cruz_blanca",
                                  label: "Isapre Cruz Blanca",
                                },
                              ]}
                            />
                            <InputField
                              label="Indique cuantas UF paga actualmente"
                              name="ufActual"
                              type="number"
                              value={formData.ufActual}
                              onChange={handleChange}
                              placeholder="Ej: 8"
                            />
                            <SelectField
                              label="Región de Residencia"
                              name="regionResidencia"
                              value={formData.regionResidencia}
                              onChange={handleChange}
                              required
                              options={[
                                { value: "rm", label: "Región Metropolitana" },
                                { value: "valparaiso", label: "Valparaíso" },
                                { value: "biobio", label: "Biobío" },
                              ]}
                            />
                            <SelectField
                              label="Cargas Médicas / Legales"
                              name="cargas"
                              value={formData.cargas}
                              onChange={handleChange}
                              required
                              options={[
                                { value: "0", label: "Sin cargas" },
                                { value: "1", label: "1" },
                                { value: "2", label: "2" },
                                { value: "3", label: "3" },
                                { value: "4", label: "4" },
                                { value: "5+", label: "5 o más" },
                              ]}
                            />
                            <InputField
                              label="Renta imponible"
                              name="rentaImponible"
                              type="number"
                              value={formData.rentaImponible}
                              onChange={handleChange}
                              required
                              placeholder="Ej: 3000000"
                            />
                          </div>
                          <div className="mt-8 flex gap-3">
                            <SecondaryButton
                              onClick={handlePrev}
                              className="flex-1"
                            >
                              Volver
                            </SecondaryButton>
                            <PrimaryButton type="submit" className="flex-1">
                              Siguiente
                            </PrimaryButton>
                          </div>
                        </motion.div>
                      )}

                      {/* PASO 3 */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ type: "tween", duration: 0.3 }}
                        >
                          <div className="text-center space-y-4 py-6">
                            <h3 className="text-xl font-bold text-text-main">
                              ¡Confirmar Datos!
                            </h3>
                            <div className="bg-gray-50 p-5 rounded-lg text-sm text-left border border-gray-100 shadow-inner space-y-2">
                              <p>
                                <span className="text-text-muted">Nombre:</span>{" "}
                                <strong>{formData.nombreCompleto}</strong>
                              </p>
                              <p>
                                <span className="text-text-muted">RUT:</span>{" "}
                                <strong>{formData.rut}</strong>
                              </p>
                              <p>
                                <span className="text-text-muted">
                                  Previsión:
                                </span>{" "}
                                <strong>{formData.previsionActual}</strong>
                              </p>
                              <p>
                                <span className="text-text-muted">Renta:</span>{" "}
                                <strong>${formData.rentaImponible}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="mt-8 flex gap-3">
                            <SecondaryButton
                              onClick={handlePrev}
                              className="flex-1"
                            >
                              Volver
                            </SecondaryButton>
                            <PrimaryButton type="submit" className="flex-1">
                              Cotizar
                            </PrimaryButton>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </>
            ) : (
              // VISTA DE ÉXITO
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  ¡Solicitud Enviada!
                </h2>
                <p className="text-text-muted mb-8 px-4">
                  Un ejecutivo analizará tu perfil y te contactará con las
                  mejores opciones.
                </p>
                <SecondaryButton onClick={resetForm} className="w-full">
                  Nueva Cotización
                </SecondaryButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cotizador;

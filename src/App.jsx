import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { getKoders, createKoder, deleteKoder } from "./api";

export default function App() {
  const [koders, setKoders] = useState([]);

  useEffect(() => {
    getKoders()
      .then((koders) => {
        setKoders(koders);
      })
      .catch((error) => {
        console.error("Error fetching koders:", error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      await createKoder(data);
      const kodersList = await getKoders();
      setKoders(kodersList);
      reset();
    } catch (error) {
      console.error("Error al crear al koder:", error);
      alert("Error al crear al koder");
    }
  }

  async function onDelete(koderId) {
    try {
      await deleteKoder(koderId);
      const kodersList = await getKoders();
      setKoders(kodersList);
    } catch (error) {
      console.error("Error al eliminar al koder:", error);
      alert("Error al eliminar al koder");
    }
  }

  return (
    <main className="w-full min-h-screen">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="First Name"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.firstName,
          })}
          required
          {...register("firstName", {
            required: { value: true, message: "campo requerido" },
            minLength: { value: 3, message: "minimo 3 caracteres" },
            maxLength: { value: 180, message: "maximo 180 caracteres" },
          })}
        />
        {errors.firstName && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.firstName?.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Last Name"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.lastName,
          })}
          required
          {...register("lastName", {
            required: { value: true, message: "campo requerido" },
            minLength: { value: 3, message: "minimo 3 caracteres" },
            maxLength: { value: 180, message: "maximo 180 caracteres" },
          })}
        />
        {errors.lastName && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.lastName?.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.email,
          })}
          required
          {...register("email", {
            required: { value: true, message: "campo requerido" },
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "email inválido",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.email?.message}
          </p>
        )}

        <button
          disabled={isSubmitted ? !isValid : false}
          className="text-black px-3 rounded bg-white disabled:bg-stone-400"
        >
          + Agregar
        </button>
      </form>

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {koders.length === 0 && (
          <p className="text-white/50 flex justify-center">
            No tienes usuarios
          </p>
        )}

        {koders.map((koder, idx) => (
          <div
            key={`koder-${idx}`}
            className="bg-white/10 rounded p-4 flex flex-row gap-24"
          >
            <span className="select-none">{koder.firstName}</span>
            <span className="select-none">{koder.lastName}</span>
            <span className="select-none">{koder.email}</span>
            <span
              className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-8 text-center items-center flex"
              onClick={() => onDelete(koder.id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

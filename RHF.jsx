import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function App() {
  const [todos, setTodos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log("data", data);
    setTodos([...todos, { ...data }]);
    reset();
  }

  function removeTodo(indexToRemove) {
    const newTodos = todos.filter((todo, index) => index !== indexToRemove);
    setTodos(newTodos);
  }

  return (
    <main className="w-full min-h-screen">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Nombre"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.nombre,
          })}
          required
          {...register("nombre", {
            required: { value: true, message: "campo requerido" },
            minLength: { value: 3, message: "minimo 3 caracteres" },
            maxLength: { value: 180, message: "maximo 180 caracteres" },
          })}
        />
        {errors.nombre && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.nombre?.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Apellido"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.apellido,
          })}
          required
          {...register("apellido", {
            required: { value: true, message: "campo requerido" },
            minLength: { value: 3, message: "minimo 3 caracteres" },
            maxLength: { value: 180, message: "maximo 180 caracteres" },
          })}
        />
        {errors.apellido && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.apellido?.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Correo"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.correo,
          })}
          required
          {...register("correo", {
            required: { value: true, message: "campo requerido" },
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "correo inválido",
            },
          })}
        />
        {errors.correo && (
          <p className="text-red-500 text-center text-sm font-semibold">
            {errors.correo?.message}
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
        {todos.length === 0 && (
          <p className="text-white/50 flex justify-center">
            No tienes usuarios
          </p>
        )}

        {todos.map((todo, idx) => (
          <div
            key={`todo-${idx}`}
            className="bg-white/10 rounded p-4 flex flex-row gap-24"
          >
            <span className="select-none">{todo.nombre}</span>
            <span className="select-none">{todo.apellido}</span>
            <span className="select-none">{todo.correo}</span>
            <span
              className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-8 text-center items-center flex"
              onClick={() => removeTodo(idx)}
            >
              Equis
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

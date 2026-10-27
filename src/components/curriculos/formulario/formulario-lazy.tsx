"use client";

import dynamic from "next/dynamic";

import { FormularioSkeleton } from "../skeletons";

// O formulário reúne React Hook Form, Yup e as máscaras; ele é carregado em um chunk próprio
// apenas na página de cadastro, exibindo o Skeleton enquanto o código chega.
export const FormularioCurriculoLazy = dynamic(() => import("./formulario-curriculo"), {
  ssr: false,
  loading: () => <FormularioSkeleton />,
});

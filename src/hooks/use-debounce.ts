"use client";

import { useEffect, useState } from "react";

/** Atrasa a atualização do valor até o usuário parar de digitar. */
export function useDebounce<T>(valor: T, atraso = 300) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => setValorAtrasado(valor), atraso);
    return () => clearTimeout(temporizador);
  }, [valor, atraso]);

  return valorAtrasado;
}

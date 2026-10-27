"use client";

import InputMask from "react-input-mask-next";

import { inputClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputMascaradoProps = Omit<React.ComponentProps<"input">, "ref"> & {
  mascara: string;
  ref?: React.Ref<HTMLInputElement>;
};

export const MASCARAS = {
  cpf: "999.999.999-99",
  celular: "(99) 99999-9999",
  data: "99/99/9999",
  mesAno: "99/9999",
} as const;

/** Input com máscara (react-input-mask-next) usando o mesmo visual do Input do shadcn/ui. */
export function InputMascarado({ mascara, className, ref, ...props }: InputMascaradoProps) {
  return (
    <InputMask
      mask={mascara}
      maskPlaceholder={null}
      inputMode="numeric"
      data-slot="input"
      className={cn(inputClassName, className)}
      // A biblioteca repassa o ref ao <input>; o React Hook Form usa esse ref para focar erros.
      ref={ref as never}
      {...props}
    />
  );
}

"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { CircleAlert, GraduationCap, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formacaoVazia, type CurriculoFormValues } from "@/schemas/curriculo-schema";
import { NIVEIS_FORMACAO } from "@/types/curriculo";
import { ariaDoCampo, Campo } from "./campo";
import { InputMascarado, MASCARAS } from "./input-mascarado";
import { SecaoFormulario } from "./secao-formulario";

const LIMITE = 10;

type FormacaoItemProps = {
  indice: number;
  aoRemover: () => void;
};

function FormacaoItem({ indice, aoRemover }: FormacaoItemProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CurriculoFormValues>();
  const erros = errors.formacoes?.[indice];
  const id = (campo: string) => `formacoes-${indice}-${campo}`;
  const idTitulo = id("titulo");

  return (
    <div
      role="group"
      aria-labelledby={idTitulo}
      className="rounded-xl border bg-muted/30 p-4 animate-in fade-in-0 slide-in-from-top-2 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 id={idTitulo} className="font-semibold">
          Formação {indice + 1}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={aoRemover}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remover formação ${indice + 1}`}
        >
          <Trash2 data-icon="inline-start" aria-hidden />
          Remover
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id={id("curso")} rotulo="Curso" erro={erros?.curso?.message} obrigatorio>
          <Input
            {...ariaDoCampo(id("curso"), erros?.curso?.message)}
            placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
            {...register(`formacoes.${indice}.curso`)}
          />
        </Campo>
        <Campo id={id("instituicao")} rotulo="Instituição" erro={erros?.instituicao?.message} obrigatorio>
          <Input
            {...ariaDoCampo(id("instituicao"), erros?.instituicao?.message)}
            placeholder="Ex.: SENAI/SC"
            {...register(`formacoes.${indice}.instituicao`)}
          />
        </Campo>
        <Campo id={id("nivel")} rotulo="Nível" erro={erros?.nivel?.message} obrigatorio>
          <Controller
            control={control}
            name={`formacoes.${indice}.nivel`}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                <SelectTrigger
                  ref={field.ref}
                  {...ariaDoCampo(id("nivel"), erros?.nivel?.message)}
                  className="w-full bg-card data-[size=default]:h-9"
                >
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  {NIVEIS_FORMACAO.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Campo>
        <div className="grid grid-cols-2 gap-4">
          <Campo id={id("inicio")} rotulo="Início" erro={erros?.inicio?.message} obrigatorio>
            <Controller
              control={control}
              name={`formacoes.${indice}.inicio`}
              render={({ field }) => (
                <InputMascarado
                  {...ariaDoCampo(id("inicio"), erros?.inicio?.message)}
                  mascara={MASCARAS.mesAno}
                  placeholder="MM/AAAA"
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
          </Campo>
          <Campo id={id("conclusao")} rotulo="Conclusão" erro={erros?.conclusao?.message} obrigatorio>
            <Controller
              control={control}
              name={`formacoes.${indice}.conclusao`}
              render={({ field }) => (
                <InputMascarado
                  {...ariaDoCampo(id("conclusao"), erros?.conclusao?.message)}
                  mascara={MASCARAS.mesAno}
                  placeholder="MM/AAAA"
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
          </Campo>
        </div>
      </div>
    </div>
  );
}

export function FormacoesCampos() {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CurriculoFormValues>();
  const { fields, append, remove, insert } = useFieldArray({ control, name: "formacoes" });
  const erroDaLista = errors.formacoes?.root?.message ?? errors.formacoes?.message;

  function remover(indice: number) {
    const removida = getValues(`formacoes.${indice}`);
    remove(indice);
    toast("Formação removida", {
      description: removida.curso ? `${removida.curso}${removida.instituicao ? ` — ${removida.instituicao}` : ""}` : undefined,
      action: { label: "Desfazer", onClick: () => insert(indice, removida) },
    });
  }

  return (
    <SecaoFormulario
      icone={GraduationCap}
      titulo="Formação acadêmica"
      descricao="Inclua cursos concluídos ou em andamento; para estes, informe a previsão de conclusão."
    >
      <div className="space-y-4">
        {fields.map((campo, indice) => (
          <FormacaoItem key={campo.id} indice={indice} aoRemover={() => remover(indice)} />
        ))}

        {erroDaLista && (
          <p className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            <CircleAlert className="size-4" aria-hidden />
            {erroDaLista}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          size="lg"
          onClick={() => append({ ...formacaoVazia })}
          disabled={fields.length >= LIMITE}
        >
          <Plus data-icon="inline-start" aria-hidden />
          {fields.length >= LIMITE ? `Limite de ${LIMITE} formações` : "Adicionar formação"}
        </Button>
      </div>
    </SecaoFormulario>
  );
}

"use client";

import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { BriefcaseBusiness, CircleAlert, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { experienciaVazia, type CurriculoFormValues } from "@/schemas/curriculo-schema";
import { ariaDoCampo, Campo } from "./campo";
import { InputMascarado, MASCARAS } from "./input-mascarado";
import { SecaoFormulario } from "./secao-formulario";

const LIMITE = 10;

type ExperienciaItemProps = {
  indice: number;
  aoRemover: () => void;
};

function ExperienciaItem({ indice, aoRemover }: ExperienciaItemProps) {
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<CurriculoFormValues>();
  const atual = useWatch({ control, name: `experiencias.${indice}.atual` });
  const descricao = useWatch({ control, name: `experiencias.${indice}.descricao` }) ?? "";
  const erros = errors.experiencias?.[indice];
  const id = (campo: string) => `experiencias-${indice}-${campo}`;
  const idTitulo = id("titulo");

  return (
    <div
      role="group"
      aria-labelledby={idTitulo}
      className="rounded-xl border bg-muted/30 p-4 animate-in fade-in-0 slide-in-from-top-2 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 id={idTitulo} className="font-semibold">
          Experiência {indice + 1}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={aoRemover}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remover experiência ${indice + 1}`}
        >
          <Trash2 data-icon="inline-start" aria-hidden />
          Remover
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id={id("empresa")} rotulo="Empresa" erro={erros?.empresa?.message} obrigatorio>
          <Input
            {...ariaDoCampo(id("empresa"), erros?.empresa?.message)}
            placeholder="Nome da empresa"
            {...register(`experiencias.${indice}.empresa`)}
          />
        </Campo>
        <Campo id={id("cargo")} rotulo="Cargo ocupado" erro={erros?.cargo?.message} obrigatorio>
          <Input
            {...ariaDoCampo(id("cargo"), erros?.cargo?.message)}
            placeholder="Ex.: Desenvolvedor Júnior"
            {...register(`experiencias.${indice}.cargo`)}
          />
        </Campo>
        <Campo id={id("inicio")} rotulo="Início" erro={erros?.inicio?.message} obrigatorio>
          <Controller
            control={control}
            name={`experiencias.${indice}.inicio`}
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
        <div className="grid content-start gap-2">
          <Campo id={id("fim")} rotulo="Término" erro={atual ? undefined : erros?.fim?.message}>
            <Controller
              control={control}
              name={`experiencias.${indice}.fim`}
              render={({ field }) => (
                <InputMascarado
                  {...ariaDoCampo(id("fim"), atual ? undefined : erros?.fim?.message)}
                  mascara={MASCARAS.mesAno}
                  placeholder={atual ? "Atual" : "MM/AAAA"}
                  disabled={atual}
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
          </Campo>
          <Controller
            control={control}
            name={`experiencias.${indice}.atual`}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={id("atual")}
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={(marcado) => {
                    field.onChange(marcado === true);
                    if (marcado === true) {
                      setValue(`experiencias.${indice}.fim`, "", { shouldValidate: isSubmitted });
                    } else if (isSubmitted) {
                      trigger(`experiencias.${indice}.fim`);
                    }
                  }}
                />
                <Label htmlFor={id("atual")} className="font-normal">
                  Trabalho atual
                </Label>
              </div>
            )}
          />
        </div>
        <Campo
          id={id("descricao")}
          rotulo="Principais atividades"
          erro={erros?.descricao?.message}
          dica={`${descricao.length}/500 caracteres · mínimo 20`}
          obrigatorio
          className="sm:col-span-2"
        >
          <Textarea
            {...ariaDoCampo(
              id("descricao"),
              erros?.descricao?.message,
              `${descricao.length}/500 caracteres · mínimo 20`
            )}
            rows={3}
            placeholder="Descreva responsabilidades, tecnologias e resultados."
            {...register(`experiencias.${indice}.descricao`)}
          />
        </Campo>
      </div>
    </div>
  );
}

export function ExperienciasCampos() {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CurriculoFormValues>();
  const { fields, append, remove, insert } = useFieldArray({ control, name: "experiencias" });
  const erroDaLista = errors.experiencias?.root?.message ?? errors.experiencias?.message;

  function remover(indice: number) {
    const removida = getValues(`experiencias.${indice}`);
    remove(indice);
    toast("Experiência removida", {
      description: removida.empresa ? `${removida.cargo || "Experiência"} — ${removida.empresa}` : undefined,
      action: { label: "Desfazer", onClick: () => insert(indice, removida) },
    });
  }

  return (
    <SecaoFormulario
      icone={BriefcaseBusiness}
      titulo="Experiência profissional"
      descricao="Adicione quantas experiências quiser, da mais recente para a mais antiga."
    >
      <div className="space-y-4">
        {fields.map((campo, indice) => (
          <ExperienciaItem key={campo.id} indice={indice} aoRemover={() => remover(indice)} />
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
          onClick={() => append({ ...experienciaVazia })}
          disabled={fields.length >= LIMITE}
        >
          <Plus data-icon="inline-start" aria-hidden />
          {fields.length >= LIMITE ? `Limite de ${LIMITE} experiências` : "Adicionar experiência"}
        </Button>
      </div>
    </SecaoFormulario>
  );
}

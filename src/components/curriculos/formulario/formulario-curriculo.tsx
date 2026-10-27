"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm, useWatch, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Contact, Eraser, LoaderCircle, Save, UserRound, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { celebrarCadastro, confirmarLimpeza } from "@/lib/alertas";
import {
  erroDeArmazenamentoCheio,
  salvarCurriculo,
  type NovoCurriculo,
} from "@/lib/curriculos-storage";
import { rotas } from "@/lib/rotas";
import {
  curriculoSchema,
  curriculoVazio,
  separarHabilidades,
  type CurriculoFormValues,
} from "@/schemas/curriculo-schema";
import type { NivelFormacao } from "@/types/curriculo";
import { ariaDoCampo, Campo } from "./campo";
import { coletarErros, descreverErro } from "./erros";
import { ExperienciasCampos } from "./experiencias-campos";
import { FormacoesCampos } from "./formacoes-campos";
import { InputMascarado, MASCARAS } from "./input-mascarado";
import { SecaoFormulario } from "./secao-formulario";
import { UploadFoto } from "./upload-foto";

function paraCurriculo(dados: CurriculoFormValues): NovoCurriculo {
  return {
    nome: dados.nome,
    cargo: dados.cargo,
    email: dados.email.toLowerCase(),
    telefone: dados.telefone,
    cpf: dados.cpf,
    dataNascimento: dados.dataNascimento,
    cidade: dados.cidade,
    linkedin: dados.linkedin || undefined,
    foto: dados.foto || undefined,
    resumo: dados.resumo,
    habilidades: separarHabilidades(dados.habilidades),
    experiencias: dados.experiencias.map((experiencia) => ({
      ...experiencia,
      fim: experiencia.atual ? undefined : experiencia.fim,
    })),
    formacoes: dados.formacoes.map((formacao) => ({
      ...formacao,
      nivel: formacao.nivel as NivelFormacao,
    })),
  };
}

export default function FormularioCurriculo() {
  const router = useRouter();
  const metodos = useForm({
    resolver: yupResolver(curriculoSchema),
    defaultValues: curriculoVazio,
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isValid, isDirty },
  } = metodos;

  const resumo = useWatch({ control, name: "resumo" }) ?? "";
  const habilidades = separarHabilidades(useWatch({ control, name: "habilidades" }) ?? "");
  const totalDeErros = coletarErros(errors).length;
  const bloqueado = isSubmitting || (isSubmitted && !isValid);

  async function aoSalvar(dados: CurriculoFormValues) {
    try {
      const curriculo = await salvarCurriculo(paraCurriculo(dados));
      toast.success("Currículo salvo com sucesso!", {
        description: `${curriculo.nome} já aparece na lista de currículos.`,
      });
      reset(curriculoVazio);

      const escolha = await celebrarCadastro(curriculo.nome);
      if (escolha === "ver") router.push(rotas.detalhes(curriculo.id));
      else if (escolha === "lista") router.push(rotas.visualizar);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (erro) {
      toast.error("Não foi possível salvar o currículo", {
        description: erroDeArmazenamentoCheio(erro)
          ? "O armazenamento do navegador está cheio. Remova a foto ou exclua currículos antigos."
          : "Ocorreu um erro inesperado. Tente novamente.",
      });
    }
  }

  function aoFalhar(falhas: FieldErrors<CurriculoFormValues>) {
    const lista = coletarErros(falhas);
    if (lista.length === 0) return;
    const primeiro = descreverErro(lista[0]);
    toast.error(
      lista.length === 1 ? "Corrija 1 campo para salvar" : `Corrija ${lista.length} campos para salvar`,
      { description: lista.length === 1 ? primeiro : `${primeiro} (e mais ${lista.length - 1}).` }
    );
  }

  async function limpar() {
    if (isDirty && !(await confirmarLimpeza())) return;
    reset(curriculoVazio);
    toast.info("Formulário limpo", { description: "Você pode começar um novo cadastro." });
  }

  return (
    <FormProvider {...metodos}>
      <form noValidate onSubmit={handleSubmit(aoSalvar, aoFalhar)} className="space-y-6">
        <SecaoFormulario
          icone={UserRound}
          titulo="Dados pessoais"
          descricao="Informações de identificação do candidato. Campos com * são obrigatórios."
        >
          <div className="space-y-5">
            <Controller
              control={control}
              name="foto"
              render={({ field }) => <UploadFoto valor={field.value ?? ""} aoMudar={field.onChange} />}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="nome" rotulo="Nome completo" erro={errors.nome?.message} obrigatorio className="sm:col-span-2">
                <Input
                  {...ariaDoCampo("nome", errors.nome?.message)}
                  autoComplete="name"
                  placeholder="Ex.: Maria Fernanda Souza"
                  {...register("nome")}
                />
              </Campo>
              <Campo id="cpf" rotulo="CPF" erro={errors.cpf?.message} obrigatorio>
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field }) => (
                    <InputMascarado
                      {...ariaDoCampo("cpf", errors.cpf?.message)}
                      mascara={MASCARAS.cpf}
                      placeholder="000.000.000-00"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
              </Campo>
              <Campo id="dataNascimento" rotulo="Data de nascimento" erro={errors.dataNascimento?.message} obrigatorio>
                <Controller
                  control={control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <InputMascarado
                      {...ariaDoCampo("dataNascimento", errors.dataNascimento?.message)}
                      mascara={MASCARAS.data}
                      placeholder="DD/MM/AAAA"
                      autoComplete="bday"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
              </Campo>
              <Campo id="cidade" rotulo="Cidade / UF" erro={errors.cidade?.message} obrigatorio className="sm:col-span-2">
                <Input
                  {...ariaDoCampo("cidade", errors.cidade?.message)}
                  autoComplete="address-level2"
                  placeholder="Ex.: Blumenau - SC"
                  {...register("cidade")}
                />
              </Campo>
            </div>
          </div>
        </SecaoFormulario>

        <SecaoFormulario
          icone={Contact}
          titulo="Contato"
          descricao="Como recrutadores podem falar com o candidato."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo id="email" rotulo="E-mail" erro={errors.email?.message} obrigatorio>
              <Input
                {...ariaDoCampo("email", errors.email?.message)}
                type="email"
                autoComplete="email"
                placeholder="nome@exemplo.com"
                {...register("email")}
              />
            </Campo>
            <Campo id="telefone" rotulo="Celular" erro={errors.telefone?.message} obrigatorio>
              <Controller
                control={control}
                name="telefone"
                render={({ field }) => (
                  <InputMascarado
                    {...ariaDoCampo("telefone", errors.telefone?.message)}
                    mascara={MASCARAS.celular}
                    placeholder="(00) 90000-0000"
                    type="tel"
                    autoComplete="tel-national"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
            </Campo>
            <Campo
              id="linkedin"
              rotulo="LinkedIn"
              erro={errors.linkedin?.message}
              dica="Opcional. Cole o endereço completo do perfil."
              className="sm:col-span-2"
            >
              <Input
                {...ariaDoCampo("linkedin", errors.linkedin?.message, "Opcional. Cole o endereço completo do perfil.")}
                type="url"
                inputMode="url"
                placeholder="https://www.linkedin.com/in/seu-perfil"
                {...register("linkedin")}
              />
            </Campo>
          </div>
        </SecaoFormulario>

        <SecaoFormulario
          icone={Wand2}
          titulo="Perfil profissional"
          descricao="Cargo desejado, resumo e habilidades que aparecem nos cards da lista."
        >
          <div className="grid gap-4">
            <Campo id="cargo" rotulo="Cargo desejado" erro={errors.cargo?.message} obrigatorio>
              <Input
                {...ariaDoCampo("cargo", errors.cargo?.message)}
                placeholder="Ex.: Desenvolvedor Front-end"
                {...register("cargo")}
              />
            </Campo>
            <Campo
              id="resumo"
              rotulo="Resumo profissional"
              erro={errors.resumo?.message}
              dica={`${resumo.length}/600 caracteres · mínimo 50`}
              obrigatorio
            >
              <Textarea
                {...ariaDoCampo("resumo", errors.resumo?.message, `${resumo.length}/600 caracteres · mínimo 50`)}
                rows={4}
                placeholder="Conte em poucas linhas sua experiência, seus objetivos e o que você faz de melhor."
                {...register("resumo")}
              />
            </Campo>
            <Campo
              id="habilidades"
              rotulo="Habilidades"
              erro={errors.habilidades?.message}
              dica="Separe por vírgula. Ex.: React, TypeScript, Comunicação"
              obrigatorio
            >
              <Input
                {...ariaDoCampo("habilidades", errors.habilidades?.message, "Separe por vírgula. Ex.: React, TypeScript, Comunicação")}
                placeholder="React, TypeScript, Comunicação"
                {...register("habilidades")}
              />
            </Campo>
            {habilidades.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Pré-visualização das habilidades">
                {habilidades.map((habilidade, indice) => (
                  <li key={`${habilidade}-${indice}`}>
                    <Badge variant="secondary">{habilidade}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </SecaoFormulario>

        <ExperienciasCampos />
        <FormacoesCampos />

        <div className="sticky bottom-0 z-10 -mx-4 border-t bg-background/90 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5 sm:shadow-lg">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {isSubmitted && totalDeErros > 0 ? (
              <p aria-live="polite" className="text-sm font-medium text-destructive">
                {totalDeErros} {totalDeErros === 1 ? "campo precisa" : "campos precisam"} de atenção.
                Corrija para liberar o botão.
              </p>
            ) : (
              <p aria-live="polite" className="hidden text-sm text-muted-foreground sm:block">
                Revise as informações antes de salvar.
              </p>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="lg" onClick={limpar} disabled={isSubmitting}>
                <Eraser data-icon="inline-start" aria-hidden />
                Limpar
              </Button>
              <Button type="submit" size="lg" disabled={bloqueado} className="flex-1 sm:flex-none">
                {isSubmitting ? (
                  <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden />
                ) : (
                  <Save data-icon="inline-start" aria-hidden />
                )}
                {isSubmitting ? "Salvando…" : "Salvar currículo"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

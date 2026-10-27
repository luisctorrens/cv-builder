import { buttonVariants } from "@/components/ui/button";

const classesBase = {
  popup: "rounded-2xl! font-sans!",
  title: "text-xl! font-semibold! text-foreground!",
  htmlContainer: "text-sm! text-muted-foreground!",
  actions: "gap-3!",
  confirmButton: buttonVariants({ size: "lg" }),
  denyButton: buttonVariants({ variant: "secondary", size: "lg" }),
  cancelButton: buttonVariants({ variant: "outline", size: "lg" }),
};

// O SweetAlert2 só é baixado quando um alerta é aberto pela primeira vez.
async function carregarSwal() {
  const { default: Swal } = await import("sweetalert2");
  return Swal.mixin({ buttonsStyling: false, reverseButtons: true, customClass: classesBase });
}

export async function confirmarExclusao(nome: string) {
  const Swal = await carregarSwal();
  const resultado = await Swal.fire({
    icon: "warning",
    title: "Excluir currículo?",
    text: `O currículo de ${nome} será removido deste navegador. Essa ação não pode ser desfeita.`,
    showCancelButton: true,
    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar",
    focusCancel: true,
    customClass: {
      ...classesBase,
      confirmButton: buttonVariants({
        size: "lg",
        className: "bg-destructive! text-white! hover:bg-destructive/85!",
      }),
    },
  });
  return resultado.isConfirmed;
}

export async function confirmarLimpeza() {
  const Swal = await carregarSwal();
  const resultado = await Swal.fire({
    icon: "question",
    title: "Limpar o formulário?",
    text: "Tudo o que foi preenchido até agora será descartado.",
    showCancelButton: true,
    confirmButtonText: "Limpar",
    cancelButtonText: "Continuar editando",
    focusCancel: true,
  });
  return resultado.isConfirmed;
}

export type EscolhaAposCadastro = "ver" | "novo" | "lista";

export async function celebrarCadastro(nome: string): Promise<EscolhaAposCadastro> {
  const Swal = await carregarSwal();
  const resultado = await Swal.fire({
    icon: "success",
    title: "Currículo cadastrado!",
    text: `O currículo de ${nome} já está disponível na lista.`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Ver currículo",
    denyButtonText: "Cadastrar outro",
    cancelButtonText: "Ir para a lista",
  });
  if (resultado.isConfirmed) return "ver";
  if (resultado.isDenied) return "novo";
  return "lista";
}

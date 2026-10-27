"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANHO_MAXIMO = 2 * 1024 * 1024;
const LADO_MAXIMO = 320;

type UploadFotoProps = {
  valor: string;
  aoMudar: (dataUrl: string) => void;
};

/** Reduz a imagem no navegador para caber com folga no localStorage. */
async function redimensionar(arquivo: File) {
  const bitmap = await createImageBitmap(arquivo);
  const escala = Math.min(1, LADO_MAXIMO / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.85);
}

/** Barra de progresso que imita o envio para um servidor. */
function simularEnvio(aoAvancar: (progresso: number) => void) {
  return new Promise<void>((resolver) => {
    let progresso = 0;
    const intervalo = setInterval(() => {
      progresso = Math.min(100, progresso + 8 + Math.random() * 14);
      aoAvancar(Math.round(progresso));
      if (progresso >= 100) {
        clearInterval(intervalo);
        resolver();
      }
    }, 110);
  });
}

export function UploadFoto({ valor, aoMudar }: UploadFotoProps) {
  const idInput = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progresso, setProgresso] = useState<number | null>(null);
  const [arrastando, setArrastando] = useState(false);
  const enviando = progresso !== null;

  async function processar(arquivo?: File) {
    if (!arquivo) return;

    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
      toast.error("Formato de imagem não suportado", {
        description: "Envie uma foto em JPG, PNG ou WEBP.",
      });
      return;
    }
    if (arquivo.size > TAMANHO_MAXIMO) {
      toast.error("Imagem muito grande", {
        description: `A foto deve ter no máximo 2 MB (a enviada tem ${(arquivo.size / 1024 / 1024).toFixed(1)} MB).`,
      });
      return;
    }

    setProgresso(0);
    try {
      const [dataUrl] = await Promise.all([redimensionar(arquivo), simularEnvio(setProgresso)]);
      aoMudar(dataUrl);
      toast.success("Foto carregada", {
        description: "Upload simulado: a imagem fica salva apenas neste navegador.",
      });
    } catch {
      toast.error("Não foi possível ler a imagem", {
        description: "O arquivo pode estar corrompido. Tente outra foto.",
      });
    } finally {
      setProgresso(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div
      onDragOver={(evento) => {
        evento.preventDefault();
        if (!enviando) setArrastando(true);
      }}
      onDragLeave={() => setArrastando(false)}
      onDrop={(evento) => {
        evento.preventDefault();
        setArrastando(false);
        if (!enviando) processar(evento.dataTransfer.files[0]);
      }}
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-4 text-center transition-colors sm:flex-row sm:text-left",
        arrastando ? "border-primary bg-secondary" : "border-border bg-muted/40"
      )}
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-card ring-4 ring-card">
        {valor ? (
          <Image
            src={valor}
            alt="Pré-visualização da foto de perfil"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="grid size-full place-items-center bg-secondary text-primary">
            <ImageUp className="size-8" aria-hidden />
          </span>
        )}
        {enviando && (
          <span className="absolute inset-0 grid place-items-center bg-card/70">
            <LoaderCircle className="size-7 animate-spin text-primary" aria-hidden />
          </span>
        )}
      </div>

      <div className="w-full space-y-2">
        <p className="text-sm font-medium">Foto de perfil</p>
        {enviando ? (
          <div className="space-y-1.5" role="status" aria-live="polite">
            <Progress value={progresso} aria-label="Progresso do envio da foto" />
            <p className="text-xs text-muted-foreground">Enviando foto… {progresso}%</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Arraste uma imagem para cá ou escolha um arquivo. JPG, PNG ou WEBP de até 2 MB.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          <input
            ref={inputRef}
            id={idInput}
            type="file"
            accept={TIPOS_ACEITOS.join(",")}
            className="sr-only"
            onChange={(evento) => processar(evento.target.files?.[0])}
            disabled={enviando}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={enviando}
          >
            <ImageUp data-icon="inline-start" aria-hidden />
            {valor ? "Trocar foto" : "Escolher foto"}
          </Button>
          {valor && !enviando && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                aoMudar("");
                toast("Foto removida", { description: "O currículo usará as iniciais do nome." });
              }}
            >
              <Trash2 data-icon="inline-start" aria-hidden />
              Remover
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

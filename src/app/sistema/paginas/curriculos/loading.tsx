import { CabecalhoListaSkeleton, ListaCurriculosSkeleton } from "@/components/curriculos/skeletons";

export default function CarregandoCurriculos() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <CabecalhoListaSkeleton />
      <ListaCurriculosSkeleton />
    </div>
  );
}

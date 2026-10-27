// react-input-mask-next@3.0.0-alpha.12 chama ReactDOM.findDOMNode, removido no React 19.
// Quando a máscara renderiza um <input> diretamente, o ref recebido já é o elemento DOM,
// então basta usar o próprio ref. O script é idempotente e roda no postinstall.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const pacote = join(raiz, "node_modules", "react-input-mask-next", "lib");

const correcoes = [
  {
    arquivo: "react-input-mask.development.js",
    de: "inputRef.current = reactDom.findDOMNode(_ref);",
    para: "inputRef.current = _ref;",
  },
  {
    arquivo: "react-input-mask.production.min.js",
    de: "R.current=r.findDOMNode(t)",
    para: "R.current=t",
  },
];

if (!existsSync(pacote)) {
  console.log("[react-input-mask] pacote não instalado; nada a corrigir.");
  process.exit(0);
}

for (const { arquivo, de, para } of correcoes) {
  const caminho = join(pacote, arquivo);
  const conteudo = readFileSync(caminho, "utf8");

  if (conteudo.includes(para) && !conteudo.includes(de)) {
    console.log(`[react-input-mask] ${arquivo} já corrigido.`);
    continue;
  }

  if (!conteudo.includes(de)) {
    console.error(
      `[react-input-mask] trecho esperado não encontrado em ${arquivo}. ` +
        "Confira se a versão instalada é 3.0.0-alpha.12."
    );
    process.exit(1);
  }

  writeFileSync(caminho, conteudo.replace(de, para));
  console.log(`[react-input-mask] ${arquivo} corrigido para React 19.`);
}

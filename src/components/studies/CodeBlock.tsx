"use client";

import { useState } from "react";
import type { CodeExample } from "@/src/domain/study/entities/Study";

export default function CodeBlock({ title, code }: CodeExample) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Código copiado.");
    } catch {
      setStatus("Não foi possível copiar automaticamente. Selecione o código e copie manualmente.");
    }
  }
  return (
    <figure className="study-code">
      <figcaption><span><b>C#</b> {title}</span><button type="button" onClick={copy} aria-label={`Copiar código: ${title}`}>Copiar</button></figcaption>
      <pre tabIndex={0} aria-label={title}><code>{code}</code></pre>
      {status && <p role="status" className="study-code-status">{status}</p>}
    </figure>
  );
}

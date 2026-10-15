"use client";

import { useState } from "react";
import { validateFeedback, type FeedbackErrors, type FeedbackInput } from "@/src/application/study/validateFeedback";

const initial: FeedbackInput = { name: "", email: "", kind: "sugestao", subject: "", message: "" };
export default function StudyFeedbackForm({ studyTitle }: { studyTitle: string }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [valid, setValid] = useState(false);
  function change(field: keyof FeedbackInput, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setValid(false); setErrors((previous) => ({ ...previous, [field]: undefined }));
  }
  function validate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateFeedback(values);
    setErrors(result.errors); setValid(result.valid);
    if (!result.valid) {
      const first = Object.keys(result.errors)[0];
      window.requestAnimationFrame(() => document.getElementById(`feedback-${first}`)?.focus());
    }
  }
  function error(field: keyof FeedbackInput) {
    return errors[field] ? <p id={`error-${field}`} className="study-field-error">{errors[field]}</p> : null;
  }
  return (
    <section id="feedback" className="study-feedback" aria-labelledby="feedback-title">
      <div className="study-feedback-heading"><p className="study-eyebrow">AJUDE A MELHORAR O CONTEÚDO</p><span className="study-phase-pill">Envio ainda não ativado</span></div>
      <h2 id="feedback-title">Encontrou um erro ou ficou com uma dúvida?</h2>
      <p>Estudo: {studyTitle}</p>
      <aside className="study-callout"><strong>Interface em preparação</strong><p>Você pode testar o preenchimento e a validação. Nenhuma mensagem será enviada ou armazenada. O recebimento depende de uma API e de um destino de mensagens ainda não configurados.</p></aside>
      <form onSubmit={validate} noValidate>
        <div className="study-form-grid">
          <div><label htmlFor="feedback-name">Nome <span>(opcional)</span></label>
            <input id="feedback-name" name="name" value={values.name} autoComplete="name" maxLength={100}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "error-name" : undefined} onChange={(event) => change("name", event.target.value)} />{error("name")}</div>
          <div><label htmlFor="feedback-email">E-mail <span>(opcional)</span></label>
            <input id="feedback-email" name="email" type="email" value={values.email} autoComplete="email" maxLength={254}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} onChange={(event) => change("email", event.target.value)} />{error("email")}</div>
          <div><label htmlFor="feedback-kind">Tipo do comentário</label>
            <select id="feedback-kind" name="kind" value={values.kind} onChange={(event) => change("kind", event.target.value)}
              aria-invalid={Boolean(errors.kind)} aria-describedby={errors.kind ? "error-kind" : undefined}>
              <option value="erro">Possível erro</option><option value="duvida">Dúvida</option><option value="sugestao">Sugestão</option>
            </select>{error("kind")}</div>
          <div><label htmlFor="feedback-subject">Assunto <span>(obrigatório)</span></label>
            <input id="feedback-subject" name="subject" required value={values.subject} maxLength={120}
              aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "error-subject" : undefined} onChange={(event) => change("subject", event.target.value)} />{error("subject")}</div>
        </div>
        <label htmlFor="feedback-message">Descrição <span>(obrigatória)</span></label>
        <textarea id="feedback-message" name="message" required rows={6} value={values.message} maxLength={4000}
          placeholder="Indique o módulo, o exemplo e o que precisa ser esclarecido. Não inclua senhas nem dados sensíveis."
          aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message message-count" : "message-count"}
          onChange={(event) => change("message", event.target.value)} />
        <small id="message-count">{values.message.length} / 4.000 caracteres. Mínimo de 20.</small>{error("message")}
        <p className="study-muted">Os campos são usados apenas para testar a validação nesta página. O formulário não grava os dados no armazenamento local nem os envia a serviços externos nesta etapa.</p>
        <div className="study-form-actions"><button type="submit" className="study-button">Validar mensagem</button>
          <button type="button" disabled className="study-button study-button-secondary">Enviar — indisponível</button></div>
        {valid && <p role="status" className="study-feedback-valid">Mensagem validada neste navegador. Nada foi enviado ou armazenado. O envio aguarda a configuração do serviço.</p>}
      </form>
    </section>
  );
}

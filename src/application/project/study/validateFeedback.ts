export interface FeedbackInput {
  name: string;
  email: string;
  kind: string;
  subject: string;
  message: string;
}
export type FeedbackErrors = Partial<Record<keyof FeedbackInput, string>>;

// Validação de interface. Não substitui a validação de uma futura API.
export function validateFeedback(input: FeedbackInput): {
  valid: boolean; errors: FeedbackErrors; value: FeedbackInput;
} {
  const value: FeedbackInput = {
    name: input.name.trim(), email: input.email.trim(), kind: input.kind,
    subject: input.subject.trim(), message: input.message.trim(),
  };
  const errors: FeedbackErrors = {};
  if (value.name.length > 100) errors.name = "Use até 100 caracteres no nome.";
  if (value.email && (value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))) {
    errors.email = "Informe um e-mail válido ou deixe o campo vazio.";
  }
  if (!["erro", "duvida", "sugestao"].includes(value.kind)) errors.kind = "Escolha o tipo do comentário.";
  if (value.subject.length < 3 || value.subject.length > 120) errors.subject = "O assunto deve ter de 3 a 120 caracteres.";
  if (value.message.length < 20 || value.message.length > 4000) errors.message = "A descrição deve ter de 20 a 4.000 caracteres.";
  return { valid: Object.keys(errors).length === 0, errors, value };
}

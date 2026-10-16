/* eslint-disable @typescript-eslint/no-require-imports -- Runner CommonJS isolado, com carregamento temporário de TypeScript para testes. */
/* Executar na raiz: node scripts/test-estudos.cjs. Usa o TypeScript já existente no projeto. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const originalTsLoader = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const result = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(result.outputText, filename);
};
let count = 0;
function test(name, callback) {
  callback(); count++; console.log(`✓ ${name}`);
}
try {
  const { studyLibrary, studies, getStudy } = require('../src/data/studies/studies.ts');
  const { gradeQuiz } = require('../src/application/study/gradeQuiz.ts');
  const { validateFeedback } = require('../src/application/study/validateFeedback.ts');
  const { normalizeProgress } = require('../src/application/study/normalizeProgress.ts');
  const study = getStudy('csharp-ddd-crud');
  const questions = study.questions;
  const correct = Object.fromEntries(questions.map((q) => [q.id, q.correctOption]));
  const wrong = Object.fromEntries(questions.map((q) => [q.id, (q.correctOption + 1) % q.options.length]));
  test('Catálogo e rotas usam identificadores únicos', () => {
    assert.equal(new Set(studyLibrary.map((s) => s.slug)).size, studyLibrary.length);
    assert(studies.every((s) => s.published && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.slug)));
  });
  test('Estudo C# possui os sete módulos e dez questões', () => {
    assert.equal(study.sections.length, 7); assert.equal(questions.length, 10);
    assert.equal(study.sourceSlides, 80);
  });
  test('Estudo inexistente não é retornado', () => assert.equal(getStudy('nao-existe'), undefined));
  test('Módulos, tópicos, tabelas, exercícios e fontes são consistentes', () => {
    for (const s of studyLibrary) {
      const ids = new Set(['contexto', 'referencias']);
      const sections = s.sections.map((section) => section.id);
      for (const section of s.sections) {
        assert(!ids.has(section.id)); ids.add(section.id);
        assert(section.lessons.length > 0);
        assert(section.exercise.statement && section.exercise.answer);
      }
      for (const lesson of [...s.introduction, ...s.sections.flatMap((section) => section.lessons)]) {
        assert(!ids.has(lesson.id)); ids.add(lesson.id);
        assert(lesson.title && lesson.paragraphs.length > 0);
        assert(lesson.sourceSlides.every((n) => n >= 1 && n <= s.sourceSlides));
        assert(lesson.codeExamples.every((code) => code.code.trim() && code.title));
        if (lesson.table) assert(lesson.table.rows.every((row) => row.length === lesson.table.headers.length));
      }
      for (const q of s.questions) {
        assert(sections.includes(q.sectionId));
        assert(q.correctOption >= 0 && q.correctOption < q.options.length);
        assert(q.explanation.length > 10);
      }
    }
  });
  test('Nenhuma questão respondida impede a correção', () => {
    assert.deepEqual(gradeQuiz(questions, {}), { complete: false, missingIds: questions.map((q) => q.id) });
  });
  test('Uma resposta faltante impede a correção', () => {
    const answer = { ...correct }; delete answer[questions[0].id];
    assert.deepEqual(gradeQuiz(questions, answer), { complete: false, missingIds: [questions[0].id] });
  });
  test('Todos os acertos resultam em nota 10', () => assert.equal(gradeQuiz(questions, correct).grade, 10));
  test('Todos os erros resultam em nota 0', () => assert.equal(gradeQuiz(questions, wrong).grade, 0));
  test('Metade dos acertos resulta em nota 5', () => {
    const answers = { ...wrong };
    questions.slice(0,5).forEach((q) => answers[q.id] = q.correctOption);
    assert.equal(gradeQuiz(questions, answers).grade, 5);
  });
  test('Alternativas negativas, fracionárias e fora da faixa são rejeitadas', () => {
    for (const value of [-1, 100, 0.5, NaN]) assert.equal(gradeQuiz(questions, { ...correct, [questions[0].id]: value }).complete, false);
  });
  test('Questionário vazio e gabarito inválido não produzem resultado enganoso', () => {
    assert.throws(() => gradeQuiz([], {}));
    assert.throws(() => gradeQuiz([{ ...questions[0], correctOption: 99 }], {}));
  });
  test('Identificadores de questões repetidos são rejeitados', () => assert.throws(() => gradeQuiz([questions[0], questions[0]], {})));
  const feedback = { name: '', email: '', kind: 'sugestao', subject: 'Sugestão para o módulo', message: 'Gostaria de sugerir uma melhoria neste exemplo do material.' };
  test('Feedback permite nome e e-mail vazios', () => assert.equal(validateFeedback(feedback).valid, true));
  test('Feedback vazio informa os campos obrigatórios', () => {
    const result = validateFeedback({ ...feedback, subject: '', message: '' });
    assert(result.errors.subject); assert(result.errors.message); assert.equal(result.valid, false);
  });
  test('Feedback rejeita e-mail, categoria e tamanhos inválidos', () => {
    assert(validateFeedback({ ...feedback, email: 'invalido' }).errors.email);
    assert(validateFeedback({ ...feedback, kind: 'qualquer' }).errors.kind);
    assert(validateFeedback({ ...feedback, subject: 'a'.repeat(121) }).errors.subject);
    assert(validateFeedback({ ...feedback, message: 'a'.repeat(4001) }).errors.message);
    assert(validateFeedback({ ...feedback, name: 'a'.repeat(101) }).errors.name);
  });
  test('Espaços não contam como mensagem válida', () => assert.equal(validateFeedback({ ...feedback, message: ' '.repeat(50) }).valid, false));
  test('Progresso ignora conteúdo inválido, IDs desconhecidos e repetições', () => {
    const ids = study.sections.map((s) => s.id);
    assert.deepEqual(normalizeProgress('invalido', ids), []);
    assert.deepEqual(normalizeProgress('{}', ids), []);
    assert.deepEqual(normalizeProgress(JSON.stringify([ids[0], ids[0], 'fake', 7]), ids), [ids[0]]);
  });
  test('PPTX complementar está presente no caminho cadastrado', () => {
    assert(fs.existsSync(path.join(__dirname, '../public', study.materialUrl)));
  });
  console.log(`\n${count} testes aprovados.`);
} finally {
  if (originalTsLoader) require.extensions['.ts'] = originalTsLoader;
  else delete require.extensions['.ts'];
}

// Conteúdo adaptado dos slides e notas do PPTX fornecido.
// Exercícios e questões elaborados a partir das fontes indicadas, não transcritos como avaliação original.
// As referências externas abaixo pertencem ao material-base.
import type { Study } from "@/src/domain/study/entities/Study";

export const csharpDddCrudStudy = {
  "slug": "csharp-ddd-crud",
  "title": "C# .NET — Da interface ao CRUD",
  "description": "Interfaces, repositórios, Entity Framework Core, FluentValidation e respostas HTTP conectados em um CRUD de empresas com DDD pragmático.",
  "category": "Backend",
  "level": "Intermediário",
  "estimatedMinutes": 90,
  "topics": [
    "C#",
    ".NET",
    "Interfaces e DI",
    "Repositórios",
    "EF Core",
    "FluentValidation",
    "API e HTTP",
    "Reflection",
    "DDD pragmático"
  ],
  "sourceTitle": "CSharp Apresentacao Conceitos e Praticas.pptx",
  "sourceSlides": 80,
  "materialUrl": "/estudos/materiais/csharp-ddd-crud/material.pptx",
  "published": true,
  "version": 1,
  "introduction": [
    {
      "id": "topico-04",
      "title": "Convenções e limites da implementação",
      "paragraphs": [
        "O cenário central utiliza a entidade Empresa e a arquitetura DDD pragmática dos anexos. O texto de origem apresenta alternativas de retorno para atualização e exclusão. O exemplo integrado adota Task<bool> nesses métodos para comunicar ausência do registro ou conclusão da operação, mantendo interface, implementação e consumidores compatíveis. Essa escolha é uma adaptação didática, não uma transcrição literal de todas as variantes.",
        "As ressalvas de FluentValidation, erros HTTP e CNPJ foram preservadas da versão anterior, com suas fontes identificadas. As versões dos pacotes não foram informadas nos anexos; a execução requer dependências compatíveis."
      ],
      "codeExamples": [],
      "sourceSlides": [
        4
      ],
      "callout": "As versões dos pacotes não foram informadas nos anexos. A execução exige dependências e configuração compatíveis."
    },
    {
      "id": "topico-05",
      "title": "Como os conceitos se complementam",
      "paragraphs": [
        "O quadro relaciona os conceitos às responsabilidades de cada componente da API. Interfaces definem contratos. Repositórios concentram o acesso e a persistência. O EF Core fornece o contexto, os conjuntos de entidades e as operações usadas no CRUD. FluentValidation verifica os dados de entrada. A integração conecta esses elementos pela injeção de dependência e pelas actions do controller. Os tipos de resposta e os metadados HTTP descrevem outra dimensão: como o resultado será comunicado ao cliente.",
        "Essa síntese reúne os conceitos já desenvolvidos nos anexos."
      ],
      "codeExamples": [],
      "sourceSlides": [
        5
      ],
      "callout": "Separar contrato, execução e resultado torna explícito o papel de cada componente da aplicação."
    },
    {
      "id": "topico-06",
      "title": "O caminho de uma requisição",
      "paragraphs": [
        "O desenho representa uma sequência de execução possível. Durante uma requisição, a API recebe dados, a aplicação coordena a validação e usa uma abstração de persistência; a infraestrutura executa a operação no banco. O contrato não é um processo separado: ele expressa os membros pelos quais um objeto concreto é utilizado. Em DDD pragmático, contratos e entidades pertencem à parte interna da solução, enquanto detalhes de persistência ficam fora dela.",
        "No CRUD reduzido deste exemplo, o controller coordena a chamada ao validator e ao repositório, conforme a simplificação que o guia admite. Essa escolha não deve ser confundida com uma exigência universal de arquitetura."
      ],
      "codeExamples": [],
      "sourceSlides": [
        6
      ],
      "callout": "O Domain contém entidades e contratos. Ele não precisa conhecer controllers, SQL ou a implementação do EF Core."
    },
    {
      "id": "topico-07",
      "title": "Responsabilidades: cada arquivo tem um papel",
      "paragraphs": [
        "Os nomes utilizados nos exemplos seguem os anexos. A grafia Infraestructure foi preservada nos namespaces para manter compatibilidade com o material, embora Infrastructure seja a grafia inglesa usual. As camadas podem estar em pastas ou em projetos separados; pastas sozinhas não impõem as dependências. A entidade Empresa é simplificada, com setters públicos, e não representa toda a profundidade de um domínio rico.",
        "A Application pode conter serviços ou casos de uso além de DTOs e validators. A separação de responsabilidades evita que HTTP, regras de entrada e persistência sejam confundidos."
      ],
      "codeExamples": [],
      "sourceSlides": [
        7
      ],
      "table": {
        "headers": [
          "LOCAL / ARQUIVO",
          "RESPONSABILIDADE",
          "EVITE MISTURAR"
        ],
        "rows": [
          [
            "Domain / Empresa.cs",
            "Entidade e regras do domínio",
            "Status HTTP e acesso direto ao banco"
          ],
          [
            "Domain / IEmpresaRepository.cs",
            "Contrato de persistência",
            "Detalhes de consultas do EF Core"
          ],
          [
            "Application / EmpresaDto.cs",
            "Dados de entrada",
            "Estado de rastreamento do contexto"
          ],
          [
            "Application / EmpresaValidator.cs",
            "Regras de validação de entrada",
            "Salvar registros"
          ],
          [
            "Infraestructure / AppDbContext.cs",
            "Configuração e contexto EF Core",
            "Decidir a resposta HTTP"
          ],
          [
            "Infraestructure / EmpresaRepository.cs",
            "Consultas e persistência",
            "Receber o corpo HTTP"
          ],
          [
            "Controllers / EmpresaController.cs",
            "Entrada HTTP e resultado da operação",
            "Espalhar consultas de banco"
          ]
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "interfaces",
      "title": "Interfaces e injeção de dependência",
      "introduction": "Interfaces expressam contratos que podem ser utilizados sem expor detalhes de implementação. O módulo explica a declaração dos membros, os tipos de retorno e a implementação em classes concretas. A injeção de dependência conecta o consumidor à implementação registrada. A diferença central está entre declarar uma operação, fornecer seu comportamento e resolver a dependência que será utilizada em execução.",
      "lessons": [
        {
          "id": "topico-09",
          "title": "Interface é um contrato, não a consulta SQL",
          "paragraphs": [
            "Este contrato preserva o exemplo de Pessoa do guia. As assinaturas informam o que um consumidor poderá pedir ao repositório. A interface, neste exemplo, não contém implementação. Em C# moderno existem membros de interface com implementação padrão, portanto a frase “interface nunca pode conter código” seria imprecisa; o foco do exemplo é o contrato sem corpo. Uma classe concreta precisa fornecer os membros abstratos exigidos, diretamente ou por uma implementação herdada adequada.",
            "Task não determina como a operação será executada, mas representa sua conclusão. Usings de System, coleções, tarefas e do namespace da entidade são necessários quando não estão importados globalmente."
          ],
          "codeExamples": [
            {
              "title": "Domain / Interfaces / IPessoaRepository.cs",
              "code": "public interface IPessoaRepository\n{\n    Task<List<Pessoa>> ListarTodasAsync();\n    Task<Pessoa?> BuscarPorIdAsync(Guid id);\n    Task AdicionarAsync(Pessoa pessoa);\n    Task AtualizarAsync(Pessoa pessoa);\n    Task RemoverAsync(Guid id);\n}"
            }
          ],
          "sourceSlides": [
            9
          ],
          "callout": "O prefixo I é uma convenção de nomenclatura. O contrato será cumprido por uma classe concreta."
        },
        {
          "id": "topico-10",
          "title": "Leia a assinatura da esquerda para a direita",
          "paragraphs": [
            "A assinatura indica que o método recebe um Guid e retorna uma operação que produzirá Empresa ou null. A anotação nullable auxilia a análise estática quando nullable reference types estão habilitados. Ela não executa a verificação de ausência: o consumidor ainda precisa tratar o resultado. Em Task<List<Empresa>>, o contrato prevê uma coleção, que pode estar vazia. Task, sem parâmetro genérico, representa uma operação sem resultado tipado.",
            "O exemplo de Pessoa ilustra a sintaxe; o CRUD integrado utiliza Empresa e um contrato padronizado."
          ],
          "codeExamples": [
            {
              "title": "Exemplo C# do material",
              "code": "Task<Empresa?> BuscarPorIdAsync(Guid id);"
            }
          ],
          "sourceSlides": [
            10
          ],
          "callout": "Empresa? expressa a possibilidade de null. Não cria uma entidade e não substitui a verificação do resultado."
        },
        {
          "id": "topico-11",
          "title": "A classe fornece o comportamento exigido",
          "paragraphs": [
            "As duas declarações de tipo podem ficar em arquivos separados. As linhas de uso são um trecho para colocar dentro de um método de demonstração; não cole instruções de nível superior depois de declarações de tipo em um único arquivo. A assinatura implementada precisa ser compatível com a da interface: nome, parâmetros e retorno não são detalhes opcionais. Ao declarar uma variável do tipo interface, você limita o que acessa ao contrato, embora o objeto concreto execute o comportamento.",
            "Neste caso simples, a soma retorna 15. Instanciar uma interface com new ICalculadora() não é a forma válida de obter um objeto que implemente o contrato."
          ],
          "codeExamples": [
            {
              "title": "Exemplo independente • contrato e implementação",
              "code": "public interface ICalculadora\n{\n    int Somar(int a, int b);\n}\npublic class Calculadora : ICalculadora\n{\n    public int Somar(int a, int b)\n    {\n        return a + b;\n    }\n}\n// Dentro de um método de demonstração:\nICalculadora calculadora = new Calculadora();\nint resultado = calculadora.Somar(10, 5);\n// resultado: 15"
            }
          ],
          "sourceSlides": [
            11
          ]
        },
        {
          "id": "topico-12",
          "title": "DI: registrar não é o mesmo que implementar",
          "paragraphs": [
            "O consumidor é uma ilustração de injeção pelo construtor e não um arquivo obrigatório do CRUD integrado. Registre os serviços antes de builder.Build(). Ao criar o controller ou outro serviço pelo contêiner, o ASP.NET Core resolve as dependências registradas. AddScoped significa uma instância por escopo, não uma nova instância a cada chamada de método. Em aplicações web convencionais, o escopo costuma acompanhar a requisição.",
            "Transient cria instâncias a cada resolução; Singleton mantém uma instância no contêiner. O exemplo usa Scoped em alinhamento com o contexto EF Core. Se uma dependência não estiver registrada, a resolução poderá falhar em execução."
          ],
          "codeExamples": [
            {
              "title": "Program.cs + consumidor didático (arquivos distintos)",
              "code": "// Program.cs\nbuilder.Services.AddScoped<\n    IEmpresaRepository, EmpresaRepository>();\n \n// Exemplo de consumidor\npublic class ConsultaEmpresa\n{\n    private readonly IEmpresaRepository _repo;\n    public ConsultaEmpresa(IEmpresaRepository repo)\n    {\n        _repo = repo;\n    }\n    public Task<Empresa?> ExecutarAsync(Guid id)\n    {\n        return _repo.BuscarPorIdAsync(id);\n    }\n}"
            }
          ],
          "sourceSlides": [
            12
          ],
          "callout": "EmpresaRepository deve implementar IEmpresaRepository. O registro não gera os métodos da classe."
        },
        {
          "id": "topico-13",
          "title": "Inversão de dependência: mude o sentido do vínculo",
          "paragraphs": [
            "As setas deste tópico são de dependência de código, ao contrário do fluxo de execução apresentado no início. A Application pode depender do contrato definido internamente, enquanto a Infrastructure depende desse mesmo contrato para implementá-lo. O uso de EF Core não precisa aparecer na interface. Isso permite uma implementação de teste que cumpra o contrato sem executar consultas reais, embora os testes de persistência precisem verificar a implementação com o provedor adequado.",
            "O repositório não é uma exigência universal para todo projeto com EF Core; aqui ele é uma parte expressa do exemplo e da organização didática adotada no guia."
          ],
          "codeExamples": [],
          "sourceSlides": [
            13
          ],
          "callout": "Executar: consumidor → objeto concreto. Depender no código: consumidor → interface ← implementação."
        },
        {
          "id": "topico-14",
          "title": "Interface, implementação e resolução por DI",
          "paragraphs": [
            "A interface declara os membros disponíveis, enquanto a classe concreta fornece seu comportamento. Uma busca tipada como Task<Empresa?> pode resultar em null após ser aguardada, exigindo tratamento de ausência. O registro por AddScoped associa o serviço à implementação com vida útil por escopo; não implementa métodos, regras de negócio ou persistência. As assinaturas precisam ser compatíveis entre a interface e a classe.",
            "Alterar um retorno, nome ou parâmetro sem ajustar o contrato e seus consumidores rompe essa coerência."
          ],
          "codeExamples": [],
          "sourceSlides": [
            14
          ],
          "callout": "A interface define as operações; a classe implementa o comportamento; o contêiner fornece a dependência."
        }
      ],
      "exercise": {
        "statement": "Qual é a diferença entre declarar IEmpresaRepository, implementar EmpresaRepository e registrar AddScoped<IEmpresaRepository, EmpresaRepository>()?",
        "answer": "A interface declara operações, parâmetros e retornos. A classe fornece os comportamentos compatíveis. AddScoped associa o contrato à implementação com uma instância por escopo; não escreve métodos nem salva dados.",
        "sourceSlides": [
          9,
          12,
          14
        ]
      }
    },
    {
      "id": "repositories",
      "title": "Repositórios",
      "introduction": "A segunda parte do guia apresenta o padrão Repository e usa Empresa como entidade principal. Vamos adotar esse mesmo exemplo no restante do CRUD para evitar alternar entre modelos desnecessariamente. Primeiro definiremos os dados e o contrato. Depois construiremos a classe de repositório e suas consultas. As operações de escrita serão aprofundadas junto do EF Core.",
      "lessons": [
        {
          "id": "topico-16",
          "title": "Empresa: o objeto que será persistido",
          "paragraphs": [
            "A entidade acompanha o modelo do anexo. O Id é gerado no fluxo de criação, com Guid.NewGuid(). string.Empty é inicialização, não validação: uma string vazia ainda pode ser inválida para uma regra de negócio. Em um domínio mais rigoroso, construtores e métodos poderiam proteger invariantes e controlar mudanças. O repositório manipula objetos Empresa, e não apenas campos isolados. O namespace de arquivo pressupõe uma versão de C# compatível; a mesma organização pode ser expressa com bloco namespace em configurações anteriores."
          ],
          "codeExamples": [
            {
              "title": "Domain / Entities / Empresa.cs",
              "code": "namespace Senac.ExemploCrud.Domain.Entities;\n \npublic class Empresa\n{\n    public Guid Id { get; set; }\n    public string RazaoSocial { get; set; }\n        = string.Empty;\n    public string NomeFantasia { get; set; }\n        = string.Empty;\n    public string Cnpj { get; set; }\n        = string.Empty;\n    public string Email { get; set; }\n        = string.Empty;\n}"
            }
          ],
          "sourceSlides": [
            16
          ],
          "callout": "string.Empty evita iniciar essas propriedades com null. Não impede que um cliente envie dados inválidos."
        },
        {
          "id": "topico-17",
          "title": "Um contrato único para o CRUD integrado",
          "paragraphs": [
            "A interface original do guia usa Task AtualizarAsync(Empresa) e Task RemoverAsync(Guid). Mais adiante, o guia demonstra uma atualização por ID com retorno bool e uma exclusão também com bool. São alternativas, mas precisam de contratos correspondentes. Para formar um exemplo integrado coerente, adotamos aqui AtualizarAsync(Guid id, Empresa dados) e RemoverAsync(Guid id), ambos com Task<bool>. A atualização recebe o ID que deve ser localizado e os novos valores dos campos editáveis; não copia o Id do objeto dados. true será retornado depois de SaveChangesAsync concluir; uma exceção do provedor continua sendo uma falha, não ausência do registro.",
            "Inclua o using do namespace de Empresa."
          ],
          "codeExamples": [
            {
              "title": "Domain / Interfaces / IEmpresaRepository.cs",
              "code": "public interface IEmpresaRepository\n{\n    Task<List<Empresa>> ListarTodasAsync();\n    Task<Empresa?> BuscarPorIdAsync(Guid id);\n    Task<Empresa?> ObterPorCnpjAsync(string cnpj);\n    Task<Empresa?> ObterPorNomeFantasiaAsync(\n        string nomeFantasia);\n    Task AdicionarAsync(Empresa empresa);\n    Task<bool> AtualizarAsync(\n        Guid id, Empresa dados);\n    Task<bool> RemoverAsync(Guid id);\n}"
            }
          ],
          "sourceSlides": [
            17
          ],
          "callout": "As variantes exigem contratos correspondentes. O exemplo integrado mantém as assinaturas consistentes."
        },
        {
          "id": "topico-18",
          "title": "A implementação recebe o contexto por DI",
          "paragraphs": [
            "Este tópico apresenta apenas a estrutura da classe; sozinho, o esqueleto não implementa os sete membros e não compila como implementação final. Os métodos são mostrados nos próximos tópicos de consultas e CRUD. Insira todos dentro da mesma classe, sem duplicar namespaces e construtores. O using Microsoft.EntityFrameworkCore disponibiliza extensões como AsNoTracking, ToListAsync e FirstOrDefaultAsync.",
            "AppDbContext será definido no próximo módulo. O contêiner deve conhecer tanto o contexto quanto a associação entre interface e implementação. A quebra de linha no namespace não muda seu nome completo: Senac.ExemploCrud.Infraestructure.Repositories."
          ],
          "codeExamples": [
            {
              "title": "Infraestructure / Repositories / EmpresaRepository.cs",
              "code": "using Microsoft.EntityFrameworkCore;\nusing Senac.ExemploCrud.Domain.Entities;\nusing Senac.ExemploCrud.Domain.Interfaces;\nusing Senac.ExemploCrud.Infraestructure.Data;\n \nnamespace Senac.ExemploCrud.Infraestructure\n    .Repositories;\npublic class EmpresaRepository : IEmpresaRepository\n{\n    private readonly AppDbContext _context;\n    public EmpresaRepository(AppDbContext context)\n    {\n        _context = context;\n    }\n    // Insira aqui os 7 métodos do contrato.\n}"
            }
          ],
          "sourceSlides": [
            18
          ]
        },
        {
          "id": "topico-19",
          "title": "Ler: uma coleção ou uma entidade opcional",
          "paragraphs": [
            "Os dois métodos fazem leitura. A cadeia de chamadas constrói a consulta até a operação terminal que executa e materializa o resultado. ToListAsync produz uma lista, enquanto FirstOrDefaultAsync produz o primeiro elemento ou o valor padrão do tipo, que é null para a entidade de referência Empresa. AsNoTracking informa que as entidades retornadas por essas consultas não serão rastreadas automaticamente pelo contexto.",
            "Portanto, alterar uma propriedade do objeto retornado aqui não basta para gravar a mudança. No fluxo de atualização adotado, o próprio repositório buscará uma instância rastreada com FindAsync. Não adicione SaveChangesAsync a uma consulta apenas por ela ser assíncrona."
          ],
          "codeExamples": [
            {
              "title": "EmpresaRepository.cs • métodos 1 e 2",
              "code": "public async Task<List<Empresa>> ListarTodasAsync()\n{\n    return await _context.Empresas\n        .AsNoTracking()\n        .ToListAsync();\n}\n \npublic async Task<Empresa?> BuscarPorIdAsync(Guid id)\n{\n    return await _context.Empresas\n        .AsNoTracking()\n        .FirstOrDefaultAsync(e => e.Id == id);\n}"
            }
          ],
          "sourceSlides": [
            19
          ]
        },
        {
          "id": "topico-20",
          "title": "Consultas específicas também pertencem ao contrato",
          "paragraphs": [
            "Estes métodos preservam as buscas específicas do guia. ObterPorCnpjAsync compara a string armazenada com a recebida. O guia não define uma rotina de normalização para essa coluna, portanto esta apresentação não afirma que pontuações distintas serão equivalentes. Da mesma forma, o tratamento de maiúsculas, minúsculas e acentos depende do modelo e do provedor. A busca por nome fantasia retorna o primeiro registro correspondente e não comprova unicidade.",
            "Caso a aplicação exija unicidade de um campo, uma restrição apropriada precisa estar no banco. Não confunda o predicado de uma consulta com uma validação completa do documento ou com a garantia de que existe apenas um resultado."
          ],
          "codeExamples": [
            {
              "title": "EmpresaRepository.cs • métodos 3 e 4",
              "code": "public async Task<Empresa?> ObterPorCnpjAsync(\n    string cnpj)\n{\n    return await _context.Empresas\n        .AsNoTracking()\n        .FirstOrDefaultAsync(e => e.Cnpj == cnpj);\n}\npublic async Task<Empresa?> ObterPorNomeFantasiaAsync(\n    string nomeFantasia)\n{\n    return await _context.Empresas\n        .AsNoTracking()\n        .FirstOrDefaultAsync(\n            e => e.NomeFantasia == nomeFantasia);\n}"
            }
          ],
          "sourceSlides": [
            20
          ],
          "callout": "Comparação e normalização devem seguir os dados gravados. Não presuma que CNPJ com e sem pontuação sejam iguais."
        },
        {
          "id": "topico-21",
          "title": "async e await: conclusão não é uma nova thread",
          "paragraphs": [
            "No acesso a banco, a operação assíncrona pode liberar a thread enquanto aguarda a entrada e saída, sem que isso signifique criar uma thread exclusiva para cada consulta. Manter o fluxo assíncrono do controller até o repositório facilita essa composição. Task representa a operação, e não é sinônimo de thread. O guia destaca essa distinção. Métodos que apenas devolvem uma Task podem encaminhá-la sem async, como o consumidor didático mostrado antes; quando é preciso trabalhar com o valor obtido, o await torna o fluxo explícito.",
            "Não execute Task.WhenAll com consultas que compartilham a mesma instância de DbContext. Essa observação é uma verificação complementar de uso seguro do contexto."
          ],
          "codeExamples": [],
          "sourceSlides": [
            21
          ],
          "callout": "O mesmo DbContext não deve executar operações simultâneas. Aguarde uma chamada antes de reutilizá-lo."
        },
        {
          "id": "topico-22",
          "title": "Do contrato à execução das consultas",
          "paragraphs": [
            "O contrato e a implementação têm papéis distintos, mas assinaturas compatíveis. IEmpresaRepository declara as operações; EmpresaRepository utiliza o contexto para executá-las. ListarTodasAsync produz uma lista, inclusive quando vazia. BuscarPorIdAsync, ObterPorCnpjAsync e ObterPorNomeFantasiaAsync produzem uma Empresa ou null. Como esses quatro métodos são consultas, não precisam chamar SaveChangesAsync.",
            "A persistência é tratada nas operações de escrita."
          ],
          "codeExamples": [],
          "sourceSlides": [
            22
          ],
          "callout": "As quatro consultas de EmpresaRepository leem dados; elas não precisam chamar SaveChangesAsync."
        }
      ],
      "exercise": {
        "statement": "Uma listagem não encontrou empresas e uma busca por ID também não encontrou a empresa. Os dois métodos devem comunicar a ausência da mesma maneira?",
        "answer": "Não. ListarTodasAsync produz uma lista, inclusive vazia. BuscarPorIdAsync retorna Empresa ou null após await. O consumidor trata a ausência antes de acessar a entidade. Consultas não precisam de SaveChangesAsync.",
        "sourceSlides": [
          19,
          22
        ]
      }
    },
    {
      "id": "ef-core",
      "title": "Entity Framework Core e CRUD",
      "introduction": "O módulo explica DbContext, DbSet, consultas, rastreamento e operações de CRUD. A distinção central é entre obter dados, alterar o estado acompanhado pelo contexto e persistir as alterações. Os métodos de consulta têm resultados diferentes: listas, entidades opcionais ou valores de existência. Nas escritas rastreadas apresentadas, SaveChangesAsync marca o ponto em que as alterações pendentes são persistidas.",
      "lessons": [
        {
          "id": "topico-24",
          "title": "AppDbContext: a sessão de trabalho do EF Core",
          "paragraphs": [
            "O guia também apresenta DbSet<Pessoa>; ele foi omitido neste recorte porque o CRUD integrado usa somente Empresa. O construtor recebe DbContextOptions e as encaminha à classe base. O contexto será registrado no Program.cs com um provedor compatível. DbSet não é uma lista comum já carregada: ele permite construir consultas e manipular entidades por meio do contexto. A configuração do modelo pode ser ampliada em OnModelCreating.",
            "O contexto normalmente tem vida curta e é usado como uma unidade de trabalho. Ele não é seguro para uso concorrente entre operações. A exclamação após null atua na análise de nulidade do compilador, e não inicializa a propriedade por conta própria."
          ],
          "codeExamples": [
            {
              "title": "Infraestructure / Data / AppDbContext.cs",
              "code": "using Microsoft.EntityFrameworkCore;\nusing Senac.ExemploCrud.Domain.Entities;\nnamespace Senac.ExemploCrud.Infraestructure.Data;\n \npublic class AppDbContext : DbContext\n{\n    public AppDbContext(\n        DbContextOptions<AppDbContext> options)\n        : base(options)\n    {\n    }\n    public DbSet<Empresa> Empresas { get; set; }\n        = null!;\n}"
            }
          ],
          "sourceSlides": [
            24
          ],
          "callout": "null! suprime o aviso de nulidade na inicialização. Não cria o banco, a tabela nem a conexão."
        },
        {
          "id": "topico-25",
          "title": "Dois caminhos diferentes dentro do EF Core",
          "paragraphs": [
            "Na leitura, a consulta é construída e depois executada por uma operação que obtém resultados. Na escrita baseada em rastreamento, o contexto conhece entidades e alterações pendentes; SaveChangesAsync solicita ao provedor que as persista. A distinção descreve o padrão usado no guia e não pretende afirmar que toda API de gravação do EF Core exige SaveChanges: existem outras técnicas, como operações diretas em lote, que não fazem parte do exemplo.",
            "Para responder às pegadinhas do material, mantenha o foco nos métodos apresentados: ToListAsync consulta, AddAsync adiciona ao contexto, Remove marca exclusão e SaveChangesAsync persiste o conjunto de alterações pendentes."
          ],
          "codeExamples": [],
          "sourceSlides": [
            25
          ],
          "callout": "As consultas não precisam de SaveChangesAsync. As escritas rastreadas do exemplo precisam persistir as alterações."
        },
        {
          "id": "topico-26",
          "title": "Escolha a operação de leitura pelo resultado esperado",
          "paragraphs": [
            "O tipo declarado no contrato do repositório deve corresponder ao resultado que a implementação oferece. Uma consulta de existência é melhor expressa como bool do que como uma entidade que será descartada apenas para verificar null. FindAsync busca por chave primária: se o contexto já rastrear aquela chave, pode devolver essa instância sem nova consulta ao banco; caso contrário, busca no banco e anexa a entidade encontrada ao contexto.",
            "FirstOrDefaultAsync representa uma consulta e pode ser combinado com AsNoTracking. Não coloque AsNoTracking depois de FindAsync: este não devolve um IQueryable para continuar encadeando a consulta. As diferenças foram verificadas na documentação oficial."
          ],
          "codeExamples": [],
          "sourceSlides": [
            26
          ],
          "callout": "“Async” não significa “salvar”. O significado vem da operação: listar, buscar, verificar ou persistir.",
          "table": {
            "headers": [
              "MÉTODO",
              "RESULTADO",
              "PONTO DE ATENÇÃO"
            ],
            "rows": [
              [
                "ToListAsync()",
                "List<Empresa>",
                "Coleção vazia continua sendo uma lista."
              ],
              [
                "FirstOrDefaultAsync(...)",
                "Empresa?",
                "Pode retornar null; aceita um predicado."
              ],
              [
                "FindAsync(id)",
                "Empresa? após await",
                "Busca a chave primária; pode usar entidade já rastreada."
              ],
              [
                "AnyAsync(...)",
                "bool",
                "Responde existência; não devolve uma entidade."
              ],
              [
                "AsNoTracking()",
                "Consulta configurada",
                "Não executa nem grava por si só."
              ]
            ]
          }
        },
        {
          "id": "topico-27",
          "title": "Tracking: quando a mudança pode ser detectada",
          "paragraphs": [
            "Os trechos são independentes, para comparar comportamentos. No primeiro, FindAsync retorna uma entidade rastreada. Ao modificar uma propriedade e salvar, o contexto pode detectar a alteração. No segundo, a consulta usa AsNoTracking: a instância retornada não passa automaticamente a ser rastreada por você mudar uma propriedade. SaveChangesAsync não inspeciona arbitrariamente todos os objetos existentes na aplicação.",
            "É possível anexar ou atualizar explicitamente uma entidade desconectada, mas essa é outra estratégia e exige cuidado com campos e duplicidade de instâncias da mesma chave. A análise considera o contexto padrão do exemplo; não generalize o comportamento sem observar configurações e outras operações feitas no contexto."
          ],
          "codeExamples": [
            {
              "title": "RASTREADA • alteração acompanhada",
              "code": "var empresa = await _context.Empresas\n    .FindAsync(id);\nif (empresa is not null)\n{\n    empresa.NomeFantasia = \"Novo nome\";\n    await _context.SaveChangesAsync();\n}"
            },
            {
              "title": "SEM TRACKING • somente esta consulta",
              "code": "var empresa = await _context.Empresas\n    .AsNoTracking()\n    .FirstOrDefaultAsync(e => e.Id == id);\nif (empresa is not null)\n{\n    empresa.NomeFantasia = \"Novo nome\";\n    await _context.SaveChangesAsync();\n}"
            }
          ],
          "sourceSlides": [
            27
          ],
          "callout": "Pressupostos do exemplo: mesma instância de contexto e comportamento padrão de tracking; nenhum Attach/Update adicional."
        },
        {
          "id": "topico-28",
          "title": "Create: adicionar ao contexto e persistir",
          "paragraphs": [
            "Este método segue diretamente o exemplo do guia. O importante é distinguir a inclusão no contexto da persistência no banco. O controller validará o DTO, criará a entidade e atribuirá um Guid antes de chamar o repositório. O retorno Task não significa que a operação é ignorada: o chamador deve aguardá-la para não responder sucesso antes de sua conclusão. SaveChangesAsync pode lançar uma exceção em caso de falha, e o exemplo não converte essa falha em sucesso.",
            "Em operações de negócio que alteram várias entidades de forma indivisível, salvar separadamente em cada método de repositório pode não ser suficiente; essa fronteira é discutida depois como cuidado de arquitetura, não como requisito adicional do exemplo."
          ],
          "codeExamples": [
            {
              "title": "EmpresaRepository.cs • método 5",
              "code": "public async Task AdicionarAsync(Empresa empresa)\n{\n    await _context.Empresas.AddAsync(empresa);\n    await _context.SaveChangesAsync();\n}"
            }
          ],
          "sourceSlides": [
            28
          ],
          "callout": "AddAsync não é a confirmação da gravação. O Id será definido no fluxo de criação do controller."
        },
        {
          "id": "topico-29",
          "title": "Update: buscar, mudar campos permitidos e salvar",
          "paragraphs": [
            "O guia apresenta a atualização rastreada de NomeFantasia e também um método que chama Update em uma entidade recebida. Aqui a estratégia rastreada foi ampliada para os quatro campos de EmpresaDto e explicitamente alinhada ao contrato. O ID da rota é usado para localizar o registro e não é substituído pelo Id do objeto dados. Esse cuidado evita que uma identificação recebida inadvertidamente seja tratada como alteração de identidade.",
            "A existência é verificada no repositório com a mesma busca que carrega a instância para atualização. true indica que o registro foi encontrado e SaveChangesAsync concluiu; não significa necessariamente que valores diferentes foram gravados, pois o cliente pode enviar os mesmos valores. Controle de concorrência não é implementado neste exemplo reduzido."
          ],
          "codeExamples": [
            {
              "title": "EmpresaRepository.cs • método 6",
              "code": "public async Task<bool> AtualizarAsync(\n    Guid id, Empresa dados)\n{\n    var empresa = await _context.Empresas.FindAsync(id);\n    if (empresa is null)\n        return false;\n    empresa.RazaoSocial = dados.RazaoSocial;\n    empresa.NomeFantasia = dados.NomeFantasia;\n    empresa.Cnpj = dados.Cnpj;\n    empresa.Email = dados.Email;\n    await _context.SaveChangesAsync();\n    return true;\n}"
            }
          ],
          "sourceSlides": [
            29
          ],
          "callout": "Task<bool> e os parâmetros (Guid id, Empresa dados) precisam ser os mesmos na interface."
        },
        {
          "id": "topico-30",
          "title": "Update em uma entidade desconectada",
          "paragraphs": [
            "Este tópico preserva e contextualiza a outra abordagem presente no texto. A assinatura difere da adotada no contrato central: retorna Task e recebe apenas Empresa. Ela não deve ser copiada como substituta do método anterior sem alterar a interface e seus consumidores. Update não é um mecanismo que primeiro carrega todos os valores originais para decidir o que foi modificado; a marcação ampla pode incluir campos que o cliente não deveria alterar.",
            "Além disso, cenários com gráficos de entidades e instâncias já rastreadas exigem cuidados adicionais. O fluxo integrado utiliza a atualização rastreada do tópico anterior. O objetivo da comparação é reconhecer diferenças, não defender uma única estratégia universal."
          ],
          "codeExamples": [
            {
              "title": "Exemplo alternativo • não utilizado no CRUD integrado",
              "code": "// Alternativa independente; NÃO somar ao contrato\n// padronizado desta apresentação sem ajustá-lo.\npublic async Task AtualizarAsync(Empresa empresa)\n{\n    _context.Empresas.Update(empresa);\n    await _context.SaveChangesAsync();\n}"
            }
          ],
          "sourceSlides": [
            30
          ],
          "callout": "Duas estratégias válidas podem exigir contratos diferentes. Escolha uma e mantenha a consistência."
        },
        {
          "id": "topico-31",
          "title": "Delete: resultado de negócio antes do status HTTP",
          "paragraphs": [
            "O guia apresenta esta alternativa com retorno bool na parte de CRUD. Aqui ela foi adotada também na interface para que o projeto integrado seja coerente. O repositório comunica a ausência ou a conclusão da exclusão sem depender de tipos MVC. Uma chave não encontrada produz false. Uma falha real de persistência, por exemplo por restrição de integridade referencial, pode lançar exceção e não deve ser confundida com registro inexistente.",
            "O código não implementa exclusão lógica, cascatas personalizadas ou recuperação de dados; tais comportamentos dependeriam do modelo e dos requisitos. No controller, a convenção usada será 404 para ausência e 204 quando a exclusão concluir."
          ],
          "codeExamples": [
            {
              "title": "EmpresaRepository.cs • método 7",
              "code": "public async Task<bool> RemoverAsync(Guid id)\n{\n    var empresa = await _context.Empresas.FindAsync(id);\n    if (empresa is null)\n        return false;\n    _context.Empresas.Remove(empresa);\n    await _context.SaveChangesAsync();\n    return true;\n}"
            }
          ],
          "sourceSlides": [
            31
          ],
          "callout": "O repositório não retorna NotFound() ou NoContent(). Essas são decisões da camada HTTP."
        },
        {
          "id": "topico-32",
          "title": "SaveChangesAsync define a fronteira de persistência",
          "paragraphs": [
            "No CRUD didático, cada operação de escrita é independente e o repositório chama SaveChangesAsync. Isso simplifica a leitura. Em um caso de uso que precisa cadastrar duas entidades juntas, duas chamadas separadas podem confirmar a primeira alteração antes de a segunda falhar. Uma unidade de trabalho ou uma transação explícita pode ser necessária para outro limite de atomicidade. Essa observação é um aprofundamento, não um novo requisito do guia.",
            "A documentação do EF Core informa que as mudanças de uma chamada de SaveChanges são aplicadas em transação quando o provedor oferece suporte. Não confunda persistência de registros com criação ou migração do esquema; preparar o ambiente de banco é uma etapa distinta."
          ],
          "codeExamples": [],
          "sourceSlides": [
            32
          ],
          "callout": "SaveChangesAsync salva dados pendentes. Ele não substitui a configuração do provedor nem a preparação do esquema do banco."
        },
        {
          "id": "topico-33",
          "title": "CRUD e HTTP: responsabilidades que se encontram",
          "paragraphs": [
            "O guia apresenta a associação usual entre CRUD e verbos HTTP e observa que os códigos dependem da implementação. O exemplo deste estudo adota 201 na criação, 200 nas leituras e 204 nas escritas sem corpo de resposta. PUT recebe todos os campos editáveis do DTO neste exemplo e não deve ser interpretado como PATCH. CreatedAtAction constrói uma resposta de criação apontando para a action de consulta por ID.",
            "A lista vazia não é a mesma situação que uma consulta individual sem resultado. A rota real usa uma restrição Guid nos exemplos de controller. Falhas de autorização, conflitos e outros estados HTTP estão fora do fluxo reduzido do material, não estão sendo negados como possibilidades de uma API real."
          ],
          "codeExamples": [],
          "sourceSlides": [
            33
          ],
          "callout": "PATCH é comum para atualização parcial, mas não será implementado neste CRUD. PUT recebe os quatro campos de EmpresaDto.",
          "table": {
            "headers": [
              "OPERAÇÃO",
              "ENDPOINT DO EXEMPLO",
              "RESPOSTA ADOTADA"
            ],
            "rows": [
              [
                "Create",
                "POST /api/empresas",
                "201 Created + recurso + Location"
              ],
              [
                "Read: listar",
                "GET /api/empresas",
                "200 OK + lista, mesmo se vazia"
              ],
              [
                "Read: ID",
                "GET /api/empresas/{id}",
                "200 OK ou 404 Not Found"
              ],
              [
                "Update",
                "PUT /api/empresas/{id}",
                "204 No Content ou 404; entrada inválida: 400"
              ],
              [
                "Delete",
                "DELETE /api/empresas/{id}",
                "204 No Content ou 404"
              ]
            ]
          }
        },
        {
          "id": "topico-34",
          "title": "Diagnóstico rápido: reconheça o sintoma",
          "paragraphs": [
            "A tabela propõe hipóteses de diagnóstico, não conclusões absolutas. Uma gravação também pode falhar por conexão, restrições, transação ou outras causas, e é necessário examinar o erro real. O objetivo é conectar sintomas às distinções ensinadas no guia. No diagnóstico da implementação, verifique primeiro se o contrato foi implementado corretamente, se a dependência foi registrada, se a consulta encontrou a entidade e se a operação de persistência foi aguardada.",
            "Para a atualização, confirme se a entidade está rastreada ou se houve uma estratégia explícita de anexação. Evite introduzir uma chamada aleatória a Update apenas para tentar resolver um problema sem entender qual instância está sendo usada."
          ],
          "codeExamples": [],
          "sourceSlides": [
            34
          ],
          "table": {
            "headers": [
              "SINTOMA",
              "CAUSA PROVÁVEL NO EXEMPLO",
              "VERIFICAÇÃO"
            ],
            "rows": [
              [
                "“Adicionei, mas não gravou”",
                "SaveChangesAsync não foi chamado/aguardado.",
                "Revise o fluxo inteiro e o erro retornado."
              ],
              [
                "“Mudei o objeto, mas nada mudou”",
                "Objeto veio de consulta AsNoTracking.",
                "Confira qual instância está rastreada."
              ],
              [
                "“Deu erro ao acessar NomeFantasia”",
                "A busca pode ter retornado null.",
                "Trate ausência antes de usar a entidade."
              ],
              [
                "“A classe não cumpre a interface”",
                "Assinatura diferente ou método faltante.",
                "Compare retorno e parâmetros."
              ],
              [
                "“Não resolveu o repositório”",
                "Registro de DI ou dependência ausente.",
                "Confira Program.cs e o construtor."
              ]
            ]
          }
        },
        {
          "id": "topico-35",
          "title": "Consulta, rastreamento e persistência",
          "paragraphs": [
            "Há cinco distinções essenciais no comportamento apresentado. ToListAsync materializa resultados e não salva dados. AddAsync prepara a inclusão no contexto, mas não confirma sozinho a gravação. FirstOrDefaultAsync pode retornar null para uma entidade de referência. AsNoTracking é uma opção de consulta, não uma exigência para toda leitura. Update configura a atualização e não consulta previamente o banco para comparar cada campo.",
            "Na atualização rastreada, a entidade é localizada, seus campos são alterados e SaveChangesAsync persiste a mudança sem exigir Update."
          ],
          "codeExamples": [],
          "sourceSlides": [
            35
          ],
          "callout": "Update configura o estado de atualização; não consulta o banco para comparar previamente todos os campos."
        }
      ],
      "exercise": {
        "statement": "Uma empresa foi consultada com AsNoTracking, seu nome foi alterado e SaveChangesAsync foi chamado. Por que a mudança pode não chegar ao banco no cenário apresentado?",
        "answer": "A instância não foi rastreada automaticamente por essa consulta. Alterar apenas o objeto não registra a mudança no contexto. O fluxo integrado busca a entidade com FindAsync na mesma instância de contexto, altera somente campos permitidos e aguarda SaveChangesAsync.",
        "sourceSlides": [
          27,
          29
        ]
      }
    },
    {
      "id": "validation",
      "title": "FluentValidation",
      "introduction": "FluentValidation permite organizar regras em uma classe que herda de AbstractValidator<T>. RuleFor seleciona a propriedade; os métodos encadeados estabelecem as verificações e suas mensagens. ValidateAsync executa as regras, e IsValid/Errors representam o resultado. A integração automática do anexo mantém uma ressalva técnica explícita. O CRUD apresentado utiliza IValidator<EmpresaDto> injetado e chamada explícita para tornar o ponto da validação visível.",
      "lessons": [
        {
          "id": "topico-37",
          "title": "EmpresaDto: entrada não é a entidade persistida",
          "paragraphs": [
            "O DTO reproduz o modelo de entrada do guia. Não precisa ser idêntico à entidade: a ausência do Id é intencional. Usar um objeto específico para entrada também torna explícitos os campos permitidos no cadastro e na atualização do exemplo. O validator será tipado como AbstractValidator<EmpresaDto>, e não como validator do repositório ou do controller. Depois que a entrada for validada, o controller fará o mapeamento para Empresa.",
            "O guia usa a palavra DTO como objeto de transferência de dados; uma API também pode adotar DTOs de saída. Esse segundo uso será explorado no complemento que reaproveita os temas de Response Type da apresentação original."
          ],
          "codeExamples": [
            {
              "title": "Application / DTOs / EmpresaDto.cs",
              "code": "namespace Senac.ExemploCrud.Application.DTOs;\n \npublic class EmpresaDto\n{\n    public string RazaoSocial { get; set; }\n        = string.Empty;\n    public string NomeFantasia { get; set; }\n        = string.Empty;\n    public string Cnpj { get; set; }\n        = string.Empty;\n    public string Email { get; set; }\n        = string.Empty;\n}"
            }
          ],
          "sourceSlides": [
            37
          ],
          "callout": "O validator desta sequência valida EmpresaDto. O repositório persiste Empresa. Há um mapeamento entre eles."
        },
        {
          "id": "topico-38",
          "title": "Validator • parte 1: regras para os nomes",
          "paragraphs": [
            "Imports deste arquivo: FluentValidation e Senac.ExemploCrud.Application.DTOs. Namespace: Senac.ExemploCrud.Application.Validators. Este é o início da mesma classe que será completada no próximo tópico. As regras de CNPJ e e-mail devem ser inseridas dentro do construtor, antes de sua chave de fechamento. As mensagens foram abreviadas para leitura no material-base, sem mudar os limites 150 e 100 do guia.",
            "RuleFor seleciona uma propriedade do objeto de entrada; a cadeia seguinte define verificações e mensagens. MaximumLength não significa “obrigatório”: a obrigatoriedade está na regra NotEmpty. Por padrão, uma regra que falha não necessariamente impede que todas as outras verificações sejam avaliadas. O exemplo preserva o comportamento simples do guia e não depende de configuração adicional de cascade."
          ],
          "codeExamples": [
            {
              "title": "Application / Validators / EmpresaValidator.cs",
              "code": "public class EmpresaValidator\n    : AbstractValidator<EmpresaDto>\n{\n    public EmpresaValidator()\n    {\n        RuleFor(e => e.RazaoSocial)\n            .NotEmpty().WithMessage(\"Obrigatória.\")\n            .MaximumLength(150)\n            .WithMessage(\"Use até 150 caracteres.\");\n        RuleFor(e => e.NomeFantasia)\n            .NotEmpty().WithMessage(\"Obrigatório.\")\n            .MaximumLength(100)\n            .WithMessage(\"Use até 100 caracteres.\");\n        // Insira aqui as regras da parte 2.\n    }\n}"
            }
          ],
          "sourceSlides": [
            38
          ]
        },
        {
          "id": "topico-39",
          "title": "Validator • parte 2: CNPJ e e-mail",
          "paragraphs": [
            "A regra personalizada preserva a lógica do guia. O operador && interrompe a avaliação da segunda condição quando a primeira é falsa, protegendo a chamada a Count. NotEmpty e Must são verificações distintas: a existência da primeira não deve ser usada como justificativa para retirar a proteção contra null da segunda sem analisar o fluxo. Contar os dígitos aceita uma string com pontuação quando houver quatorze caracteres reconhecidos como dígitos; também pode aceitar outros caracteres intercalados.",
            "EmailAddress verifica a forma de endereço segundo a biblioteca, não comprova que uma caixa postal existe. O próximo tópico explicita os limites do exemplo de CNPJ e separa a regra didática do requisito real atualizado."
          ],
          "codeExamples": [
            {
              "title": "EmpresaValidator.cs • continuação do construtor",
              "code": "// Continuação DENTRO do construtor EmpresaValidator\nRuleFor(e => e.Cnpj)\n    .NotEmpty()\n    .WithMessage(\"O CNPJ é obrigatório.\")\n    .Must(cnpj =>\n        cnpj is not null &&\n        cnpj.Count(char.IsDigit) == 14)\n    .WithMessage(\"O CNPJ deve conter 14 dígitos.\");\n \nRuleFor(e => e.Email)\n    .NotEmpty()\n    .WithMessage(\"O e-mail é obrigatório.\")\n    .EmailAddress()\n    .WithMessage(\"Informe um e-mail válido.\");"
            }
          ],
          "sourceSlides": [
            39
          ],
          "callout": "Count exige System.Linq, por using explícito ou global. Esta regra de CNPJ não é uma validação completa para produção."
        },
        {
          "id": "topico-40",
          "title": "Vocabulário das regras: o que cada chamada faz",
          "paragraphs": [
            "A tabela organiza o vocabulário de FluentValidation. AbstractValidator<T> reúne as regras do tipo validado. RuleFor seleciona a propriedade, enquanto os métodos encadeados estabelecem as condições. WithMessage define a mensagem da regra anterior, mas não muda a condição verificada. ValidateAsync executa a validação e IsValid/Errors representam seu resultado. Uma regra pode ser sintaticamente correta e ainda insuficiente como validação de negócio, como no caso da contagem de dígitos de CNPJ.",
            "Regras de entrada e invariantes de domínio têm responsabilidades distintas."
          ],
          "codeExamples": [],
          "sourceSlides": [
            40
          ],
          "table": {
            "headers": [
              "CHAMADA",
              "PAPEL",
              "NÃO SIGNIFICA"
            ],
            "rows": [
              [
                "AbstractValidator<EmpresaDto>",
                "Agrupar regras para o tipo EmpresaDto",
                "Executar automaticamente as regras"
              ],
              [
                "RuleFor(e => e.Email)",
                "Selecionar a propriedade Email",
                "Validar todas as propriedades"
              ],
              [
                "NotEmpty()",
                "Rejeitar vazio/padrão conforme o tipo",
                "Validar formato ou unicidade"
              ],
              [
                "MaximumLength(n)",
                "Limitar o tamanho máximo",
                "Tornar a string obrigatória"
              ],
              [
                "EmailAddress()",
                "Verificar o formato esperado pela biblioteca",
                "Comprovar que o e-mail existe"
              ],
              [
                "Must(condição)",
                "Aplicar uma condição personalizada",
                "Garantir que a condição é suficiente"
              ],
              [
                "WithMessage(texto)",
                "Definir a mensagem da regra anterior",
                "Substituir a própria regra"
              ]
            ]
          }
        },
        {
          "id": "topico-41",
          "title": "CNPJ: regra simplificada e seus limites",
          "paragraphs": [
            "A condição de CNPJ do anexo conta caracteres reconhecidos como dígitos e verifica se a quantidade é 14. Ela ilustra uma regra personalizada com Must. Não calcula dígitos verificadores e não rejeita necessariamente caracteres indevidos intercalados. A ressalva sobre CNPJ alfanumérico foi preservada da versão anterior e está vinculada à fonte da Receita Federal, separada do exemplo simplificado. Portanto, a regra apresentada não deve ser tratada como validação completa do documento em uma aplicação real."
          ],
          "codeExamples": [],
          "sourceSlides": [
            41
          ],
          "callout": "A regra apresentada é didática. Uma aplicação real precisa atender ao formato e aos requisitos aplicáveis ao documento."
        },
        {
          "id": "topico-42",
          "title": "Executar a validação e interpretar o resultado",
          "paragraphs": [
            "O guia demonstra uma chamada manual e depois usa BadRequest(resultado.Errors) no controller. Nesta apresentação, o resultado é convertido em ModelState e retornado por ValidationProblem para formar um corpo de erro de validação apropriado à API. Essa é uma adaptação identificada; ela não altera quais regras são avaliadas. O trecho depende de _validator, dto e da classe ControllerBase, definidos na integração.",
            "PropertyName identifica o campo relacionado à falha, e ErrorMessage traz a mensagem configurada. A saída com return impede que o fluxo alcance a gravação. Registrar um validator em DI disponibiliza uma instância, mas não significa que cada DTO será automaticamente validado em qualquer ponto do sistema."
          ],
          "codeExamples": [
            {
              "title": "Trecho de EmpresaController.cs",
              "code": "// Dentro de uma action com _validator injetado:\nvar resultado = await _validator.ValidateAsync(dto);\nif (!resultado.IsValid)\n{\n    foreach (var erro in resultado.Errors)\n        ModelState.AddModelError(\n            erro.PropertyName, erro.ErrorMessage);\n    return ValidationProblem(ModelState);\n}\n// Continue o fluxo apenas se a entrada for válida."
            }
          ],
          "sourceSlides": [
            42
          ],
          "callout": "No exemplo, erros são agrupados no ModelState e devolvidos com ValidationProblem, normalmente HTTP 400."
        },
        {
          "id": "topico-43",
          "title": "DI do validator: escolha um modo de registro",
          "paragraphs": [
            "As duas opções apresentadas resolvem a descoberta de validators pelo contêiner, mas não executam regras por si mesmas. O programa consolidado usa AddScoped<IValidator<EmpresaDto>, EmpresaValidator>(), que não precisa de varredura. A alternativa AddValidatorsFromAssemblyContaining exige o pacote FluentValidation.DependencyInjectionExtensions e o using apropriado. Não copie os dois registros como se ambos fossem necessários.",
            "A instância poderá ser solicitada pelo construtor do controller como IValidator<EmpresaDto>, mantendo a aplicação dependente de uma abstração. A versão dos pacotes não foi informada no anexo; confira a combinação utilizada no ambiente do projeto antes de instalar ou atualizar qualquer dependência."
          ],
          "codeExamples": [
            {
              "title": "Program.cs • alternativas, não cumulativas",
              "code": "using FluentValidation;\n// Opção usada no exemplo integrado:\nbuilder.Services.AddScoped<\n    IValidator<EmpresaDto>, EmpresaValidator>();\n \n// Alternativa: registro por varredura do assembly.\n// Requer FluentValidation.DependencyInjectionExtensions.\n// Não é necessário usar as duas opções juntas.\nbuilder.Services\n    .AddValidatorsFromAssemblyContaining<EmpresaValidator>();"
            }
          ],
          "sourceSlides": [
            43
          ],
          "callout": "No Program.cs consolidado, será usada somente a opção de registro explícito."
        },
        {
          "id": "topico-44",
          "title": "Validação automática e chamada explícita",
          "paragraphs": [
            "O anexo apresenta uma configuração de validação automática dependente da versão e do tipo de aplicação. A ressalva técnica foi preservada da edição anterior com a referência do FluentValidation: a antiga integração automática MVC não é apresentada como recomendação geral para projetos novos, e seu pipeline de validação é síncrono. O exemplo integrado adota IValidator<EmpresaDto> injetado e chamada explícita a ValidateAsync, deixando visível o ponto da execução.",
            "Outras formas de integração não são desenvolvidas neste estudo. Registro, integração e execução permanecem conceitos diferentes."
          ],
          "codeExamples": [],
          "sourceSlides": [
            44
          ],
          "callout": "A documentação oficial não recomenda a integração automática MVC antiga para projetos novos; o pipeline de validação MVC é síncrono."
        },
        {
          "id": "topico-45",
          "title": "Três camadas de proteção, três responsabilidades",
          "paragraphs": [
            "O guia distingue validação de entrada, regras de domínio e integridade do banco. Uma regra de unicidade baseada apenas em consultar se o CNPJ já existe pode falhar sob concorrência: duas requisições consultam antes que qualquer uma confirme a gravação. Quando o requisito de negócio é unicidade, uma restrição adequada deve protegê-lo no banco. O modelo simplificado apresentado no CRUD não acrescenta silenciosamente essa restrição nem um mecanismo completo de tratamento de conflito.",
            "O ponto deste tópico é compreender onde cada garantia pertence. Além disso, normalização precisa ser consistente com o requisito: duas representações da mesma informação não serão necessariamente iguais para um índice sem uma estratégia de armazenamento apropriada."
          ],
          "codeExamples": [],
          "sourceSlides": [
            45
          ],
          "callout": "Duas requisições podem passar pela mesma consulta de existência. Uma consulta no validator não substitui uma restrição única."
        },
        {
          "id": "topico-46",
          "title": "FluentValidation e Data Annotations não são sinônimos",
          "paragraphs": [
            "A comparação segue a tabela do guia. O objetivo não é estabelecer que uma abordagem serve para todos os projetos, mas reconhecer diferenças de localização e composição das regras. No fluxo montado aqui, a chamada explícita de ValidateAsync determina a execução do validator. [ApiController] possui comportamentos de API e validação do modelo próprios; não se deve concluir que sua presença automaticamente conecta todos os validators do FluentValidation sem configuração.",
            "Mecanismos simultâneos também podem produzir validações ou mensagens duplicadas se forem configurados sem intenção clara. Para o exercício, mantenha uma trilha simples: DTO recebido, validator injetado, resultado verificado, retorno de erro ou persistência."
          ],
          "codeExamples": [],
          "sourceSlides": [
            46
          ],
          "callout": "Os mecanismos podem coexistir. [ApiController] não descobre e executa qualquer classe FluentValidation por conta própria.",
          "table": {
            "headers": [
              "ASPECTO",
              "FLUENTVALIDATION",
              "DATA ANNOTATIONS"
            ],
            "rows": [
              [
                "Local das regras",
                "Classe validator separada",
                "Atributos aplicados ao modelo"
              ],
              [
                "Exemplo",
                "RuleFor(x => x.Email).EmailAddress()",
                "[EmailAddress]"
              ],
              [
                "Personalização",
                "Must e outros componentes de regra",
                "Atributos customizados / lógica adicional"
              ],
              [
                "Execução no nosso CRUD",
                "ValidateAsync chamado na action",
                "Não substitui o validator injetado"
              ],
              [
                "Organização",
                "Regras agrupadas por tipo validado",
                "Regras junto às propriedades"
              ]
            ]
          }
        },
        {
          "id": "topico-47",
          "title": "Definição, execução e resultado da validação",
          "paragraphs": [
            "Definição, registro e execução da validação são etapas diferentes. RuleFor e os validadores associados definem os critérios. O registro de DI permite fornecer o validator ao consumidor. ValidateAsync executa as regras no fluxo apresentado. IsValid false e a coleção Errors orientam a resposta de falha antes da persistência. As regras também têm limites distintos: contar dígitos não verifica todos os aspectos de um documento, um formato de e-mail não comprova a existência da caixa postal e uma consulta de existência não substitui uma restrição de unicidade no banco."
          ],
          "codeExamples": [],
          "sourceSlides": [
            47
          ],
          "callout": "Quantidade de dígitos, formato de e-mail e consulta de existência verificam aspectos diferentes; não são garantias completas."
        }
      ],
      "exercise": {
        "statement": "Registrar EmpresaValidator no contêiner de DI garante que todo EmpresaDto recebido será validado? A regra de contar 14 dígitos de CNPJ é suficiente para produção?",
        "answer": "Não para ambas. O registro permite resolver o validator; neste exemplo o controller executa ValidateAsync. A regra de CNPJ é didática: conta dígitos, não verifica todos os caracteres nem os dígitos verificadores e não cobre os requisitos reais do documento.",
        "sourceSlides": [
          39,
          41,
          43,
          47
        ]
      }
    },
    {
      "id": "integration",
      "title": "Integração da API",
      "introduction": "O módulo conecta as partes do cadastro de empresas. Program.cs registra controllers, contexto, repositório e validator. O controller recebe as abstrações pelo construtor, valida o DTO, realiza o mapeamento e solicita operações ao repositório. As actions diferenciam os caminhos de sucesso, ausência de recurso e entrada inválida. A coordenação no controller é a simplificação didática admitida no anexo; uma solução maior pode deslocar essa responsabilidade para a Application.",
      "lessons": [
        {
          "id": "topico-49",
          "title": "Program.cs: conecte controller, contexto e contratos",
          "paragraphs": [
            "Além dos dois usings mostrados, importe: Senac.ExemploCrud.Application.DTOs; Senac.ExemploCrud.Application.Validators; Senac.ExemploCrud.Domain.Interfaces; Senac.ExemploCrud.Infraestructure.Data; Senac.ExemploCrud.Infraestructure.Repositories. O exemplo pressupõe um projeto ASP.NET Core com implicit usings usuais ou os usings equivalentes explícitos. Para PostgreSQL, o provedor é Npgsql.EntityFrameworkCore.PostgreSQL; utilize uma versão compatível com o EF Core e o .NET do projeto.",
            "FluentValidation precisa estar instalado. Este programa usa registro explícito do validator, não varredura e não a integração automática MVC antiga. A configuração DefaultConnection deve ser fornecida de forma segura e o banco/esquema devem estar preparados. Não se informa uma string de conexão real nem se presume acesso ao ambiente do usuário. Os trechos foram revisados, mas não compilados no ambiente de elaboração do material-base."
          ],
          "codeExamples": [
            {
              "title": "Program.cs • imports do projeto detalhados nas notas",
              "code": "using FluentValidation;\nusing Microsoft.EntityFrameworkCore;\nvar builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddControllers();\nvar conexao = builder.Configuration\n    .GetConnectionString(\"DefaultConnection\")\n    ?? throw new InvalidOperationException(\n        \"Configure DefaultConnection.\");\nbuilder.Services.AddDbContext<AppDbContext>(\n    options => options.UseNpgsql(conexao));\nbuilder.Services.AddScoped<\n    IEmpresaRepository, EmpresaRepository>();\nbuilder.Services.AddScoped<\n    IValidator<EmpresaDto>, EmpresaValidator>();\nvar app = builder.Build();\napp.MapControllers();\napp.Run();"
            }
          ],
          "sourceSlides": [
            49
          ]
        },
        {
          "id": "topico-50",
          "title": "Controller: dependências recebidas no construtor",
          "paragraphs": [
            "O namespace do exemplo é Senac.ExemploCrud.API.Controllers, podendo corresponder à organização adotada no projeto. Além de Microsoft.AspNetCore.Mvc e FluentValidation, são necessários os namespaces Senac.ExemploCrud.Domain.Entities, Senac.ExemploCrud.Domain.Interfaces e Senac.ExemploCrud.Application.DTOs. O esqueleto é completado pelos auxiliares e pelas cinco actions seguintes. [ApiController] fornece comportamentos próprios de APIs, mas não substitui o registro e a execução de FluentValidation.",
            "O construtor utiliza _repo e _validator em todas as actions. A coordenação permanece no controller nesta simplificação; uma Application separada pode assumir o caso de uso em uma arquitetura maior."
          ],
          "codeExamples": [
            {
              "title": "Controllers / EmpresaController.cs",
              "code": "[ApiController]\n[Route(\"api/empresas\")]\npublic class EmpresaController : ControllerBase\n{\n    private readonly IEmpresaRepository _repo;\n    private readonly IValidator<EmpresaDto> _validator;\n    public EmpresaController(\n        IEmpresaRepository repo,\n        IValidator<EmpresaDto> validator)\n    {\n        _repo = repo;\n        _validator = validator;\n    }\n    // Insira os auxiliares e as actions a seguir.\n}"
            }
          ],
          "sourceSlides": [
            50
          ],
          "callout": "Imports: Microsoft.AspNetCore.Mvc, FluentValidation e os namespaces de Empresa, EmpresaDto e IEmpresaRepository."
        },
        {
          "id": "topico-51",
          "title": "Dois auxiliares para evitar repetir o mesmo código",
          "paragraphs": [
            "Estes dois métodos ficam dentro de EmpresaController, junto às actions. Foram extraídos dos trechos repetidos para tornar o CRUD completo legível no material-base. Mapear cria uma nova instância Empresa com os quatro campos permitidos pelo DTO e não altera ou normaliza silenciosamente seus valores. No POST, o controller atribui Guid.NewGuid antes de persistir. No PUT, a instância produzida representa novos dados: o repositório localizará a entidade existente pelo ID da rota e copiará somente campos editáveis.",
            "RegistrarErros recebe o resultado do FluentValidation com nome qualificado para evitar confusão com outro ValidationResult. Ele preenche ModelState e não emite resposta sozinho; a action mantém o controle do fluxo."
          ],
          "codeExamples": [
            {
              "title": "MAPEAR DTO → ENTIDADE",
              "code": "private static Empresa Mapear(\n    EmpresaDto dto)\n{\n    return new Empresa\n    {\n        RazaoSocial = dto.RazaoSocial,\n        NomeFantasia = dto.NomeFantasia,\n        Cnpj = dto.Cnpj,\n        Email = dto.Email\n    };\n}"
            },
            {
              "title": "REGISTRAR FALHAS NO MODELSTATE",
              "code": "private void RegistrarErros(\n    FluentValidation.Results\n        .ValidationResult resultado)\n{\n    foreach (var erro in resultado.Errors)\n    {\n        ModelState.AddModelError(\n            erro.PropertyName,\n            erro.ErrorMessage);\n    }\n}"
            }
          ],
          "sourceSlides": [
            51
          ]
        },
        {
          "id": "topico-52",
          "title": "GET: diferencie lista vazia de recurso ausente",
          "paragraphs": [
            "Estas actions utilizam o mesmo repositório e a mesma classe Empresa definidos nos módulos anteriores. A exposição direta da entidade segue a simplificação do guia. O complemento de Response Type apresentará um DTO de saída como alternativa explícita, sem trocar silenciosamente os tipos deste CRUD. BuscarPorId tem uma rota compatível com a chamada CreatedAtAction do POST, pois recebe o parâmetro id com o mesmo nome.",
            "Uma lista vazia representa o resultado normal de uma coleção sem elementos. Já a consulta individual usa null para sinalizar ausência. A restrição id:guid seleciona a rota quando o valor tem formato compatível; ela não garante que a chave exista no banco."
          ],
          "codeExamples": [
            {
              "title": "GET /api/empresas",
              "code": "[HttpGet]\npublic async Task<\n    ActionResult<List<Empresa>>> Listar()\n{\n    var empresas = await _repo\n        .ListarTodasAsync();\n    return Ok(empresas);\n}"
            },
            {
              "title": "GET /api/empresas/{id}",
              "code": "[HttpGet(\"{id:guid}\")]\npublic async Task<ActionResult<Empresa>>\n    BuscarPorId(Guid id)\n{\n    var empresa = await _repo\n        .BuscarPorIdAsync(id);\n    if (empresa is null)\n        return NotFound();\n    return Ok(empresa);\n}"
            }
          ],
          "sourceSlides": [
            52
          ]
        },
        {
          "id": "topico-53",
          "title": "POST: valide antes de criar e persistir",
          "paragraphs": [
            "Este é o exemplo de cadastro do guia com duas adaptações explícitas: o validator é injetado em vez de criado com new, e as falhas são convertidas em ModelState para ValidationProblem. O mapeamento foi extraído para um auxiliar já definido. A ordem é essencial: primeiro validar, depois mapear e atribuir a identidade, depois aguardar a persistência e só então responder 201. CreatedAtAction não executa a action BuscarPorId; ele usa suas informações para construir a localização do recurso.",
            "Se a rota ou o nome de parâmetro não corresponderem, a geração do endereço pode falhar. O exemplo retorna Empresa por simplicidade, acompanhando o guia. Tratamento global de erros de banco não está implementado nesta action."
          ],
          "codeExamples": [
            {
              "title": "EmpresaController.cs • action Criar",
              "code": "[HttpPost]\npublic async Task<IActionResult> Criar(\n    [FromBody] EmpresaDto dto)\n{\n    var resultado = await _validator.ValidateAsync(dto);\n    if (!resultado.IsValid)\n    {\n        RegistrarErros(resultado);\n        return ValidationProblem(ModelState);\n    }\n    var empresa = Mapear(dto);\n    empresa.Id = Guid.NewGuid();\n    await _repo.AdicionarAsync(empresa);\n    return CreatedAtAction(\n        nameof(BuscarPorId),\n        new { id = empresa.Id }, empresa);\n}"
            }
          ],
          "sourceSlides": [
            53
          ],
          "callout": "BuscarPorId, Mapear e RegistrarErros já foram definidos nesta sequência. O nome do parâmetro de rota é id."
        },
        {
          "id": "topico-54",
          "title": "PUT: o Id da rota identifica o alvo da alteração",
          "paragraphs": [
            "Esta action foi elaborada para conectar a atualização do guia ao controller. Ela segue a convenção de validar a entrada antes de verificar a existência no repositório. Portanto, se o cliente enviar ao mesmo tempo um ID inexistente e um DTO inválido, esta implementação poderá responder primeiro com o erro de validação; outras APIs podem escolher outra precedência. Mapear não define o Id do objeto de dados, e o repositório localiza o alvo usando o id recebido na rota.",
            "A expressão alterou indica a conclusão prevista pelo contrato bool: false para ausência, true após SaveChangesAsync concluir. Não significa que os campos tinham necessariamente valores diferentes. Esta não é uma implementação de PATCH ou de controle de concorrência."
          ],
          "codeExamples": [
            {
              "title": "EmpresaController.cs • action Atualizar",
              "code": "[HttpPut(\"{id:guid}\")]\npublic async Task<IActionResult> Atualizar(\n    Guid id, [FromBody] EmpresaDto dto)\n{\n    var resultado = await _validator.ValidateAsync(dto);\n    if (!resultado.IsValid)\n    {\n        RegistrarErros(resultado);\n        return ValidationProblem(ModelState);\n    }\n    var alterou = await _repo.AtualizarAsync(\n        id, Mapear(dto));\n    if (!alterou)\n        return NotFound();\n    return NoContent();\n}"
            }
          ],
          "sourceSlides": [
            54
          ],
          "callout": "Usa exatamente AtualizarAsync(Guid id, Empresa dados), conforme o contrato padronizado."
        },
        {
          "id": "topico-55",
          "title": "DELETE: transforme o retorno do repositório em HTTP",
          "paragraphs": [
            "O método RemoverAsync usado aqui já implementa a busca, o tratamento de ausência, a marcação para exclusão e SaveChangesAsync. Não é preciso consultar novamente no controller apenas para depois fazer a mesma busca no repositório. Essa é uma das razões para adotar o retorno bool de forma coerente. Se o registro foi removido anteriormente, uma nova chamada recebe false e esta action responde 404. Há APIs que escolhem uma resposta diferente para exclusões repetidas; o guia ressalta que convenções HTTP dependem da implementação.",
            "Em nenhum caso o código deve mascarar uma falha de integridade ou de conexão como sucesso. O tratamento geral de exceções é uma preocupação adicional, fora do exemplo reduzido."
          ],
          "codeExamples": [
            {
              "title": "EmpresaController.cs • action Remover",
              "code": "[HttpDelete(\"{id:guid}\")]\npublic async Task<IActionResult> Remover(Guid id)\n{\n    var removeu = await _repo.RemoverAsync(id);\n    if (!removeu)\n        return NotFound();\n    return NoContent();\n}"
            }
          ],
          "sourceSlides": [
            55
          ],
          "callout": "A decisão de retornar 404 em uma exclusão repetida é a convenção deste exemplo, não uma regra obrigatória para toda API."
        },
        {
          "id": "topico-56",
          "title": "Uma requisição de cadastro, do início ao fim",
          "paragraphs": [
            "No cenário de sucesso, o controller recebe EmpresaDto, aguarda ValidateAsync e prossegue porque IsValid é true. O mapeamento cria Empresa, o POST atribui Guid.NewGuid() e o repositório executa AddAsync seguido de SaveChangesAsync. CreatedAtAction produz a resposta 201 com o recurso e a localização da consulta por ID. Quando RazaoSocial está vazia, a validação produz uma falha e o fluxo retorna antes de AdicionarAsync.",
            "Os resultados pressupõem que a configuração e a persistência concluam sem falhas adicionais."
          ],
          "codeExamples": [],
          "sourceSlides": [
            56
          ],
          "callout": "Com RazaoSocial = \"\", o fluxo termina na validação, antes da chamada a AdicionarAsync."
        },
        {
          "id": "topico-57",
          "title": "Cenários de entrada e respostas do CRUD",
          "paragraphs": [
            "Os cenários descrevem o comportamento das actions do exemplo integrado. Um POST inválido encerra o fluxo com erro de validação. Um POST aceito e persistido retorna 201. A consulta de uma coleção retorna 200 com uma lista, mesmo vazia. A consulta individual distingue a entidade encontrada de null, com 200 ou 404. PUT válido de um registro existente retorna 204; PUT ou DELETE de registro ausente retornam 404 nesta convenção.",
            "As respostas não substituem a análise de outras falhas, como conexão, integridade ou autorização."
          ],
          "codeExamples": [],
          "sourceSlides": [
            57
          ],
          "callout": "Pressupostos: entrada válida nos cenários de ausência, provedor configurado e nenhuma falha adicional de banco.",
          "table": {
            "headers": [
              "CENÁRIO",
              "RESULTADO NESTE EXEMPLO",
              "INTERPRETAÇÃO"
            ],
            "rows": [
              [
                "POST com RazaoSocial vazia",
                "400 de validação",
                "A persistência não é chamada."
              ],
              [
                "POST com dados aceitos e banco disponível",
                "201 + recurso criado",
                "Id gerado e Location da consulta."
              ],
              [
                "GET de Id existente / inexistente",
                "200 / 404",
                "Ausência tratada explicitamente."
              ],
              [
                "PUT válido de Id existente",
                "204",
                "Somente campos editáveis são copiados."
              ],
              [
                "PUT ou DELETE de Id inexistente",
                "404",
                "Retorno false do repositório."
              ],
              [
                "GET de coleção sem registros",
                "200 + lista vazia",
                "Não confundir coleção vazia com null."
              ]
            ]
          }
        }
      ],
      "exercise": {
        "statement": "Descreva o caminho de um POST inválido e de um POST aceito pelas regras. Em que momento a API pode devolver 201?",
        "answer": "No POST inválido, ValidateAsync encontra falhas, elas são registradas no ModelState e ValidationProblem encerra o fluxo antes da persistência. Com entrada válida, o controller mapeia o DTO, gera o Guid, aguarda AdicionarAsync e só então retorna CreatedAtAction, pressupondo que a persistência conclua sem falha.",
        "sourceSlides": [
          51,
          53,
          56
        ]
      }
    },
    {
      "id": "responses",
      "title": "Tipos de resposta e Reflection",
      "introduction": "O módulo de tipos de resposta complementa a API com os conceitos da apresentação original. DTO de saída, tipo de retorno do método, status HTTP e metadados descrevem aspectos diferentes. ActionResult<T> permite combinar dados tipados com outros resultados HTTP. ProducesResponseType documenta as respostas esperadas, enquanto o código da action determina o resultado real. typeof e System.Type fornecem a base para consultar informações de tipos e seus metadados.",
      "lessons": [
        {
          "id": "topico-59",
          "title": "Response Type: nome do papel, não palavra-chave",
          "paragraphs": [
            "O PPT original usa UsuarioResponse e ProdutoResponse para explicar classes que organizam a resposta. Aqui o mesmo conceito é aplicado a EmpresaResponse para conectar o complemento ao exemplo central. A classe pode ficar em um namespace de DTOs de saída. As linhas de uso são um trecho dentro de um método que já tenha uma variável empresa disponível; não são código de nível superior para colar após a declaração da classe.",
            "A palavra Response não é uma palavra-chave C# que transforme automaticamente a classe em resposta HTTP. O formato exposto ao cliente depende do objeto retornado e da configuração de serialização. O CRUD central continuou retornando Empresa para preservar a simplificação do guia; este tópico mostra uma evolução explícita, não uma troca silenciosa."
          ],
          "codeExamples": [
            {
              "title": "Exemplo complementar • DTO de saída",
              "code": "public class EmpresaResponse\n{\n    public Guid Id { get; set; }\n    public string NomeFantasia { get; set; }\n        = string.Empty;\n}\n// Exemplo de mapeamento dentro de um método:\nEmpresaResponse resposta = new EmpresaResponse\n{\n    Id = empresa.Id,\n    NomeFantasia = empresa.NomeFantasia\n};"
            }
          ],
          "sourceSlides": [
            59
          ],
          "callout": "“Response” é uma convenção de nome. Não cria comportamento especial de serialização ou de validação."
        },
        {
          "id": "topico-60",
          "title": "ActionResult<T>: dados tipados e outros resultados",
          "paragraphs": [
            "O exemplo é uma alternativa à action BuscarPorId do CRUD central. Não mantenha simultaneamente duas actions com a mesma rota e verbo apenas para usar os dois modelos, pois a seleção pode ficar ambígua. ActionResult<EmpresaResponse> permite um resultado tipado em sucesso e resultados HTTP alternativos. Isso não significa que todo objeto encapsulado em Ok seja validado contra um contrato de schema em execução; a implementação precisa ser coerente.",
            "Ao mudar uma API para DTO de saída, revise também o formato da resposta de criação e os metadados para que o contrato público fique consistente. O uso de EmpresaResponse neste módulo substitui os nomes UsuarioResponse/ProdutoResponse do PPT apenas como adaptação de exemplo."
          ],
          "codeExamples": [
            {
              "title": "Alternativa para BuscarPorId • não duplicar a rota",
              "code": "// Alternativa para a action de consulta por ID.\n[HttpGet(\"{id:guid}\")]\npublic async Task<ActionResult<EmpresaResponse>>\n    BuscarPorId(Guid id)\n{\n    var empresa = await _repo.BuscarPorIdAsync(id);\n    if (empresa is null)\n        return NotFound();\n    return Ok(new EmpresaResponse\n    {\n        Id = empresa.Id,\n        NomeFantasia = empresa.NomeFantasia\n    });\n}"
            }
          ],
          "sourceSlides": [
            60
          ],
          "callout": "ActionResult<T> não força todos os caminhos a retornarem o mesmo corpo e não elimina a necessidade de if."
        },
        {
          "id": "topico-61",
          "title": "ProducesResponseType documenta; o return executa",
          "paragraphs": [
            "Este tópico expande o mesmo método alternativo, não cria mais uma action com rota duplicada. ProducesResponseType fornece metadados consumidos por ferramentas de descrição da API, como OpenAPI; o corpo do método é que escolhe o resultado efetivamente retornado. O PPT original sugere 404 como exemplo de resposta sem corpo. Essa afirmação precisa de contexto: com o comportamento padrão de [ApiController], um NotFound pode ser transformado em ProblemDetails.",
            "Por isso a alternativa documenta esse tipo explicitamente. A configuração real pode alterar o corpo; mantenha os metadados alinhados à API. Importe Microsoft.AspNetCore.Http para StatusCodes quando ele não estiver disponível globalmente e Microsoft.AspNetCore.Mvc para os demais tipos MVC."
          ],
          "codeExamples": [
            {
              "title": "Alternativa documentada • namespace Microsoft.AspNetCore.Http",
              "code": "[ProducesResponseType(\n    typeof(EmpresaResponse), StatusCodes.Status200OK)]\n[ProducesResponseType(\n    typeof(ProblemDetails), StatusCodes.Status404NotFound)]\n[HttpGet(\"{id:guid}\")]\npublic async Task<ActionResult<EmpresaResponse>>\n    BuscarPorId(Guid id)\n{\n    // Use o corpo da action alternativa anterior.\n    var empresa = await _repo.BuscarPorIdAsync(id);\n    if (empresa is null) return NotFound();\n    return Ok(new EmpresaResponse\n    {\n        Id = empresa.Id,\n        NomeFantasia = empresa.NomeFantasia\n    });\n}"
            }
          ],
          "sourceSlides": [
            61
          ],
          "callout": "404 foi documentado como ProblemDetails para o comportamento padrão de erros de uma API com [ApiController]. Confira a configuração real."
        },
        {
          "id": "topico-62",
          "title": "typeof e GetType: duas perguntas diferentes",
          "paragraphs": [
            "Os exemplos de typeof preservam os resultados String e Int32 do PPT. O comparativo com GetType foi acrescentado como aprofundamento e está identificado como complemento. A variável valor é declarada object, mas referencia uma string; GetType observa o tipo da instância. typeof(object), por sua vez, representa o tipo escrito na expressão. Não use typeof(valor) para tentar descobrir o tipo de uma variável; typeof espera um tipo.",
            "Nenhuma dessas operações converte o valor para outro tipo. Uma chamada de método em uma referência null falha, enquanto typeof não exige instância. Os trechos de Console.WriteLine devem ser usados em um método de demonstração ou em um programa de console devidamente estruturado."
          ],
          "codeExamples": [
            {
              "title": "typeof • QUAL É ESTE TIPO?",
              "code": "Type tipo = typeof(EmpresaResponse);\nConsole.WriteLine(tipo.Name);\n// EmpresaResponse\n \nConsole.WriteLine(typeof(string).Name);\n// String\nConsole.WriteLine(typeof(int).Name);\n// Int32"
            },
            {
              "title": "GetType • QUAL É O TIPO DESTE OBJETO?",
              "code": "object valor = \"Douglas\";\nType tipoReal = valor.GetType();\nConsole.WriteLine(tipoReal.Name);\n// String\n \nConsole.WriteLine(typeof(object).Name);\n// Object"
            }
          ],
          "sourceSlides": [
            62
          ],
          "callout": "Ambos fornecem um System.Type. typeof não converte o valor nem cria um objeto do tipo informado."
        },
        {
          "id": "topico-63",
          "title": "System.Type e Reflection: inspecionar metadados",
          "paragraphs": [
            "O PPT original mostra propriedades de UsuarioResponse e o texto ilustrativo Namespace.Produto. Neste exemplo, inspecionamos EmpresaResponse, cujas propriedades declaradas são Id e NomeFantasia. FullName resulta do namespace real usado no projeto; para tipos declarados sem namespace, o nome completo não inclui um namespace fictício. GetProperties sem parâmetros consulta propriedades públicas conforme as regras dessa API e pode incluir membros herdados.",
            "Não use a ordem de enumeração como garantia funcional no código de negócio. Reflection é o conjunto de mecanismos de inspeção de tipos e membros em execução. Obter um Type não instancia uma EmpresaResponse, não valida seus valores e não persiste nada no banco."
          ],
          "codeExamples": [
            {
              "title": "Exemplo de inspeção • classe EmpresaResponse do complemento",
              "code": "Type tipo = typeof(EmpresaResponse);\nConsole.WriteLine(tipo.Name);\n// EmpresaResponse\nConsole.WriteLine(tipo.FullName);\n// Inclui o namespace, quando o tipo possui um.\n \nforeach (var propriedade in tipo.GetProperties())\n{\n    Console.WriteLine(propriedade.Name);\n}\n// As propriedades desta classe incluem:\n// Id e NomeFantasia."
            }
          ],
          "sourceSlides": [
            63
          ],
          "callout": "Não dependa da ordem mostrada para as propriedades como regra de negócio. Consultar metadados não grava dados."
        },
        {
          "id": "topico-64",
          "title": "Três contratos presentes na mesma API",
          "paragraphs": [
            "O quadro relaciona os conceitos da apresentação original com os demais assuntos dos anexos. A interface de repositório define as operações entre componentes. DTOs representam formatos de transferência e podem diferir entre entrada e saída. A camada HTTP transforma resultados em respostas, enquanto os metadados descrevem os formatos esperados. São níveis relacionados, mas não intercambiáveis: ProducesResponseType não valida nem implementa a action, e uma classe terminada em Response não recebe comportamento especial apenas pelo nome. typeof fornece o System.Type utilizado na representação dos metadados."
          ],
          "codeExamples": [],
          "sourceSlides": [
            64
          ],
          "callout": "typeof fornece o System.Type usado em metadados. Ele não implementa a interface, executa a action ou salva a entidade."
        }
      ],
      "exercise": {
        "statement": "Adicionar ProducesResponseType(typeof(EmpresaResponse), 200) garante que a action sempre retornará 200? O que typeof faz nessa expressão?",
        "answer": "O atributo documenta um resultado esperado; o fluxo da action decide o resultado real. typeof(EmpresaResponse) fornece o System.Type do DTO documentado. Ele não instancia a classe, não executa a action e não valida os dados.",
        "sourceSlides": [
          60,
          61,
          62,
          64
        ]
      }
    },
    {
      "id": "estudo-integrado",
      "title": "Estudo integrado: CRUD de empresas",
      "introduction": "Este módulo reúne explicações dos conceitos já apresentados e os relaciona ao cenário do cadastro de empresas. Os quadros de componentes sintetizam contratos, contexto, persistência, rastreamento, DI e validação. O cenário integrado explicita a colaboração entre os arquivos. As conexões seguintes esclarecem os papéis de cada componente e os resultados de consulta, escrita e validação. O conteúdo foi reformulado como exposição técnica, mantendo os assuntos dos anexos.",
      "lessons": [
        {
          "id": "topico-66",
          "title": "Visão integrada • contratos e persistência",
          "paragraphs": [
            "A interface declara o contrato. O repositório centraliza as operações de acesso e persistência. DbContext coordena consultas, acompanhamento das entidades e gravação. DbSet<Empresa> fornece acesso ao conjunto de empresas no contexto. SaveChangesAsync persiste as alterações pendentes das operações de escrita rastreadas apresentadas. Uma consulta individual pode retornar null, ao contrário de uma listagem que pode produzir uma coleção vazia.",
            "Esses conceitos têm responsabilidades complementares, mas não intercambiáveis."
          ],
          "codeExamples": [],
          "sourceSlides": [
            66
          ]
        },
        {
          "id": "topico-67",
          "title": "Visão integrada • tracking, DI e validação",
          "paragraphs": [
            "AsNoTracking configura a consulta para não rastrear automaticamente as entidades retornadas. Uma entidade já rastreada pode ter propriedades alteradas e persistidas sem uma chamada adicional a Update. AddScoped registra uma associação com vida útil por escopo. RuleFor seleciona a propriedade a ser validada. ValidateAsync executa as regras no fluxo apresentado. IsValid informa o sucesso da validação, e Errors reúne as falhas.",
            "Registro de dependência, execução das regras e persistência são operações distintas."
          ],
          "codeExamples": [],
          "sourceSlides": [
            67
          ]
        },
        {
          "id": "topico-68",
          "title": "Cadastro de empresas • componentes em conjunto",
          "paragraphs": [
            "O cadastro de empresas combina os componentes presentes nos anexos. Empresa representa a entidade; IEmpresaRepository declara as operações. AppDbContext e EmpresaRepository implementam o trabalho com os dados. EmpresaDto descreve os campos recebidos e EmpresaValidator verifica seus valores. O registro de DI permite fornecer essas dependências aos consumidores. O controller coordena o exemplo e comunica o resultado por HTTP.",
            "A atualização rastreada e Task<bool> seguem a convenção adotada no CRUD integrado, preservando a identidade e comunicando ausência ou conclusão."
          ],
          "codeExamples": [],
          "sourceSlides": [
            68
          ],
          "callout": "A atualização rastreada preserva o Id; Task<bool> comunica ausência do registro ou conclusão da operação."
        },
        {
          "id": "topico-69",
          "title": "Como a implementação mantém a coerência",
          "paragraphs": [
            "A coerência do CRUD depende de relações explícitas entre as partes. O contrato e a classe têm assinaturas compatíveis; as consultas distinguem coleções e resultados opcionais; as escritas aguardam a persistência. A validação ocorre antes de salvar, e o contêiner fornece os componentes registrados. Nenhuma dessas responsabilidades deve ser confundida com a escolha do status HTTP, que permanece no controller.",
            "A execução exige configuração de conexão, pacotes compatíveis e o esquema esperado pelo modelo. Os exemplos da versão anterior não foram compilados nem executados no ambiente de elaboração do material-base."
          ],
          "codeExamples": [],
          "sourceSlides": [
            69
          ],
          "callout": "A execução depende de pacotes compatíveis, configuração de conexão e esquema de banco preparados para o projeto.",
          "table": {
            "headers": [
              "ASPECTO",
              "COMPORTAMENTO DA IMPLEMENTAÇÃO"
            ],
            "rows": [
              [
                "Contrato compatível",
                "Os métodos implementados têm o mesmo nome, os mesmos parâmetros e o retorno previsto na interface."
              ],
              [
                "Leituras corretas",
                "Lista vazia é tratada como coleção; busca por ID permite ausência."
              ],
              [
                "Persistência explícita",
                "Inclusão, alteração e exclusão aguardam SaveChangesAsync."
              ],
              [
                "Validator executado",
                "DTO inválido produz erros e interrompe o fluxo antes de salvar."
              ],
              [
                "Dependências resolvidas",
                "O contêiner fornece repositório, contexto e validator aos componentes que os solicitam."
              ],
              [
                "Responsabilidades separadas",
                "O validator verifica a entrada; o repositório persiste; o controller escolhe a resposta HTTP."
              ]
            ]
          }
        },
        {
          "id": "topico-70",
          "title": "Dez conceitos conectados no CRUD",
          "paragraphs": [
            "Os dez conceitos aqui relacionados já foram desenvolvidos ao longo da apresentação: interface, repositório, SaveChangesAsync, resultado opcional de consulta, AsNoTracking, FluentValidation, RuleFor, AddScoped, Infrastructure e atualização rastreada. Os próximos quadros apresentam suas funções em pares para evidenciar diferenças e conexões. A organização mantém o conteúdo conceitual dos anexos, mas o apresenta por definições e comportamentos, sem alternativas de resposta."
          ],
          "codeExamples": [],
          "sourceSlides": [
            70
          ],
          "callout": "Os próximos quadros relacionam os conceitos ao papel de cada componente e ao resultado das operações."
        },
        {
          "id": "topico-71",
          "title": "Interface e repositório: responsabilidades distintas",
          "paragraphs": [
            "A interface expressa o que o consumidor pode solicitar: operações, parâmetros e tipos de retorno. No exemplo apresentado, ela não implementa consultas de EF Core. A classe de repositório fornece o comportamento exigido pelo contrato, recebe AppDbContext e concentra o acesso aos dados. Retornos de persistência e de consulta são comunicados ao consumidor. A decisão de produzir NotFound, NoContent ou outros resultados HTTP pertence ao controller.",
            "Essa separação permite compreender o contrato sem confundi-lo com sua execução."
          ],
          "codeExamples": [],
          "sourceSlides": [
            71
          ]
        },
        {
          "id": "topico-72",
          "title": "Persistência e ausência de resultado",
          "paragraphs": [
            "SaveChangesAsync persiste as alterações pendentes no contexto. AddAsync e Remove configuram estados utilizados nessa persistência, enquanto ToListAsync realiza consulta. FirstOrDefaultAsync trata outro aspecto: o resultado da busca. Para a classe Empresa, quando nenhum registro atende à condição, o retorno é null. O consumidor deve verificar a ausência antes de usar as propriedades. No controller integrado, esse resultado pode ser convertido em 404; a consulta em si não decide o status HTTP."
          ],
          "codeExamples": [],
          "sourceSlides": [
            72
          ]
        },
        {
          "id": "topico-73",
          "title": "Rastreamento e validação têm papéis diferentes",
          "paragraphs": [
            "AsNoTracking é uma configuração de consulta do EF Core. As entidades retornadas por essa consulta não são acompanhadas automaticamente para a detecção de alterações. Modificar apenas uma dessas instâncias não registra, por si só, uma alteração a ser salva. FluentValidation tem outra responsabilidade: organizar e executar regras de entrada. O validator associado ao DTO é executado por ValidateAsync no fluxo apresentado.",
            "Quando há falhas, o controller responde antes de persistir. Rastreamento e validação não se substituem."
          ],
          "codeExamples": [],
          "sourceSlides": [
            73
          ]
        },
        {
          "id": "topico-74",
          "title": "RuleFor e AddScoped: funções independentes",
          "paragraphs": [
            "RuleFor seleciona a propriedade que receberá uma cadeia de validações. Em RuleFor(x => x.Email), o alvo é Email. NotEmpty verifica preenchimento, EmailAddress verifica formato e WithMessage define a mensagem da regra anterior. AddScoped pertence ao registro de dependências: associa um contrato a uma implementação com vida útil por escopo. O construtor informa qual dependência o componente necessita. Registrar não implementa métodos e não executa as regras do validator."
          ],
          "codeExamples": [],
          "sourceSlides": [
            74
          ]
        },
        {
          "id": "topico-75",
          "title": "Infraestrutura e atualização rastreada",
          "paragraphs": [
            "No arranjo DDD pragmático apresentado, a Infrastructure contém a implementação que utiliza EF Core. O contrato de persistência fica em uma camada interna, e entidade e DTO mantêm suas próprias responsabilidades. Na atualização rastreada, FindAsync localiza a entidade, o método retorna false se ela estiver ausente e, quando encontrada, altera apenas os campos editáveis. SaveChangesAsync persiste o estado modificado sem exigir Update adicional.",
            "O comportamento pressupõe a mesma instância de contexto e a estratégia de tracking adotada no exemplo."
          ],
          "codeExamples": [],
          "sourceSlides": [
            75
          ]
        },
        {
          "id": "topico-76",
          "title": "Síntese • contratos, consultas e persistência",
          "paragraphs": [
            "A síntese reúne cinco papéis distintos. Interface descreve as operações disponíveis. Repositório implementa o acesso e a persistência. SaveChangesAsync confirma as alterações pendentes do contexto. Um resultado null representa ausência em uma consulta individual de uma entidade de referência. AsNoTracking modifica o comportamento de rastreamento daquela consulta. Compreender essas distinções evita atribuir gravação a métodos de leitura ou assumir que toda consulta resulta em uma entidade existente."
          ],
          "codeExamples": [],
          "sourceSlides": [
            76
          ]
        },
        {
          "id": "topico-77",
          "title": "Síntese • validação, DI e infraestrutura",
          "paragraphs": [
            "FluentValidation organiza as regras de entrada em C#. RuleFor seleciona a propriedade sobre a qual as verificações serão aplicadas. AddScoped registra a relação entre serviço e implementação com vida útil por escopo. A Infrastructure contém os detalhes de acesso ao banco na arquitetura apresentada. Uma entidade rastreada pode ter suas alterações persistidas por SaveChangesAsync sem uma chamada adicional a Update.",
            "Esses pontos conectam organização do código, execução das dependências e comportamento da persistência."
          ],
          "codeExamples": [],
          "sourceSlides": [
            77
          ]
        },
        {
          "id": "topico-80",
          "title": "CONCLUSÃO",
          "paragraphs": [
            "A apresentação conecta o contrato à resposta HTTP. A interface declara as operações; a implementação de repositório utiliza o EF Core para consultar e persistir. O validator verifica a entrada antes da gravação, e o controller comunica o resultado por HTTP. Permanecem as distinções fundamentais: consulta não é persistência, registro de DI não é execução, DTO não é necessariamente entidade, e metadados não substituem o código da action.",
            "O cenário integrado é didático; versões dos pacotes, configuração e regras completas de negócio dependem do projeto concreto."
          ],
          "codeExamples": [],
          "sourceSlides": [
            80
          ]
        }
      ],
      "exercise": {
        "statement": "No PUT do exemplo, quem preserva o Id, quem valida a entrada e quem decide entre 404 e 204?",
        "answer": "O validator verifica EmpresaDto antes da escrita. O repositório busca pelo ID recebido, copia somente os campos editáveis e preserva a identidade. Ele retorna false para ausência e true após SaveChangesAsync concluir. O controller converte esses resultados em 404 e 204. Falhas de banco não são convertidas em false.",
        "sourceSlides": [
          17,
          29,
          54,
          68,
          69
        ]
      }
    }
  ],
  "questions": [
    {
      "id": "contrato",
      "statement": "Qual é a função principal de IEmpresaRepository no exemplo?",
      "options": [
        "Executar as consultas SQL diretamente.",
        "Definir o contrato de operações de persistência.",
        "Criar controllers automaticamente.",
        "Armazenar os registros da aplicação."
      ],
      "correctOption": 1,
      "explanation": "A interface declara operações, parâmetros e retornos. A implementação concreta fornece os comportamentos.",
      "sectionId": "interfaces",
      "sourceSlides": [
        9,
        14
      ]
    },
    {
      "id": "escopo",
      "statement": "O que AddScoped<IEmpresaRepository, EmpresaRepository>() faz?",
      "options": [
        "Salva as alterações pendentes.",
        "Implementa os métodos que faltam na classe.",
        "Associa contrato e implementação com uma instância por escopo.",
        "Cria uma instância a cada chamada de método."
      ],
      "correctOption": 2,
      "explanation": "Scoped significa vida útil por escopo de resolução, normalmente a requisição em uma API. Registro não é implementação nem persistência.",
      "sectionId": "interfaces",
      "sourceSlides": [
        12
      ]
    },
    {
      "id": "colecao",
      "statement": "O que ListarTodasAsync retorna quando não há empresas, conforme o material?",
      "options": [
        "Uma lista vazia.",
        "Uma Empresa com campos vazios.",
        "Sempre null.",
        "Um resultado HTTP 404 produzido pelo repositório."
      ],
      "correctOption": 0,
      "explanation": "Uma coleção vazia continua sendo uma lista. A busca individual é que pode retornar null para Empresa.",
      "sectionId": "repositories",
      "sourceSlides": [
        19,
        22
      ]
    },
    {
      "id": "persistencia",
      "statement": "Nas escritas rastreadas deste CRUD, qual chamada persiste as alterações pendentes?",
      "options": [
        "AsNoTracking().",
        "ToListAsync().",
        "AddScoped().",
        "SaveChangesAsync()."
      ],
      "correctOption": 3,
      "explanation": "AddAsync prepara a inclusão e Remove marca a exclusão. SaveChangesAsync persiste as alterações pendentes no padrão de escrita adotado.",
      "sectionId": "ef-core",
      "sourceSlides": [
        25,
        28,
        31
      ]
    },
    {
      "id": "tracking",
      "statement": "No contexto padrão do exemplo, o que ocorre ao alterar apenas um objeto obtido com AsNoTracking e chamar SaveChangesAsync, sem Attach ou Update?",
      "options": [
        "O EF Core sempre executa UPDATE.",
        "A mudança desse objeto não é automaticamente registrada no contexto.",
        "O objeto passa a ser rastreado ao mudar qualquer propriedade.",
        "AsNoTracking apaga o registro original."
      ],
      "correctOption": 1,
      "explanation": "A consulta não rastreia automaticamente a instância retornada. O exemplo de atualização busca uma entidade rastreada com FindAsync antes de alterar seus campos.",
      "sectionId": "ef-core",
      "sourceSlides": [
        27,
        29
      ]
    },
    {
      "id": "cnpj",
      "statement": "Qual afirmação descreve corretamente a regra didática cnpj.Count(char.IsDigit) == 14?",
      "options": [
        "Ela comprova que o CNPJ existe.",
        "Ela sempre rejeita todas as letras e pontuações.",
        "Ela conta dígitos, mas não é uma validação completa do documento.",
        "Ela calcula automaticamente os dígitos verificadores."
      ],
      "correctOption": 2,
      "explanation": "A regra ilustra Must. Pode aceitar outros caracteres intercalados e não calcula dígitos verificadores. O material separa esse exemplo dos requisitos reais.",
      "sectionId": "validation",
      "sourceSlides": [
        39,
        41
      ]
    },
    {
      "id": "entrada",
      "statement": "No POST do exemplo, o que deve ocorrer quando ValidateAsync produz IsValid igual a false?",
      "options": [
        "Registrar as falhas e retornar antes de persistir.",
        "Salvar e retornar os erros depois.",
        "Gerar o Guid e responder 201 sem aguardar a escrita.",
        "Desativar o validator para essa requisição."
      ],
      "correctOption": 0,
      "explanation": "O fluxo registra as falhas no ModelState e retorna ValidationProblem. A saída antecipada impede que a entrada inválida alcance AdicionarAsync.",
      "sectionId": "integration",
      "sourceSlides": [
        42,
        53
      ]
    },
    {
      "id": "contrato-bool",
      "statement": "No contrato integrado, o que false em AtualizarAsync ou RemoverAsync comunica?",
      "options": [
        "Qualquer falha de conexão ou de banco.",
        "Que a resposta HTTP já foi enviada.",
        "Que a interface não foi implementada.",
        "Que o registro procurado não foi encontrado."
      ],
      "correctOption": 3,
      "explanation": "false comunica ausência. true é retornado depois de SaveChangesAsync concluir. Uma falha real de persistência continua sendo uma falha, não ausência.",
      "sectionId": "estudo-integrado",
      "sourceSlides": [
        17,
        29,
        31
      ]
    },
    {
      "id": "metadados",
      "statement": "Qual é o papel de ProducesResponseType no exemplo da API?",
      "options": [
        "Substituir os comandos return da action.",
        "Documentar respostas esperadas por meio de metadados.",
        "Validar automaticamente os valores do DTO.",
        "Executar uma consulta antes de responder."
      ],
      "correctOption": 1,
      "explanation": "O atributo descreve resultados esperados. O corpo da action determina o status e o objeto efetivamente retornados; metadados e implementação precisam ser coerentes.",
      "sectionId": "responses",
      "sourceSlides": [
        61
      ]
    },
    {
      "id": "tipos",
      "statement": "Considere object valor = \"Douglas\". Quais nomes são mostrados por valor.GetType().Name e typeof(object).Name, nessa ordem?",
      "options": [
        "Object e String.",
        "String e String.",
        "String e Object.",
        "EmpresaResponse e Object."
      ],
      "correctOption": 2,
      "explanation": "GetType observa o tipo da instância em execução. typeof(object) representa o tipo escrito na expressão. Ambas as operações fornecem System.Type e não convertem o valor.",
      "sectionId": "responses",
      "sourceSlides": [
        62
      ]
    }
  ],
  "references": [
    {
      "label": "[F1] FluentValidation — Integração com ASP.NET Core",
      "url": "https://docs.fluentvalidation.net/en/latest/aspnet.html"
    },
    {
      "label": "[M12] ASP.NET Core — Web APIs e ProblemDetails",
      "url": "https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-10.0"
    },
    {
      "label": "[R1] Receita Federal — CNPJ alfanumérico",
      "url": "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico"
    },
    {
      "label": "[M3] DDD — Desenho da camada de persistência",
      "url": "https://learn.microsoft.com/pt-br/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design"
    },
    {
      "label": "[M1] C# — Interfaces e implementação de contratos",
      "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface"
    },
    {
      "label": "[M2] ASP.NET Core — Injeção de dependência",
      "url": "https://learn.microsoft.com/pt-br/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0"
    },
    {
      "label": "[M5] EF Core — Consultas com e sem rastreamento",
      "url": "https://learn.microsoft.com/en-us/ef/core/querying/tracking"
    },
    {
      "label": "[M8] EF Core — Operações assíncronas",
      "url": "https://learn.microsoft.com/en-us/ef/core/miscellaneous/async"
    },
    {
      "label": "[M4] EF Core — DbContext, configuração e ciclo de vida",
      "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
    },
    {
      "label": "[M6] EF Core — Salvando alterações básicas",
      "url": "https://learn.microsoft.com/en-us/ef/core/saving/basic"
    },
    {
      "label": "[M7] EF Core — FindAsync e chave primária",
      "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbset-1.findasync?view=efcore-10.0"
    },
    {
      "label": "[M9] EF Core — Transações",
      "url": "https://learn.microsoft.com/en-us/ef/core/saving/transactions"
    },
    {
      "label": "[M11] ASP.NET Core — Tipos de retorno das actions",
      "url": "https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-10.0"
    },
    {
      "label": "[F3] FluentValidation — Validadores disponíveis",
      "url": "https://docs.fluentvalidation.net/en/latest/built-in-validators.html"
    },
    {
      "label": "[F2] FluentValidation — Injeção de dependência",
      "url": "https://docs.fluentvalidation.net/en/latest/di.html"
    },
    {
      "label": "[F4] FluentValidation — Validação assíncrona",
      "url": "https://docs.fluentvalidation.net/en/latest/async.html"
    },
    {
      "label": "[M10] EF Core — Índices e unicidade",
      "url": "https://learn.microsoft.com/en-us/ef/core/modeling/indexes"
    },
    {
      "label": "[N1] Npgsql — Provedor Entity Framework Core",
      "url": "https://www.npgsql.org/efcore/"
    },
    {
      "label": "[M13] C# — typeof, teste de tipos e conversões",
      "url": "https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/operators/type-testing-and-cast"
    },
    {
      "label": "[M14] System.Type — GetProperties",
      "url": "https://learn.microsoft.com/en-us/dotnet/api/system.type.getproperties?view=net-10.0"
    }
  ]
} satisfies Study;

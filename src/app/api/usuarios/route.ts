export async function GET() {
  const usuarios = [
    {
      id: 1,
      nome: "Douglas",
      email: "douglaswilliamssp@gmail.com",
    },
    {
      id: 2,
      nome: "Maria",
      email: "maria@example.com",
    },
  ];

  return Response.json(usuarios);
}
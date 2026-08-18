export async function GET() {
  const usuarios = [
    {
      id: 1,
      nome: "Douglas Williams da Silva Porto",
      email: "douglaswilliamssp@gmail.com",
    },
    {
      id: 2,
      nome: "Julia Figueiredo Thomas",
      email: "juliafigueiredothomas@gmail.com",
    }
  ];

  return Response.json(usuarios);
}
export async function GET(request: Request) {
  const usuarios = [
    { id: 1, nome: "Douglas", email: "douglaswilliamssp@gmail.com" },
    { id: 2, nome: "Maria", email: "maria@example.com" }
  ];
  return new Response(JSON.stringify(usuarios), {
    headers: { "Content-Type": "application/json" }
  });
}



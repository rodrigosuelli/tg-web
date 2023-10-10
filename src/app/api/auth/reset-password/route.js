export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/auth/passwordConfirmation`;

  const { code, password, passwordConfirmation } = await request.json();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      code,
      password,
      passwordConfirmation,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
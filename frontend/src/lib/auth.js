async function login(email, password) {
  const body = { email, password };
  const fetchResponse = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetchResponse.json();
  console.log({ response });
  return response;
}

async function register(email, password, repeatPassword) {
  const body = { email, password, repeatPassword };

  const fetchResponse = await fetch("http://localhost:3000/auth/register", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetchResponse.json();
  return response;
}

export const auth = { login, register };

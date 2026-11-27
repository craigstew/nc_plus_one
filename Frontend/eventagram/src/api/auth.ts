interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + "/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Invalid Login Credentials");
  }

  const data = await response.json();

  if (!data.access_token || !data.user) {
    throw new Error("Missing token or user information");
  }

  return data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + "/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Invalid Register Credentials");
  }
}

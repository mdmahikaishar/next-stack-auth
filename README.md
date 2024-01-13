# Next Stack Auth

Full stack authentication for NextJs.

<br/>
<br/>

## Get started

To add `Next Stack Auth` to your project.

```bash
pnpm install next-stack-auth
```

<br/>
<br/>

## Setup Your Project

### Configure Backend

At the very beginning, create a backend server. Add a endpoint, that will return our authenticated user based on accessToken. On this path `/auth/user`.

```ts
export interface IUser {
  id: string | number;
  name: string;
  img: string;
  [key: string]: any;
}

axios.get<any, AxiosResponse<{ user: IUser }>>(
  "https://my-server.com/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
  }
);
```

### Add Envs

On your nextjs-app add this line of code `NEXT_PUBLIC_AUTH_URL={AUTHENTICATED_USER_ENDPOIN}` in `.env.local`

### Add Auth State

```tsx
// app/layout.tsx
import { ReactNode } from "react";
import { useAuthSSR } from "next-stack-auth";
import { AuthProvider } from "next-stack-auth/client";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await useAuthSSR();

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider auth={auth}>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

<br/>
<br/>

## Examples

### Authentication On Server Side

```tsx
import { authOnSSR } from "next-stack-auth";

export default async function ProfilePage() {
  await authOnSSR();

  return <main>Profile</main>;
}
```

### Authentication On Client Side

For using next-stack-auth in client side use `useAuth();`

```tsx
"use client";
import { useAuth } from "next-stack-auth/client";

export default function HomePage() {
  const auth = useAuth();

  return (
    <main>
      <h1>Home</h1>
      <h3>{auth.user?.name}</h3>
      <span>{auth.status}</span>
    </main>
  );
}
```

### Login On Client Side

```tsx
"use client";
import { useAuth } from "next-stack-auth/cleint";
import axios from "axios";

export default function LoginPage() {
  const auth = useAuth();

  const login = async () => {
    try {
      const response = await axios.post("/api/auth/login", {});
      await auth.login(response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <button onClick={login}>Login</button>
    </main>
  );
}
```

### Logout On Server Side

```tsx
import { logoutOnSSR } from "next-stack-auth";

export default async function LogoutPage() {
  await logoutOnSSR();

  return <main>Logout</main>;
}
```

### Logout On Client Side

```tsx
"use client";
import { useAuth } from "next-stack-auth/cleint";

export default function LogoutPage() {
  const auth = useAuth();

  const logout = () => {
    auth.logout();
  };

  return (
    <main>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
```

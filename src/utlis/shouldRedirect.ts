type TShouldRedirect =
  | {
    should: false;
    path: "/";
  }
  | {
    should: true;
    path: "/auth/login";
  };

const AUTH_PATHS = ["/auth", "/signup", "/login"];

export default function shouldRedirect(
  pathname: string
): TShouldRedirect {
  if (AUTH_PATHS.some((path) => pathname.includes(path))) {
    return { should: false, path: "/" };
  }

  return { should: true, path: "/auth/login" };
}

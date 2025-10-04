import AuthenticatorWrapper from "../AuthenticatorWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatorWrapper>
      {children}
    </AuthenticatorWrapper>
  );
}
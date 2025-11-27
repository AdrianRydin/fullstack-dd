import "./headerlayout.css";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="header-container-global">
      <div className="header-inner">{children}</div>
    </header>
  );
}

import "./estudos.css";

export default function EstudosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="studies">{children}</div>;
}
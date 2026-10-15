import "./studies.css";

export default function StudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="studies">{children}</div>;
}
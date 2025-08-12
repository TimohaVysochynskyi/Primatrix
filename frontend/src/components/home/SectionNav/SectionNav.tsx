interface SectionNavProps {
  onNavigate: (id: string) => void;
  className?: string;
  linkClassName?: string;
}

const SECTION_ITEMS: { id: string; label: string }[] = [
  { id: "news", label: "Новости" },
  { id: "gallery", label: "Галерея" },
  { id: "subscribe", label: "Подписка на новости" },
  { id: "ideas", label: "Сбор идей" },
  { id: "contacts", label: "Контакты" },
];

export default function SectionNav({
  onNavigate,
  className,
  linkClassName,
}: SectionNavProps) {
  return (
    <ul className={className}>
      {SECTION_ITEMS.map((item) => (
        <li key={item.id}>
          <button className={linkClassName} onClick={() => onNavigate(item.id)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

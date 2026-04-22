type Props = {
  number: string;
  title: string;
  note?: string;
};

export function SectionHeader({ number, title, note }: Props) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-mono text-[11px] text-fg-subtle">§ {number}</span>
      <h2 className="font-serif text-[22px] tracking-tight text-fg">
        {title}
      </h2>
      {note && (
        <span className="font-mono text-[11px] text-fg-subtle ml-auto">
          {note}
        </span>
      )}
    </div>
  );
}

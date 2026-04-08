const links = [
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Work", href: "/#work" },
  { label: "Proof", href: "/#proof" },
  { label: "Contact", href: "/#contact" }
];

export function SiteFooter({ brandName = "Momna Zaheer" }: { brandName?: string }) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

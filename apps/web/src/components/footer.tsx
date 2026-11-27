export default function Footer() {
  return (
    <div className="w-full px-0 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-dashed border-border text-xs text-muted-foreground font-mono">
      <div className="mb-2 sm:mb-0">
        Portfolio
      </div>

      <div className="flex items-center gap-4">
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  )
}

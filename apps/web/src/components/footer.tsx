export default function Footer() {
  return (
    <div className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t-2 border-dashed border-foreground text-base text-muted-foreground font-mono">
      <div className="mb-2 sm:mb-0">
        Portfolio{' '}
        <a href="#" className="underline underline-offset-4 font-bold">
          @llpabhinabc_
        </a>
      </div>

      <div className="flex items-center gap-4">
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  )
}

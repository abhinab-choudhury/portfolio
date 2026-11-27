import { cn } from "@lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 md:auto-rows-auto md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  footer,
  contentClassName,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "brutalist-card row-span-1 flex flex-col justify-between gap-3 rounded-none bg-background p-4 text-foreground",
        className,
      )}
    >
      {header}
      <div className={cn("flex-1", contentClassName)}>
        <div className="mb-2 font-sans font-bold text-foreground">
          {title}
        </div>
        <div className="font-mono text-xs font-normal text-foreground">
          {description}
        </div>
      </div>
      {footer}
    </div>
  );
};

import { Separator } from "@nxss/ui/separator";
import { SidebarTrigger } from "@nxss/ui/sidebar";

interface SiteHeaderProps {
  title?: string;
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
}

export function SiteHeader({
  title,
  startElement,
  endElement,
}: SiteHeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:[height:var(--header-height)] flex shrink-0 items-center border-b transition-[width,height] ease-linear [height:var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Sidebar button */}
        <SidebarTrigger className="-ml-1" />

        {/* Optional start element */}
        {startElement && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="flex items-center">{startElement}</div>
          </>
        )}

        {/* Optional title */}
        {title && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <h1 className="truncate text-sm font-medium">{title}</h1>
          </>
        )}

        {/* Right-aligned end element */}
        {endElement && (
          <div className="ml-auto flex items-center gap-2">{endElement}</div>
        )}
      </div>
    </header>
  );
}

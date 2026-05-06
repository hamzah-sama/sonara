import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import locales from "locale-codes";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { useState } from "react";

const languageOptions = locales.all
  .filter((langs) => langs.tag && langs.name && langs.tag.includes("-"))
  .map((lang) => ({
    value: lang.tag,
    label: lang.location ? `${lang.name} (${lang.location})` : lang.name,
  }));

interface Props {
  value?: string;
  onChange: (value: string) => void;
  popoverPortalHost?: HTMLElement | null;
}

export const LanguageField = ({
  value,
  onChange,
  popoverPortalHost,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    languageOptions.find((lang) => lang.value === value)?.label ?? "";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className={cn(
            "font-normal flex justify-between h-9 w-full",
            !value && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            {value ? selectedLabel : "Select Language..."}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        container={popoverPortalHost ?? undefined}
        className="z-[60] flex w-[var(--radix-popover-trigger-width)] flex-col gap-0 overflow-hidden p-0"
        style={{
          maxHeight:
            "min(calc(18rem + 3rem), var(--radix-popover-content-available-height, 100dvh))",
        }}
      >
        <Command
          filter={(value, search) => {
            const lang = languageOptions.find((l) => l.value === value);
            if (!lang) return 0;

            const keyword = search.toLowerCase();

            return lang.label.toLowerCase().includes(keyword) ||
              lang.value.toLowerCase().includes(keyword)
              ? 1
              : 0;
          }}
          className="rounded-none border-0 bg-transparent shadow-none"
        >
          <CommandInput placeholder="search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languageOptions.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={() => {
                    onChange(lang.value);
                    setOpen(false);
                  }}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === lang.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "bn", label: "বাংলা", flag: "🇧🇩" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const switchLocale = (newLocale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    });
  };

  return (
    <div className="fixed bottom-25 rounded-full right-6 z-20">
      {/* Positioned just above your existing bottom button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center rounded-full shadow-lg p-6"
            disabled={isPending}
          >
            {/* <Globe size={18} /> */} 
            {languages.find((l) => l.code === locale)?.label ?? locale}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-sm rounded-2xl p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              🌍 Choose Your Language
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 mt-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                variant={locale === lang.code ? "default" : "outline"}
                className="flex items-center justify-center gap-2 text-base rounded-xl py-5"
              >
                <span className="text-xl">{lang.flag}</span>
                {lang.label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

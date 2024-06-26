"use client";

import { usePathname, useRouter, type Locale } from "@/i18n.config";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (locale: Locale) => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <div className="flex gap-10 justify-center">
      <button
        onClick={() => changeLocale("en")}
        className="buttons-switch"
      >
        English
      </button>
      <button
        onClick={() => changeLocale("de")}
        className="buttons-switch"
      >
        Dutch
      </button>
      <button
        onClick={() => changeLocale("es")}
        className="buttons-switch"
      >
        Spanish
      </button>
    </div>
  );
}

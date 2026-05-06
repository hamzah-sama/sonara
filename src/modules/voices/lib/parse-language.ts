export const parseLanguage = (lang: string) => {
  const [, countryRaw] = lang.split("-");
  if (!countryRaw) return { countryCode: null as string | null, region: lang };

  const country = countryRaw.toUpperCase();
  if (!/^[A-Z]{2}$/.test(country))
    return { countryCode: null as string | null, region: lang };

  const region =
    new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;

  return { countryCode: country, region };
};


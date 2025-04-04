import i18n from "@/hooks/i18n";

export const getTranslation = (key: string) => i18n.t(key);

export const isPolishFew = (count: number) => {
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    !(count % 100 >= 12 && count % 100 <= 14)
  ) {
    return true; // "few" should be used
  }
  return null; // Not "few"
};

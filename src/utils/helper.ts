import React from "react";
import type { IOption } from "./types";

export const replaceUrlParams = (url: string, params: Record<string, any>) => {
  let result = url;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`:${key}`, value);
  }
  return result;
};

export const OptionToValue = (options: IOption[], value: string): string | number | React.ReactNode | undefined => {
  return options.find((option: IOption) => option.value === value)?.label;
};

export const htmlToElement = (html: string) => {
	if (!html) return null;
	return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
};
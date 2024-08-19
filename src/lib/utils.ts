import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Slices an array and returns a new array with a specified length and starting index.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array to be sliced.
 * @param {number} [start] - The length of the new array. If not provided, the entire array will be returned.
 * @param {number} [end] - The starting index of the new array. If not provided, the array will be sliced from the beginning.
 * @returns {T[]} - The sliced array.
 */
export function sliceArray<T>(data?: T[], start?: number, end?: number): T[] {
  if (!data) return [];
  return data?.slice(start, end);
}

export function truncateText(
  text: string,
  maxLength: number,
  lastChars?: number
) {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);

  if (lastChars)
    return truncated + "..." + text.substring(text.length - lastChars);
  return truncated + "...";
}

export function normalizeProgress(raw: string, validIds: readonly string[]): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string =>
      typeof id === "string" && validIds.includes(id)))];
  } catch {
    return [];
  }
}

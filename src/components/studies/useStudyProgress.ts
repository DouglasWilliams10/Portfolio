"use client";

import { normalizeProgress } from "@/src/application/project/study/normalizeProgress";
import { useMemo, useSyncExternalStore } from "react";


const memory = new Map<string, string>();
const volatileKeys = new Set<string>();
const eventName = "dw-study-progress";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
}
function snapshot(key: string) {
  if (volatileKeys.has(key)) return memory.get(key) ?? "";
  try { return window.localStorage.getItem(key) ?? ""; }
  catch { return memory.get(key) ?? ""; }
}
const serverSnapshot = () => "";

export function useStudyProgress(slug: string, version: number, sectionIds: readonly string[]) {
  const key = `dw:estudos:${slug}:v${version}`;
  const raw = useSyncExternalStore(subscribe, () => snapshot(key), serverSnapshot);
  const completed = useMemo(() => normalizeProgress(raw, sectionIds), [raw, sectionIds]);
  function write(next: string[]) {
    const value = JSON.stringify(next);
    memory.set(key, value);
    try { window.localStorage.setItem(key, value); volatileKeys.delete(key); }
    catch { volatileKeys.add(key); }
    window.dispatchEvent(new Event(eventName));
  }
  function toggle(sectionId: string) {
    if (!sectionIds.includes(sectionId)) return;
    const current = normalizeProgress(snapshot(key), sectionIds);
    write(current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId]);
  }
  return { completed, toggle, reset: () => write([]), temporary: volatileKeys.has(key) };
}

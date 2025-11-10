// src/types/index.ts
export type User = { id: number | string; username: string }
export type Post = { id: number | string; content: string; username: string; createdAt?: string }
export type Page<T> = { items: T[]; nextCursor?: string }

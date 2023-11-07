import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * 使用 scrypt 哈希密码
 * 返回格式：salt:hash（均为 base64 编码）
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");
  return `${salt}:${hash}`;
}

/**
 * 验证密码
 */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const inputHash = Buffer.from(scryptSync(password, salt, 64));
  const storedHash = Buffer.from(hash, "base64url");
  try {
    return timingSafeEqual(inputHash, storedHash);
  } catch {
    return false;
  }
}

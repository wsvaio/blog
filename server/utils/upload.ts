import fs from "fs";
import path from "path";
import { promisify } from "util";

const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);
// const unlinkAsync = promisify(fs.unlink);

export type UploadResult = {
  filename: string;
  filepath: string;
  size: number;
};

export async function uploadFile(file: File, targetDir: string): Promise<UploadResult> {
  const resolvedDir = path.resolve(targetDir);

  try {
    await mkdirAsync(resolvedDir, { recursive: true });
  } catch (error) {
    console.error("Failed to create upload directory:", error);
    throw new Error(`Failed to create upload directory: ${resolvedDir}`);
  }

  const safeName = path.basename(file.name);
  const filepath = path.join(resolvedDir, safeName);

  try {
    await writeFileAsync(filepath, await file.bytes());
  } catch (error) {
    console.error("Failed to write uploaded file:", error);
    throw new Error(`Failed to write uploaded file: ${filepath}`);
  }

  const stats = await fs.promises.stat(filepath);

  return {
    filename: safeName,
    filepath,
    size: stats.size,
  };
}

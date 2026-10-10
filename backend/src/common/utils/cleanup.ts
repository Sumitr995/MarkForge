import fs from "fs/promises";
import path from "path";

/**
 * Deletes files older than maxAgeMs inside dir (non-recursive guard:
 * only top-level files + one nested level for temp/assets layout).
 * Never throws — logs and continues.
 */
export async function sweepOldFiles(
  dir: string,
  maxAgeMs: number,
): Promise<number> {
  let removed = 0;
  const now = Date.now();

  async function sweep(current: string, depth: number) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      try {
        if (entry.isDirectory()) {
          if (depth < 1) await sweep(full, depth + 1);
          continue;
        }
        const stat = await fs.stat(full);
        if (now - stat.mtimeMs > maxAgeMs) {
          await fs.unlink(full);
          removed += 1;
        }
      } catch {
        // ignore per-file errors
      }
    }
  }

  await sweep(dir, 0);
  return removed;
}

export function startOrphanCleanupJob(options: {
  tempDir: string;
  assetsDir: string;
  tempMaxAgeMs: number;
  assetsMaxAgeMs: number;
  intervalMs: number;
}): NodeJS.Timeout {
  const run = async () => {
    const tempRemoved = await sweepOldFiles(
      options.tempDir,
      options.tempMaxAgeMs,
    );
    const assetsRemoved = await sweepOldFiles(
      options.assetsDir,
      options.assetsMaxAgeMs,
    );
    if (tempRemoved + assetsRemoved > 0) {
      console.error(
        `[cleanup] removed ${tempRemoved} temp + ${assetsRemoved} asset orphans`,
      );
    }
  };
  void run();
  return setInterval(() => {
    void run();
  }, options.intervalMs);
}

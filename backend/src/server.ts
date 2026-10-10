import path from "path";
import app from "./app";
import { env } from "./config/env";
import { startOrphanCleanupJob } from "./common/utils/cleanup";

const tempDir = path.join(process.cwd(), "uploads", "temp");
const assetsDir = path.resolve(
  env.ASSETS_DIR || path.join(process.cwd(), "uploads", "assets"),
);

// Delete uploaded PDFs left behind by crashed requests (older than 1h)
// and extracted assets older than the retention window. Runs on boot + hourly.
startOrphanCleanupJob({
  tempDir,
  assetsDir,
  tempMaxAgeMs: 60 * 60 * 1000,
  assetsMaxAgeMs: env.ASSET_RETENTION_MS,
  intervalMs: 60 * 60 * 1000,
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

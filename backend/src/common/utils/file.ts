import fs from "fs/promises";

export const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore cleanup failures — orphan sweep handles leftovers.
  }
};

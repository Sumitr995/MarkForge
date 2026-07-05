import fs from "fs/promises";

export const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error("File cleanup failed:", error);
  }
};

import { utapi } from "@/server/uploadthing";

export async function deletePhoto(id: string) {
  const fileId = id.replace("https://utfs.io/f/", "");

  await utapi.deleteFiles(fileId);
}

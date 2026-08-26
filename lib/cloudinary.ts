import { v2 as cloudinary } from "cloudinary";

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
  throw new Error("CLOUDINARY_URL environment variable is not set");
}

const parsed = new URL(cloudinaryUrl);

cloudinary.config({
  cloud_name: parsed.hostname,
  api_key: parsed.username,
  api_secret: parsed.password,
});

export async function uploadImage(file: File, folder = "ayesha-gul"): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error("Cloudinary upload returned no result"));
        }
      }
    );
    stream.end(bytes);
  });

  return result.secure_url;
}

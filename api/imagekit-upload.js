import ImageKit from "imagekit";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });

    const { file, fileName } = req.body;

    const result = await imagekit.upload({
      file,
      fileName: fileName || "ifon.jpg",
      folder: "/ifon-net"
    });

    return res.status(200).json({
      url: result.url,
      thumbnail: result.thumbnailUrl
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
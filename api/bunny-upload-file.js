export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { videoId } = req.query;

    let chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${videoId}`,
      {
        method: "PUT",
        headers: {
          AccessKey: process.env.BUNNY_API_KEY,
          "Content-Type": "application/octet-stream"
        },
        body: buffer
      }
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
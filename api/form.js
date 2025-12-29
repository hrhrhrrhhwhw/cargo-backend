export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  console.log("FORM DATA:", req.body);

  return res.status(200).json({ success: true });
}

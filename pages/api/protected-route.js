import { verifyToken } from "@/lib/verifyToken";

const handler = async (req, res) => {
  if (!verifyToken(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

};

export default handler;

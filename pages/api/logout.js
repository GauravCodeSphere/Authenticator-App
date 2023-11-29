import { destroySession } from "@/lib/session";

export default function logout(req, res) {
  destroySession(res);
  res.status(200).send({ message: 'Logged out successfully' });
}

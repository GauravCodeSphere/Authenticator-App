import { setSession } from "@/lib/session";

export default function login(req, res) {

    const { username, password } = req.body
    const user = { name: username };
    if (username === "gaurav" && password === "123") {

        const session = { user };

        setSession(res, session);
        return res.redirect('/');
    }

    return res.status(500).send({ error: 'Invalid User' });


}

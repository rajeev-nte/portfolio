import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized login again' })

    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(!req.body) req.body = {};  //   chatgpt fix this line
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        }else{
            return res.json({ success: false, message: 'Not Authorized login again'})
        }
        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default userAuth;
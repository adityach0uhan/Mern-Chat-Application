import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export default async function protectedRoute(req, res, next) {
    const token = await req.cookies.token;
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Unauthorized , Please Login to continue' });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserModel.findById(decoded.id).select(
                '-password'
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found , Login again ' });
            }
            req.user = user;
            console.log('Req.user', req.user);
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

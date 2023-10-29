import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next){
    // debugger
    // Bypass: /users/login, users/register, ....
    if(req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() || 
       req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()){
        next()
        return
    }

    // Lấy token từ request gửi đến
    const token = req.headers?.authorization?.split(' ')[1]

    try {
        const jwtObj = jwt.verify(token, process.env.SECRET_JWT_KEY);
        if(Date.now() > jwtObj.exp*1000){
            res.status(400).json({
                message: 'Token is expired'
            })
            res.end()
        }else{
            next()
            return
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

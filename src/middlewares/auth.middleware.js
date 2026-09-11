import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const accessToken = authHeaders ? authHeaders.split(' ',)[1] : undefined
    if(!accessToken){
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.TOKEN_ACCESS_KEY)
        req.userId = decoded.userId
        req.userRole = decoded.userRole
        next()
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." })
    }
}

module.exports = function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    //Kiểm tra xem quyền gì.
    //if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
  }
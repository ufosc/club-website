let jwt = require('jsonwebtoken');
const config = require(".../client/src/views/SignIn");

let checkToken = (req, res, next) => {
  let token =  req.headers['authorization']; 
    if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    }
    var decodeToken = jwt_decode(token);

  
  				const payload = {
					id: decodeToken.googleId,
				};

				// sign token
				jwt.sign(
					payload,
					config.secret,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token:  token
						});
					}
				);

 
};

module.exports = {
  googeToken: checkToken
}

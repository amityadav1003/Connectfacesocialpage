const User = require('../../model/UserSchema');
const jsonwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jsonwt.sign(user.toJSON(), 'connectface', {expiresIn:  '10000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }




}
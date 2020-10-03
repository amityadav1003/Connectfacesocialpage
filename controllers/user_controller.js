const User = require('../model/UserSchema');
const Post = require('../model/postSchema');
module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    });
}


module.exports.profile = async function(req, res){
    try{
     let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
    },
    populate:{
        path:'likes'
    }
}).populate('comments').populate('likes');
       let users = await User.find({});
       res.render('user_profile',{
           title:'My Profile',
           posts:posts,
           users:users
       })
}
catch(err){
    console.log(err);
}
}
module.exports.Signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('Sign-in',{
        title:'Sign-in'
    })
}
module.exports.Signup = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('Sign-up',{
        title:'Sign-up'
    })
}

        module.exports.create = function(req, res){
            if (req.body.password != req.body.confirm_password){
                return res.redirect('back');
            }
        
            User.findOne({email: req.body.email}, function(err, user){
                if(err){console.log('error in finding user in signing up'); return}
        
                if (!user){
                    User.create(req.body, function(err, user){
                        if(err){console.log('error in creating user while signing up'); return}
        
                        return res.redirect('/Signin');
                    })
                }else{
                    return res.redirect('back');
                }
        
            });
        }
        module.exports.createSession = function(req, res){
            req.flash('success', 'Logged in Successfully');
            return res.redirect('/profile');
        }
    
        module.exports.destroySession = function(req, res){
            req.logout();
            req.flash('success','You have been logged out');
            return res.redirect('/');
        }

const Post = require('../model/postSchema');
const Comment = require('../model/commentSchema');
const Like = require('../model/likeSchema');


module.exports.create = async function(req,res){
    try{
       let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            post = await post.populate('user','name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post created!'
            })
        }
        return res.redirect('back')

    }
    catch(err){
            console.log(err);
}
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await Like.deleteMany({likeable:post._id, onModel:'Post'})

            post.remove();
            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post Deleted'
                })
            }
            
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
                               
    }
}
    catch(err){
       console.log(err)
    }
}
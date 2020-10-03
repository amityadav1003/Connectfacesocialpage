const Post = require('../../model/postSchema');
const Comment = require('../../model/commentSchema');

module.exports.create = async function(req,res){
let post = await Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
})
return res.status(200).json({
    message:"lists of posts",
    posts:post
})
}


module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);
    post.remove()
    await Comment.deleteMany({post:req.params.id});
    return res.json(200, {
        message: "Post and associated comments deleted successfully!"
    });
}
catch(err){
    console.log('********', err);
    return res.json(500, {
        message: "Internal Server Error"
    });
}
}

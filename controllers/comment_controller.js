const Comment = require('../model/commentSchema');
const Post = require('../model/postSchema');
const Like = require('../model/likeSchema');

    module.exports.create = async function(req, res){
        //console.log('post here will be',req.body.post);
        let post = await Post.findById(req.body.post);
            //console.log('this is post',post)
            try{
                if (post){
                    let comment = await Comment.create({
                        content: req.body.content,
                        post: req.body.post,
                        user: req.user._id,
                    })
                    post.comments.push(comment);
                    post.save();
                    console.log(comment);
                    if (req.xhr){
                        // Similar for comments to fetch the user's id!
                        comment = await comment.populate('user', 'name').execPopulate();
            
                        return res.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Comment created!"
                        });
                    }
                   
                    return res.redirect('back');
            }
        }
            catch(err){
                    console.log('error  in creating comment',err)
            }
    }
   
    module.exports.destroy = async function(req,res){
        try{
        let comment = await Comment.findById(req.params.id);
        comment.remove();
            if(comment.user == req.user.id){
                //console.log('comment which is to be deleted',comment);
                let postID = comment.post;
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
              
            await Post.findByIdAndUpdate(postID, {$pull:{comments : req.params.id}})

                await Like.deleteMany({likeable:comment._id,OnModel:'Comment'})

               // console.log('post is',post)
               return res.redirect('back')
            }
            else{
                return res.redirect('back');
            }
        }
        catch(err){
                console.log('err',err)
        }
    }
 //I will convert my project into Ajax in future not now
 //APi 
 //Postman
 
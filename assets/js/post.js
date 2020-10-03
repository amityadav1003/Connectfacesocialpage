
{
function createPost(){
    let newPost = $('#new-post-form');
    newPost.submit(function(event){
        event.preventDefault();
        $.ajax({
            method:'post',
            url:'/post/create',
            data:newPost.serialize(),
            success: function(data){
                console.log('post is',data);
                let newpost = newPostDom(data.data.post);
                $('#posts-list-container ul').prepend(newpost);
                deletePost($(' .delete-post-button',newpost));


                new PostComments(data.data.post._id);
                new ToggleLike($(' .toggle-like-button', newpost));

            },error: function(err){
                console.log(err.resposeText)
            }
        })
    })
}


    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        
                        <small>
                            <a class="delete-post-button"  href="/post/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                    </a>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comment/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log('deleted',data);
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

  
    createPost();
}

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log('this is populated comment',data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button', newComment));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small>
                            
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                0 Likes
                            </a>
                        
                        </small>
                            
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}
### Steps to writing a new blog post.

 1. Create new file inside `_posts` directory with the extension `.md`. Be sure to add the date of writing to the file name in `yyyy-mm-dd` format. The date is very important for sorting posts.

       The example file name,

        2019-08-15-new-blog-post.md
 2.  Add these lines to starting of the post content inside markdown file.

     ```
      ---
      layout: post
      title: "Post title here"
      tags:
        - tag1
        - tag2
        - tag3
      ---
     ```

 3. Write the blog content with markdown. If you want, you can use [Dillinger](https://dillinger.io/) online markdown editor and copy-paste the contents to `.md` file.

 4. To check the preview of written contents, build the project with below command. Before that make sure that you've installed Jekyll in your system. If not, please [install](https://jekyllrb.com/) it.

        bundle exec jekyll serve

  It starts compiling your post and once it's done, open browser and visit

        http://localhost:4000


### Credits

 1. Hydeout Jekyll template by [Andrew Fong](https://github.com/fongandrew) 
 2. Favicon icon was generated using [favicon.io](https://favicon.io/)

### Contibuting 

If you find any mistakes (spelling, grammar, etc) or if you've suggestions/improvements, fork this repo into your Github repos and make changes send a pull request with the proper commit message, pull request comment. Add your Github profile name and link to [CONTRIBUTORS.md](CONTRIBUTORS.md) file.
const BlogForm = ({ handleForm, title, setTitle, author, setAuthor, url, setUrl }) => {
    return (
        <form onSubmit={handleForm}>
            <div>
                title:
                <input id="titleInput" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />

            </div>
            <div>
                author:
                <input id="authorInput" type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input id="urlInput" type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm
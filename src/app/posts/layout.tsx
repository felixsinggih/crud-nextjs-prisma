export const metadata = {
    title: 'Posts'
}

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="mt-4 mx-3">{children}</div>
}

export default PostsLayout
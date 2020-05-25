const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "https://domain.com"

export const api = {
    posts: {
        list: `${baseURL}/api/posts/`,
        retrieve: slug => `${baseURL}/api/posts/${slug}/`,
        create: `${baseURL}/api/posts/create/`,
        update: slug => `${baseURL}/api/posts/${slug}/update/`,
        delete: slug => `${baseURL}/api/posts/${slug}/delete/`,
    }
}
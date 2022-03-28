import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get(
      "https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed"
    );
    const readPosts: any = response.data;
    return [readPosts, null];
  } catch (error: any) {
    return [null, error];
  }
};

import "@babel/polyfill";
import db from '../db/dbConfig';

const table = 'likes';

export default {
    async like(newLike) {
        try {
            await db(table).insert(newLike);
            const likes = await this.likesCount(newLike.post_id);
            return likes;
        } catch (error) {
            if (error.code === '23505') {
                await db(table).where(newLike).del();
            }
            const likes = await this.likesCount(newLike.post_id);
            return likes;
        }
    },

    async likesCount(post_id) {
        const likes = await db(table).count('post_id').where({ post_id });
        return likes;
    }
}; 
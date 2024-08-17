const { Category, Post } = require("../models/index");
module.exports = {
  index: async (req, res) => {
    const categories = await Category.findAll({
      include: {
        model: Post,
        as: "posts",
        through: {
          attributes: [],
        },
        attributes: ["title"],
        // through: {
        //   attributes: [],
        // },
        // attributes: ["id", "title", "user_id"],
      },
    });
    res.json({ categories });
  },

  find: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: {
        model: Post,
        as: "posts",
      },
    });

    res.json({ category });
  },

  findByPost: async (req, res) => {
    const { postId } = req.params;
    const { categories } = await Post.findByPk(postId, {
      include: {
        model: Category,
        as: "categories",
      },
    });
    res.json({ categories });
  },

  createPost: async (req, res) => {
    const { id } = req.params;
    const categoryId = 1;
    const { title } = req.body;
    // if (!title) {
    //   return res.json({ error: "Title is required" });
    // }
    const category = await Category.findByPk(id);
    const post = await category.createPost({
      title,
      category_id: categoryId,
    });
    res.json({ id });
  },

  createPosts: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (!Array.isArray(body)) {
      return res.json({ error: "body must be an array" });
    }
    const posts = await Promise.all(
      body.map((postBody) => {
        return Post.create(postBody);
      })
    );

    const category = await Category.findByPk(id);
    category.addPosts(posts);
    res.json({ posts });
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      await post.setCategories([]);
      const status = await Post.destroy({
        where: { id },
      });
      return res.json({ status });
    } catch (error) {
      return res.json({ error: e.message });
    }
  },
};

const { User, Phone, Post } = require("../models/index");
module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      include: {
        model: Post,
        as: "posts",
      },
    });
    res.json({ users });
  },
  find: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const phone = await user.getPhone();
    res.json({ user, phone: phone.value });
  },

  findByPhone: async (req, res) => {
    const { phone } = req.params;
    const instancePhone = await Phone.findOne({
      where: { value: phone },
    });
    if (!instancePhone) {
      return res.status(404).json({ message: "Not Found " + phone });
    }

    const user = await instancePhone.getUser();
    res.json({ phone, user });
  },

  create: async (req, res) => {
    const body = req.body;
    const user = await User.create({
      fullname: body.fullname,
      email: body.email,
      password: body.password,
      address: body.address,
    });

    if (user) {
      await user.createPhone({
        value: body.value,
      });
    }
    res.json({ user });
  },

  getPosts: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const posts = await user.getPosts();
    res.json({ user, posts });
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    const user = await post.getUser();
    res.json({ user, post });
  },

  createPost: async (req, res) => {
    const { userId } = req.params;
    const body = req.body;
    const user = await User.findByPk(userId);
    const post = await user.createPost({
      title: body.title,
    });
    res.json({ post });
  },
};

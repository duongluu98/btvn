const express = require("express");
const courseController = require("../controllers/course.controller");
const usersController = require("../controllers/users.controller");
const categoryController = require("../controllers/category.controller");
const router = express.Router();
// router.get("/courses", courseController.index);
// router.get("/courses/:id", courseController.find);
// router.post("/courses", courseController.create);
// router.post("/courses/:id", courseController.update);
// router.delete("/courses/:id", courseController.delete);
// router.delete("/courses", courseController.deletes);

// router.get("/users", usersController.index);
// // router.get("/users/:id", usersController.find);
// router.get("/users/:phone", usersController.findByPhone);
// router.post("/users", usersController.create);

// router.get("/users/:id/posts", usersController.getPosts);
// router.get("/users/posts/:id", usersController.getUser);
// router.post("/users/create-post/:userId", usersController.createPost);

// router.get("/categories", categoryController.index);
// router.get("/categories/:id", categoryController.find);
// router.get("/categories/posts/:postId", categoryController.findByPost);
// router.post("/categories/posts/:id", categoryController.createPost);
// router.post("/categories/createPosts/1", categoryController.createPosts);
// router.delete("/categories/:id", categoryController.deletePost);

// router.post("/auth/vi/login", authController.login);

module.exports = router;

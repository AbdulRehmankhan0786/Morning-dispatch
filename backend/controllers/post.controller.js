import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// 🔥 AUTO CONTENT GENERATOR
const generateContent = (title) => {
  return `

  <h1>${title}</h1>

  <p>
    ${title} has become one of the most discussed topics across the world today.
    Experts believe that this development can strongly impact industries,
    businesses, technology, and society in the coming years.
  </p>

  <p>
    People from different countries are continuously reacting to the latest
    updates related to ${title}. Social media platforms are also filled with
    discussions, opinions, and expert analysis regarding this topic.
  </p>

  <h2>Why ${title} Matters?</h2>

  <p>
    The importance of ${title} is increasing rapidly because modern industries
    now depend heavily on innovation and digital transformation.
    Governments and companies are investing huge amounts to improve
    infrastructure and technology connected with this field.
  </p>

  <ul>
    <li>Improves productivity and efficiency</li>
    <li>Creates new job opportunities</li>
    <li>Helps businesses grow faster</li>
    <li>Provides better user experience</li>
    <li>Supports future innovation</li>
  </ul>

  <h2>Global Impact</h2>

  <p>
    International organizations and global companies are paying close attention
    to ${title}. Many experts believe that this trend will continue to grow
    over the next few years and may completely transform several industries.
  </p>

  <p>
    According to recent reports, thousands of people are already benefiting
    from new advancements related to ${title}. Educational institutions are
    also introducing special programs and training courses in this area.
  </p>

  <h2>Key Benefits</h2>

  <ul>
    <li>Easy accessibility</li>
    <li>Better communication systems</li>
    <li>Faster development process</li>
    <li>Cost reduction for companies</li>
    <li>High scalability and performance</li>
  </ul>

  <h2>Future Possibilities</h2>

  <p>
    Analysts predict that ${title} will become even more important in the
    future. New startups and multinational companies are continuously working
    on advanced solutions and innovative ideas connected to this field.
  </p>

  <p>
    As technology evolves, people can expect faster services, smarter systems,
    and more reliable solutions. Researchers are also exploring new methods
    to improve security, efficiency, and sustainability.
  </p>

  <blockquote>
    “${title} is shaping the future of modern digital transformation.”
  </blockquote>

  <p>
    In conclusion, ${title} is not just a trending topic but an important
    step towards a smarter and more connected future. Experts believe that
    continuous growth and innovation in this area will create massive
    opportunities worldwide.
  </p>

  `;
};

// 🔥 CREATE POST
export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to create a post!")
    );
  }

  if (!req.body.title) {
    return next(errorHandler(400, "Title is required!"));
  }

  try {

    // 🔥 SLUG
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    // 🔥 AUTO CONTENT
    const content =
      req.body.content && req.body.content.trim() !== ""
        ? req.body.content
        : generateContent(req.body.title);

    // 🔥 AUTO IMAGE
    const keyword = req.body.title.split(" ").join(",");

    const image =
      req.body.image && req.body.image.trim() !== ""
        ? req.body.image
        : `https://picsum.photos/seed/${keyword}/600/400`;

    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      image,
      content,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);

  } catch (error) {

    next(error);

  }
};

// 🔥 GET ALL POSTS + FILTER + SEARCH + SORT
export const getPosts = async (req, res, next) => {

  try {

    const startIndex = parseInt(req.query.startIndex) || 0;

    const limit = parseInt(req.query.limit) || 9;

    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const posts = await Post.find({

      ...(req.query.category &&
        req.query.category !== "" && {
          category: req.query.category,
        }),

      ...(req.query.searchTerm &&
        req.query.searchTerm !== "" && {
          title: {
            $regex: req.query.searchTerm,
            $options: "i",
          },
        }),

    })

      .sort({ createdAt: sortDirection })

      .skip(startIndex)

      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPosts,
    });

  } catch (error) {

    next(error);

  }
};

// 🔥 GET SINGLE POST
export const getPost = async (req, res, next) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);

  } catch (error) {

    next(error);

  }
};

// 🔥 DELETE POST
export const deletepost = async (req, res, next) => {

  try {

    const post = await Post.findById(req.params.postId)

    if (!post) {

      return res.status(404).json({
        message: "Post not found",
      })

    }

    await Post.findByIdAndDelete(req.params.postId)

    res.status(200).json({
      message: "Post deleted successfully",
    })

  } catch (error) {

    next(error)

  }
}

// 🔥 UPDATE POST
export const updatepost = async (req, res, next) => {

  try {

    const keyword =
      req.body.title?.split(" ").join(",") || "";

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,

      {
        $set: {

          ...req.body,

          image:
            req.body.image &&
            req.body.image.trim() !== ""
              ? req.body.image
              : keyword
              ? `https://picsum.photos/seed/${keyword}/600/400`
              : undefined,
        },
      },

      { new: true }
    );

    res.status(200).json(updatedPost);

  } catch (error) {

    next(error);

  }
};
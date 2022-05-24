export const addOrUpdateTicket = (req, res, next) => {
  req
    .check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("Title must be between 2 to 50 characters");

  req
    .check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({
      min: 2,
    })
    .withMessage("Description at least more than 2 characters");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ firstError });
  }
  next();
};

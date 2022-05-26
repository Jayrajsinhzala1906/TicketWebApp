export const userSignupValidator = (req, res, next) => {
  req
    .check("firstName", "First Name is required")
    .notEmpty()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("No Special Character and no Number allowed ");
  req
    .check("lastName", "Last Name is required")
    .notEmpty()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("No Special Character and no Number allowed ");
  req
    .check("email", "Email must be between 3 to 32 characters")
    .notEmpty()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Invalid Email format")
    .isLength({
      min: 4,
      max: 320,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must contain at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-za-z\d]{8,}$/)
    .withMessage("Password Must contaon Number and letter");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ firstError });
  }
  next();
};

export const userSignInValidator = (req, res, next) => {
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Invalid Email address format")
    .isLength({
      min: 4,
      max: 320,
    });
  req.check("password", "Password is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ firstError });
  }
  next();
};

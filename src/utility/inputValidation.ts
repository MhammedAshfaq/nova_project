import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "any.required": "Username is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(10).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 10 characters long",
    "any.required": "Password is required",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(10).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 10 characters long",
    "any.required": "Password is required",
  }),
});

export const messageListSchema = Joi.object({
  userId: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .optional()
    .messages({
      "number.base": "User ID must be a number",
      "string.base": "User ID must be a string",
    }),

  pageSize: Joi.number().optional().messages({
    "number.base": "Page size must be a number",
    "number.min": "Page size must be at least 1",
  }),

  pageIndex: Joi.number().optional().messages({
    "number.base": "Page index must be a number",
    "number.min": "Page index must be at least 1",
  }),
});

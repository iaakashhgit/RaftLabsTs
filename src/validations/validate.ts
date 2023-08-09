import Joi from 'joi';
import pick from "../helper/util";
import { Request, Response, NextFunction } from 'express';

type ValidKeys = 'params' | 'query' | 'body';

const validate = (schema: Record<ValidKeys, Joi.Schema>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema) as (keyof typeof req)[]);

    const compiledSchema = Joi.object(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false });

    const { error, value } = compiledSchema.validate(object);

    if (error) {
      const errorMessage = error.details.map(details => details.message).join(', ');
      return res.status(400).json({ message: "Validation error:", errorMessage });
    }

    Object.assign(req, value);
    return next();
  };

export default validate;

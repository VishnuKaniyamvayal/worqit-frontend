import { z } from "zod";

export const createDynamicIdentitySchema = (fields) => {
  const shape = {};

  fields.forEach((f) => {
    let type;
    if (f.isRequired) {
      type = z.string({
        error: (iss) =>
          iss.input === undefined
            ? `${f.idName} is required`
            : `Invalid ${f.idName}`,
      });
    } else {
      type = z
        .string({
          error: (iss) =>
            iss.input === undefined
              ? `${f.idName} is required`
              : `Invalid ${f.idName}`,
        })
        .optional();
    }
    shape[`value_${f.id}`] = type;

    let attachment;
    if (f.isAttachmentRequired) {
      attachment = z.string({
        error: (iss) =>
          iss.input === undefined
            ? `${f.idName} is required`
            : `Invalid ${f.idName}`,
      });
    } else {
      attachment = z
        .string({
          error: (iss) =>
            iss.input === undefined
              ? `${f.idName} is required`
              : `Invalid ${f.idName}`,
        })
        .optional();
    }
    shape[`attachment_${f.id}`] = attachment;
  });

  return z.object(shape);
};

export const createDynamicADSchema = (fields) => {
  const shape = {};

  fields.forEach((f) => {
    let type;
    if (f.isRequired) {
      type = z.string({
        error: (iss) =>
          iss.input === undefined
            ? `${f.admName} is required`
            : `Invalid ${f.admName}`,
      });
    } else {
      type = z
        .string({
          error: (iss) =>
            iss.input === undefined
              ? `${f.admName} is required`
              : `Invalid ${f.admName}`,
        })
        .optional();
    }
    shape[`value_${f.id}`] = type;
  });

  return z.object(shape);
};

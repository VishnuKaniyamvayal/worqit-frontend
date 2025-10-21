import { z } from "zod";
import type { identityDetailsMaster } from "../pages/Employee/AddEmployee/steps/IdentityDetailsStep";
import type { adDetailsMaster } from "../pages/Employee/AddEmployee/steps/ADDetailsStep";

export const createDynamicIdentitySchema = (fields:identityDetailsMaster[]) => {
  const shape:any = {};

  fields.forEach((f) => {
    // value validation
    let type;
    if(f.isRequired){
       type = z.string({ error: (iss) => iss.input === undefined ? `${f.idName} is required` : `Invalid ${f.idName}` });
    }
    else{
        type = z.string({ error: (iss) => iss.input === undefined ? `${f.idName} is required` : `Invalid ${f.idName}` }).optional();
    }
    shape[`value_${f.id}`] = type;

    // attachment validation
    let attachment;
    if (f.isAttachmentRequired){
        attachment = z.string({ error: (iss) => iss.input === undefined ? `${f.idName} is required` : `Invalid ${f.idName}` });
    }
    else{
        attachment = z.string({ error: (iss) => iss.input === undefined ? `${f.idName} is required` : `Invalid ${f.idName}` }).optional();
    }
    shape[`attachment_${f.id}`] = attachment;
  });

  return z.object(shape);
};

export const createDynamicADSchema = (fields: adDetailsMaster[]) => {
  const shape: any = {};

  fields.forEach((f) => {
    // Value validation based on required flag
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


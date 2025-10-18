import { z } from "zod";
import type { identityDetailsMaster } from "../pages/Employee/AddEmployee/steps/IdentityDetailsStep";

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

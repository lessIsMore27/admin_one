import { RegularConfigValue } from "./index";


export const getRule = (regular: RegularConfigValue): any[] => {
  const result: any[] = [];
  if (!regular) return result;
  const { msg = "", required = false } = regular;
  if (required) result.push({ required: true, message: "该项不能为空" });
  const preg = eval(regular.preg || "");
  if (preg) result.push({ pattern: preg, message: msg }); 
  return result;
}
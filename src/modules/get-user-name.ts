// @ts-nocheck
const getUserName = name => ({
  string: String(name),
  object: `${name.first} ${name.last}`,
  undefined: '',
}[typeof name]);

export default getUserName;

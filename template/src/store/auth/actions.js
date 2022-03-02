import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  login: ["username", "password"]
});

export const AuthTypes = Types;

export default Creators ;

import { api } from "./api";

type Credentials = {

}
function signIn(credentials: Credentials) {
  return api.post('/auth/sign_in', credentials);
}

import cookiesDefn from './definitions/cookies';
import { Cookies, CookiesInputType } from './graphql/cookies';
import cookiesState from './initialStates/cookies';

const definitions = {
  cookiesDefn,
};
const graphql = {
  Cookies,
  CookiesInputType,
};
const initialStates = {
  cookiesState,
};

export { definitions, graphql, initialStates };

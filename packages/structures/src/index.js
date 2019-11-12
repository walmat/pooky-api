import cookiesDefn from './definitions/cookies';
import settingsDefn from './definitions/settings';

import { Cookies, CookiesInputType } from './graphql/cookies';
import { SettingsType, SettingsInputType } from './graphql/settings';

import cookiesState from './initialStates/cookies';
import settingsState from './initialStates/settings';

const definitions = {
  cookiesDefn,
  settingsDefn,
};
const graphql = {
  Cookies,
  CookiesInputType,
  SettingsType,
  SettingsInputType,
};
const initialStates = {
  cookiesState,
  settingsState,
};

export { definitions, graphql, initialStates };

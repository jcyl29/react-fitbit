import queryString from 'query-string';

// set keys to false if you don't want have to have access to certain scopes
const scopes = {
  activity: true,
  heartrate: true,
  location: true,
  nutrition: true,
  profile: true,
  settings: true,
  sleep: true,
  social: true,
  weight: true
};

const scopeStr = Object.entries(scopes)
  .reduce((acc, [scope, enabled]) => {
    if (enabled) {
      acc.push(scope);
    }

    return acc;
  }, [])
  .join(' ');

const authorizeParams = {
  response_type: 'token',
  client_id: '22BBTX',
  redirect_url: 'http://localhost:3000/', // where to redirect after logging in
  scope: scopeStr,
  expires_in: 31536000,
  prompt: 'login'
};

export const authorizeUrl = `https://www.fitbit.com/oauth2/authorize?${queryString.stringify(
  authorizeParams
)}`;

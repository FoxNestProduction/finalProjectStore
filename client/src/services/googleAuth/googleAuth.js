function googleAuth() {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_url: process.env.OAUTH_REDIRECT_URL,
    client_id: process.env.OAUTH_CLIENT_ID,
    acces_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://googleapis.com/auth/userinfo.profile',
      'https://googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  //   console.log(options);

  const qs = new URLSearchParams(options);

  //   console.log(qs);
  console.log(process.env);

  return `${rootURL}?${qs.toString()}`;
}

export default googleAuth;

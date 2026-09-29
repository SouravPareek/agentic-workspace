import 'dotenv/config'

const required = [
    'SESSION_SECRET',
    'TOKEN_ENC_KEY',
    'PORT'
]

const missing = required.filter((name)=> !process.env[name])

if(missing.length > 0){
    throw new Error(`Missing required environemnt variables: ${missing.join(', ')}`)
}

const tokenEncKey = Buffer.from(process.env.TOKEN_ENC_KEY, 'hex')
if(tokenEncKey.length !== 32){
    throw new Error('TOKEN_ENC_KEY must be 64 hex characters (32 bytes)')
}

export const config = Object.freeze({
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: Number(process.env.PORT) || 3000,
    clientUrl: process.env.CLIENT_URL,
    mongoUri: process.env.MONGO_URI,
    sessionSecret: process.env.SESSION_SECRET,
    tokenEncKey,
    google: Object.freeze({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    scopes: [
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  }),

})
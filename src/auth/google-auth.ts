import passport from "passport";
import { Strategy } from "passport-google-oauth2";

const GoogleStrategy = Strategy;

class AuthGoogle {
  auth(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.URL as string,
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
          return done(null, profile);
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });
  }
}

export { AuthGoogle };

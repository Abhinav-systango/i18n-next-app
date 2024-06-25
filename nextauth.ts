    import NextAuth, { NextAuthOptions, User } from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import GoogleProvider from "next-auth/providers/google";

    const refreshTokenApi = async (token: any) => {
    const res = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        refreshToken: token.refreshToken,
        expiresInMins: 1,
        }),
    });
    const data = await res?.json();
    if (data?.token) {
        return {
        ...token,
        accessToken: data.token,
        refreshToken: data.refreshToken,
        expiresIn: Date.now() + 60000,
        };
    }
    return null;
    };

    export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
                expiresInMins: 1,
            }),
            });
            const data = await res?.json();
            if (data?.token) {
            return data;
            }

            return null;
        },
        }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
            params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            },
        },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async jwt({ token, user }) {
        if (!token) {
            return null;
        }
        if (user) {
            token.accessToken = user.token;
            token.refreshToken = user.refreshToken;
            token.expiresIn = Date.now() + 60000;
            return token;
        }
        if (Date.now() < token?.expiresIn) {
            return token;
        }
        // Access token has expired, try to update it
        if (Date.now() > token?.expiresIn) {
            const updatedToken = await refreshTokenApi(token);
            return updatedToken;
        }
        return token;
        },
        
        async session({ session, token }) {
        if (token && session.user) {
            session.user.accessToken = token?.accessToken as string;
            session.user.refreshToken = token.refreshToken as string;
            session.user.expiresIn = token.expiresIn as string;
        }
        return session;
        },
    },
    };

    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
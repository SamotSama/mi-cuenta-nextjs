  // import prisma from "@/../prisma/client";
  // import { PrismaAdapter } from "@next-auth/prisma-adapter";
  // import bcrypt from "bcryptjs";
  // import jwt from "jsonwebtoken";
  // import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
  // import { JWT } from "next-auth/jwt";
  // import NextAuth from "next-auth/next";
  // import Credentials from "next-auth/providers/credentials";
  // import { JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";

  // export const authOptions: NextAuthOptions = {
  //   adapter: PrismaAdapter(prisma),
  //   providers: [
  //     Credentials({
  //       name: "Credentials",
  //       credentials: {
  //         email: { label: "Email", type: "email", placeholder: "Email" },
  //         password: { label: "Password", type: "password" },
  //       },
  //       async authorize(
  //         credentials: Record<"email" | "password", string> | undefined,
  //       ): Promise<User | null> {
  //         try {
  //           if (!credentials) {
  //             return null; // Credenciales no proporcionadas
  //           }

  //           const user = await prisma.usuarios.findUnique({
  //             where: { usuario: credentials.email },
  //           });

  //           if (!user) {
  //             return null; // Usuario no encontrado
  //           }

  //           const validPassword = bcrypt.compareSync(
  //             credentials.password,
  //             user.clave as string,
  //           );

  //           if (!validPassword) {
  //             return null; // Contraseña inválida
  //           }

  //           // Transformar el objeto de usuario antes de devolverlo
  //           const transformedUser: User = {
  //             id: user.id.toString(),
  //             email: user.usuario,
  //             name: user.nombre,
  //           };

  //           // Retorna el usuario transformado si las credenciales son válidas
  //           return transformedUser;
  //         } catch (error) {
  //           console.error("Error al autorizar usuario:", error);
  //           return null;
  //         }
  //       },
  //     }),
  //   ],
  //   pages: {
  //     // Aca va la ruta donde tenes el login
  //     signIn: "/login",
  //     // signOut: "/auth/signout"
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
  //   jwt: {
  //     async encode(params: JWTEncodeParams): Promise<string> {
  //       const { token, secret } = params;

  //       if (!token) {
  //         throw new Error("No token to encode");
  //       }

  //       return jwt.sign(token as any, secret);
  //     },
  //     async decode(params: JWTDecodeParams): Promise<JWT | null> {
  //       const { secret, token } = params;
  //       if (!token) {
  //         throw new Error("No token to decode");
  //       }
  //       try {
  //         const decodedToken = jwt.verify(token, secret);
  //         if (typeof decodedToken === "string") {
  //           return JSON.parse(decodedToken) as JWT;
  //         } else {
  //           return decodedToken as JWT;
  //         }
  //       } catch (error) {
  //         console.error("Error decoding token:", error);
  //         return null;
  //       }
  //     },
  //   },

  //   session: {
  //     strategy: "jwt",
  //     maxAge: 30 * 24 * 60 * 60,
  //     updateAge: 24 * 60 * 60,
  //   },
  //   callbacks: {
  //     async session(params: {
  //       session: Session;
  //       token: JWT;
  //       user: User;
  //     }): Promise<Session> {
  //       if (params.session.user) {
  //         params.session.user.email = params.token.email;
  //       }
  //       return params.session;
  //     },
  //     async jwt(params: {
  //       token: JWT;
  //       user?: User | undefined;
  //       account?: Account | null | undefined;
  //       profile?: Profile | undefined;
  //       isNewUser?: boolean | undefined;
  //     }): Promise<JWT> {
  //       if (params.user) {
  //         params.token.email = params.user.email;
  //       }

  //       return { ...params.token, email: params.user?.email } as JWT;
  //     },
  //   },
  // };

  // const handler = NextAuth(authOptions);

  // export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         // Aquí realiza la solicitud al servidor de autenticación y retorna el usuario si la autenticación es exitosa
//         const user = await makeLoginRequest(credentials.username, credentials.password);
//         if (user) {
//           return Promise.resolve(user);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Página de inicio de sesión personalizada
//   },
//   callbacks: {
//     jwt: async (token, user) => {
//       if (user) {
//         token.accessToken = user.access_token;
//       }
//       return token;
//     },
//     session: async ({ session, token, user }: { session: Session; token: JWT; user: AdapterUser; } & { newSession: any; trigger: "update"; }) => {
//       if (user) {
//         session.accessToken = user.accessToken;
//       }
//       return session;
//     },
//   },
// });
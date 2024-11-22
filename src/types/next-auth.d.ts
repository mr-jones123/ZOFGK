// In a separate file, e.g., types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    firebaseUserId?: string;
    id?: string;
  }

  interface Session {
    user: {
      firebaseUserId?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firebaseUserId?: string;
    id?: string;
  }
}
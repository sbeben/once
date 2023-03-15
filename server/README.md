## Usage

For now to run locally you have to set the type of Jwt payload manually.  
For some reason declaration merging does not work here.

Would be fixed by adding post install script later.

```
./node_modules/@fastify/jwt/jwt.d.ts

    interface User
    {id: 'string', role: 'client'}

    export interface FastifyJWT {
    user: User
    }

    export type VerifyPayloadType = User
    export type DecodePayloadType = User

```

```
.env
    DB_URL = //supabase url
    DB_KEY = //supabase secret
    JWT_SECRET =
    PORT = // default 3001

```

```bash
    npm install
    npm start
```

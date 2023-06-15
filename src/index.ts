import { server } from "./server/server";

const port = process.env.PORT || 8001;

server.listen(port, () => console.log(`server listen port ${port}`));

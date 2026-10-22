import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { postRoutes } from "./src/routes/post.routes.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

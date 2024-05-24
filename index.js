require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(errorHandler); // обработка ошибок

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

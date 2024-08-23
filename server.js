const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const http = require("http"); // Import http module

// swagger
const basicAuth = require("express-basic-auth");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swaggerConfig");
const { SwaggerTheme } = require("swagger-themes");
const theme = new SwaggerTheme();
const options = {
  explorer: true,
  customCss: theme.getBuffer("dark") + ".swagger-ui .topbar { display:none }",
};
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
/* routes */
const userRouter = require("./Route/user_routes");
<<<<<<< HEAD

const productRoutes = require("./Route/product_route");
const filerouter = require("./Route/filesystem_routes");


=======
const productRoutes = require("./Route/product_route");
const filerouter = require("./Route/filesystem_routes");

>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
const app = express();
const server = http.createServer(app);

app.use(
  "/api-dcos",
  basicAuth({
    users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD },
    challenge: true,
    realm: "Imb4T3st4pp",
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, options)
);

app.enable("trust proxy");
app.use(
  cors({
    origin: true, // Allow access from any origin
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);
<<<<<<< HEAD

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// const port = 8000;
app.use(cookieParser());

=======
const port = 8000;
app.use(cookieParser());
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
// Define the desired folder structure
const folderStructure = ["files"];

// function for make all needed global files
const createFoldersMiddleware = () => {
  for (const folder of folderStructure) {
    const folderPath = path.join(__dirname, folder);

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      // If the folder doesn't exist, create it
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
};
// function for make all needed global files : calls here
createFoldersMiddleware();
// Serve static files from the 'files' directory
<<<<<<< HEAD

app.use("/files", express.static(path.join(__dirname, "files"))); // Corrected path for static files

app.use("/", express.static(path.join(__dirname, "files"))); // Corrected path for static files

=======
app.use("/", express.static(path.join(__dirname, "files"))); // Corrected path for static files
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* routes */
app.use("/api/v1/user", userRouter);
<<<<<<< HEAD


app.use("/api/v1/product", productRoutes);
app.use("/api/v1/upload", filerouter);


=======
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/upload", filerouter);

>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
const AppError = require("./utils/appError");
const globalErrorHandler = require("./Controller/error_controller");
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrorHandler);

app.use((err, req, res, next) => {
  return next(new AppError(err, 404));
});

const DB = process.env.mongo_uri;
<<<<<<< HEAD

const port = 8000;

=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
// const port = 8000;

const connectDB = async () => {
  try {
    // console.log("DB Connecting ...");
    const response = await mongoose.connect(DB);
    if (response) {
      console.log("MongoDB connect successfully");
<<<<<<< HEAD


      server.listen(port, () => {
        // Start the server using server.listen
        console.log(`App run with url: http://localhost:${port}`);
      });

=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
    }
  } catch (error) {
    console.log("error white connect to DB ==>  ", error);
  }
};
connectDB();

<<<<<<< HEAD

=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5
server.listen(port, () => {
  // Start the server using server.listen
  console.log(`App run with url: http://localhost:${port}`);
});
<<<<<<< HEAD

=======
>>>>>>> bfda625c472e51baf8558974c2dfd6f936ad5ef5

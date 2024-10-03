import http from "http";
import chalk from "chalk";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-dist";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Import de tes gestionnaires
import rootHandler from "./handlers/root.handler.js";
import stylesHandler from "./handlers/styles.handler.js";
import loginHandler from "./handlers/login.handler.js";
import submitLoginFormHandler from "./handlers/submit-login-form.handler.js";
import imageHandler from "./handlers/image.handler.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Node.js avec ESModules',
      version: '1.0.0',
      description: 'Documentation de l\'API avec Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./server.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);


const swaggerUiPath = swaggerUi.getAbsoluteFSPath();

const customIndexPath = path.join(__dirname, 'public/swagger/index.html');
const swaggerInitializerPath = path.join(__dirname, 'public/swagger/swagger-initializer.js');


const serveSwaggerUi = (req, res) => {
  let filePath = '';

  if (req.url === '/api-docs/') {

    filePath = customIndexPath;
  } else if (req.url === '/api-docs/swagger-initializer.js') {
  
    filePath = swaggerInitializerPath;
  } else {

    filePath = path.join(swaggerUiPath, req.url.replace('/api-docs', ''));
  }


  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {

      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.png') contentType = 'image/png';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
};

const server = http.createServer(async function (req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathName = parsedUrl.pathname;

  // Gestion de tes routes
  if (pathName === '/' && req.method === 'GET') {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Home Page
     *     responses:
     *       200:
     *         description: Succès
     */
    await rootHandler(req, res);
    res.end();
  } else if (pathName === '/styles' && req.method === 'GET') {
    /**
     * @swagger
     * /styles:
     *   get:
     *     summary: Styles of the App
     *     responses:
     *       200:
     *         description: Succès
     */
    await stylesHandler(req, res);
    res.end();
  } else if (pathName === '/login' && req.method === 'GET') {
    /**
     * @swagger
     * /login:
     *   get:
     *     summary: Login Page
     *     responses:
     *       200:
     *         description: Succès
     */
    await loginHandler(req, res);
    res.end();
  } else if (pathName.startsWith('/files/') && req.method === 'GET') {
    /**
     * @swagger
     * /files/{filename}:
     *   get:
     *     summary: Images of the App
     *     parameters:
     *       - in: path
     *         name: filename
     *         required: true
     *         schema:
     *           type: string
     *         description: Nom du fichier d'image
     *     responses:
     *       200:
     *         description: Succès
     */
    await imageHandler(req, res);
    res.end();
  } else if (pathName === '/submit-login-form' && req.method === 'POST') {
    /**
     * @swagger
     * /submit-login-form:
     *   post:
     *     summary: Login Form Handler
     *     responses:
     *       200:
     *         description: Formulaire soumis avec succès
     */
    submitLoginFormHandler(req, res);
  } else if (pathName === '/api-docs/swagger.json') {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(swaggerDocs));
  } else if (pathName.startsWith('/api-docs')) {
   
    serveSwaggerUi(req, res);
  } else {
   
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route non trouvée');
  }
});


server.listen(3000, () => {
  console.log(chalk.blue("✅ Server running at http://localhost:3000"));
  console.log(chalk.blue("Swagger UI available at http://localhost:3000/api-docs"));
});

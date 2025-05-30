const express = require('express');
const app = express();
// const condidentmodel = require('./models/condidentModel');
// const homerouter = require('./router/index');
const userrouter = require('./router/userRouter');
const voterouter = require('./router/voteRouter');
const condidentrouter = require('./router/candidatesRouter');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;
// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voting app',
      version: '1.0.0',
      description: 'there are shows all endpoint',
    },
  },
  apis: ['./router/*.js'], // Point to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(express.json());






app.get("/",(req,res) => {
  res.send("Hello <br><br> Welcome to my voting app <br><br> the all Endpoint is define the /api-docs" )
});
app.use("/user",userrouter);
app.use("/vote",voterouter);
app.use("/candidates",condidentrouter);

app.listen(port);


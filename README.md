# System Design

The goal of this project is to replace the existing API of products section with a back end system that can support the full data set and can scale to meet the demands of production traffic for an E-commerce application.

## Technologies
<img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white>' />
<img src='https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white' />
<img src='https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white' />



## Stress Testing
Deployed AWS EC2 instances behind Load Balancer to sustain 1000 RPS with an average response time of 18ms and 0% error rate.

## Routes
| Request        | Endpoint                        | Returns                                                               | Status
| -------------  | ------------------------------  | --------------------------------------------------------------------  | ------
| GET            | /products                       | Retrieves the list of products.                                       | 200
| GET            | /products/:product_id           | Returns all product level information for a specified product id.     | 200
| GET            | /products/:product_id/related   | Returns the all styles available for the given product.               | 200
| GET            | /products/:product_id/styles    | Returns the id's of products related to the product specified.        | 200
| GET            | /cart                           | Retrieves list of products added to the cart by a user.               | 200
| POST           | /cart/:userToken                | Adds a product to the cart.                                           | 201

## Usage
In the project directory, you can run
<p><span style='background-color: #5c5c5c'>npm run start<span></p>
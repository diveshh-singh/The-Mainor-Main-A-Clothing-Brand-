# Fashion Store API Documentation

This document provides details about all the API endpoints available in the Fashion Store application.

## Base URL

\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

\`\`\`
Authorization: Bearer YOUR_TOKEN_HERE
\`\`\`

## Products API

### Get All Products

\`\`\`
GET /products
\`\`\`

Query Parameters:
- `pageNumber` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Number of products per page (default: 10)
- `keyword` (optional): Search term for product name
- `category` (optional): Filter by category
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `sortBy` (optional): Sort field and direction (e.g., "price:asc", "createdAt:desc")

Response:
\`\`\`json
{
  "products": [...],
  "page": 1,
  "pages": 10,
  "count": 100
}
\`\`\`

### Get Featured Products

\`\`\`
GET /products/featured
\`\`\`

Response:
\`\`\`json
[
  {
    "_id": "...",
    "name": "Product Name",
    "price": 3999,
    "images": ["..."],
    ...
  }
]
\`\`\`

### Get New Arrivals

\`\`\`
GET /products/new-arrivals
\`\`\`

Response: Array of products marked as new arrivals.

### Get Product by ID

\`\`\`
GET /products/:id
\`\`\`

Response: Single product object.

### Create Product Review

\`\`\`
POST /products/:id/reviews
\`\`\`

Request Body:
\`\`\`json
{
  "rating": 5,
  "comment": "Great product!"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Review added"
}
\`\`\`

## User API

### Login

\`\`\`
POST /users/login
\`\`\`

Request Body:
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

Response:
\`\`\`json
{
  "_id": "...",
  "name": "User Name",
  "email": "user@example.com",
  "isAdmin": false,
  "token": "JWT_TOKEN"
}
\`\`\`

### Register

\`\`\`
POST /users/register
\`\`\`

Request Body:
\`\`\`json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "phone": "1234567890"
}
\`\`\`

Response: User object with JWT token.

### Get User Profile

\`\`\`
GET /users/profile
\`\`\`

Response: User profile information.

### Update User Profile

\`\`\`
PUT /users/profile
\`\`\`

Request Body:
\`\`\`json
{
  "name": "Updated Name",
  "email": "user@example.com",
  "password": "newpassword123" // Optional
}
\`\`\`

Response: Updated user object with JWT token.

## Cart API

### Get User Cart

\`\`\`
GET /cart
\`\`\`

Response: User's cart with items.

### Add to Cart

\`\`\`
POST /cart/add
\`\`\`

Request Body:
\`\`\`json
{
  "productId": "product_id",
  "qty": 1,
  "color": "Black",
  "size": "M"
}
\`\`\`

Response: Updated cart object.

### Update Cart Item

\`\`\`
PUT /cart/update/:itemId
\`\`\`

Request Body:
\`\`\`json
{
  "qty": 2
}
\`\`\`

Response: Updated cart object.

### Remove from Cart

\`\`\`
DELETE /cart/remove/:itemId
\`\`\`

Response: Updated cart object.

### Clear Cart

\`\`\`
DELETE /cart/clear
\`\`\`

Response:
\`\`\`json
{
  "message": "Cart cleared"
}
\`\`\`

## Order API

### Create Order

\`\`\`
POST /orders
\`\`\`

Request Body:
\`\`\`json
{
  "orderItems": [
    {
      "name": "Product Name",
      "qty": 2,
      "image": "image_url",
      "price": 3999,
      "product": "product_id",
      "color": "Black",
      "size": "M"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "postalCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "PayPal",
  "itemsPrice": 7998,
  "taxPrice": 1439.64,
  "shippingPrice": 0,
  "totalPrice": 9437.64
}
\`\`\`

Response: Created order object.

### Get Order by ID

\`\`\`
GET /orders/:id
\`\`\`

Response: Order details.

### Update Order to Paid

\`\`\`
PUT /orders/:id/pay
\`\`\`

Request Body:
\`\`\`json
{
  "id": "payment_id",
  "status": "COMPLETED",
  "update_time": "2023-01-01T00:00:00Z",
  "payer": {
    "email_address": "customer@example.com"
  }
}
\`\`\`

Response: Updated order object.

### Get User Orders

\`\`\`
GET /orders/myorders
\`\`\`

Response: Array of user's orders.

## Wishlist API

### Get User Wishlist

\`\`\`
GET /wishlist
\`\`\`

Response: Array of products in user's wishlist.

### Add to Wishlist

\`\`\`
POST /wishlist/add/:productId
\`\`\`

Response: Updated wishlist array.

### Remove from Wishlist

\`\`\`
DELETE /wishlist/remove/:productId
\`\`\`

Response: Updated wishlist array.

### Clear Wishlist

\`\`\`
DELETE /wishlist/clear
\`\`\`

Response:
\`\`\`json
{
  "message": "Wishlist cleared"
}
\`\`\`

## Real-time Events (Socket.io)

The API supports real-time updates through Socket.io. Connect to the server and listen for these events:

- `product_updated`: Emitted when a product is updated
- `order_updated`: Emitted when an order status changes
- `cart_updated`: Emitted when a user's cart is modified
- `product_view_count`: Emitted with the current number of viewers for a product

To join specific rooms:
- `socket.emit('join_product', productId)`: Join a product room to receive updates
- `socket.emit('join_order', orderId)`: Join an order room to receive updates
- `socket.emit('join_user', userId)`: Join a user room to receive personal updates
\`\`\`

Finally, let's update the main page to properly handle product selection and display:

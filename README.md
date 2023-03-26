# todos

## Demo
You can find a demo at this video here [https://youtu.be/FUY7E9f35IQ](https://youtu.be/FUY7E9f35IQ)

## How to run
In order to run, you need to create a folder under resources called "certificates", and create two .pem files called "public.pem" and "private.pem".
These represent the private / public key pair used by the RSA algorithm for encrpting and decrypting the JWT token.

## Overview
### Back-end
The back-end is written in Java using Spring Boot, and MongoDB is used to persist user data. The back-end exposes several REST API endpoints.

All of the endpoints are authenticated using JWT tokens except for the endpoint used to access shared todo lists, and the endpoints for login and signup.

The front-end uses Basic authentication to login using the public login endpoint, and receives a JWT that it then adds to the "Authorization" header for all future HTTP requests.

The security was implemented using Spring Security. Furthermore, when attempting to access a user resoure (their todo lists), the back-end ensures that the authenticated user is the same as the one who owns the resource they're attempting to access.

### Front-end
The front-end is implemented in React using Typescript. It uses MUI (Material UI) to provide pre-built pretty UI components.

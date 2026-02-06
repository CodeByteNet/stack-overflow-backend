import AuthorizationController from "@controllers/Authorization";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *      tags:
 *          - Authorization
 *      summary: Register user account
 *      parameters:
 *          - in: body
 *            name: nickname
 *            required: true
 *            schema:
 *              type: string
 *          - in: body
 *            name: password
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          201:
 *              description: Account registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/UserCreateResponse'
 *          400:
 *              description: Invalid payload
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.post("/register", AuthorizationController.signUp);

/**
 * @openapi
 * /auth/login:
 *   post:
 *      tags:
 *          - Authorization
 *      summary: Login user account
 *      parameters:
 *          - in: body
 *            name: nickname
 *            required: true
 *            schema:
 *              type: string
 *          - in: body
 *            name: password
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Login successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/UserResponse'
 *          400:
 *              description: Invalid payload
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.post("/login", AuthorizationController.signIn);

/**
 * @openapi
 * /auth?nickname:
 *   get:
 *      tags:
 *          - Authorization
 *      summary: Is user exist
 *      parameters:
 *          - in: query
 *            name: nickname
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: User exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/UserResponse'
 *          400:
 *              description: Invalid query params
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/ErrorResponse'
 *  
 */
router.get("", AuthorizationController.checkUserExist);

export default router;
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerConfig } from "@utils/configs/swagger";

export const swaggerSpecification = swaggerJSDoc(swaggerConfig);
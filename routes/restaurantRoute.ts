import express from "express";
import multer from "multer";
import { RestaurantController } from "../controllers/restaurantController";
import { RestaurantRepository } from "../repositories/restaurantRepository";
import { RestaurantInteractor } from "../interactors/restaurantInteractor";
const router = express.Router();
const upload = multer();

const restaurantRepository = new RestaurantRepository();
const restaurantInteractor = new RestaurantInteractor(restaurantRepository);
const restaurantController = new RestaurantController(restaurantInteractor);

router.post("/restaurant", upload.single('csvFile'), restaurantController.createRestaurant.bind(restaurantController));
router.get("/restaurant", restaurantController.getRestaurants.bind(restaurantController));
router.get("/restaurant/id/:id", restaurantController.getRestaurant.bind(restaurantController));
router.put("/restaurant/:id", restaurantController.updateRestaurant.bind(restaurantController));
router.delete("/restaurant/:id", restaurantController.deleteRestaurant.bind(restaurantController));
router.get("/restaurant/statistics", restaurantController.restaurantStatistics.bind(restaurantController));

export default router;

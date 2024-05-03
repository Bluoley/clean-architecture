import { NextFunction, Request, Response } from "express";
import { RestaurantInterface } from "../interfaces/restaurantInterface";

export class RestaurantController {
  constructor(private restaurantInterface: RestaurantInterface) {}

  async createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.file;
      const result = await this.restaurantInterface.createRestaurant(input);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const offset = req.query.offset ? Number(req.query.offset) : 0;
      const result = await this.restaurantInterface.getRestaurants(
        limit,
        offset
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.restaurantInterface.getRestaurant(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const input = req.body;
      const result = await this.restaurantInterface.updateRestaurant(id, input);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.restaurantInterface.deleteRestaurant(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async restaurantStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.query
      const result = await this.restaurantInterface.restaurantStatistics(params);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

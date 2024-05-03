import { IRestaurantRepository } from "../interfaces/IrestaurantRepository";
import { RestaurantInterface } from "../interfaces/restaurantInterface";

export class RestaurantInteractor implements RestaurantInterface {
  constructor(private repository: IRestaurantRepository) {}

  async restaurantStatistics(params: any) {
    return this.repository.statistics(params);
  }

  async createRestaurant(input: any) {
    return this.repository.create(input);
  }
  async getRestaurants(limit: number, offset: number) {
    return this.repository.findAll(limit, offset);
  }
  async getRestaurant(id: string) {
    return this.repository.findById(id);
  }
  async updateRestaurant(id: string, input: any) {
    return this.repository.update(id, input);
  }
  async deleteRestaurant(id: string) {
    return this.repository.delete(id);
  }
}

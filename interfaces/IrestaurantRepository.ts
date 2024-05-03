import { Restaurant } from "../entities/Restaurants";

export interface IRestaurantRepository {
  statistics(params: any): Promise<any>;
  create(data: Restaurant): Promise<Restaurant>;
  findAll(limit: number, offset: number): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant>;
  update(id: string, data: Restaurant): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

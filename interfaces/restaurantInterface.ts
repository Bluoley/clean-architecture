export interface RestaurantInterface {
  createRestaurant(input: any);
  getRestaurants(limit: number, offset: number);
  getRestaurant(id: string);
  updateRestaurant(id: string, input: any);
  deleteRestaurant(id: string);
  restaurantStatistics(params: any);
}

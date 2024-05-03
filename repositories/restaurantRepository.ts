import { Pool } from "pg";
import { Restaurant } from "../entities/Restaurants";
import { IRestaurantRepository } from "../interfaces/IrestaurantRepository";
import { connection } from "../config/db";
import { parse } from "csv-parse";
import { Readable } from "stream";

export class RestaurantRepository implements IRestaurantRepository {
  private client: Pool;

  constructor() {
    this.client = connection();
  }

  async statistics(params: any): Promise<any> {
    const query = `WITH restaurants AS ( SELECT rating FROM test.restaurants WHERE ST_DWithin( ST_SetSRID( ST_MakePoint(test.restaurants.lng, test.restaurants.lat), 4326 ), ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326), ${params.radius} / 111320.0 ) ) SELECT AVG(rating), COUNT(*), STDDEV(rating) as std FROM restaurants;`;
    const { rows } = await this.client.query(query);
    if (rows.length === 0) throw new Error("No data found");
    return rows[0];
  }

  async create(data: any): Promise<any> {
    const file = data;
    if (!file) {
      throw new Error("File not found");
    }
    const results: any[] = [];

    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    bufferStream
      .pipe(parse({ delimiter: ",", columns: true }))
      .on("data", async (row) => {
        results.push(row);
      })
      .on("end", async () => {
        results.forEach(async (row) => {
          const query = `INSERT INTO test.restaurants (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
          const values = [
            row.id,
            parseInt(row.rating),
            row.name,
            row.site,
            row.email,
            row.phone,
            row.street,
            row.city,
            row.state,
            parseFloat(row.lat),
            parseFloat(row.lng),
          ];
          await this.client.query(query, values);
        });
      });

    return results;
  }

  async findAll(limit: number, offset: number): Promise<Restaurant[]> {
    const query = `SELECT * FROM test.restaurants LIMIT $1 OFFSET $2`;
    const values = [limit, offset];
    const { rows } = await this.client.query(query, values);
    if (rows.length === 0) throw new Error("No data found");
    return rows;
  }

  async findById(id: string): Promise<Restaurant> {
    const query = `SELECT * FROM test.restaurants WHERE id = $1`;
    const values = [id];
    const { rows } = await this.client.query(query, values);
    if (rows.length === 0) throw new Error("No data found");
    return rows[0];
  }

  async update(id: string, data: Restaurant): Promise<boolean> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const updateParams = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const { rowCount } = await this.client.query(
      `UPDATE test.restaurants SET ${updateParams} WHERE id = $${
        keys.length + 1
      }`,
      [...values, id]
    );
    if (rowCount === 0) throw new Error("No data found");
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM test.restaurants WHERE id = $1`;
    const values = [id];
    const { rowCount } = await this.client.query(query, values);
    if (rowCount === 0) throw new Error("No data found");
    return true;
  }
}

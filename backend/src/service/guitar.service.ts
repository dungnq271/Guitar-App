import { Request } from 'express';
// import { Repository } from "typeorm";
import guitars from '../example-guitars';

export class GuitarService {
  // TODO: add guitar repository
  // constructor(private readonly guitarRepository: Repository<Guitar>) {}

  async listGuitars(req: Request) {
    return {
      success: true,
      data: guitars.map((guitar) => ({
        ...guitar,
        image: `${req.protocol}://${req.get('host')}${guitar.image}`
      }))
    };
  }

  async getGuitar(req: Request) {
    // @ts-ignore
    const guitar = guitars[req.guitarIndex];
    return { success: true, data: guitar };
  }

  async updateGuitar(req: Request) {
    // @ts-ignore
    const index = req.guitarIndex;
    let guitar = guitars[index];
    guitar = { ...guitar, ...req.body };
    guitars[index] = guitar;
    return { success: true, message: 'updated', data: guitar };
  }

  async deleteGuitar(req: Request) {
    // @ts-ignore
    const guitarIndex = guitars[req.guitarIndex];
    guitars.splice(+guitarIndex, 1);
    return { success: true, message: 'deleted' };
  }
}

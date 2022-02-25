import { CarCategoryModel } from '../models/CarCategoryModel';

/**
 * DTO - Data Transfer Object
 * 
 * Usefull to create an object which will be responsable to transfer data between classes.
 * From now on, everytime that we want to create an object and receive it from a router, 
 * the DTO concept will be used. 
*/
interface ICreateCarCategoryDto {
  name: string;
  description: string;
}

interface ICarCategoriesRepository {
  create({ name, description }: ICreateCarCategoryDto);
  list(): CarCategoryModel[];
  findByName(name: string): CarCategoryModel;
}

export { ICreateCarCategoryDto, ICarCategoriesRepository }
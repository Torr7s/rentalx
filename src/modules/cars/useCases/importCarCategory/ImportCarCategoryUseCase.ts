import fs from 'fs';
import csvParse from 'csv-parse';

import { ICarCategoriesRepository } from '../../repositories/CarCategoriesInterface';

interface IImportCarCategory {
  name: string;
  description: string;
}

class ImportCarCategoryUseCase {
  constructor(
    private _carCategoriesRepository: ICarCategoriesRepository
  ) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCarCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCarCategory[] = []
      const stream = fs.createReadStream(file.path)

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line

          categories.push({
            name,
            description
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)

          resolve(categories)
        })
        .on('error', (err: Error) => reject(err))
    })
  }

  async perform(file: Express.Multer.File): Promise<void> {
    const categories: IImportCarCategory[] = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category

      const categoryData = this._carCategoriesRepository.findByName(name)

      if (!categoryData) {
        this._carCategoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCarCategoryUseCase }
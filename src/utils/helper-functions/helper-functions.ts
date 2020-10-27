import { SchematicsException } from "@angular-devkit/schematics";


export interface RegularSchema { name: string, path: string }



export function validateRegularSchema(options: RegularSchema) {
  console.log(`Validating options`, options)
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }

  if (!options.path) {
    throw new SchematicsException('Option (path) is required.');
  }
}
import { RegularSchema } from '../utils/helper-functions/helper-functions';
/**
 * @description         The Schema for creating a new module
 * @param path          The path to place the result of this schematic
 * @param project       The name of the project
 * @param name          The name of new module this schematic is creating
 * @param dataService   The name of the data service to provide this module with data (exclude 'data' and 'service' in the name)
*/

export interface LazyModuleOptions extends RegularSchema{ 
  name: string;
  path: string; 
  project?: string;
  dataService?: string;
  isMqtt?: boolean;
  /* Module related */
  module?: string;
}
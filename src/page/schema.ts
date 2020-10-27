/**
 * @description       The Schema for creating a new page
 * @param path        The path to place the result of this schematic (optional - by default pwd)
 * @param project     The name of the project
 * @param name        The name of new page this schematic is creating
 * @param pageType    The type of page (Table/Form)
 * @param module      The name of the module that this page is associated with. 
 * @param export      Weather the module should be exported or not 
  */

export interface PageSchema { 
  path?: string; 
  name: string;
  project?: string;
  pageType: "table" | "filter-table" | "form";
  dataService: string
  /* Module related */
  module?: string;
  export?: boolean
}

import {
  apply,
  // externalSchematic,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
  chain,
  SchematicsException,
  move
} from '@angular-devkit/schematics';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from 'path';
import { LazyModuleSchema } from './schema';
import { experimental } from '@angular-devkit/core';
// import { getWorkspace } from '@schematics/angular/utility/config';
// import { Path } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name'
import { validateRegularSchema } from '../helper-functions/helper-functions';
// import { findModule } from '@schematics/angular/utility/find-module';
// import { getWorkspace } from '@schematics/angular/utility/workspace';

const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function lazyModule(options: LazyModuleSchema): Rule {

  validateRegularSchema(options)

  /* Correctly format the options path */
  options.path = options.path ? normalize(options.path) : options.path;


  return (tree: Tree, context: SchematicContext) => {

 
    console.log(`The options are`, options);
 
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }
    
    // convert workspace to string
    const workspaceConfigContent = workspaceConfigBuffer.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceConfigContent);
    if (!options.project) {
      options.project = workspace.defaultProject as string;
    }

    const projectName = options.project as string;
    console.log('The projectName is', projectName);
    
    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    const path  = `${project.sourceRoot}/${projectType}`;
    console.log('path', path);
    
    // const parsed = parseName(path, options.name)
    const parsed = parseName(path, `modules/lazy-loaded-modules/${dasherize(options.name)}/components/pages/${options.name}`)
    console.log('parsed', parsed);
    

    options.name = parsed.name;

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    /* The path where to move the file templates to */
    const movePath = `${(options.path || '/src/app')}/${options.name}`;
    console.log(`The move path is`, movePath)

    const templateSource =
    /* The apply function does the magic */
    apply(
      /* The source of the template files */
      url('./files'),
      [
        /* Create a rule from a template */
        template({
          /* Pass in the utils for manipulating the strings in the template */
          ...stringUtils,
          /* Pass in the options to use as values in the template */
          ...options,
          /* If a name was not provided for the data service then assign the module name */
          dataService: options.dataService || options.name,
          /* If a isMqtt was not provided for the data service then assign false */
          isMqtt: options.isMqtt || false
        }),
        /* Move the files to the destination */
        move(movePath)
      ])

    /* Chain multiple rules together in sequence and the execute them to return a new tree */
    tree = chain([

      /* Create a new component with the default Angular schematic */
      // externalSchematic('@schematics/angular', 'module', {
      //   name: parsed.name,
      //   route: parsed.name,
      //   module: 'app',
      //   routing: true,
      // }),

      mergeWith(templateSource)

    ])(tree, context) as Tree


    return tree;
  };
}


export function getContainingFolderPath(path: string, folder: string) {
  return path.endsWith(folder) ? path : `${path}${folder}`;
}
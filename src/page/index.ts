// import { apply, branchAndMerge, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
// import { apply, branchAndMerge, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
// import { apply, externalSchematic, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { apply, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from 'path';
import { PageSchema } from './schema';
const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function page(options: PageSchema): Rule {

  /* Correctly format the options path */
  options.path = options.path ? normalize(options.path) : options.path;

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
            ...options
        }),
        /* Move the files to the destination */
        // move(`/src/app/${dasherize(options.name)}`)
      ])
  
  /* Create a new component with the default Angular schematic */
//       externalSchematic('@schematics/angular', 'material-shell', {
//         project: options.project
// }) 
  
  return (tree: Tree, _context: SchematicContext) => {
    tree = mergeWith(templateSource)(tree, _context) as Tree
    return tree;
  };  
  
  
  
  /* Chain multiple rules into one in an order */
  // return chain([
  //   branchAndMerge(
  //     chain([
  //       /* Merge the input tree with a source */
  //       mergeWith(templateSource)
  //     ])
  //   )
  // ])
  

  // return (tree: Tree, _context: SchematicContext) => {

  //   tree.create('store/action.ts', 'store/action.ts');
  //   tree.create('store/state.ts', 'store/state.ts');
  //   tree.create('store/selectors.ts', 'store/selectors.ts');
  //   tree.create('store/effects.ts', 'store/effects.ts');
  //   tree.create('store/facade.ts', 'store/facade.ts');
  //   tree.create('store/reducer.ts', 'store/reducer.ts');

  //   tree.getDir(options.sourceDir)
  //     .visit(filepath => { 
  //       /* Return if is not a TS file */
  //       if (!filepath.endsWith('.ts')) {
  //           return
  //       } else {
  //         const content = tree.read(filepath)

  //         if (!content) { return }
  //         if (content.indexOf(filepath)) { 
  //           tree.overwrite(filepath, `Author: Andrew Johnson \nDate: ${new Date().toISOString()}\n` + content);
  //         } 
  //       }
  //     })

   


  //   return tree;
  // };
}

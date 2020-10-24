import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function page(_options: any): Rule {


  return (tree: Tree, _context: SchematicContext) => {

    tree.create('store/action.ts', 'store/action.ts');
    tree.create('store/state.ts', 'store/state.ts');
    tree.create('store/selectors.ts', 'store/selectors.ts');
    tree.create('store/effects.ts', 'store/effects.ts');
    tree.create('store/facade.ts', 'store/facade.ts');
    tree.create('store/reducer.ts', 'store/reducer.ts');


    return tree;
  };
}

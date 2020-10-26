// import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
// import { SchematicTestRunner} from '@angular-devkit/schematics/testing';
import * as path from 'path';

// import {InvalidInputOptions} from '@angular-devkit/schematics/tools/schema-option-transform';


import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';
import { PageSchema } from './schema';


/* Get hold of the collection */
const collectionPath = path.join(__dirname, '../collection.json');

/* Declare interfaces for the workspace */
const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0',
};

const appOptions: ApplicationOptions = {
  name: 'bar',
  inlineStyle: false,
  inlineTemplate: false,
  routing: false,
  style: Style.Css as Style,
  skipTests: false,
  skipPackageJson: false,
};

const goodSchema: PageSchema = {
  moduleName: 'good schema module',
  name: 'good schema name',
  pageType: 'filter-table',
  dataService: 'Mock data service',
  path: "/",
}



describe('page', async () => {

  /* The main app tree */
  let appTree: UnitTestTree;

  beforeEach(async () => {

    const testRunner = new SchematicTestRunner(
      'schematics', collectionPath);

    appTree = await testRunner.runExternalSchematicAsync(
      '@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await testRunner. runExternalSchematicAsync(
      '@schematics/angular', 'application', appOptions, appTree).toPromise();
  });


  // it('fails with missing tree', () => {
  //   expect(() =>
  //     testRunner.runSchematicAsync(
  //       'page',
  //       { name: "nameValue", path: 'pathValue'},
  //       Tree.empty()
  //     )).toThrow();
  // });


  //   it('fails with missing params', () => {
  //     expect(() =>
  //       testRunner.runSchematicAsync(
  //         'page',
  //         {},
  //         appTree
  //       )).toThrowError(InvalidInputOptions, 
  //     'Schematic input does not validate against the Schema: {"spec":true,"flat":false}\n'+
  //     'Errors:\n\n'+
  //     '  Data path "" should have required property \'name\'.');
  // });



  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync(
      'page',
      goodSchema,
      appTree
    ).toPromise();

    expect(tree.files).toEqual([
      '/README.md',
      '/.editorconfig',
      '/.gitignore',
      '/angular.json',
      '/package.json',
      '/tsconfig.json',
      '/tslint.json',
      '/projects/bar/.browserslistrc',
      '/projects/bar/karma.conf.js',
      '/projects/bar/tsconfig.app.json',
       '/projects/bar/tsconfig.spec.json',
       '/projects/bar/tslint.json',
       '/projects/bar/src/favicon.ico',
       '/projects/bar/src/index.html',
       '/projects/bar/src/main.ts',
       '/projects/bar/src/polyfills.ts',
       '/projects/bar/src/styles.css',
       '/projects/bar/src/test.ts',
       '/projects/bar/src/assets/.gitkeep',
       '/projects/bar/src/environments/environment.prod.ts',
       '/projects/bar/src/environments/environment.ts',
       '/projects/bar/src/app/app.module.ts',
       '/projects/bar/src/app/app.component.css',
       '/projects/bar/src/app/app.component.html',
       '/projects/bar/src/app/app.component.spec.ts',
       '/projects/bar/src/app/app.component.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good-schema-name/good-schema-name.component.css',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good-schema-name/good-schema-name.component.html',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good-schema-name/good-schema-name.component.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.actions.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.effects.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.facade.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.reducer.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.selectors.ts',
       '/projects/bar/src/app/modules/lazy-loaded-modules/good-schema-module/components/pages/good schema name/store/good-schema-name.state.ts',
       '/projects/bar/e2e/protractor.conf.js',
       '/projects/bar/e2e/tsconfig.json',
       '/projects/bar/e2e/src/app.e2e-spec.ts',
       '/projects/bar/e2e/src/app.po.ts'
    ]);
  });


  //   it('works', async () => {

  //     const tree = await testRunner.runSchematicAsync('page', {
  //         name: "test"
  //     }, appTree).toPromise();

  //     //[see assertions below]
  //       expect(tree.files).toEqual([
  //         "/README.md",
  //         "/angular.json",
  //         "/package.json",
  //         "/tsconfig.json",
  //         "/tslint.json",
  //         "/.editorconfig",
  //         "/.gitignore",
  //         "/projects/bar/src/app/test/test.spec.ts",
  //         "/projects/bar/src/app/test/test.ts",
  //     ]);
  //   });

});



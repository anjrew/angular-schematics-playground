import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

/* Get hold of the collection */
const collectionPath = path.join(__dirname, '../collection.json');


describe('page', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync(
      'page',
      {},
      Tree.empty()).toPromise();

    expect(tree.files).toEqual([]);
  });
});

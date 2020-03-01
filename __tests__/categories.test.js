require('@code-fellows/supergoose');

const Categories = require('../models/categories.js');

describe('categories model', () => {
  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  it('can create a new entry', async () => {
    const newCategory = {
      name: 'Fruit',
      display_name: 'banana',
      description: 'a yellow piece of fruit',
    };
    const record = await categories.create(newCategory);

    Object.keys(newCategory).forEach(key => {
      expect(newCategory[key]).toEqual(record[key]);
    });
  });


  it('can read a single entry', async () => {
    const newCategory = {
      name: 'Fruit',
      display_name: 'banana',
      description: 'a yellow piece of fruit',
    };
    const categoryCreated = await categories.create(newCategory);
    const readEntry = await categories.read(categoryCreated._id);
    Object.keys(newCategory).forEach(key => {
      expect(newCategory[key]).toEqual(readEntry[0][key]);
    });
  });


  it('can read all entries', async () => {
    const newCategory = {
      name: 'Fruit',
      display_name: 'banana',
      description: 'a yellow piece of fruit',
    };
    const secondCategory = {
      name: 'Vegetable',
      display_name: 'cucumber',
      description: 'it\'s green!',
    };
    await categories.create(newCategory);
    await categories.create(secondCategory);
    const readEntries = await categories.read();
    expect(readEntries.length > 2).toBeTruthy();
  });

  it('can delete an entry', async () => {
    const newCategory = {
      name: 'Fruit',
      display_name: 'blueberry',
      description: 'it\'s blue!',
    };
    const categoryCreated = await categories.create(newCategory);

    await categories.delete(categoryCreated._id);
    const readDeletedEntry = await categories.read(categoryCreated._id);

    expect(readDeletedEntry).toEqual([]);

  });

  it('can update an entry', async () => {
    const newCategory = {
      name: 'Fruit',
      display_name: 'blueberry',
      description: 'it\'s blue!',
    };

    const updatedInfo = {
      name: 'Fruit',
      display_name: 'mango',
      description: 'so delicious',
    };

    const categoryCreated = await categories.create(newCategory);
    const updatedCategory = await categories.update(categoryCreated._id, updatedInfo);
    Object.keys(updatedInfo).forEach(key => {
      expect(updatedInfo[key]).toEqual(updatedCategory[key]);
    });
  });
});




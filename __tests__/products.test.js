require('@code-fellows/supergoose');

const Products = require('../models/products.js');


describe('categories model', () => {
  let products;

  beforeEach(() => {
    products = new Products();
  });

  it('can create a new entry', async () => {
    const newProduct = {
      category: 'clothing',
      name: 'shoes',
      display_name: 'nikes',
      description: 'just do it',
    };
    const record = await products.create(newProduct);

    Object.keys(newProduct).forEach(key => {
      expect(newProduct[key]).toEqual(record[key]);
    });
  });


  it('can read a single entry', async () => {
    const newProduct = {
      category: 'clothing',
      name: 'shoes',
      display_name: 'nikes',
      description: 'just do it',
    };
    const productCreated = await products.create(newProduct);
    const readEntry = await products.read(productCreated._id);
    Object.keys(newProduct).forEach(key => {
      expect(newProduct[key]).toEqual(readEntry[0][key]);
    });
  });


  it('can read all entries', async () => {
    const newProduct = {
      category: 'clothing',
      name: 'shoes',
      display_name: 'nikes',
      description: 'just do it',
    };
    const secondProduct = {
      category: 'clothing',
      name: 'shirt',
      display_name: 'shirts_are_cool',
      description: 'shirts',
    };
    await products.create(newProduct);
    await products.create(secondProduct);
    const readEntries = await products.read();
    expect(readEntries.length > 2).toBeTruthy();
  });

  it('can delete an entry', async () => {
    const newProduct = {
      category: 'clothing',
      name: 'shoes',
      display_name: 'nikes',
      description: 'just do it',
    };
    const productCreated = await products.create(newProduct);

    await products.delete(productCreated._id);
    const readDeletedEntry = await products.read(productCreated._id);

    expect(readDeletedEntry).toEqual([]);

  });

  it('can update an entry', async () => {
    const newProduct = {
      category: 'clothing',
      name: 'shoes',
      display_name: 'nikes',
      description: 'just do it',
    };

    const updatedInfo = {
      category: 'clothing',
      name: 'shirt',
      display_name: 'shirts_are_cool',
      description: 'shirts',
    };

    const categoryCreated = await products.create(newProduct);
    const updatedProduct = await products.update(categoryCreated._id, updatedInfo);
    Object.keys(updatedInfo).forEach(key => {
      expect(updatedInfo[key]).toEqual(updatedProduct[key]);
    });
  });
});

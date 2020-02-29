function listAll(type) {
  return async (req, res, next) => {
    try {
      const listOfAll = await type.read();
      res.status(200).json({
        count: listOfAll.length,
        result: listOfAll,
      });
    } catch (err) {
      next(err);
    }
  };
}


function listOne(type) {

  return async (req, res, next) => {
    try {
      const readType = await type.read(req.params.id);
      if (readType.length === 0) {
        res.status(404);
      } else {
        res.status(200).json(readType[0]);
      }
    } catch (err) {
      next(err);
    }
  };

}

function updateItems(type) {
  return async (req, res, next) => {
    try {
      const updated = await type.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };
}

function createItems(type) {
  return async (req, res, next) => {
    try {
      const created = await type.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };
}

function deleteItems(type) {
  return async (req, res, next) => {
    try {
      await type.delete(req.params.id);
      res.status(204).json(undefined);
    } catch (err) {
      next(err);
    }

  };

}

module.exports = { listAll, listOne, updateItems, createItems, deleteItems };
//Get all employees

function listAllEmployees(req, res) {
  const { collection } = req.app.locals;
  collection.find({}).toArray()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error));
}

function listOneEmployee(req, res) {
  const { collection } = req.app.locals;
  const { ObjectID } = req;
  collection.findOne({ _id: ObjectID })
    .then(response => {
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(200).json(`Employee with ${ObjectID} cannot be found.`);
      }
    })
    .catch(error => res.status(500).json(error));
}

function createEmployee(req, res) {
  if (req.body) {
    const { collection } = req.app.locals;
    const employee = req.body;
    collection.insertOne(employee).then(response => {
      return res.status(201).json(`Inserted: ${response.insertedId}`);
    }).catch(error => res.status(500).json(error));
  } else {
    return res.status(400).json('Please specify some data');
  }
}

function updateEmployee(req, res) {
  const employee = req.body;
  const { ObjectID } = req;
  if (employee && ObjectID) {
    const { collection } = req.app.locals;
    collection.updateOne({ _id: ObjectID }, { $set: employee })
      .then(response => res.status(204).json())
      .catch(error => res.status(500).json(error));
  } else {
    return res.status(400).json('Please specify data and an ObjectID');
  }
}

function deleteEmployee(req, res) {
  const { collection } = req.app.locals;
  const { ObjectID } = req;
  collection.deleteOne({ _id: ObjectID })
    .then(response => res.status(200).json(`Deleted ${ObjectID}.`))
    .catch(error => res.status(500).json(error));
}

module.exports = {
  listAllEmployees,
  listOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
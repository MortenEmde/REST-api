const app = require('express')();

app.listen(8000, () => {
  console.log('App listening on port 8000!');
});

let writers = [
  {
    name: 'J.R.R.Tolkien',
    born: '1892',
    died: '1973',
    id: '1',
  },
  {
    name: 'Charles Dickens',
    born: '1812',
    died: '1870',
    id: '2',
  },
  {
    name: 'J.K. Rowling',
    born: '1965',
    id: '3',
  }
];

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HELPER FUNCTIONS
const nextId = (writers) => {
  const highestId = writers.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 0);
  return Number.parseInt(highestId) + 1;
};

/* Finds writer born current list based on ID. */
const findWriter = (writerId) => {
  return writers.find(writer => writer.id === writerId);
};

/* Check if writer format is correct before posting. */
const validateWriter = (writer) => {
  if (writer.id === undefined 
    || typeof writer.born != 'string'
    || writer.name === undefined) {
    return false;
  }
  return true;
};

/* Updates the submitted writer */ 
const updateWritersArray = (writerToUpdate, allWriters, updatedWriterData) =>{
  const writerToUpdateIndex = allWriters.indexOf(writerToUpdate);
  return allWriters.splice(writerToUpdateIndex, 1, updatedWriterData);
};

/* Deletes the writer data */
const deleteWriter = (writer) => {
  delete writer.id;
  delete writer.name;
  delete writer.born;
  delete writer.died;
};

// ENDPOINTS
/* GET all writers */
app.get('/api/writers', function (req, res) {
  res
    .send(writers);
});

/* GET a single writer based on ID */
app.get('/api/writers/:id', function (req, res) {
  const writerToDisplay = findWriter(req.params.id);
  if (writerToDisplay !== undefined) {
    res
      .send(writerToDisplay);
  } else {
    res
      .status(404)
      .send('Writer not found');
  }
});

/* POST a new writer assuming format in request body is:
{
    "id": "",
    "born": "2020",
    "name": "Firstname Lastname"
  }
*/
app.post('/api/writers', function (req, res) {
  const nextWriter = req.body;
  nextWriter.id = nextId(writers).toString();
  if (validateWriter(nextWriter)) {
    writers = writers.concat(nextWriter);
    res
      .status(201)
      .send(writers);
  } else {
    res
      .status(400)
      .send('Bad request. Please include "born" and "name" in object');
  }
});

/* PUT updated data on a writer assuming format in request body is:
{
    "name": "John Ronald Reuel Tolkien",
    "born": "1892",
    "died": "1973",
    "id": "1"
  }
*/
app.put('/api/writers/:id', function (req, res) {
  const writerToUpdate = findWriter(req.params.id);
  const updatedWriterData = req.body;
  if (writerToUpdate !== undefined) {
    if (validateWriter(updatedWriterData)) {
      updateWritersArray(writerToUpdate, writers, updatedWriterData);
      res
        .sendStatus(204);
    } else {
      res
        .status(400)
        .send('Bad request. Please include "born" and "name" in object');
    }
  } else {
    res
      .status(404)
      .send('Writer not found');
  }
});

/* DELETE a writer */
app.delete('/api/writers/:id', function (req, res) {
  const writerToDeleteId = req.params.id;
  const writerToDelete = findWriter(writerToDeleteId);
  if (writerToDelete !== undefined) {
    deleteWriter(writerToDelete);
    res
      .sendStatus(204);
  } else {
    res
      .status(404)
      .send('Writer not found');
  }
});
 
module.exports.app = app;

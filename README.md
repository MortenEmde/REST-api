# REST api

In this project I build a REST api, using the Express framework.

I have added a resource of famous writers that are located in a local array called "writers".

Here is one writer represented as JSON:

```js
{
  id: '1',
  born: '1892',
  died: '1973',
  name: 'J.R.R.Tolkien'
}
```

For the data of each writer the following rules apply:
* `id` will be automatically calculated for new writers but is required when updating or deleteing a writer.
* `name` is required
* `born` is required and should be the year as a YYYY-string
* `died` is not required as some writers are still alive and kicking.

# How to use

To try out this REST api you will need to clone the repo, install dependencies and start the server in your terminal with the command: 
```js
npm start
```
From there you should see:
```js
App listening on port 8000!
```
You can then hit the api on http://localhost:8000/api/writers
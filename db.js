const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.setState({
  books: [
    {
      id: 'uRYA6dl2UY.',
      title: 'My first book',
      description: 'This is the default book.',
      lastModifiedAt: 1618323218158,
    },
  ],
}).write()

import express from 'express'
import { engine } from 'express-handlebars'

// Import database functions
import { getUsers, getUser, createUser } from './database.js'

// Philippine Standard Geographic Code
import { PSGCResource } from 'psgc-areas'

/* ---------------------------------------
    EXPRESS
--------------------------------------- */
const app = express()

// Use JSON for data format
app.use(express.json())

// Use the public folder for assets
app.use(express.static('public'))

/* ---------------------------------------
    HANDLEBARS
--------------------------------------- */
app.engine('hbs', engine({
  extname: ".hbs"
}))
app.set('view engine', 'hbs')
app.set('views', 'views') // set 'views' folder as HBS view directory

/* ---------------------------------------
    ROUTES
--------------------------------------- */
app.get('/', (req, res) => {
  res.render('home', {
    layout: 'public',
    title: 'Home | GreenCycle'
  })
})

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login | GreenCycle'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'public',
    title: 'Contact | GreenCycle'
  })
})

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register | GreenCycle'
  })
})

// Define route to render Handlebars template
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'public',
    title: 'About | GreenCycle',
    companyName: 'GreenCycle Consultancy Agency',
    year: new Date().getFullYear()
  });
});

// User routes
// Get all users
app.get('/dashboard/users', async (req, res) => {
  const users = await getUsers()
  res.render('users', {
    title: 'GC Dashboard | Users',
    layout: 'dashboard'
  })
  //res.send(users)
})

app.get('/dashboard/roles', async (req, res) => {
  //const users = await getUsers()
  res.render('dashboard/roles', {
    title: 'GC Dashboard | Roles',
    layout: 'dashboard'
  })
  //res.send(users)
})

// Main dashboard (for logged in users)
app.get('/dashboard/main', async (req, res) => {
  // Get all location names
  //const locations = await PSGCResource.getAll()

  // Render site
  res.render('dashboard/waste-comp-main', {
    title: 'GC Dashboard | Main',
    layout: 'dashboard',
    //locations
  })
})

app.get('/locations', async (req, res) => {
  // Get all location names
  const locations = await PSGCResource.getAll()
  res.send(locations)
})

// Get one user from ID
app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

// Create user
app.post('/users', async (req, res) => {
  const { roleId, lastName, firstName, email, password } = req.body
  const user = await createUser(roleId, lastName, firstName, email, password)
  res.send(user)
})

/* ---------------------------------------
    APP LISTENER
--------------------------------------- */
const port = 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

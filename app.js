const path = require('path')
const express = require('express')
const app = express()
const port = 3000

// node-fetch is used to make network requests to the Prismic Rest API. 
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const fetch = require('node-fetch')
const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')

require('dotenv').config();

// Prismic connection information
const repoName = process.env.PRISMIC_ENDPOINT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

// The `routes` property is your Route Resolver. It defines how you will 
// structure URLs in your project. Update the types to match the Custom 
// Types in your project, and edit the paths to match the routing in your 
// project.
const routes = [
  {
    type: 'home',
    path: '/',
  },
]

const client = Prismic.createClient(repoName, { 
  fetch, 
  accessToken,
  routes,
})

// Set pug as templating engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    PrismicH,
  }
  next()
})

// Query for the root path.
app.get('/', async (req, res) => {
  // Here we are retrieving the first document from your API endpoint
  const document = await client.getSingle('home')
  res.render('pages/home', { document: document })

  console.log(document)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});











// // Link Resolver
// const HandleLinkResolver = (doc) => {
//   // Define the url depending on the document type
//   //   if (doc.type === 'page') {
//   //     return '/page/' + doc.uid;
//   //   } else if (doc.type === 'blog_post') {
//   //     return '/blog/' + doc.uid;
//   //   }

//   // Default to homepage
//   return '/';
// };

// // Middleware to inject prismic context
// app.use((req, res, next) => {
//   res.locals.ctx = {
//     endpoint: process.env.PRISMIC_ENDPOINT,
//     linkResolver: HandleLinkResolver,
//   };
//   res.locals.PrismicH = PrismicH;

//   next();
// });


// // console.log(process.env.PRISMIC_ENDPOINT, process.env.PRISMIC_CLIENT_ID)

// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views'))
// app.locals.basedir = app.get('views');

// const handleRequest = async (api) => {
//   const [meta, home, about, { results: collections }] = await Promise.all([
//     api.getSingle('meta'),
//     api.getSingle('home'),
//     api.getSingle('about'),
//     api.query(Prismic.predicate.at('document.type', 'collection'), {
//       fetchLinks: 'product.image',
//     }),
//   ]);
// }

//   app.get('/', async (req, res) => {
//     const api = await initApi(req);
//     const defaults = await handleRequest(api);

//     console.log(defaults)
  
//     res.render('pages/home', {
//       ...defaults,
//     });
//   });

// app.get('/about', async (req, res) => {
//   res.render('pages/about')
// })

// app.get('/collections', async (req, res) => {
//   res.render('pages/collections')
// })

// app.get('/detail/:id', async (req, res) => {
//   res.render('pages/detail')
// })



import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ClientStack User Auth Service',
			description: "API endpoints for user authentication and authorization through ClientStack",
			contact: {
				name: "Jared Reyes",
				email: "jaredreyes039@gmail.com",
				url: "https://jaydevdesign.org"
			},
			version: '1.0.0',
		},
		servers: [
			{
				url: "http://localhost:5000/",
				description: "Local server"
			},
			{
				url: process.env.EC_INSTANCE | "",
				description: "Live server"
			},
		]
	},
	// looks for configuration in specified directories
	apis: ['./routes/*.route.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
	// Swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	// Documentation in JSON format
	app.get('/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})
}
export default swaggerDocs

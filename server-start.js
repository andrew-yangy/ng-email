process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.SERVER_PORT = process.env.SERVER_PORT || '4000'
process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
require('./server');
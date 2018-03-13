process.env.NODE_ENV= process.env.NODE_ENV || 'development'
process.env.SERVER_PORT= process.env.SERVER_PORT || '4000'
process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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'
require('./server');
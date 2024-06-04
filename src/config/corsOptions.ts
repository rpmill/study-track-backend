const allowedOrigins = [
    'http://localhost:3000',
    'https://www.studytrack.academy',
    'https://studytrack.academy'
]

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
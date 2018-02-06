'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tempTestDb';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-blog-app';
exports.PORT = process.env.PORT || 8080;
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    'text-blue-700', // Explicitly include dynamically applied classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

# Webpack v4 Config

Input directory: `src`  
Common config file: `webpack/webpack.config.common.js`  
Settings: `webpack/config.js` 

### Modes

#### Development

Command: `npm run dev`  
Config file: `webpack/webpack.config.dev.js`  
Output directory: `dist`  

#### Development with webpack-dev-server

On port 3000 (`http://localhost:3000/`)   
Command: `npm start`  
Output directory: none  

#### Production

Command: `npm run build`  
Config file: `webpack/webpack.config.prod.js`  
Output directory: `dist`  

#### Statistics output

Command: `npm run stats`  
Output directory: `dist`  
Statistics output: `stats.json`

### License
This project is available under the [MIT](./license) license. 

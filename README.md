#  edcradix

A Omnia Raix Example Application for EDC 2018
- Single nodejs app requesting a famous quote from "Andrux Famous Quotes"
- Multistage docker build with test

### Local development and test
- npm start
- npm test

### Environment variables
- PORT
- QUOTEKEY

### To build, test and bake images 
`docker build -t <imagename> .`

### To run the app do  
`docker run -p 3000:3000 --env QUOTEKEY=<> <imagename>`  

The QUOTEKEY is the apikey from https://market.mashape.com/andruxnet/random-famous-quotes


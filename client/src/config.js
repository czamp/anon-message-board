let URL;

if (process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:3000'
}
if (process.env.NODE_ENV === 'production') {
  URL = 'https://flashy-anaconda.glitch.me'
}


export default URL

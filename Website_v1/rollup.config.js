// add this import at the top:
import preprocess from 'svelte-preprocess';


/* ... */


// and add preprocess as a plugin:
export default {
  /* ... */
  plugins: [
    svelte({
      /* ... */
      preprocess: preprocess(),

      onwarn: (warning, handler) => {
        const {code, frame} = warning;
        if(code === "css-unused-selector")
          return
        handler(warning);
      }
    })],
}

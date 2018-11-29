import React from 'react';
import Highlight from 'react-highlight.js';

const EmbedCode = (props) => {
  let bodytag = '<body>';
  let code = `<iframe style="overflow:hidden; display:block; margin: auto;" \n    width="610" height="420" align="middle"\n    src="${props.url}" \n    frameborder="0" scrolling="no">\n</iframe>`;
  return (
    <div className="embed-code-div">
       <p className="embed-code-title">{`Embed Poll in your website. Copy this code within your ${bodytag} tags`}</p>
       <Highlight language={'html'}>
        {code}
      </Highlight>
    </div>
  );
};

export default EmbedCode;

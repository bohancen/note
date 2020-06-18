let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.url);
        node.setAttribute('original-width', value.height);
        node.setAttribute('original-height', value.height);
        return node;
    }

    static value(node) {
        return {
            alt: node.getAttribute('alt'),
            url: node.getAttribute('src'),
            width: node.getAttribute('original-width'),
            height: node.getAttribute('original-height')
        };
    }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

Quill.register(ImageBlot);

console.log(Quill)
var quill = new Quill('#bubble-container', {
    placeholder: 'Compose an epic...',
    theme: 'bubble'
});

console.log(quill)
btn01.onclick=()=>{
    quill.clipboard.dangerouslyPasteHTML('<img class="ccc" original-width="100" src="https://i0.hdslb.com/bfs/bigfun/3df9eec6f44fcd424928b3fc12ee27194fdb10a6.jpg@" alt="xxx"/>')
}

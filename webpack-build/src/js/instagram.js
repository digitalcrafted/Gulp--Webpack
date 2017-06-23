function Instagram(){
    const Minigram = require('Minigram');
    new Minigram('.gallery_items', {
        counter: 4,
        resolution: 'low',
        token: '5389616258.a8e083e.8d785edd52ce48bc95e9add918df3cf7',
        html: '<div class="column column-block"><div class="gallery-item"><a href="{url}" target="_blank"><img src="{image}" alt="{caption}"></a></div></div>'
    });
}
module.exports = Instagram;
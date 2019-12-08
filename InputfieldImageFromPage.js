var InputfieldImageFromPage = {
    init: function () {
        // console.log('init');
        var fields = document.querySelectorAll('.InputfieldImageFromPage');
        fields.forEach(field => {
            if(field.classList.contains('initialised')) return;
            InputfieldImageFromPage.initPickFile(field);
        });
    },
    initPickFile: function (field) {
        field.classList.add('initialised');
        var preview = field.querySelector('div.uk-panel img');
        var caption = field.querySelector('div.uk-panel .uk-thumbnail-caption');
        var remove = field.querySelector('div.uk-panel > span');
        var inputFilename = field.querySelector('input.imagefrompage_filename');
        var inputPageid = field.querySelector('input.imagefrompage_pageid');
        var files = field.querySelectorAll('.uk-thumbnav img');

        remove.addEventListener('click', function(e) {
            preview.setAttribute('src', preview.getAttribute('data-src'));
            caption.innerHTML = '';
            inputFilename.value = '';
            inputPageid.value = 0;
        });
        files.forEach(file => {
            file.addEventListener('click', function(){
                var src = file.getAttribute('src');
                var fileinfo = file.getAttribute('uk-tooltip');
                var filename = file.getAttribute('data-filename');
                var pageid = file.getAttribute('data-pageid');
                preview.setAttribute('src', src);
                inputFilename.value = filename;
                inputPageid.value = pageid;
                caption.innerHTML = fileinfo;
            })
        });
        
    }
}

document.addEventListener('DOMContentLoaded', InputfieldImageFromPage.init);

$(document).on('reloaded', '.InputfieldRepeaterItem', InputfieldImageFromPage.init);

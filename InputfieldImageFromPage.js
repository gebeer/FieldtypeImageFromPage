var InputfieldImageFromPage = {
    init: function () {
        var fields = document.querySelectorAll('.InputfieldImageFromPage');
        fields.forEach(field => {
            if (field.classList.contains('imagefrompage_initialised')) return;
            InputfieldImageFromPage.initPickFile(field);
        });
        InputfieldImageFromPage.initModalEditImages();
    },
    initPickFile: function (field) {
        if (!field.classList.contains('imagefrompage_initialised')) field.classList.add('imagefrompage_initialised');
        InputfieldImageFromPage.initGetThumbnails(field);
        var preview = field.querySelector('div.uk-panel img');
        var caption = field.querySelector('div.uk-panel .uk-thumbnail-caption');
        var remove = field.querySelector('div.uk-panel > span');
        var inputFilename = field.querySelector('input.imagefrompage_filename');
        var inputPageid = field.querySelector('input.imagefrompage_pageid');
        var inputValue = field.querySelector('input.imagefrompage_value');
        var files = field.querySelectorAll('.uk-thumbnav img');

        remove.addEventListener('click', function (e) {
            preview.setAttribute('src', preview.getAttribute('data-src'));
            caption.innerHTML = '';
            inputFilename.value = '';
            inputPageid.value = 0;
        });
        files.forEach(file => {
            file.addEventListener('click', function () {
                var src = file.getAttribute('src');
                var fileinfo = file.getAttribute('uk-tooltip');
                var filename = file.getAttribute('data-filename');
                var pageid = file.getAttribute('data-pageid');
                preview.setAttribute('src', src);
                inputFilename.value = filename;
                inputPageid.value = pageid;
                inputValue.value = JSON.stringify({"pageid": pageid, "filename": filename});
                caption.innerHTML = fileinfo;
            })
        });

    },
    initGetThumbnails: function (field) {
        var thumbHolders = field.querySelectorAll('.imagefrompage_thumbholder');

        thumbHolders.forEach(th => {
            var thumbnav = th.querySelector('.uk-thumbnav');
            var pageid = thumbnav.getAttribute('data-pageid');
            th.addEventListener('click', function (e) {
                var url = ProcessWire.config.InputfieldImageFromPage.url + '&pageid=' + pageid;
                var closed = th.classList.contains('InputfieldStateCollapsed');
                var empty = thumbnav.querySelector('li') === null;
                if (closed && empty) {
                    InputfieldImageFromPage.fetchAndInsertThumbnails(url, thumbnav, field);
                }
            })
        });
    },
    fetchAndInsertThumbnails: function(url, thumbnav, field) {
        thumbnav.innerHTML = '<div uk-spinner></div>';
        fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.text();
        })
        .then(function (html) {
            thumbnav.innerHTML = html;
            InputfieldImageFromPage.initPickFile(field);
        })
        .catch(function (error) {
            console.log('Looks like there was a problem: \n', error);
        });
    },
    initModalEditImages: function() {
        $(document).on("pw-modal-closed", function(event, ui) {
                if($(event.target).hasClass('imagefrompage_editimages')) {
                    var link = $(event.target);
                    var field = link.closest('.InputfieldImageFromPage')[0];
                    var thumbnav = link.siblings('.uk-thumbnav')[0];
                    var pageid = thumbnav.getAttribute('data-pageid');
                    var url = ProcessWire.config.InputfieldImageFromPage.url + '&pageid=' + pageid;
                    InputfieldImageFromPage.fetchAndInsertThumbnails(url, thumbnav, field);
                }
        })        
    }
}

document.addEventListener('DOMContentLoaded', InputfieldImageFromPage.init);

$(document).on('reloaded', '.InputfieldRepeaterItem', InputfieldImageFromPage.init);

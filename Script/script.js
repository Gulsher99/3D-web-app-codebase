

$('.form-select').change(function() {
    const modelName = $(this).find('option:selected').data('model-name');
    const transform = document.getElementById('modelTransform');
    
    if (modelName === 'cokebottle') {
        transform.setAttribute('translation', '0 -1.5 0');
        transform.setAttribute('scale', '0.6 0.6 0.6');
        transform.setAttribute('rotation', '0 1 0 1.5');
    } else {
        transform.setAttribute('translation', '0 1.5 0');
        transform.setAttribute('scale', '0.3 0.3 0.3');
        transform.setAttribute('rotation', '0 1 0 1.5');
    }
});


// This is the code that you will decomment.

$(document).ready(function() {
    $('.form-select').change(function() {
        var modelName = $(this).find('option:selected').data('model-name');

        $.ajax({
            url: 'data.php',
            type: 'POST',
            dataType: 'json',
            data: { model_name: modelName },
    success: function(response) {
    if (response.url && response.description) {
        console.log("Response: "+ response.url + ", " + response.description);
        loadX3DModel(response.url);

        $('#descriptionTextarea').val(response.description);
    } else {
        console.log("Response: "+ response.url + ", " + response.description);

        console.error('URL or description not found');
    }
},

        });
    });

    function loadX3DModel(modelUrl) {
        console.log("Response: "+ response.url + ", " + response.description);

        $('#model').attr('url', modelUrl);
    }
});


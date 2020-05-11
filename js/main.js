$(document).ready(function () {
    var input = $('.input');
    var btn = $('.button');

    var apiUrl = 'http://157.230.17.132:3024/todos';

    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    print(apiUrl, template);

    btn.click(function() { 
        var newTodo = input.val();
        $.ajax({
            url: apiUrl,
            method: 'POST',
            data: {
                text: newTodo,
            },
            success: function() {
                print(apiUrl, template);
            },
            error: function() {
                alert('errore durante l0inserimento del nuovo todo item')
            }
        }) //fine chiamata ajax
    }); //fine btn.click()

    $('body').on('click', '.delete', function() {
        var item = $(this).data('id');
        
        $.ajax({
            url: apiUrl + '/' + item,
            method: 'DELETE',
            success: function() {
                print(apiUrl, template);
            },
            error: function() {
                alert("Errore durante l'eliminazione di un todo item")
            }

        }); //fine chiamata ajax
        
    }); //fine click su span.delete
    



    


    
}); //<-- End ready

//Funzioni 
function print(apiUrl, template) {
    $('.lista').html('');

    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                var self = response[i];
                var content = {
                    testo: self.text,
                    id: self.id,
                }
                var output = template(content);
                $('.lista').append(output);
            }
            
        },
        error: function() {
            alert('ERRORE')
        }
    }); // Fine ajax
} //Fine funzione print
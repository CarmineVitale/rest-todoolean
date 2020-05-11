$(document).ready(function () {
    var input = $('.input');
    var btn = $('.button');

    var apiUrl = 'http://157.230.17.132:3024/todos';

    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);

    print(apiUrl, template);

    btn.click(function() { 
        creaTodo(apiUrl, template, input)
    }); //fine btn.click()
    input.keyup(function(e) {
        if (e.which == 13) {
            creaTodo(apiUrl, template, input)
        }
    });

    $('body').on('click', '.delete', function() {
        rimuoviTodo($(this), apiUrl,template);
    }); //fine click su span.delete

    $('body').on('click', '.modifica', function() {
        modificaTodo($(this),apiUrl, template )
        
    }); //fine click su modifica


}); //<-- End ready

//Funzioni 
//STampa i todo
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

//crea i todo
function creaTodo(apiUrl, template, input) {
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
    input.val('');
} //Fine funzione crea todo

//rimuovi todo
function rimuoviTodo( self , apiUrl,template) { 
    var item = self.data('id');
        
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
 } // fine funzione rimuovi todo

//Funzione per modifica todo
 function modificaTodo(self, apiUrl, template) {
    var valore = self.prev('.testo-modif').val();
    var item = self.next().data('id');
    
    $.ajax({
        url: apiUrl + '/' + item,
        method: 'PATCH',
        data: {
            text: valore,
        },
        success: function() {
            print(apiUrl, template);
        }
            
        ,
        error: function() {
            alert('ERRORE modifica')
        }
    }); // Fine ajax
 } //Fine funzione modifica Todo
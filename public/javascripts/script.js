$(function(){

    $('.toast').toast();

    $(document).on('click', '.editar_noticia', function(e){
        e.preventDefault();
        var url = $(this).attr("data-href");
        $.getJSON(url, function(noticia){
            $("#modalAdicionarNoticia").modal("show");
            // $("#modalAdicionarNoticia").find("#btnCadastrarNoticia").
            $('#formNoticia').attr('action', '/noticia/update/' + noticia._id);
            $("#modalAdicionarNoticia").find("input[name='titulo']").val(noticia.titulo);
            $("#modalAdicionarNoticia").find("textarea[name='corpo']").val(noticia.corpo);
            $("#modalAdicionarNoticia").find("input[name='data']").val(noticia.data_formatada);
        });
    });

    $(document).on('click', '#adicionar_noticia', function(e){
        $('#formNoticia').attr('action', '/noticia/insert/');
    });
    // $("#modalAdicionarJogo").on('hidden.bs.modal', function () {
    //     $('#formNoticia').attr('action', '/noticia/insert/');
    // });

    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });

    $('.status_noticia, .deletar_noticia').on('click', function(e){
        e.preventDefault();
        var url = $(this).attr("data-href");
        $("#botaoConfirmar").attr("href",url);
        $("#modalConfirmacao").modal("show");
    });

    $("#formNoticia, #formJogo").on('submit', function(e){
        var evento = e;
        evento.preventDefault();

        // var modal = $(this).parent().parent()
        $("#modalConfirmacaoInsert").modal("show");
        $("#botaoConfirmarInsert").click(function(){
            evento.currentTarget.submit();
        });
    });
    
});
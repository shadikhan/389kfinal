
search();
$("#matches").hide();

function search() {
    $("#search-bar").keyup(function(e) {
        let input = $(this).val();
        input = String(input).toLowerCase();
        input = input.replace(/ +(?= )/g,'');

        $(".col-xs-auto").each(function(){
            let name = $(this).attr('id');
            name = String(name).toLowerCase();
            name = name.replace(/ +(?= )/g,'');
            if (!name.startsWith(input))
                $(this).hide("slow", "linear");
            else
                $(this).show("slow", "linear");
        });

        if ($(".col-xs-auto:visible").length === 0)
            $("#matches").show();
        else
            $("#matches").hide();
    })
}

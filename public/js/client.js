
search();
$("#matches").hide();

function search() {
    $("#search-bar").keyup(function(e) {
        let input = $(this).val();
        input = String(input).toLowerCase();
        input = input.replace(/ +(?= )/g,'');

        $(".col-md-6").each(function(){
            let name = $(this).attr('id');
            name = String(name).toLowerCase();
            name = name.replace(/ +(?= )/g,'');
            if (!name.startsWith(input))
                $(this).hide("slow", "linear");
            else
                $(this).show("slow", "linear");
        });

        if ($(".col-md-6:visible").length === 0)
            $("#matches").show();
        else
            $("#matches").hide();
    })
}

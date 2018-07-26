function wiki() {
    this.city = 'bikaner';

    // this.wikipedia_url = 'https://en.wikipedia.org/wiki/' + this.city;
    // console.log(this.wikipedia_url);
    // document.getElementById("html_wiki").href = this.wikipedia_url;
    // //return this.wikipedia_url

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
            format: "json",
            action: "parse",
            page: this.city,
            prop: "text",
            section: 0,
        },
        dataType: 'jsonp',
        success: function (data) {

//console.log(data)
             var markup = data.parse.text["*"];
             var i = $('<div></div>').html(markup);
         //   $('#article').html(i);

            //remove links as they will not work

            i.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove any references
            i.find('sup').remove();

            i.find('img').remove();
            i.find('span').remove();
            // remove cite error
            i.find('.mw-ext-cite-error').remove();

            let z = $(i).find('p');
            //console.log($(i).find('p')[1]);
            let arr = []
            for(let i =1; i<z.length; i++){
                let y = jQuery(z[i]).text();
                arr.push(y)
            }
            console.log(arr)
            for(let j=0; j<arr.length; j++){
                var msg = new SpeechSynthesisUtterance(arr[j]);
                window.speechSynthesis.speak(msg);
            }

           // let y = jQuery($(i).find('p')[1]).text();
           //  console.log(y)

        }
    })
}

//console.log(document.getElementById('article').value)



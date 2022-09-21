function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
    type: "GET", //Ingin melakukan apa?
    url: "http://www.omdbapi.com/", //Dari website apa?
    dataType: "JSON", //Kembalian mau dalam bentuk apa?
    data: {
        'apikey' : '1c2b4708', //API key nya.
        's' : $('#search-input').val() //Parameter yang ingin dipakai.., dapat dilihat pada dokumentasi OMBDapi nya.
    },
    success: function (result) { 
        if(result.Response == 'True') { //Jika sukses, maka eksekusi dibawah ini..
            var movies = result.Search; //Menyimpan value Search pada movies. Tujuannya untuk mempersingkat.
            
            //Melakukan looping untuk menampilkan data yang ada pada JSON.
            $.each(movies, function (i, data) { 
                $('#movie-list').append(`
                <div class="col-md-3">
                    <div class="card mb-3">
                        <img src="`+ data.Poster +`" class="card-img-top " alt="movie-poster">
                        <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                            <a href="#" class="card-link text-decoration-none see-detail" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id=`+ data.imdbID +`>See Detail</a>
                        </div>
                    </div>
                </div>
                `);
            });

            $('#search-input').val(''); //Mengosongkan field search jika sudah melakukan pencarian.

        } else {
            //Menampilkan result.Error yang ada pada JSON jika nama movie tidak ada.
            $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center text-uppercase">` + result.Error + `</h1>
                </div>
            `)
        }
    }
});
}

//Jika tombol search diclik, akan menjalankan function searchMovies.
$('#search-button').on('click', function () {
    searchMovie();
});

//Menggunakan tombol enter untuk mencari.
$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        searchMovie();
    }
});

//Saat tombol See Detail di klik
$('#movie-list').on('click', '.see-detail' , function () { 
    $.ajax({
        type: "GET", //Ingin melakukan apa?
        url: "http://www.omdbapi.com/", //Dari website apa?
        dataType: "JSON", //Kembalian mau dalam bentuk apa?
        data: {
            'apikey' : '1c2b4708', //API key nya.
            'i' : $(this).data('id') //this adalah tombol see detail yang di klik
        },
        success: function (result) {
            if(result.Response === 'True') {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ result.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8 ms-auto">
                                <ul class="list-group">
                                <li class="list-group-item"><h4>`+ result.Title +`</h4></li>
                                <li class="list-group-item">Release Date : `+ result.Released +`</li>
                                <li class="list-group-item">Genre : `+ result.Genre +`</li>
                                <li class="list-group-item">Langugage : `+ result.Language +`</li>
                                <li class="list-group-item">Director : `+ result.Director +`</li>
                                <li class="list-group-item">Writer : `+ result.Writer +`</li>
                                <li class="list-group-item">Actors : `+ result.Actors +`</li>
                                <li class="list-group-item">Description : `+ result.Plot +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>            
                `);
            }
        }
    });
})
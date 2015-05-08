function Resource() {

    function query() {
        return Q($.ajax({
            type: "GET",
            "url": 'http://192.168.0.66:3000/api/students/',
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }));
    }

    function update(id, data) {
        return Q($.ajax({
            type: "PUT",
            "url": 'http://192.168.0.66:3000/api/students/'+id,
            "data": data,
            dataType: "json"
        }));
    }

    function view(id) {
        return Q($.ajax({
            type: "GET",
            "url": 'http://192.168.0.66:3000/api/students/'+id,
            dataType: "json"
        }));
    }

    function create(data) {
        return Q($.ajax({
            type: "POST",
            "url": 'http://192.168.0.66:3000/api/students/',
            "data": data,
            dataType: "json"
        }));
    }

    function remove(id) {
        return Q($.ajax({
            type: "DELETE",
            url: 'http://192.168.0.66:3000/api/students/' + id,
            dataType: "json"
        }));
    }

    return {
        query: query,
        view:view,
        create: create,
        update: update,
        remove: remove
    }
}
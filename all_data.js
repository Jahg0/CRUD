function allData(){
            
    table.innerHTML = ``
    //get data from localstorage and store to contaclist array
    //we must to use JSON.parse, because data as string, we need convert to array
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    //looping data and show data in table
    contactList.forEach(function (value, i){
       
        var table = document.getElementById('table')

        table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.name}</td>
                <td>${value.age}</td>
                <td>${value.address}</td>
                <td>${value.phone}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    })
}

//método para obtener datos en función id
function find(id){
    //obtener datos del almacenamiento local y almacenarlos en el array de contactos
    //debemos usar JSON.parse, porque los datos como cadena, necesitamos convertirlos en el array
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList.forEach(function (value){
        if(value.id == id){
           document.getElementById('id').value = value.id
           document.getElementById('name').value = value.name
           document.getElementById('age').value = value.age
           document.getElementById('address').value = value.address
           document.getElementById('phone').value = value.phone
        }
    })
}

//metodo funcion eliminar datos
function removeData(id){
    //obtener datos del almacenamiento local y almacenarlos en el array de contactos
    //debemos usar JSON.parse, porque los datos como cadena, necesitamos convertirlos en el array
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList = contactList.filter(function(value){ 
        return value.id != id; 
    });

    // guardar array dentro de localstorage
    localStorage.setItem('listItem', JSON.stringify(contactList))

    //obtener datos nuevos
    allData()
}

//método para guardar datos en localstorage
function save(){
            
    if(value.name == '' | value.age == '' | value.address == '' | value.phone == ''){
        return;
    }
    //obtener datos del almacenamiento local y almacenarlos en el array de contactos
    //debemos usar JSON.parse, porque los datos como cadena, necesitamos convertirlos en array
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    //obtener el última array para obtener la última id
    //y guárdarlo en la id de la variable
    var id
    contactList.length != 0 ? contactList.findLast((item) => id = item.id) : id = 0

    if(document.getElementById('id').value){

        //editar array de la lista de contactos llmando su valor id
        contactList.forEach(value => {
            if(document.getElementById('id').value == value.id){
                value.name      = document.getElementById('name').value, 
                value.age       = document.getElementById('age').value, 
                value.address   = document.getElementById('address').value, 
                value.phone     = document.getElementById('phone').value
            }
        });

        //eliminar entrada oculta
        document.getElementById('id').value = ''

    }else{

        //guardar
        //obtener datos del formulario
        var item = {
            id        : id + 1, 
            name      : document.getElementById('name').value, 
            age       : document.getElementById('age').value, 
            address   : document.getElementById('address').value, 
            phone     : document.getElementById('phone').value
        }

        //add item data to array contactlist
        contactList.push(item)
    }

   
    //guardar array dentro del localstorage
    localStorage.setItem('listItem', JSON.stringify(contactList))

    //actualizar la tabla
    allData()

    //elimnar datos escritos de los formularios 
    document.getElementById('form').reset()
}

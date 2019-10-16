if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((reg) => {
            console.log('Service worker registered.', reg);
            });
    });
    }

var db = new PouchDB('pharms');


function addPharm(){
    document.getElementById('pharm-input').removeAttribute("hidden");
    document.getElementById('list-section').setAttribute("hidden", true);
    document.getElementById('add-btn').setAttribute("hidden", true);
}



function getAllData(){
    db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        // handle result
        rows = result.rows
        console.log(rows)
        for (let i = 0; i < rows.length; i++){
            var a = document.createElement('a')
            a.id = rows[i].doc._id
            a.href = '#'
            a.textContent = rows[i].doc.name + '  [ ' + rows[i].doc.district + ' ]'
            a.classList.add("list-group-item");
            a.classList.add("list-group-item-action");
            var b = document.createElement('b')
            b.style.cssFloat =  'right'
            var em = document.createElement('em')
            em.innerText = rows[i].doc.size
            var span = document.createElement('span')
            span.id = rows[i]._rev
            span.innerText = rows[i].doc._rev
            span.setAttribute("hidden", true);
            b.appendChild(em)
            a.appendChild(b)
            a.appendChild(span)
            document.getElementById("list-container").appendChild(a);
            
        }
      }).catch(function (err) {
        console.log(err);
      });
}

function saveToPouch(){
    document.getElementById('pharm-input').setAttribute("hidden", true);
    document.getElementById('list-section').removeAttribute("hidden");
    document.getElementById('add-btn').removeAttribute("hidden");

    var formData = {
        name: document.getElementById("pharm-name").value + ' Pharmacy',
        district: document.getElementById("district").value,
        size: document.getElementById("size").value,
        _id: new Date().toISOString(),
        
    }
    console.log(formData)


    db.put(formData).then(function (response) {
        alert('Saved '+formData.name)
        getAllData()

      }).catch(function (err) {
        console.log(err);
      });
}


window.onload = function() {
    
    document.getElementById('pharm-input').setAttribute("hidden", true);
    this.getAllData()
    
};
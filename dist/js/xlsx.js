'use strict'

// Check for the various File API support.
let isFileAPISupported = window.File && window.FileReader && window.FileList && window.Blob
if (!isFileAPISupported) {
    alert('The File APIs are not fully supported in this browser.')
} else {
    const handleFileSelect = function (e) {        
        let f = e.target.files[0]
        let output = `<li>Name: ${escape(f.name)}</li>
<li>Type: ${f.type || 'n/a'}</li>
<li>Size: ${f.size} bytes
<li>Last modified: ${f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'}</li>
`        
        // remove search box
        let $search = $('#search')
        if ($search.length > 0) {
            $search.parent().remove()
        }        

        // create reader
        let rows = null
        let reader = new FileReader()
        reader.onload = function(e) {
            let data = e.target.result
            let workbook = XLSX.read(data, {type: 'binary'})
            let sheet = workbook.SheetNames[0]
            rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])            
            output += `<li>Number of data: ${rows.length}</li>`
            $('#list').html(`<ul>${output}</ul>`)

            // show search box            
            $('div.form').append($(`<div class="form-group"><select id="search"></select><output id="details"></output></div>`))

            // reformat data
            $search = $('#search')
            $search.append(`<option value="">Type to search..</option>`)
            rows.forEach(function (r, i) {
                let name = r['Nama dagang produk']
                $search.append(`<option value="${i}">${name}</option>`)
            })

            $search.select2()
            .on('select2:select', function (ev) {
                let selection = rows[ev.params.data.id]
                let details = ''
                for (let key in selection) {
                    details += `<li>${key}: ${selection[key]}</li>`
                }
                $('#details').html(`<ul>${details}</ul>`)
            })
        }
        reader.onerror = console.error

        // read file
        reader.readAsBinaryString(f)                
    }
    
    document.getElementById('file').addEventListener('change', handleFileSelect, false)
}

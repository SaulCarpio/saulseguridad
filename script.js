document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const tableBody = document.getElementById('table-body');
    const addRowBtn = document.getElementById('add-row');
    const printBtn = document.getElementById('print-btn');
    const clearBtn = document.getElementById('clear-btn');
    const totalMts = document.getElementById('total-mts');
    const fechaInput = document.getElementById('fecha');
    
    // Establecer fecha actual por defecto
    const today = new Date();
    fechaInput.valueAsDate = today;
    
    // Agregar primera fila vacía
    addRow(1, '', '', '');
    
    // Event listeners
    addRowBtn.addEventListener('click', function() {
        const rowCount = tableBody.querySelectorAll('tr').length + 1;
        addRow(rowCount, '', '', '');
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    clearBtn.addEventListener('click', function() {
        if(confirm('¿Estás seguro de que deseas limpiar toda la cotización?')) {
            tableBody.innerHTML = '';
            document.getElementById('cliente').value = '';
            document.getElementById('producto').value = 'TEJA COLONIAL';
            addRow(1, '', '', '');
            totalMts.textContent = '0,00';
        }
    });
    
    // Función para agregar fila
    function addRow(number, cantidad, longitud, total) {
        const row = document.createElement('tr');
        row.className = 'input-row';
        
        row.innerHTML = `
            <td>${number}</td>
            <td><input type="text" class="cantidad" value="${cantidad}" data-type="number"></td>
            <td><input type="text" class="longitud" value="${longitud}" data-type="number"></td>
            <td class="total">${total}</td>
            <td><button class="delete-btn">Eliminar</button></td>
        `;
        
        tableBody.appendChild(row);
        
        // Agregar event listeners a los inputs
        const cantidadInput = row.querySelector('.cantidad');
        const longitudInput = row.querySelector('.longitud');
        
        cantidadInput.addEventListener('input', calculateRow);
        longitudInput.addEventListener('input', calculateRow);
        
        // Agregar event listener al botón eliminar
        row.querySelector('.delete-btn').addEventListener('click', function() {
            row.remove();
            renumberRows();
            calculateTotal();
        });
        
        // Enfocar el campo de cantidad al agregar nueva fila
        if(cantidad === '' && longitud === '') {
            cantidadInput.focus();
        }
    }
    
    // Función para calcular una fila
    function calculateRow() {
        const row = this.closest('tr');
        const cantidadInput = row.querySelector('.cantidad');
        const longitudInput = row.querySelector('.longitud');
        const totalCell = row.querySelector('.total');
        
        // Reemplazar comas por puntos para el cálculo
        const cantidad = parseFloat(cantidadInput.value.replace(',', '.')) || 0;
        const longitud = parseFloat(longitudInput.value.replace(',', '.')) || 0;
        
        const total = cantidad * longitud;
        
        // Formatear el resultado con 2 decimales y coma como separador decimal
        totalCell.textContent = total.toFixed(2).replace('.', ',');
        
        // Calcular el total general
        calculateTotal();
    }
    
    // Función para calcular el total general
    function calculateTotal() {
        const totalCells = tableBody.querySelectorAll('.total');
        let sum = 0;
        
        totalCells.forEach(cell => {
            const value = parseFloat(cell.textContent.replace(',', '.')) || 0;
            sum += value;
        });
        
        // Formatear el total con 2 decimales y coma como separador decimal
        totalMts.textContent = sum.toFixed(2).replace('.', ',');
    }
    
    // Función para renumerar las filas
    function renumberRows() {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }
    
    // Validación para inputs numéricos
    document.addEventListener('input', function(e) {
        if (e.target.hasAttribute('data-type') && e.target.getAttribute('data-type') === 'number') {
            // Permitir solo números, comas y puntos
            e.target.value = e.target.value.replace(/[^0-9,.]/g, '');
            
            // Reemplazar múltiples puntos o comas por uno solo
            e.target.value = e.target.value.replace(/([.,])(?=.*\1)/g, '');
            
            // Si empieza con punto o coma, agregar 0 delante
            if(e.target.value.match(/^[.,]/)) {
                e.target.value = '0' + e.target.value;
            }
        }
    });
});
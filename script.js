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
    
    // Event listeners con touch optimizado
    addRowBtn.addEventListener('click', addNewRow);
    printBtn.addEventListener('click', printQuotation);
    clearBtn.addEventListener('click', clearAll);
    
    // Función para agregar nueva fila
    function addNewRow() {
        const rowCount = tableBody.querySelectorAll('tr').length + 1;
        addRow(rowCount, '', '', '');
    }
    
    // Función para imprimir
    function printQuotation() {
        window.print();
    }
    
    // Función para limpiar todo
    function clearAll() {
        if(confirm('¿Estás seguro de que deseas limpiar toda la cotización?')) {
            tableBody.innerHTML = '';
            document.getElementById('cliente').value = '';
            document.getElementById('producto').value = 'TEJA COLONIAL';
            addRow(1, '', '', '');
            totalMts.textContent = '0,00';
        }
    }
    
    // Función para agregar fila
    function addRow(number, cantidad, longitud, total) {
        const row = document.createElement('tr');
        row.className = 'input-row';
        
        row.innerHTML = `
            <td>${number}</td>
            <td><input type="text" class="cantidad" value="${cantidad}" data-type="number" inputmode="decimal"></td>
            <td><input type="text" class="longitud" value="${longitud}" data-type="number" inputmode="decimal"></td>
            <td class="total">${total}</td>
            <td class="action-col"><button class="delete-btn">✕</button></td>
        `;
        
        tableBody.appendChild(row);
        
        // Agregar event listeners optimizados para móviles
        const cantidadInput = row.querySelector('.cantidad');
        const longitudInput = row.querySelector('.longitud');
        
        cantidadInput.addEventListener('input', calculateRow);
        longitudInput.addEventListener('input', calculateRow);
        
        // Event listener para eliminar fila
        row.querySelector('.delete-btn').addEventListener('click', function() {
            row.remove();
            renumberRows();
            calculateTotal();
        });
        
        // Enfocar automáticamente en móviles
        if(cantidad === '' && longitud === '') {
            setTimeout(() => {
                cantidadInput.focus();
                // Forzar desplazamiento suave en móviles
                row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }
    
    // Función para calcular fila
    function calculateRow() {
        const row = this.closest('tr');
        const cantidadInput = row.querySelector('.cantidad');
        const longitudInput = row.querySelector('.longitud');
        const totalCell = row.querySelector('.total');
        
        // Manejar entrada con comas o puntos
        const cantidad = parseFloat(cantidadInput.value.replace(',', '.')) || 0;
        const longitud = parseFloat(longitudInput.value.replace(',', '.')) || 0;
        
        const total = cantidad * longitud;
        totalCell.textContent = total.toFixed(2).replace('.', ',');
        calculateTotal();
    }
    
    // Función para calcular total
    function calculateTotal() {
        const totalCells = tableBody.querySelectorAll('.total');
        let sum = 0;
        
        totalCells.forEach(cell => {
            const value = parseFloat(cell.textContent.replace(',', '.')) || 0;
            sum += value;
        });
        
        totalMts.textContent = sum.toFixed(2).replace('.', ',');
    }
    
    // Función para renumerar filas
    function renumberRows() {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }
    
    // Validación mejorada para móviles
    document.addEventListener('input', function(e) {
        if (e.target.hasAttribute('data-type') && e.target.getAttribute('data-type') === 'number') {
            // Permitir solo números y un separador decimal
            e.target.value = e.target.value
                .replace(/[^0-9,.]/g, '')
                .replace(/([.,])(?=.*\1)/g, '');
            
            // Agregar 0 si empieza con separador
            if(e.target.value.match(/^[.,]/)) {
                e.target.value = '0' + e.target.value;
            }
            
            // Reemplazar punto por coma si hay ambos
            if(e.target.value.includes('.') && e.target.value.includes(',')) {
                e.target.value = e.target.value.replace('.', '');
            }
        }
    });
    
    // Manejar el teclado en móviles
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input[data-type="number"]')) {
            // Desplazar el input a la vista
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
});
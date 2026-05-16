// ===== GESTONLINE - SISTEMA DE GESTIÓN DE INVENTARIOS =====
// Autores: Deibin Andrey Rojas Tellez y Yiner Julian Ruiz Ñañez 
// Versión: 1.0

let productos = [
    { 
        id: 1, 
        codigo: 'PROD001', 
        nombre: 'Laptop HP Pavilion', 
        categoria: 'A', 
        stock: 15, 
        stockMinimo: 5, 
        precio: 2500000, 
        demandaAnual: 120,
        proveedor: 'Tecnología SA',
        fechaIngreso: '2024-01-15',
        ubicacion: 'Bodega A - Estante 3'
    },
    { 
        id: 2, 
        codigo: 'PROD002', 
        nombre: 'Mouse Inalámbrico Logitech', 
        categoria: 'B', 
        stock: 8, 
        stockMinimo: 10, 
        precio: 45000, 
        demandaAnual: 300,
        proveedor: 'Distribuciones XYZ',
        fechaIngreso: '2024-01-10',
        ubicacion: 'Bodega B - Estante 1'
    },
    { 
        id: 3, 
        codigo: 'PROD003', 
        nombre: 'Teclado Mecánico RGB', 
        categoria: 'B', 
        stock: 12, 
        stockMinimo: 8, 
        precio: 120000, 
        demandaAnual: 150,
        proveedor: 'Distribuciones XYZ',
        fechaIngreso: '2024-01-05',
        ubicacion: 'Bodega B - Estante 2'
    },
    { 
        id: 4, 
        codigo: 'PROD004', 
        nombre: 'Monitor Samsung 24"', 
        categoria: 'A', 
        stock: 3, 
        stockMinimo: 4, 
        precio: 850000, 
        demandaAnual: 60,
        proveedor: 'Tecnología SA',
        fechaIngreso: '2023-12-20',
        ubicacion: 'Bodega A - Estante 1'
    },
    { 
        id: 5, 
        codigo: 'PROD005', 
        nombre: 'Cable USB-C 2m', 
        categoria: 'C', 
        stock: 50, 
        stockMinimo: 20, 
        precio: 15000, 
        demandaAnual: 500,
        proveedor: 'Importaciones Global',
        fechaIngreso: '2024-01-18',
        ubicacion: 'Bodega C - Estante 5'
    }
];

let movimientos = [
    { id: 1, fecha: '2024-01-15', hora: '10:30', tipo: 'ENTRADA', productoId: 1, producto: 'Laptop HP Pavilion', cantidad: 10, valorUnitario: 2500000, usuario: 'Admin', observaciones: 'Compra mensual' },
    { id: 2, fecha: '2024-01-16', hora: '14:20', tipo: 'SALIDA', productoId: 2, producto: 'Mouse Inalámbrico', cantidad: 5, valorUnitario: 45000, usuario: 'Admin', observaciones: 'Venta al por mayor' },
    { id: 3, fecha: '2024-01-17', hora: '09:15', tipo: 'ENTRADA', productoId: 3, producto: 'Teclado Mecánico', cantidad: 8, valorUnitario: 120000, usuario: 'Admin', observaciones: 'Reabastecimiento' },
    { id: 4, fecha: '2024-01-18', hora: '16:45', tipo: 'SALIDA', productoId: 1, producto: 'Laptop HP Pavilion', cantidad: 2, valorUnitario: 2500000, usuario: 'Admin', observaciones: 'Venta mostrador' },
    { id: 5, fecha: '2024-01-19', hora: '11:30', tipo: 'SALIDA', productoId: 4, producto: 'Monitor Samsung', cantidad: 1, valorUnitario: 850000, usuario: 'Admin', observaciones: 'Venta cliente frecuente' }
];

let proveedores = [
    { id: 1, nombre: 'Tecnología SA', nit: '901.123.456-7', contacto: 'Juan Pérez', telefono: '3101234567', email: 'ventas@tecnologiasa.com', tiempoEntrega: 5 },
    { id: 2, nombre: 'Distribuciones XYZ', nit: '901.789.123-4', contacto: 'María Gómez', telefono: '3207654321', email: 'ventas@distribucionesxyz.com', tiempoEntrega: 3 },
    { id: 3, nombre: 'Importaciones Global', nit: '901.456.789-0', contacto: 'Carlos López', telefono: '3159876543', email: 'ventas@importacionesglobal.com', tiempoEntrega: 7 }
];

// ===== VARIABLES GLOBALES =====
let productoEditando = null;
let charts = {};

// ===== INICIALIZACIÓN =====
window.onload = function() {
    inicializarTodo();
};

function inicializarTodo() {
    actualizarDashboard();
    renderizarProductos();
    renderizarMovimientos();
    renderizarProveedores();
    renderizarClasificacionABC();
    cargarSelectores();
    inicializarCharts();
    actualizarAlertas();
}

// ===== NAVEGACIÓN =====
function cambiarSeccion(seccion) {
    // Actualizar clase activa en navegación
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Mostrar sección correspondiente
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(seccion + 'Section').classList.add('active');
    
    // Actualizar título
    const titulos = {
        'dashboard': 'Dashboard',
        'productos': 'Gestión de Productos',
        'movimientos': 'Registro de Movimientos',
        'optimizacion': 'Modelos de Optimización',
        'reportes': 'Generación de Reportes',
        'proveedores': 'Gestión de Proveedores',
        'configuracion': 'Configuración del Sistema'
    };
    document.getElementById('sectionTitle').textContent = titulos[seccion];
    
    // Actualizar gráficos si es necesario
    if (seccion === 'dashboard') {
        actualizarCharts();
    }
}

// ===== MODAL =====
function abrirModal(producto = null) {
    productoEditando = producto;
    
    if (producto) {
        document.getElementById('modalTitle').textContent = 'Editar Producto';
        document.getElementById('productoId').value = producto.id;
        document.getElementById('codigo').value = producto.codigo;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('stockMinimo').value = producto.stockMinimo;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('demandaAnual').value = producto.demandaAnual;
    } else {
        document.getElementById('modalTitle').textContent = 'Nuevo Producto';
        document.getElementById('productoId').value = '';
        document.getElementById('codigo').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('categoria').value = 'A';
        document.getElementById('stock').value = '0';
        document.getElementById('stockMinimo').value = '5';
        document.getElementById('precio').value = '0';
        document.getElementById('demandaAnual').value = '100';
    }
    
    document.getElementById('productoModal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('productoModal').style.display = 'none';
}

// ===== CRUD PRODUCTOS =====
function guardarProducto() {
    // Validar campos
    if (!document.getElementById('codigo').value || !document.getElementById('nombre').value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor complete los campos obligatorios'
        });
        return;
    }

    const producto = {
        id: productoEditando ? productoEditando.id : Date.now(),
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        stock: parseInt(document.getElementById('stock').value) || 0,
        stockMinimo: parseInt(document.getElementById('stockMinimo').value) || 5,
        precio: parseFloat(document.getElementById('precio').value) || 0,
        demandaAnual: parseInt(document.getElementById('demandaAnual').value) || 100,
        proveedor: document.getElementById('proveedor').options[document.getElementById('proveedor').selectedIndex]?.text || '',
        fechaIngreso: new Date().toISOString().split('T')[0]
    };

    if (productoEditando) {
        const index = productos.findIndex(p => p.id === productoEditando.id);
        productos[index] = { ...productos[index], ...producto };
        Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Producto actualizado correctamente',
            timer: 1500
        });
    } else {
        productos.push(producto);
        Swal.fire({
            icon: 'success',
            title: 'Creado',
            text: 'Producto creado correctamente',
            timer: 1500
        });
    }

    cerrarModal();
    actualizarTodo();
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        abrirModal(producto);
    }
}

function eliminarProducto(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productos = productos.filter(p => p.id !== id);
            actualizarTodo();
            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado',
                'success'
            );
        }
    });
}

function renderizarProductos() {
    const tbody = document.getElementById('productosBody');
    const busqueda = document.getElementById('buscarProducto')?.value.toLowerCase() || '';
    const categoria = document.getElementById('filtroCategoria')?.value || '';
    const filtroStock = document.getElementById('filtroStock')?.value || '';

    let filtrados = productos.filter(p => {
        const matchBusqueda = p.nombre.toLowerCase().includes(busqueda) || 
                             p.codigo.toLowerCase().includes(busqueda);
        const matchCategoria = !categoria || p.categoria === categoria;
        
        let matchStock = true;
        if (filtroStock === 'bajo') matchStock = p.stock <= p.stockMinimo && p.stock > 0;
        else if (filtroStock === 'critico') matchStock = p.stock === 0;
        else if (filtroStock === 'normal') matchStock = p.stock > p.stockMinimo;
        
        return matchBusqueda && matchCategoria && matchStock;
    });

    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 2rem;">No hay productos que coincidan con la búsqueda</td></tr>';
        return;
    }

    tbody.innerHTML = filtrados.map(p => {
        const valorTotal = p.stock * p.precio;
        let estadoClass = 'badge-success';
        let estadoTexto = 'Normal';
        
        if (p.stock === 0) {
            estadoClass = 'badge-danger';
            estadoTexto = 'Agotado';
        } else if (p.stock <= p.stockMinimo) {
            estadoClass = 'badge-warning';
            estadoTexto = 'Stock Bajo';
        }

        return `
            <tr>
                <td><strong>${p.codigo}</strong></td>
                <td>${p.nombre}</td>
                <td><span class="badge ${p.categoria === 'A' ? 'badge-danger' : p.categoria === 'B' ? 'badge-warning' : 'badge-success'}">${p.categoria}</span></td>
                <td><span class="badge ${estadoClass}">${p.stock}</span></td>
                <td>${p.stockMinimo}</td>
                <td>$${p.precio.toLocaleString()}</td>
                <td>$${valorTotal.toLocaleString()}</td>
                <td>${p.proveedor || 'N/A'}</td>
                <td><span class="badge ${estadoClass}">${estadoTexto}</span></td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarProducto(${p.id})" style="margin-right: 0.25rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== MOVIMIENTOS =====
function renderizarMovimientos() {
    const tbody = document.getElementById('movimientosBody');
    
    if (movimientos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">No hay movimientos registrados</td></tr>';
        return;
    }

    tbody.innerHTML = movimientos.sort((a, b) => new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora)).map(m => {
        const tipoClass = m.tipo === 'ENTRADA' ? 'badge-success' : 'badge-warning';
        const valorTotal = m.cantidad * m.valorUnitario;
        
        return `
            <tr>
                <td>${m.fecha}</td>
                <td>${m.hora}</td>
                <td><span class="badge ${tipoClass}">${m.tipo}</span></td>
                <td>${m.producto}</td>
                <td>${m.cantidad}</td>
                <td>$${m.valorUnitario.toLocaleString()}</td>
                <td>$${valorTotal.toLocaleString()}</td>
                <td>${m.usuario}</td>
                <td>${m.observaciones || '-'}</td>
            </tr>
        `;
    }).join('');
}

function registrarMovimiento(tipo) {
    Swal.fire({
        title: tipo === 'entrada' ? 'Registrar Entrada' : 'Registrar Salida',
        html: `
            <select id="productoSelect" class="swal2-input">
                <option value="">Seleccione producto</option>
                ${productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
            </select>
            <input type="number" id="cantidadInput" class="swal2-input" placeholder="Cantidad">
            <input type="text" id="observacionesInput" class="swal2-input" placeholder="Observaciones">
        `,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const productoId = document.getElementById('productoSelect').value;
            const cantidad = document.getElementById('cantidadInput').value;
            const observaciones = document.getElementById('observacionesInput').value;
            
            if (!productoId || !cantidad) {
                Swal.showValidationMessage('Por favor complete todos los campos');
                return false;
            }
            
            return { productoId, cantidad, observaciones };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const producto = productos.find(p => p.id == result.value.productoId);
            const cantidad = parseInt(result.value.cantidad);
            
            const movimiento = {
                id: Date.now(),
                fecha: new Date().toISOString().split('T')[0],
                hora: new Date().toLocaleTimeString(),
                tipo: tipo === 'entrada' ? 'ENTRADA' : 'SALIDA',
                productoId: producto.id,
                producto: producto.nombre,
                cantidad: cantidad,
                valorUnitario: producto.precio,
                usuario: 'Admin',
                observaciones: result.value.observaciones
            };
            
            // Actualizar stock
            if (tipo === 'entrada') {
                producto.stock += cantidad;
            } else {
                if (producto.stock < cantidad) {
                    Swal.fire('Error', 'No hay suficiente stock', 'error');
                    return;
                }
                producto.stock -= cantidad;
            }
            
            movimientos.push(movimiento);
            renderizarMovimientos();
            actualizarDashboard();
            
            Swal.fire('Registrado', 'Movimiento registrado correctamente', 'success');
        }
    });
}

// ===== PROVEEDORES =====
function renderizarProveedores() {
    const tbody = document.getElementById('proveedoresBody');
    
    tbody.innerHTML = proveedores.map(p => {
        const productosProveedor = productos.filter(prod => prod.proveedor === p.nombre).length;
        
        return `
            <tr>
                <td><strong>${p.nombre}</strong></td>
                <td>${p.nit}</td>
                <td>${p.contacto}</td>
                <td>${p.telefono}</td>
                <td>${p.email}</td>
                <td><span class="badge badge-primary">${productosProveedor} productos</span></td>
                <td>${p.tiempoEntrega} días</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarProveedor(${p.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function agregarProveedor() {
    Swal.fire({
        title: 'Nuevo Proveedor',
        html: `
            <input type="text" id="nombreProv" class="swal2-input" placeholder="Nombre">
            <input type="text" id="nitProv" class="swal2-input" placeholder="NIT">
            <input type="text" id="contactoProv" class="swal2-input" placeholder="Contacto">
            <input type="text" id="telefonoProv" class="swal2-input" placeholder="Teléfono">
            <input type="email" id="emailProv" class="swal2-input" placeholder="Email">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    });
}

// ===== DASHBOARD =====
function actualizarDashboard() {
    const total = productos.length;
    const valor = productos.reduce((sum, p) => sum + (p.stock * p.precio), 0);
    const bajoStock = productos.filter(p => p.stock <= p.stockMinimo).length;
    
    // Calcular rotación promedio
    const rotacion = productos.reduce((sum, p) => {
        if (p.demandaAnual > 0 && p.stock > 0) {
            return sum + (p.demandaAnual / p.stock);
        }
        return sum;
    }, 0) / (productos.length || 1);

    document.getElementById('totalProductos').textContent = total;
    document.getElementById('valorInventario').textContent = '$' + valor.toLocaleString();
    document.getElementById('stockBajo').textContent = bajoStock;
    document.getElementById('rotacionPromedio').textContent = rotacion.toFixed(1) + 'x';
    document.getElementById('stockAlertCount').textContent = bajoStock;

    actualizarCharts();
}

// ===== GRÁFICOS =====
function inicializarCharts() {
    // Gráfico ABC
    const ctxAbc = document.getElementById('abcChart').getContext('2d');
    charts.abc = new Chart(ctxAbc, {
        type: 'doughnut',
        data: {
            labels: ['Categoría A (Alto Valor)', 'Categoría B (Medio Valor)', 'Categoría C (Bajo Valor)'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Gráfico Top Productos
    const ctxTop = document.getElementById('topProductosChart').getContext('2d');
    charts.top = new Chart(ctxTop, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Valor de Ventas ($)',
                data: [],
                backgroundColor: '#2563eb',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Gráfico de Ventas
    const ctxVentas = document.getElementById('ventasChart').getContext('2d');
    charts.ventas = new Chart(ctxVentas, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Ventas ($)',
                data: [12000000, 15000000, 11000000, 18000000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true
        }
    });

    // Gráfico de Categorías
    const ctxCategorias = document.getElementById('categoriasChart').getContext('2d');
    charts.categorias = new Chart(ctxCategorias, {
        type: 'pie',
        data: {
            labels: ['Electrónica', 'Computación', 'Accesorios', 'Periféricos'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444']
            }]
        }
    });

    actualizarCharts();
}

function actualizarCharts() {
    // Actualizar gráfico ABC
    if (charts.abc) {
        const valores = { A: 0, B: 0, C: 0 };
        productos.forEach(p => {
            valores[p.categoria] += p.stock * p.precio;
        });
        charts.abc.data.datasets[0].data = [valores.A, valores.B, valores.C];
        charts.abc.update();
    }

    // Actualizar top productos
    if (charts.top) {
        const topProductos = [...productos]
            .sort((a, b) => (b.stock * b.precio) - (a.stock * a.precio))
            .slice(0, 5);
        
        charts.top.data.labels = topProductos.map(p => p.nombre);
        charts.top.data.datasets[0].data = topProductos.map(p => p.stock * p.precio);
        charts.top.update();
    }
}

// ===== ALERTAS =====
function actualizarAlertas() {
    const bajoStock = productos.filter(p => p.stock <= p.stockMinimo);
    const tbody = document.getElementById('alertasBody');

    if (bajoStock.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay alertas de stock</td></tr>';
        return;
    }

    tbody.innerHTML = bajoStock.map(p => {
        const demandaDiaria = p.demandaAnual / 365;
        const diasRestantes = Math.floor(p.stock / (demandaDiaria || 1));
        
        return `
            <tr>
                <td><strong>${p.nombre}</strong></td>
                <td>${p.codigo}</td>
                <td><span class="badge badge-danger">${p.stock}</span></td>
                <td>${p.stockMinimo}</td>
                <td><span class="badge badge-danger">CRÍTICO</span></td>
                <td><span class="badge ${diasRestantes < 3 ? 'badge-danger' : 'badge-warning'}">${diasRestantes} días</span></td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarProducto(${p.id})">
                        <i class="fas fa-shopping-cart"></i> Reabastecer
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function verNotificaciones() {
    const bajoStock = productos.filter(p => p.stock <= p.stockMinimo);
    
    if (bajoStock.length === 0) {
        Swal.fire('Sin notificaciones', 'No hay alertas de stock', 'info');
    } else {
        let mensaje = 'Productos con stock bajo:\n';
        bajoStock.forEach(p => {
            mensaje += `\n• ${p.nombre}: ${p.stock} unidades (mínimo ${p.stockMinimo})`;
        });
        Swal.fire('Alertas de Stock', mensaje, 'warning');
    }
}

function verTodasAlertas() {
    cambiarSeccion('productos');
    document.getElementById('filtroStock').value = 'bajo';
    renderizarProductos();
}

// ===== OPTIMIZACIÓN =====
function cargarSelectores() {
    const selects = ['productoEOQ', 'productoROP', 'productoInvProm'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = productos.map(p => 
                `<option value="${p.id}">${p.nombre}</option>`
            ).join('');
        }
    });
}

function calcularEOQ() {
    const select = document.getElementById('productoEOQ');
    if (!select || !select.value) return;
    
    const producto = productos.find(p => p.id == select.value);
    if (!producto) return;

    const D = producto.demandaAnual;
    const S = 50000; // Costo por pedido
    const H = producto.precio * 0.15; // 15% del valor

    const eoq = Math.sqrt((2 * D * S) / H);
    const pedidosPorAnio = D / eoq;
    const costoTotal = (D * S / eoq) + (eoq * H / 2);
    const diasEntrePedidos = 365 / pedidosPorAnio;

    document.getElementById('eoqValue').textContent = Math.round(eoq).toLocaleString();
    document.getElementById('pedidosAnio').textContent = pedidosPorAnio.toFixed(1);
    document.getElementById('costoTotalEOQ').textContent = '$' + Math.round(costoTotal).toLocaleString();
    document.getElementById('diasEntrePedidos').textContent = Math.round(diasEntrePedidos);
}

function calcularROP() {
    const select = document.getElementById('productoROP');
    if (!select || !select.value) return;
    
    const producto = productos.find(p => p.id == select.value);
    if (!producto) return;

    const demandaDiaria = producto.demandaAnual / 365;
    const tiempoEntrega = 7; // días
    const nivelServicio = 1.65; // 95%
    const desviacion = 2;
    
    const stockSeguridad = Math.round(nivelServicio * desviacion * Math.sqrt(tiempoEntrega));
    const puntoReorden = Math.round((demandaDiaria * tiempoEntrega) + stockSeguridad);
    const diasAgotar = Math.round(producto.stock / (demandaDiaria || 1));

    document.getElementById('ropValue').textContent = puntoReorden;
    document.getElementById('ssValue').textContent = stockSeguridad;
    document.getElementById('diasAgotar').textContent = diasAgotar;
}

function calcularInvProm() {
    const select = document.getElementById('productoInvProm');
    if (!select || !select.value) return;
    
    const producto = productos.find(p => p.id == select.value);
    if (!producto) return;

    const invProm = producto.stock / 2;
    const costoMant = invProm * producto.precio * 0.15;
    const rotAnual = producto.demandaAnual / (producto.stock || 1);

    document.getElementById('invPromValue').textContent = Math.round(invProm);
    document.getElementById('costoMantValue').textContent = '$' + Math.round(costoMant).toLocaleString();
    document.getElementById('rotAnualValue').textContent = rotAnual.toFixed(1) + 'x';
}

function renderizarClasificacionABC() {
    const tbody = document.getElementById('abcDetalladoBody');
    
    // Calcular valor anual y ordenar
    const productosValor = productos.map(p => ({
        ...p,
        valorAnual: p.demandaAnual * p.precio
    })).sort((a, b) => b.valorAnual - a.valorAnual);

    const totalValor = productosValor.reduce((sum, p) => sum + p.valorAnual, 0);
    
    let acumulado = 0;
    let html = '';

    productosValor.forEach(p => {
        const participacion = (p.valorAnual / totalValor) * 100;
        acumulado += participacion;
        
        let clasificacion = '';
        let estrategia = '';
        
        if (acumulado <= 80) {
            clasificacion = '<span class="badge badge-danger">A</span>';
            estrategia = 'Control estricto, pedidos frecuentes';
        } else if (acumulado <= 95) {
            clasificacion = '<span class="badge badge-warning">B</span>';
            estrategia = 'Control moderado, pedidos regulares';
        } else {
            clasificacion = '<span class="badge badge-success">C</span>';
            estrategia = 'Control simple, pedidos grandes';
        }

        html += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.demandaAnual}</td>
                <td>$${p.precio.toLocaleString()}</td>
                <td>$${p.valorAnual.toLocaleString()}</td>
                <td>${participacion.toFixed(2)}%</td>
                <td>${acumulado.toFixed(2)}%</td>
                <td>${clasificacion}</td>
                <td>${estrategia}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// ===== REPORTES =====
function generarReporte(tipo) {
    let titulo = '';
    let contenido = '';
    
    switch(tipo) {
        case 'inventario':
            titulo = 'Reporte de Inventario';
            contenido = generarReporteInventario();
            break;
        case 'rotacion':
            titulo = 'Análisis de Rotación';
            contenido = generarReporteRotacion();
            break;
        case 'alertas':
            titulo = 'Alertas de Stock';
            contenido = generarReporteAlertas();
            break;
        default:
            titulo = 'Reporte';
            contenido = 'Reporte en desarrollo';
    }

    Swal.fire({
        title: titulo,
        html: `<pre style="text-align: left; max-height: 400px; overflow: auto;">${contenido}</pre>`,
        icon: 'info',
        confirmButtonText: 'Descargar PDF',
        showCancelButton: true,
        cancelButtonText: 'Cerrar'
    }).then((result) => {
        if (result.isConfirmed) {
            descargarReporte(titulo, contenido);
        }
    });
}

function generarReporteInventario() {
    let reporte = '=== REPORTE DE INVENTARIO ===\n\n';
    reporte += `Fecha: ${new Date().toLocaleDateString()}\n`;
    reporte += `Total Productos: ${productos.length}\n`;
    reporte += `Valor Total: $${productos.reduce((sum, p) => sum + (p.stock * p.precio), 0).toLocaleString()}\n\n`;
    
    reporte += 'LISTADO DE PRODUCTOS:\n';
    reporte += '-'.repeat(80) + '\n';
    
    productos.forEach(p => {
        reporte += `\nCódigo: ${p.codigo}\n`;
        reporte += `Producto: ${p.nombre}\n`;
        reporte += `Categoría: ${p.categoria}\n`;
        reporte += `Stock: ${p.stock} (Mínimo: ${p.stockMinimo})\n`;
        reporte += `Precio: $${p.precio.toLocaleString()}\n`;
        reporte += `Valor Total: $${(p.stock * p.precio).toLocaleString()}\n`;
        reporte += `Estado: ${p.stock === 0 ? 'AGOTADO' : p.stock <= p.stockMinimo ? 'STOCK BAJO' : 'NORMAL'}\n`;
        reporte += '-'.repeat(40) + '\n';
    });
    
    return reporte;
}

function generarReporteRotacion() {
    let reporte = '=== ANÁLISIS DE ROTACIÓN ===\n\n';
    
    productos.forEach(p => {
        const rotacion = p.demandaAnual / (p.stock || 1);
        const clasificacion = rotacion > 10 ? 'ALTA' : rotacion > 3 ? 'MEDIA' : 'BAJA';
        
        reporte += `Producto: ${p.nombre}\n`;
        reporte += `  Demanda Anual: ${p.demandaAnual}\n`;
        reporte += `  Stock Promedio: ${p.stock}\n`;
        reporte += `  Rotación: ${rotacion.toFixed(2)}x\n`;
        reporte += `  Clasificación: ${clasificacion}\n`;
        reporte += `  Recomendación: ${clasificacion === 'ALTA' ? 'Mantener stock de seguridad' : clasificacion === 'MEDIA' ? 'Revisar periódicamente' : 'Considerar promociones'}\n\n`;
    });
    
    return reporte;
}

function generarReporteAlertas() {
    const bajoStock = productos.filter(p => p.stock <= p.stockMinimo);
    
    let reporte = '=== ALERTAS DE STOCK ===\n\n';
    reporte += `Fecha: ${new Date().toLocaleDateString()}\n`;
    reporte += `Total Alertas: ${bajoStock.length}\n\n`;
    
    if (bajoStock.length === 0) {
        reporte += 'No hay productos con stock bajo.\n';
    } else {
        bajoStock.forEach(p => {
            reporte += `⚠️ ${p.nombre}\n`;
            reporte += `   Código: ${p.codigo}\n`;
            reporte += `   Stock Actual: ${p.stock}\n`;
            reporte += `   Stock Mínimo: ${p.stockMinimo}\n`;
            reporte += `   Faltante: ${Math.max(0, p.stockMinimo - p.stock)}\n`;
            reporte += `   Acción: ${p.stock === 0 ? 'COMPRA URGENTE' : 'REABASTECER'}\n\n`;
        });
    }
    
    return reporte;
}

function descargarReporte(titulo, contenido) {
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${titulo.toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportarExcel() {
    let csv = 'Código,Producto,Categoría,Stock,Stock Mínimo,Precio,Valor Total,Proveedor\n';
    
    productos.forEach(p => {
        csv += `${p.codigo},${p.nombre},${p.categoria},${p.stock},${p.stockMinimo},${p.precio},${p.stock * p.precio},${p.proveedor || ''}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function importarExcel() {
    Swal.fire({
        title: 'Importar Productos',
        text: 'Seleccione un archivo CSV',
        input: 'file',
        inputAttributes: {
            'accept': '.csv',
            'aria-label': 'Seleccione archivo'
        },
        showCancelButton: true
    });
}

// ===== UTILIDADES =====
function actualizarTodo() {
    actualizarDashboard();
    renderizarProductos();
    cargarSelectores();
    actualizarAlertas();
    renderizarClasificacionABC();
    if (document.getElementById('productoEOQ')?.value) calcularEOQ();
    if (document.getElementById('productoROP')?.value) calcularROP();
}

// Click fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('productoModal');
    if (event.target == modal) {
        cerrarModal();
    }
}
import Swal from "sweetalert2";


interface AlertCallback {
    (): void;
}

export const handleDeleteAlert = (cb: AlertCallback) => {
    Swal.fire({
        title: "Estás seguro?",
        text: "No podrás deshacer los cambios!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            cb()
            Swal.fire({
                title: "Eliminado!",
                text: "Se eliminó el producto.",
                icon: "success"
            });
        }
    })
}

export const handleSuccessOrderAlert = () => {
    Swal.fire({
        title: "¡Pedido realizado con éxito!",
        text: " Gracias por comprar en Mamamia.",
        icon: "success"
    });
}
// jshint esversion:6
export const flashAlert = {
    methods: {
        feedback(type, msg, timer, toast, position) {
            this.$swal({
                toast: toast,
                position: position ? position : 'top-end',
                type: type,
                title: msg,
                showConfirmButton: false,
                timer: timer
            });
        },
    },
};

export const actionAlert = {
    methods: {
        deleteAlert(type, msg, toast) {
            return this.$swal({
                title: msg,
                text: "Ação iurreversível, queres continuar?",
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, Apagar!",
                cancelButtonText: "Não, Cancelar!"
            });
        },
    },
};

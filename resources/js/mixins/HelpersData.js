export const getChargesDatas = {
    methods: {

        getCharges: function () {
            if (this.charges.length) { return }
            this.getUpdatedCharges()
        },

        getUpdatedCharges: function () { this.$store.dispatch('getCharges') },
    },
    computed: {
        charges: function () { return this.$store.getters.charges }
    },
}

export const getPartnersDatas = {
    methods: {
        getPartners: function () {
            if (this.partners.length) { return }
            this.getUpdatedPartners()
        },
        getUpdatedPartners: function () {this.$store.dispatch('getPartners')},
    },

    computed: {
        partners: function () { return this.$store.getters.partners }
    },
}

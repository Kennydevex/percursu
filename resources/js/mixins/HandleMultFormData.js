export const multFormData = {
    methods: {

        checkAuthUser() {
            this.formData.partner.name = this.authUser.folk.name;
            this.formData.partner.lastname = this.authUser.folk.lastname;
            this.formData.partner.birthdate = this.authUser.folk.birthdate;
            this.formData.partner.ic = this.authUser.folk.ic;
            this.formData.partner.gender =
                this.authUser.folk.gender == "Masculino" ? "m" : "f";
            this.formData.partner.nif = this.authUser.folk.nif;
            // this.formData.couriers.email = this.authUser.email;
        },

        canAddPhone(k) {
            if (
                this.formData.phones[k].number == "" ||
                this.formData.phones[k].type == ""
            ) {
                return true;
            }
            return false;
        },



        canAddEmail(k) {
            if (
                this.formData.couriers[k].email == "" ||
                this.formData.couriers[k].type == ""
            ) {
                return true;
            }
            return false;
        },

        canAddSite(k) {
            if (
                this.formData.sites[k].link == "" ||
                this.formData.sites[k].description == ""
            ) {
                return true;
            }
            return false;
        },

        canAddSocial(k) {
            if (
                this.formData.socials[k].name == "" ||
                this.formData.socials[k].link == ""
            ) {
                return true;
            }
            return false;
        },

        findRepeatedPhone(number) {
            this.repeatedPhone = false;
            for (var i = 0; i < this.formData.phones.length - 1; i++) {
                if (this.formData.phones[i].number == number) {
                    this.repeatedPhone = true;
                    this.formData.phones[i].number
                    return;
                }
            }
            this.repeatedPhone = false;
            return;
        },

        findRepeatedEmail(email) {
            this.repeatedEmail = false;
            for (var i = 0; i < this.formData.couriers.length - 1; i++) {
                if (this.formData.couriers[i].email == email) {
                    this.repeatedEmail = true;
                    return;
                }
            }
            this.repeatedEmail = false;
            return;
        },

        findRepeatedSite(link) {
            this.repeatedSite = false;
            for (var i = 0; i < this.formData.sites.length - 1; i++) {
                if (this.formData.sites[i].link == link) {
                    this.repeatedSite = true;
                    return;
                }
            }
            this.repeatedSite = false;
            return;
        },

        findRepeatedSocial(link) {
            this.repeatedSocial = false;
            for (var i = 0; i < this.formData.socials.length - 1; i++) {
                if (this.formData.socials[i].link == link) {
                    this.repeatedSocial = true;
                    return;
                }
            }
            this.repeatedSocial = false;
            return;
        },

        addFormData(index, obj, objEl) {
            obj.push(objEl);
        },

        RemoveFormData(index, obj) {
            obj.splice(index, 1);
        },

        morePhone(index) {
            this.findRepeatedPhone(this.formData.phones[index].number)
            if (!this.repeatedPhone) {
                this.addFormData(index, this.formData.phones, {
                    number: "",
                    type: ""
                });
            }
        },

        removePhone(index) {
            this.RemoveFormData(index, this.formData.phones);
        },

        moreEmail(index) {
            this.findRepeatedEmail(this.formData.couriers[index].email)
            if (!this.repeatedEmail) {
                this.addFormData(index, this.formData.couriers, {
                    email: "",
                    type: ""
                });
            }
        },

        removeEmail(index) {
            this.RemoveFormData(index, this.formData.couriers);
        },


        moreSocial(index) {
            if (this.formData.socials.length > 0) {
                this.findRepeatedSocial(this.formData.socials[index].link)
            }
            if (!this.repeatedSocial) {
                this.addFormData(index, this.formData.socials, { name: "", link: "" });
            }
        },

        removeSocial(index) {
            this.RemoveFormData(index, this.formData.socials);
        },

        removeAllSocials() {
            this.formData.socials = [];
        },

        moreSite(index) {
            if (this.formData.sites.length > 0) {
                this.findRepeatedSite(this.formData.sites[index].link)
            }
            if (!this.repeatedSite) {
                this.addFormData(index, this.formData.sites, { link: "", description: "" });
            }
        },

        removeSite(index) {
            this.RemoveFormData(index, this.formData.sites);
        },

        removeAllSites() {
            this.formData.sites = [];
        },

        // ==========================================
        moreFormation(index) {
            this.addFormData(index, this.formData.formations, {
                designation: "",
                from: "",
                to: "",
                ongoing: false,
                institution: "",
                subjects: "",
                level: "",
                country: "",
                city: "",
                attachment: ""
            });
        },

        removeFormation(index) {
            this.RemoveFormData(index, this.formData.formations);
        },

        moreExperience(index) {
            this.addFormData(index, this.formData.experiences, {
                task: "",
                from: "",
                to: "",
                ongoing: false,
                employer: "",
                responsibility: "",
                attachment: ""
            });
        },

        removeExperience(index) {
            this.RemoveFormData(index, this.formData.experiences);
        },



        moreSkill(index, scope) {
            this.addFormData(index, this.formData.skills, {
                task: "",
                from: "",
                to: "",
                ongoing: false,
                employer: "",
                responsibility: "",
                attachment: ""
            });
        },

        removeSkill(index) {
            this.RemoveFormData(index, this.formData.skills);
        },

       
    },
}

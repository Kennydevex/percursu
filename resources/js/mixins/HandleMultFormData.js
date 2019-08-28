// jshint esversion:6

export const multFormData = {
    methods: {

        checkAuthUser() {
            this.formData.folk.name = this.authUser.folk.name;
            this.formData.folk.lastname = this.authUser.folk.lastname;
            this.formData.folk.birthdate = this.authUser.folk.birthdate;
            this.formData.folk.ic = this.authUser.folk.ic;
            this.formData.folk.gender = this.authUser.folk.gender;
            this.formData.folk.nif = this.authUser.folk.nif;
            // this.formData.couriers.email = this.authUser.email;
        },

        canAddPhone(k) {
            if (
                this.formData.folk.phones[k].number == "" ||
                this.formData.folk.phones[k].type == ""
            ) {
                return true;
            }
            return false;
        },



        canAddEmail(k) {
            if (
                this.formData.folk.couriers[k].email == "" ||
                this.formData.folk.couriers[k].type == ""
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
            for (var i = 0; i < this.formData.folk.phones.length - 1; i++) {
                if (this.formData.folk.phones[i].number == number) {
                    this.repeatedPhone = true;
                    return;
                }
            }
            this.repeatedPhone = false;
            return;
        },

        findRepeatedEmail(email) {
            this.repeatedEmail = false;
            for (var i = 0; i < this.formData.folk.couriers.length - 1; i++) {
                if (this.formData.folk.couriers[i].email == email) {
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
            this.findRepeatedPhone(this.formData.folk.phones[index].number)
            if (!this.repeatedPhone) {
                this.addFormData(index, this.formData.folk.phones, {
                    number: "",
                    type: ""
                });
            }
        },

        removePhone(index) {
            this.RemoveFormData(index, this.formData.folk.phones);
        },

        moreEmail(index) {
            this.findRepeatedEmail(this.formData.folk.couriers[index].email)
            if (!this.repeatedEmail) {
                this.addFormData(index, this.formData.folk.couriers, {
                    email: "",
                    type: ""
                });
            }
        },

        removeEmail(index) {
            this.RemoveFormData(index, this.formData.folk.couriers);
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
                from: new Date().toISOString().substr(0, 10),
                to: new Date().toISOString().substr(0, 10),
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
                from: new Date().toISOString().substr(0, 10),
                to: new Date().toISOString().substr(0, 10),
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

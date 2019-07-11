<template>
  <v-container grid-list-lg fluid ma-0 pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert outline type="info" :value="true">Algumas informações são carregados do seu perfil</v-alert>
      </v-flex>
      <v-flex xs12>
        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step
              :complete="step > 1"
              step="1"
              editable
              :rules="[() =>
            !errors.has('name') &&
            !errors.has('description') &&
            !errors.has('abbreviation') &&
            !errors.has('slogan') &&
            !errors.has('slogan') &&
            !errors.has('opning')]"
            >Dados pessoais</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 2"
              step="2"
              editable
              :rules="[() =>
          !errors.any()]"
            >Informações de Contacto</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 3"
              step="3"
              editable
              :rules="[() =>
      !errors.has('country') &&
      !errors.has('state') &&
      !errors.has('city') &&
      !errors.has('zone') &&
      !errors.has('street')  &&
      !errors.has('post_code')]"
            >Endereço e Localização Geográfica</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="step > 4" step="4" editable>Formações</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="step > 5" step="5" editable>Experiencias</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="step > 6" step="6" editable>Competencias Pessoais</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="7" editable>Preferencias e Finalização</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    name="name"
                    label="Nome"
                    v-model="formData.partner.name"
                    v-validate="'required'"
                    data-vv-name="name"
                    :error-messages="errors.collect('name')"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field
                    name="lastname"
                    label="Apelido"
                    v-model="formData.partner.lastname"
                    v-validate="'required'"
                    data-vv-name="lastname"
                    :error-messages="errors.collect('lastname')"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                  <input
                    style="display:none"
                    name="bisrthDate_field_target"
                    ref="valBirthdate"
                    v-model="valBirthdate"
                    type="text"
                  />
                  <v-menu
                    :close-on-content-click="false"
                    v-model="birthdate_menu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      name="birthdate"
                      slot="activator"
                      :value="formattingBirthdate"
                      label="*Data de Nascimento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-validate="'required|date_format:dd/MM/yyyy|before:valBirthdate'"
                      data-vv-as="birthdate"
                      :error-messages="errors.collect('birthdate')"
                    ></v-text-field>
                    <v-date-picker
                      v-model="formData.partner.birthdate"
                      @input="birthdate_menu = false"
                      locale="pt-pt"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 text-xs-left>
                  <v-subheader>Sexo:</v-subheader>
                  <v-radio-group row v-model="formData.partner.gender">
                    <v-radio color="blue" label="Masculino" value="m"></v-radio>
                    <v-radio color="orange" label="Feminino" value="f"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field
                    name="ic"
                    label="BI"
                    v-model="formData.partner.ic"
                    v-validate="'required'"
                    data-vv-name="ic"
                    :error-messages="errors.collect('ic')"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field
                    name="nif"
                    label="NIF"
                    v-model="formData.partner.nif"
                    v-validate="'required'"
                    data-vv-name="nif"
                    :error-messages="errors.collect('nif')"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn @click.native="cancel()" flat round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout row wrap>
                <v-flex xs12>
                  <template v-for="(phone,k) in formData.phones">
                    <v-layout row wrap :key="k+'p'">
                      <v-flex xs12 md2>
                        <v-select :items="phoneTypes" v-model="phone.type" label="Tipo" box></v-select>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field
                          :name="'phone'+k"
                          :label="'Tel '+(k+1)"
                          v-model="phone.number"
                          box
                          v-validate="'required'"
                          :data-vv-name="'phone'+k"
                          :error-messages="errors.collect('phone'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs2 justify-space-around align-center>
                        <v-btn
                          flat
                          icon
                          color="warning"
                          @click="removePhone(k)"
                          v-show="k || ( !k && formData.phones.length > 1)"
                        >
                          <v-icon>mdi-cellphone-erase</v-icon>
                        </v-btn>

                        <v-btn
                          flat
                          icon
                          color="primary"
                          @click="morePhone(k)"
                          v-show="k == formData.phones.length-1"
                        >
                          <v-icon>mdi-cellphone-iphone</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </template>

                  <v-divider></v-divider>

                   <template v-for="(email,k) in formData.couriers">
                    <v-layout row wrap :key="k+'e'">
                      <v-flex xs12 md2>
                        <v-select :items="emailTypes" v-model="email.type" label="Tipo" box></v-select>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field
                          :name="'email'+k"
                          :label="'Email '+(k+1)"
                          v-model="email.email"
                          box
                          v-validate="'required'"
                          :data-vv-name="'email'+k"
                          :error-messages="errors.collect('email'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs2 justify-space-around align-center>
                        <v-btn
                          flat
                          icon
                          color="warning"
                          @click="removeEmail(k)"
                          v-show="k || ( !k && formData.couriers.length > 1)"
                        >
                          <v-icon>mdi-minus-box-outline</v-icon>
                        </v-btn>

                    

                        <v-btn
                          flat
                          icon
                          color="primary"
                          @click="moreEmail(k)"
                          v-show="k == formData.couriers.length-1"
                        >
                          <v-icon>mdi-email-plus-outline</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </template>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()">Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    disabled
                    name="country"
                    label="País"
                    v-model="formData.address.country"
                    v-validate="'required'"
                    data-vv-name="country"
                    :error-messages="errors.collect('country')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    name="state"
                    label="Ilha/Estado"
                    v-model="formData.address.state"
                    v-validate="'required'"
                    data-vv-name="state"
                    :error-messages="errors.collect('state')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    name="city"
                    label="Cidade"
                    v-model="formData.address.city"
                    v-validate="'required'"
                    data-vv-name="city"
                    :error-messages="errors.collect('city')"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    name="zone"
                    label="Zona"
                    v-model="formData.address.zone"
                    v-validate="'required'"
                    data-vv-name="zone"
                    :error-messages="errors.collect('zone')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    name="street"
                    label="Rua"
                    v-model="formData.address.street"
                    v-validate="'required'"
                    data-vv-name="street"
                    :error-messages="errors.collect('street')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    name="post_code"
                    label="Código Postal"
                    v-model="formData.address.postcode"
                    v-validate="'required'"
                    data-vv-name="post_code"
                    :error-messages="errors.collect('post_code')"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn @click.native="nextStep()" color="primary" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-layout row wrap>
                <v-flex xs6>
                  <small>Formações</small>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-layout row wrap>
                <v-flex xs6>
                  <small>Experiencias</small>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="6">
              <v-layout row wrap>
                <v-flex xs6>
                  <small>Habilidades</small>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="7">
              <v-layout row wrap>
                <v-flex xs6>
                  <small>Preferencias e Finalização</small>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" round @click="addPartner(false)">Guardar</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import validateDictionary from "@helpers/api/validateDictionary";
import moment from "moment";

export default {
  name: "",
  components: {},

  data: () => ({
    step: 1,
    startDateMenu: false,
    birthdate_menu: false,

    formData: {
      partner: {
        name: "",
        lastname: "",
        gender: "",
        birthdate: "",
        ic: "",
        nif: "",
        avatar: "default.png",
        cover: "default.png",
        color: "",
        status: "false"
      },
      experinces: [
        {
          task: "",
          from: "",
          to: "",
          ongoing: "",
          employer: "",
          responsibility: "",
          attachment: ""
        }
      ],
      formations: [
        {
          designation: "",
          from: "",
          to: "",
          ongoing: "",
          institution: "",
          subjects: "",
          level: "",
          country: "",
          city: "",
          attachment: ""
        }
      ],
      phones: [
        {
          number: "",
          type: ""
        }
      ],
      skills: [
        {
          name: "",
          description: ""
        }
      ],
      charges: [],
      sites: [
        {
          link: "",
          description: ""
        }
      ],
      couriers: [
        {
          email: "",
          type: ""
        }
      ],
      address: {
        country: "Cabo Verde",
        city: "",
        street: "",
        postcode: ""
      },
      location: {
        lat: "22",
        lng: "29"
      }
    },
    phoneTypes: [{ id: "Pessoal" }, { id: "Casa" }, { id: "Trabalho" }],
    emailTypes: [{ id: "Pessoal" }, { id: "Casa" }, { id: "Trabalho" }],
    dictionary: validateDictionary,

    // tempLogoPreview: '',
    tempLogo: "",
    // tempCoverPreview: '',
    tempCover: ""
  }),

  created() {
    this.checkAuthUser();
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    startLimit() {
      return moment(new Date().toISOString().substr(0, 10)).format(
        "DD-MM-YYYY"
      );
    },

    valBirthdate() {
      return moment(new Date().toISOString().substr(0, 10)).format(
        "DD/MM/YYYY"
      );
    },

    formattingBirthdate() {
      return this.formData.partner.birthdate
        ? moment(this.formData.partner.birthdate).format("DD/MM/YYYY")
        : "";
    },

    formattingStartDate() {
      return this.formData.partner.opning
        ? moment(this.formData.partner.opning).format("DD-MM-YYYY")
        : "";
    }
  },

  methods: {
    checkAuthUser() {
      this.formData.partner.name = this.authUser.folk.name;
      this.formData.partner.lastname = this.authUser.folk.lastname;
      this.formData.partner.birthdate = this.authUser.folk.birthdate;
      this.formData.partner.ic = this.authUser.folk.ic;
      this.formData.partner.gender = this.authUser.folk.gender;
      this.formData.partner.nif = this.authUser.folk.nif;
      // this.formData.couriers.email = this.authUser.email;
    },

    addPartner(addNew) {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/partners/partners", this.$data.formData)
            .then(response => {
              // window.getApp.$emit("APP_UPDATE_ALL_PARTNERS_DATA")
              // this.clear()
              this.showToastAlert(
                "success",
                "Escola configurada com sucesso!",
                true
              );
              if (!addNew) {
                this.$router.push({ name: "partners" });
              }
            })
            .catch(err => {});
        }
      });
    },

    morePhone(index) {
      // if (!this.partner.phones.number) {
      //   return true
      // }
      this.formData.phones.push({ number: "", type: "" });
    },

    removePhone(index) {
      this.formData.phones.splice(index, 1);
    },

    moreEmail(index) {
      this.formData.couriers.push({ email: "", type: "" });
    },

    removeEmail(index) {
      this.formData.couriers.splice(index, 1);
    },

    cancel: function() {
      this.$router.push({ name: "list-partners" });
    },

    nextStep: function() {
      this.step++;
    },

    prevStep: function() {
      this.step--;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

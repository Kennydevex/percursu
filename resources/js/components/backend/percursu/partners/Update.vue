<template>
  <v-container grid-list-lg fluid ma-0 pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
         
          <v-card-text>
            <v-subheader>Editar as suas informações de curriculum</v-subheader>
            <v-stepper v-model="step" non-linear vertical>
              <v-stepper-step
                :complete="step > 1"
                step="1"
                :rules="[() => formErrors.partner.length == 0]"
              >
                Dados pessoais
                <small>Configure as suas informações pessoais</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-form @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        outlined
                        name="name"
                        label="Nome"
                        v-model="formData.folk.name"
                        v-validate="'required'"
                        data-vv-name="form-step-1.name"
                        :error-messages="errors.collect('form-step-1.name')"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        outlined
                        name="lastname"
                        label="Apelido"
                        v-model="formData.folk.lastname"
                        v-validate="'required'"
                        data-vv-name="form-step-1.lastname"
                        :error-messages="errors.collect('form-step-1.lastname')"
                      ></v-text-field>
                    </v-flex>

                    <!-- <v-flex xs12 sm6 md4>
                      <input
                        style="display:none"
                        name="birthDate_field_target"
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
                          outlined
                          name="birthdate"
                          slot="activator"
                          :value="formattingBirthdate"
                          label="*Data de Nascimento"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-validate="'required|date_format:dd/MM/yyyy|before:valBirthdate'"
                          data-vv-as="form-step-1.birthdate"
                          :error-messages="errors.collect('form-step-1.birthdate')"
                        ></v-text-field>
                        <v-date-picker
                          v-model="formData.folk.birthdate"
                          @input="birthdate_menu = false"
                          locale="pt-pt"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>-->

                    <v-flex xs12 sm6 md4>
                      <input
                        style="display:none"
                        name="birthDate_field_target"
                        ref="valBirthdateRef"
                        v-model="valBirthdate"
                        type="text"
                      />
                      <v-menu
                        v-model="birthdate_menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            outlined
                            name="birthdate"
                            :value="formattingBirthdate"
                            label="*Data de Nascimento"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            v-validate="'required|date_format:dd/MM/yyyy|before:valBirthdateRef'"
                            data-vv-as="form-step-1.birthdate"
                            :error-messages="errors.collect('form-step-1.birthdate')"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="formData.folk.birthdate"
                          @input="birthdate_menu = false"
                          locale="pt-pt"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        outlined
                        name="ic"
                        label="BI"
                        v-model="formData.folk.ic"
                        v-validate="'required'"
                        data-vv-name="form-step-1.ic"
                        :error-messages="errors.collect('form-step-1.ic')"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        outlined
                        name="nif"
                        label="NIF"
                        v-model="formData.folk.nif"
                        v-validate="'required'"
                        data-vv-name="form-step-1.nif"
                        :error-messages="errors.collect('form-step-1.nif')"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4 text-xs-right>
                      <p>Sexo:</p>
                      <v-radio-group row v-model="formData.folk.gender">
                        <v-radio color="blue" label="Masculino" value="m"></v-radio>
                        <v-radio color="orange" label="Feminino" value="f"></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Imagem de Perfil e Capa</v-subheader>
                    </v-flex>

                    <v-flex xs12 md6>
                      <file-upload
                        @handleFileUpload="uploadAvatar"
                        :rules="avatarRules"
                        :label="'Avatar'"
                        :placeholder="'Carregar uma imagem do seu perfil'"
                      ></file-upload>
                    </v-flex>

                    <v-flex xs12 md6>
                      <file-upload
                        @handleFileUpload="uploadCover"
                        :rules="coverRules"
                        :label="'Imagem de capa'"
                        :placeholder="'Carregar uma imagem da sua capa'"
                      ></file-upload>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn type="submit" color="primary" rounded>Seguinte</v-btn>
                      <v-btn @click.native="cancel()" text rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <!-- ======================================== -->
              <v-stepper-step
                :complete="step > 2"
                step="2"
                :rules="[() => formErrors.contacts.length == 0]"
              >
                Informações de Contacto
                <small>Introduza os seus contactos, bem com a sua participação na Web</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-form @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Telefones e correios eletrónicos</v-subheader>
                    </v-flex>
                    <v-flex xs12 md6>
                      <template v-for="(phone,k) in formData.folk.phones">
                        <v-layout row wrap :key="k+'p'">
                          <v-flex xs12 md3 class="my-0 py-0">
                            <v-select
                              outlined
                              :items="contactsType"
                              v-model="phone.type"
                              label="Telefone"
                              item-text="name"
                              item-value="id"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.type'+k"
                              :error-messages="errors.collect('form-step-2.type'+k)"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 md6 class="my-0 py-0">
                            <v-text-field
                              outlined
                              :disabled="!phone.type"
                              :name="'phone'+k"
                              :label="'Número '+(k+1)"
                              v-model="phone.number"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.phone'+k"
                              :error-messages="errors.collect('form-step-2.phone'+k)"
                              @change="findRepeatedPhone(phone.number)"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md3 class="my-0 py-0">
                            <v-btn
                              text
                              small
                              icon
                              color="warning"
                              @click="removePhone(k)"
                              v-show="k || ( !k && formData.folk.phones.length > 1)"
                            >
                              <v-icon>mdi-phone-minus</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddPhone(k)"
                              text
                              small
                              icon
                              color="primary"
                              @click="morePhone(k)"
                              v-show="k == formData.folk.phones.length-1 && formData.folk.phones.length < 3"
                            >
                              <v-icon>mdi-phone-plus</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                      <v-layout row wrap my-0 py-0>
                        <v-flex xs12 v-if="repeatedPhone">
                          <small
                            class="red--text"
                          >Atenção que numeros repitidos não serão guardados na base de dados!!</small>
                        </v-flex>
                        <v-flex xs12 v-if="formData.folk.phones.length == 3">
                          <small class="warning--text">Atingiu a quantidade máxima de números</small>
                        </v-flex>
                      </v-layout>
                      <v-divider class="hidden-md-and-up"></v-divider>
                    </v-flex>

                    <v-flex xs12 md6>
                      <template v-for="(email,k) in formData.folk.couriers">
                        <v-layout row wrap :key="k+'e'">
                          <v-flex xs12 md3 class="my-0 py-0">
                            <v-select
                              outlined
                              :items="contactsType"
                              v-model="email.type"
                              label="Correio"
                              item-text="name"
                              item-value="id"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.email-type'+k"
                              :error-messages="errors.collect('form-step-2.email-type'+k)"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 md6 class="my-0 py-0">
                            <v-text-field
                              outlined
                              :disabled="!email.type"
                              :name="'email'+k"
                              :label="'Endereço '+(k+1)"
                              v-model="email.email"
                              @change="findRepeatedEmail(email.email)"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.email'+k"
                              :error-messages="errors.collect('form-step-2.email'+k)"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md3 class="my-0 py-0">
                            <v-btn
                              text
                              small
                              icon
                              color="warning"
                              @click="removeEmail(k)"
                              v-show="k || ( !k && formData.folk.couriers.length > 1)"
                            >
                              <v-icon>mdi-email-minus-outline</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddEmail(k)"
                              text
                              small
                              icon
                              color="primary"
                              @click="moreEmail(k)"
                              v-show="k == formData.folk.couriers.length-1 && formData.folk.couriers.length < 3"
                            >
                              <v-icon>mdi-email-plus-outline</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                      <v-layout row wrap mt-0 pt-0>
                        <v-flex xs12 v-if="repeatedEmail">
                          <small
                            class="red--text"
                          >Verefique Email repitidos, se não dados não serão guardados</small>
                        </v-flex>
                        <v-flex xs12 v-if="formData.folk.couriers.length == 3">
                          <small class="warning--text">Número suficinete de email</small>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>

                  <v-layout row wrap class="mb-5">
                    <v-flex xs12>
                      <v-subheader>Sítios e blogs (Opcional - Para quem possui Sítios na Web)</v-subheader>
                      <v-btn
                        text
                        small
                        rounded
                        v-if="formData.sites.length == 0"
                        @click="moreSite(0)"
                        color="primary"
                      >
                        <v-icon>mdi-earth</v-icon>Registar meus Sítios
                      </v-btn>
                      <v-btn
                        text
                        small
                        rounded
                        depressed
                        v-if="formData.sites.length > 0"
                        @click="removeAllSites()"
                        color="warning"
                      >
                        <v-icon left>mdi-close-circle</v-icon>
                        Remover {{formData.sites.length > 1?'todos':''}}
                      </v-btn>

                      <template v-for="(site,k) in formData.sites">
                        <v-layout row wrap :key="k+'si'">
                          <v-flex xs12 md5 class="py-0 my-0">
                            <v-text-field
                              outlined
                              @change="findRepeatedSite(site.link)"
                              :name="'site'+k"
                              :label="'Ligação do Sítio '+(k+1)"
                              v-model="site.link"
                              v-validate="{url: {require_protocol: true }}"
                              :data-vv-name="'form-step-2.link'+k"
                              :error-messages="errors.collect('form-step-2.link'+k)"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 class="py-0 my-0">
                            <v-text-field
                              outlined
                              :disabled="!site.link"
                              :name="'site-descriptiom'+k"
                              label="Descrição do sítio"
                              v-model="site.description"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.site-descriptiom'+k"
                              :error-messages="errors.collect('form-step-2.site-descriptiom'+k)"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs1 class="py-0 my-0">
                            <v-btn
                              text
                              icon
                              color="warning"
                              @click="removeSite(k)"
                              v-show="k || ( !k && formData.sites.length > 1)"
                            >
                              <v-icon>mdi-link-off</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddSite(k)"
                              text
                              icon
                              color="primary"
                              @click="moreSite(k)"
                              v-show="k == formData.sites.length-1 && formData.sites.length < 3"
                            >
                              <v-icon>mdi-link-plus</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                      <v-layout row wrap mt-0 pt-0>
                        <v-flex xs12 v-if="repeatedSite">
                          <small
                            class="red--text"
                          >Verefique Sites repitidos, se não dados não serão guardados</small>
                        </v-flex>
                        <v-flex xs12 v-if="formData.sites.length == 3">
                          <small class="warning--text">Número suficinete de sites</small>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12>
                      <v-subheader>Ligações às redes sociais (Opcional)</v-subheader>
                      <v-btn
                        rounded
                        small
                        text
                        depressed
                        v-if="formData.socials.length == 0"
                        @click="moreSocial(0)"
                        color="primary"
                      >
                        <v-icon>mdi-share-variant</v-icon>Registar redes sociais
                      </v-btn>
                      <v-btn
                        text
                        small
                        rounded
                        depressed
                        v-if="formData.socials.length > 0"
                        @click="removeAllSocials()"
                        color="warning"
                      >
                        <v-icon left>mdi-close-circle</v-icon>
                        Remover {{formData.socials.length > 1?'todos':''}}
                      </v-btn>
                      <template v-for="(social,k) in formData.socials">
                        <v-layout row wrap :key="k+'sn'">
                          <v-flex xs12 md2 class="py-0 my-0">
                            <v-select
                              outlined
                              :items="socialMedias"
                              v-model="social.name"
                              label="Rede Social"
                              item-text="name"
                              item-value="id"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.social-name'+k"
                              :error-messages="errors.collect('form-step-2.social-name'+k)"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 md9 class="py-0 my-0">
                            <v-text-field
                              outlined
                              :disabled="!social.name"
                              @change="findRepeatedSite(social.link)"
                              :name="'social-link'+k"
                              label="Ligação à conta"
                              v-model="social.link"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.social-link'+k"
                              :error-messages="errors.collect('form-step-2.social-link'+k)"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs1 class="py-0 my-0">
                            <v-btn
                              text
                              icon
                              color="warning"
                              @click="removeSocial(k)"
                              v-show="k || ( !k && formData.socials.length > 1)"
                            >
                              <v-icon>mdi-link-variant-off</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddSocial(k)"
                              text
                              icon
                              color="primary"
                              @click="moreSocial(k)"
                              v-show="k == formData.socials.length-1  && formData.socials.length < 3"
                            >
                              <v-icon>mdi-link-variant</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                      <v-layout row wrap class="mb-2">
                        <v-flex xs12 v-if="repeatedSocial">
                          <small
                            class="red--text"
                          >Verefique redes repitidas, se não dados não serão guardados</small>
                        </v-flex>
                        <v-flex xs12 v-if="formData.socials.length == 3">
                          <small class="warning--text">Número suficinete de redes sociais</small>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                      <v-btn color="primary" type="submit" rounded>Seguinte</v-btn>
                      <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <!-- =============================================== -->
              <v-stepper-step
                :complete="step > 3"
                step="3"
                :rules="[() =>formErrors.address.length == 0]"
              >
                Endereço e Localização Geográfica
                <small>Configure o seu endereço</small>
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-form @submit.prevent="nextStep('form-step-3')" data-vv-scope="form-step-3">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>*Por favor, adicione um enderço real e atualizado</v-subheader>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        outlined
                        disabled
                        name="country"
                        label="País"
                        v-model="formData.folk.address.country"
                        v-validate="'required'"
                        data-vv-name="form-step-3.country"
                        :error-messages="errors.collect('form-step-3.country')"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        outlined
                        name="city"
                        label="Cidade"
                        v-model="formData.folk.address.city"
                        v-validate="'required'"
                        data-vv-name="form-step-3.city"
                        :error-messages="errors.collect('form-step-3.city')"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 md6>
                      <v-text-field
                        outlined
                        name="street"
                        label="Rua"
                        v-model="formData.folk.address.street"
                        v-validate="'required'"
                        data-vv-name="form-step-3.street"
                        :error-messages="errors.collect('form-step-3.street')"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        outlined
                        name="postcode"
                        label="Código Postal"
                        v-model="formData.folk.address.postcode"
                        v-validate="'required'"
                        data-vv-name="form-step-3.postcode"
                        :error-messages="errors.collect('form-step-3.postcode')"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                      <v-btn color="primary" type="submit" rounded>Seguinte</v-btn>
                      <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <!-- =========================================== -->
              <v-stepper-step
                :complete="step > 4"
                step="4"
                :rules="[() =>formErrors.formation.length == 0]"
              >
                Formações realizadas
                <small>Apresente as suas formações acadêmicas e não só</small>
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-form @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Registe as suas formações</v-subheader>
                      <v-subheader
                        :class="formData.formations.length==5?'red--text':''"
                      >Por questão de objetividade não é permitido inserir mais do que cinco formações</v-subheader>
                    </v-flex>
                    <v-flex xs12>
                      <template v-for="(formation,k) in formData.formations">
                        <v-layout row wrap :key="k+'for'">
                          <v-flex xs12>
                            <v-layout row wrap>
                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-school"
                                  :name="'designation'+k"
                                  :label="'Designação da formação '+(k+1)"
                                  v-model="formation.designation"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-4.frm-designation'+k"
                                  :error-messages="errors.collect('form-step-4.frm-designation'+k)"
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-domain"
                                  :name="'institution'+k"
                                  label="Instituição"
                                  v-model="formation.institution"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-4.frm-institution'+k"
                                  :error-messages="errors.collect('form-step-4.frm-institution'+k)"
                                ></v-text-field>
                              </v-flex>
                              <!-- <v-flex xs12 md2>
                            <v-select
                              outlined
                              :items="levels"
                              v-model="formation.level"
                              label="Nível da formação"
                            ></v-select>
                              </v-flex>-->

                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-map"
                                  :name="'country'+k"
                                  label="País"
                                  v-model="formation.country"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-4.frm-country'+k"
                                  :error-messages="errors.collect('form-step-4.frm-country'+k)"
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-map-marker"
                                  :name="'city'+k"
                                  label="Cidade"
                                  v-model="formation.city"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-4.frm-city'+k"
                                  :error-messages="errors.collect('form-step-4.frm-city'+k)"
                                ></v-text-field>
                              </v-flex>

                              <!-- <v-flex xs12 md3>
                            <input
                              style="display:none"
                              name="from_field_target"
                              ref="valFrom"
                              v-model="valFrom"
                              type="text"
                            />
                            <v-menu
                              :close-on-content-click="false"
                              v-model="from_date_menu[k]"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <v-text-field
                                outlined
                                name="from"
                                slot="activator"
                                label="Início"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                :value="formation.from"
                                v-validate="'required'"
                                :data-vv-as="'form-step-4.frm-from'+k"
                                :error-messages="errors.collect('form-step-4.frm-from'+k)"
                              ></v-text-field>
                              <v-date-picker
                                v-model="formation.from"
                                @input="$set(from_date_menu, k, false)"
                                locale="pt-pt"
                              ></v-date-picker>
                            </v-menu>
                              </v-flex>-->

                              <v-flex xs12 md3>
                                <input
                                  style="display:none"
                                  name="from_field_target"
                                  ref="valFrom"
                                  v-model="valFrom"
                                  type="text"
                                />
                                <v-menu
                                  v-model="from_date_menu[k]"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      outlined
                                      name="from"
                                      v-model="formation.from"
                                      label="Início"
                                      prepend-inner-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                      v-validate="'required'"
                                      :data-vv-as="'form-step-4.frm-from'+k"
                                      :error-messages="errors.collect('form-step-4.frm-from'+k)"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="formation.from"
                                    @input="$set(from_date_menu, k, false)"
                                    locale="pt-pt"
                                  ></v-date-picker>
                                </v-menu>
                              </v-flex>

                              <v-flex xs12 md3>
                                <input
                                  style="display:none"
                                  name="to_field_target"
                                  ref="valTo"
                                  v-model="valTo"
                                  type="text"
                                />
                                <!-- <v-menu
                              :disabled="formation.ongoing"
                              :close-on-content-click="false"
                              v-model="to_date_menu[k]"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <v-text-field
                                outlined
                                :disabled="formation.ongoing"
                                name="to"
                                slot="activator"
                                label="Conclusão"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                :value="formation.to"
                                v-validate="'date_format:yyyy-MM|before:valTo'"
                                :data-vv-as="'form-step-4.frm-to'+k"
                                :error-messages="errors.collect('form-step-4.frm-to'+k)"
                              ></v-text-field>
                              <v-date-picker
                                v-model="formation.to"
                                @input="$set(to_date_menu, k, false)"
                                locale="pt-pt"
                              ></v-date-picker>
                                </v-menu>-->

                                <v-menu
                                  :disabled="formation.ongoing"
                                  v-model="to_date_menu[k]"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      outlined
                                      :disabled="formation.ongoing"
                                      name="to"
                                      v-model="formation.to"
                                      :label="formation.ongoing?'Formando':'Conclusão'"
                                      prepend-inner-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="formation.to"
                                    @input="$set(to_date_menu, k, false)"
                                    locale="pt-pt"
                                  ></v-date-picker>
                                </v-menu>
                              </v-flex>

                              <v-flex xs12 md6>
                                <v-checkbox
                                  @change="resetToFrmDate(k)"
                                  color="primary"
                                  label="Formação em andamento"
                                  v-model="formation.ongoing"
                                ></v-checkbox>
                              </v-flex>

                              <v-flex xs12>
                                <v-textarea
                                  outlined
                                  label="Principais Disciplinas/Módulos da Formação"
                                  name="subjects"
                                  hint="Liste aqui as disciplinas ou módulos que são nucleares desta formação"
                                  v-model="formation.subjects"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-5.subjects'+k"
                                  :error-messages="errors.collect('form-step-5.subjects'+k)"
                                  rows="3"
                                  auto-grow
                                ></v-textarea>
                              </v-flex>

                              <v-flex xs12 md3>
                                <v-subheader>Certificado da formação (Opcional)</v-subheader>
                                <v-file-input
                                  accept="image/png, image/jpeg"
                                  label="Anexar certificado"
                                ></v-file-input>
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex xs12 justify-space-around align-center>
                                <v-btn
                                  rounded
                                  outlined
                                  color="warning"
                                  @click="removeFormation(k)"
                                  v-show="k || ( !k && formData.formations.length > 1)"
                                >
                                  <v-icon left>mdi-minus</v-icon>Remover
                                </v-btn>

                                <v-btn
                                  v-if="formData.formations.length<5"
                                  rounded
                                  outlined
                                  color="primary"
                                  @click="moreFormation(k)"
                                  v-show="k == formData.formations.length-1"
                                >
                                  <v-icon left>mdi-plus</v-icon>Formação
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </template>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                      <v-btn color="primary" type="submit" rounded>Seguinte</v-btn>
                      <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <!-- ==================================== -->
              <v-stepper-step
                :complete="step > 5"
                step="5"
                :rules="[() =>formErrors.experience.length == 0]"
              >
                Experiencias Profissionais
                <small>Apresenete as suas experiencias no mercado de trabalho</small>
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-form @submit.prevent="nextStep('form-step-5')" data-vv-scope="form-step-5">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Registe as suas experiêcias profissionais</v-subheader>
                      <v-subheader
                        :class="formData.experiences.length==5?'red--text':''"
                      >Por questão de objetividade não é permitido inserir mais do que cinco experiencias</v-subheader>
                    </v-flex>
                    <v-flex xs12>
                      <template v-for="(experience,k) in formData.experiences">
                        <v-layout row wrap :key="k+'ex'">
                          <v-flex xs12>
                            <v-layout row wrap>
                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-wallet-travel"
                                  :name="'task'+k"
                                  :label="'Função '+(k+1)"
                                  v-model="experience.task"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-5.task'+k"
                                  :error-messages="errors.collect('form-step-5.task'+k)"
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 md6>
                                <v-text-field
                                  outlined
                                  prepend-inner-icon="mdi-domain"
                                  :name="'employer'+k"
                                  label="Entidade empregadora"
                                  v-model="experience.employer"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-5.employer'+k"
                                  :error-messages="errors.collect('form-step-5.employer'+k)"
                                ></v-text-field>
                              </v-flex>

                              <!-- <v-flex xs12 md3>
                            <input
                              style="display:none"
                              name="from_ex_field_target"
                              ref="valFromEx"
                              v-model="valFromEx"
                              type="text"
                            />
                            <v-menu
                              :close-on-content-click="false"
                              v-model="from_ex_date_menu[k]"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <v-text-field
                                outlined
                                name="exp-from"
                                slot="activator"
                                label="Início"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                :value="experience.from"
                                v-validate="'date_format:yyyy-MM|before:valFromEx'"
                                :data-vv-as="'form-step-5.exp-from'+k"
                                :error-messages="errors.collect('form-step-5.exp-from'+k)"
                              ></v-text-field>
                              <v-date-picker
                                v-model="experience.from"
                                @input="$set(from_ex_date_menu, k, false)"
                                locale="pt-pt"
                              ></v-date-picker>
                            </v-menu>
                              </v-flex>-->

                              <v-flex xs12 md3>
                                <input
                                  style="display:none"
                                  name="from_ex_field_target"
                                  ref="valFromEx"
                                  v-model="valFromEx"
                                  type="text"
                                />
                                <v-menu
                                  v-model="from_ex_date_menu[k]"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      outlined
                                      name="exp-from"
                                      v-model="experience.from"
                                      label="De"
                                      prepend-inner-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="experience.from"
                                    @input="$set(from_ex_date_menu, k, false)"
                                    locale="pt-pt"
                                  ></v-date-picker>
                                </v-menu>
                              </v-flex>

                              <!-- <v-flex xs12 md3>
                            <input
                              style="display:none"
                              name="to_ex_field_target"
                              ref="valToEx"
                              v-model="valToEx"
                              type="text"
                            />
                            <v-menu
                              :disabled="experience.ongoing"
                              :close-on-content-click="false"
                              v-model="to_ex_date_menu[k]"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <v-text-field
                                outlined
                                :disabled="experience.ongoing"
                                name="exp-to"
                                slot="activator"
                                label="Conclusão"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                :value="experience.to"
                                v-validate="'date_format:yyyy-MM|before:valToEx'"
                                :data-vv-as="'form-step-5.exp-to'+k"
                                :error-messages="errors.collect('form-step-5.exp-to'+k)"
                              ></v-text-field>
                              <v-date-picker
                                v-model="experience.to"
                                @input="$set(to_ex_date_menu, k, false)"
                                locale="pt-pt"
                              ></v-date-picker>
                            </v-menu>
                              </v-flex>-->

                              <v-flex xs12 md3>
                                <input
                                  style="display:none"
                                  name="to_ex_field_target"
                                  ref="valToEx"
                                  v-model="valToEx"
                                  type="text"
                                />
                                <v-menu
                                  :disabled="experience.ongoing"
                                  v-model="to_ex_date_menu[k]"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      :disabled="experience.ongoing"
                                      outlined
                                      name="exp-to"
                                      v-model="experience.to"
                                      :label="experience.ongoing?'Adquirindo Experiencia':'A'"
                                      prepend-inner-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="experience.to"
                                    @input="$set(to_ex_date_menu, k, false)"
                                    locale="pt-pt"
                                  ></v-date-picker>
                                </v-menu>
                              </v-flex>

                              <v-flex xs12 md6>
                                <v-checkbox
                                  @change="resetToExpDate(k)"
                                  color="primary"
                                  label="Continuando"
                                  v-model="experience.ongoing"
                                ></v-checkbox>
                              </v-flex>

                              <v-flex xs12>
                                <v-textarea
                                  outlined
                                  label="Responsabilidades/Competencias desenvolvidas"
                                  name="responsibility"
                                  hint="Descreva aqui agumas responsabilidades ou competencias desenvolvidas"
                                  v-model="experience.responsibility"
                                  v-validate="'required'"
                                  :data-vv-name="'form-step-5.responsibility'+k"
                                  :error-messages="errors.collect('form-step-5.responsibility'+k)"
                                  rows="3"
                                  auto-grow
                                ></v-textarea>
                              </v-flex>

                              <v-flex xs12 md3>
                                <v-subheader>Comprovativo da experiencia profissional (Opcional)</v-subheader>
                                <v-file-input
                                  accept="image/png, image/jpeg"
                                  label="Anexar um arquivo"
                                ></v-file-input>
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex xs12 justify-space-around align-center>
                                <v-btn
                                  rounded
                                  outlined
                                  color="warning"
                                  @click="removeExperience(k)"
                                  v-show="k || ( !k && formData.experiences.length > 1)"
                                >
                                  <v-icon left>mdi-minus</v-icon>Remover
                                </v-btn>

                                <v-btn
                                  v-if="formData.experiences.length<5"
                                  rounded
                                  outlined
                                  color="primary"
                                  @click="moreExperience(k)"
                                  v-show="k == formData.experiences.length-1"
                                >
                                  <v-icon left>mdi-plus</v-icon>Experiencias
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </template>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                      <v-btn color="primary" type="submit" rounded>Seguinte</v-btn>
                      <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <!-- ============================================== -->
              <v-stepper-step
                :complete="step > 6"
                step="6"
                :rules="[() =>formErrors.skill.length == 0 && ! formErrors.charge.name]"
              >
                Habilidades e Preferencias
                <small>Liste as suas habilidades que julgas relevantes (Linguisticas e Digitais)</small>
              </v-stepper-step>
              <v-stepper-content step="6">
                <v-form @submit.prevent="nextStep('form-step-6')" data-vv-scope="form-step-6">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-subheader>Destaque as suas habilidades e escolha cargos que te enteressaria</v-subheader>

                      <v-subheader
                        :class="formData.skills.length==5?'red--text':''"
                      >Por questão de objetividade não é permitido inserir mais do que cinco habilidades</v-subheader>
                    </v-flex>
                    <v-flex xs12 md8>
                      <template v-for="(skill,k) in formData.skills">
                        <v-layout row wrap :key="k+'sk'">
                          <v-flex xs12 md4 class="my-0 py-0">
                            <v-text-field
                              outlined
                              :name="'skill-name'+k"
                              :label="'Designação '+(k+1)"
                              v-model="skill.name"
                              v-validate="'required'"
                              :data-vv-name="'form-step-6.skill-name'+k"
                              :error-messages="errors.collect('form-step-6.skill-name'+k)"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6 class="my-0 py-0">
                            <v-textarea
                              outlined
                              label="Descrição"
                              name="skill-description"
                              v-model="skill.description"
                              v-validate="'required'"
                              data-vv-name="form-step-6.skill-description"
                              :error-messages="errors.collect('form-step-6.skill-description')"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-flex>

                          <v-flex xs12 md2 class="my-0 py-0">
                            <v-btn
                              small
                              text
                              icon
                              color="warning"
                              @click="removeSkill(k)"
                              v-show="k || ( !k && formData.skills.length > 1)"
                            >
                              <v-icon>mdi-minus-circle-outline</v-icon>
                            </v-btn>

                            <v-btn
                              v-if="formData.skills.length<5"
                              small
                              text
                              icon
                              color="primary"
                              @click="moreSkill(k)"
                              v-show="k == formData.skills.length-1"
                            >
                              <v-icon>mdi-plus-circle-outline</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                    </v-flex>

                    <v-flex xs12 md4 class="my-0 py-0">
                      <v-text-field
                        v-if="addingCharge"
                        outlined
                        name="charge-name"
                        label="Adicionar cargos"
                        v-model="charge.name"
                        append-icon="mdi-content-save"
                        prepend-inner-icon="mdi-close"
                        @click:prepend-inner="handleAddCharge"
                        @click:append="addCharge"
                        @keyup.enter="addCharge"
                        hint="Introduza o nome do cargo que queres registar"
                      ></v-text-field>
                      <v-select
                        height="20"
                        outlined
                        multiple
                        v-else
                        :items="charges"
                        v-model="formData.charges"
                        label="Preferencias profissionais"
                        prepend-inner-icon="mdi-plus"
                        item-text="name"
                        item-value="id"
                        chips
                        @click:prepend-inner="handleAddCharge"
                      ></v-select>

                      <small
                        v-for="(err, i) in formErrors.charge.name"
                        :key="i"
                        class="error--text"
                      >{{err}}</small>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="my-3">
                    <v-flex xs12>
                      <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                      <v-btn color="primary" type="submit" rounded>Seguinte</v-btn>
                      <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>
              <!-- ====================================== -->
              <v-stepper-step
                step="7"
                :rules="[() =>formErrors.final.length == 0]"
              >Finalização</v-stepper-step>
              <v-stepper-content step="7">
                <v-layout column>
                  <v-flex xs12 md6>
                    <h3>Agradecemos a sua colaboração</h3>
                    <p class="warning--text">
                      <v-icon color="warning">mdi-alert</v-icon>Todos os campos parecem estar bem preenchidos e validados, porém, os mesmos serão tratados antes de serem armazenados na base de dados, por isso, agradeciamos a sua compreenção caso recebas alguma notificação de validação.
                    </p>
                  </v-flex>
                  <v-flex xs12 md6>
                    <small>Termo de utilização</small>
                    <v-checkbox
                      label="*Aceitar o termo de utilização e a nossa política de privacidade"
                    ></v-checkbox>
                    <v-checkbox
                      label="Quero receber notificações sobre publicação e ofertas de empregos e formações! (Opcional)"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="my-3">
                  <v-flex xs12>
                    <v-btn text @click.native="prevStep()" rounded>Anterior</v-btn>
                    <v-btn
                      color="primary"
                      rounded
                      @click="updatePartner()"
                      :loading="sending"
                    >Enviar Atualizações</v-btn>
                    <v-btn text @click.native="cancel()" rounded>Sair</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import validateDictionary from "@helpers/api/validateDictionary";
import moment from "moment";
import { multFormData } from "@mixins/HandleMultFormData";

import { getChargesDatas, getPartnersDatas } from "@mixins/HelpersData";
import FileUpload from "@pback/forms/FileUpload";
import { flashAlert } from "@mixins/AppAlerts";
export default {
  mixins: [flashAlert, multFormData, getChargesDatas, getPartnersDatas],
  name: "",
  components: {
    FileUpload
  },

  data() {
    return {
      username: this.$route.params.username,
      sending: false,
      avatarRules: [
        value =>
          !value ||
          value.size < 1000000 ||
          "Imagem de perfil não pode ter um tamanho superior a 1MB"
      ],
      coverRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Imagem de capa não pode ter um tamanho superior a 2MB"
      ],
      formErrors: {
        charge: [],
        partner: [],
        experience: [],
        formation: [],
        skill: [],
        address: [],
        contacts: [],
        final: []
      },
      repeatedPhone: false,
      repeatedEmail: false,
      repeatedSite: false,
      repeatedSocial: false,
      step: 1,
      addingCharge: false,
      startDateMenu: false,
      // from_date_menu: false,
      from_date_menu: {},
      from_ex_date_menu: {},
      to_date_menu: {},
      to_ex_date_menu: {},
      birthdate_menu: false,
      charge: { name: "", description: "" },
      formData: {
        charges: [],
        status: false,
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: "",
          ic: "",
          nif: "",
          avatar: "",
          cover: "",
          phones: [{ number: "", type: "" }],
          couriers: [{ email: "", type: "" }],
          address: {
            country: "Cabo Verde",
            city: "",
            street: "",
            postcode: "",
            location: { lat: "22", lng: "29" }
          }
        },
        experiences: [
          {
            task: "",
            from: new Date().toISOString().substr(0, 10),
            to: new Date().toISOString().substr(0, 10),
            ongoing: false,
            employer: "",
            responsibility: "",
            attachment: ""
          }
        ],
        formations: [
          {
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
          }
        ],

        skills: [{ name: "", description: "" }],
        sites: [],
        socials: []
      },
      contactsType: [
        { id: 1, name: "Pessoal" },
        { id: 2, name: "Casa" },
        { id: 3, name: "Trabalho" }
      ],

      socialMedias: [
        "GitHub",
        "Linkedin",
        "Twitter",
        "Google+",
        "Facebook",
        "Reddit"
      ],
      levels: [1, 2, 3, 4, 5],
      dictionary: validateDictionary,
      selectedFile: null
    };
  },

  created() {
    this.getSinglePartiner(this.username);
    this.getCharges();
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

    valFrom() {
      return moment(new Date().toISOString().substr(0, 10)).format("YYYY-MM");
    },

    valTo() {
      return moment(new Date().toISOString().substr(0, 10)).format("YYYY-MM");
    },

    valFromEx() {
      return moment(new Date().toISOString().substr(0, 10)).format("YYYY-MM");
    },

    valToEx() {
      return moment(new Date().toISOString().substr(0, 10)).format("YYYY-MM");
    },

    formattingBirthdate() {
      return this.formData.folk.birthdate
        ? moment(this.formData.folk.birthdate).format("DD/MM/YYYY")
        : "";
    }
  },

  methods: {
    uploadAvatar(file) {
      this.formData.folk.avatar = file;
    },

    uploadCover(file) {
      this.formData.folk.cover = file;
    },

    handleAddCharge() {
      this.addingCharge = !this.addingCharge;
      this.formErrors.charge = [];
      this.charge.name = "";
    },
    resetToFrmDate(k) {
      if (this.formData.formations[k].ongoing == true) {
        this.formData.formations[k].to = "";
        return;
      }
      this.formData.formations[k].to = new Date().toISOString().substr(0, 10);
    },

    resetToExpDate(k) {
      if (this.formData.experiences[k].ongoing == true) {
        this.formData.experiences[k].to = "";
        return;
      }
      this.formData.experiences[k].to = new Date().toISOString().substr(0, 10);
    },

    getSinglePartiner: function(username) {
      if (this.partners.length > 0) {
        this.formData = this.partners.find(
          partner => partner.folk.user.username == username
        );
      } else {
        axios
          .get("/api/v1/percursu/partners/" + username)
          .then(response => {
            this.formData = response.data.data;
          })
          .catch(error => {});
      }
    },

    updatePartner() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .put(
              "/api/v1/percursu/partners/" + this.formData.id,
              this.$data.formData
            )
            .then(response => {
              this.feedback("success", response.data.msg, 4000, true);
              window.getApp.$emit("APP_UPDATE_ALL_PARTNERS_DATA");
              this.$router.go(-1);
              // this.$router.push({ name: "list-partners" });
              this.formErrors = [];
            })
            .catch(err => {
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },

    addCharge() {
      axios
        .post("/api/v1/percursu/charges", this.$data.formData.charge)
        .then(response => {
          this.handleAddCharge();
          this.getUpdatedCharges();
        })
        .catch(err => {
          this.formErrors.charge = err.response.data.errors;
        });
    },

    cancel: function() {
      this.$router.go(-1)
      // this.$router.push({ name: "list-partners" });
    },

    nextStep(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
        }
      });
    },

    prevStep: function() {
      this.step--;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

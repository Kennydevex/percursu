<template>
  <v-container grid-list-lg fluid ma-0 pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step
              :complete="step > 1"
              step="1"
              :rules="[() => formErrors.partner.length == 0]"
            >Dados pessoais</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 2"
              step="2"
              :rules="[() => formErrors.contacts.length == 0]"
            >Informações de Contacto</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 3"
              step="3"
              :rules="[() =>formErrors.address.length == 0]"
            >Endereço e Localização Geográfica</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 4"
              step="4"
              :rules="[() =>formErrors.formation.length == 0]"
            >Formações</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 5"
              step="5"
              :rules="[() =>formErrors.experience.length == 0]"
            >Experiencias</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 6"
              step="6" 
              :rules="[() =>formErrors.skill.length == 0 && ! formErrors.charge.name]"
              editable
            >Habilidades e Preferencias</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              step="7"
              :rules="[() =>formErrors.final.length == 0]"
            >Preferencias e Finalização</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-alert
                      outline
                      type="info"
                      :value="true"
                      dismissible
                    >Campos preenchidos com informações da sua conta!</v-alert>
                  </v-flex>
                  <v-flex xs12></v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <v-text-field
                      name="name"
                      label="Nome"
                      v-model="formData.partner.name"
                      v-validate="'required'"
                      data-vv-name="form-step-1.name"
                      :error-messages="errors.collect('form-step-1.name')"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md4>
                    <v-text-field
                      name="lastname"
                      label="Apelido"
                      v-model="formData.partner.lastname"
                      v-validate="'required'"
                      data-vv-name="form-step-1.lastname"
                      :error-messages="errors.collect('form-step-1.lastname')"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md4>
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
                        name="birthdate"
                        slot="activator"
                        :value="formattingBirthdate"
                        label="*Data de Nascimento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-validate="'required|date_format:dd/MM/yyyy|before:valBirthdate'"
                        data-vv-as="form-step-1.birthdate"
                        :error-messages="errors.collect('form-step-1.birthdate')"
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
                      data-vv-name="form-step-1.ic"
                      :error-messages="errors.collect('form-step-1.ic')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      name="nif"
                      label="NIF"
                      v-model="formData.partner.nif"
                      v-validate="'required'"
                      data-vv-name="form-step-1.nif"
                      :error-messages="errors.collect('form-step-1.nif')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn type="submit" color="primary" round>Seguinte</v-btn>
                <v-btn @click.native="cancel()" flat round>Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-form @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader>Telefones e correios eletrónicos</v-subheader>
                  </v-flex>
                  <v-flex xs6>
                    <template v-for="(phone,k) in formData.phones">
                      <v-layout row wrap :key="k+'p'">
                        <v-flex xs12 md3>
                          <v-select
                            :items="contactsType"
                            v-model="phone.type"
                            label="Telefone"
                            item-text="name"
                            item-value="id"
                            box
                            v-validate="'required'"
                            :data-vv-name="'form-step-2.type'+k"
                            :error-messages="errors.collect('form-step-2.type'+k)"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 md7>
                          <v-text-field
                            :disabled="!phone.type"
                            :name="'phone'+k"
                            :label="'Número '+(k+1)"
                            v-model="phone.number"
                            box
                            v-validate="'required'"
                            :data-vv-name="'form-step-2.phone'+k"
                            :error-messages="errors.collect('form-step-2.phone'+k)"
                            @change="findRepeatedPhone(phone.number)"
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
                            :disabled="canAddPhone(k)"
                            flat
                            icon
                            color="primary"
                            @click="morePhone(k)"
                            v-show="k == formData.phones.length-1 && formData.phones.length < 3"
                          >
                            <v-icon>mdi-cellphone-iphone</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                    <v-layout row wrap mt-0 pt-0>
                      <v-flex xs12 v-if="repeatedPhone">
                        <small
                          class="red--text"
                        >Atenção que numeros repitidos não serão guardados na base de dados!!</small>
                      </v-flex>
                      <v-flex xs12 v-if="formData.phones.length == 3">
                        <small class="warning--text">Atingiu a quantidade máxima de números</small>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs6>
                    <template v-for="(email,k) in formData.couriers">
                      <v-layout row wrap :key="k+'e'">
                        <v-flex xs12 md3>
                          <v-select
                            :items="contactsType"
                            v-model="email.type"
                            label="Correio"
                            item-text="name"
                            item-value="id"
                            box
                            v-validate="'required'"
                            :data-vv-name="'form-step-2.email-type'+k"
                            :error-messages="errors.collect('form-step-2.email-type'+k)"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 md7>
                          <v-text-field
                            :disabled="!email.type"
                            :name="'email'+k"
                            :label="'Endereço '+(k+1)"
                            v-model="email.email"
                            box
                            @change="findRepeatedEmail(email.email)"
                            v-validate="'required'"
                            :data-vv-name="'form-step-2.email'+k"
                            :error-messages="errors.collect('form-step-2.email'+k)"
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
                            :disabled="canAddEmail(k)"
                            flat
                            icon
                            color="primary"
                            @click="moreEmail(k)"
                            v-show="k == formData.couriers.length-1 && formData.couriers.length < 3"
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
                      <v-flex xs12 v-if="formData.couriers.length == 3">
                        <small class="warning--text">Número suficinete de email</small>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>

                <v-divider></v-divider>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader>Sítios e blogs (Opcional - Para quem tem Sítios na Web)</v-subheader>
                    <v-btn
                      outline
                      round
                      depressed
                      v-if="formData.sites.length == 0"
                      @click="moreSite(0)"
                      color="primary"
                    >
                      <v-icon>mdi-earth</v-icon>Registar meus Sítios e Blogs
                    </v-btn>
                    <v-btn
                      outline
                      round
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
                        <v-flex xs12 md5>
                          <v-text-field
                            @change="findRepeatedSite(site.link)"
                            :name="'site'+k"
                            :label="'Ligação do Sítio '+(k+1)"
                            v-model="site.link"
                            v-validate="{url: {require_protocol: true }}"
                            :data-vv-name="'form-step-2.link'+k"
                            :error-messages="errors.collect('form-step-2.link'+k)"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field
                            :disabled="!site.link"
                            :name="'site-descriptiom'+k"
                            label="Descrição do sítio"
                            v-model="site.description"
                            v-validate="'required'"
                            :data-vv-name="'form-step-2.site-descriptiom'+k"
                            :error-messages="errors.collect('form-step-2.site-descriptiom'+k)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs1 justify-space-around align-center>
                          <v-btn
                            flat
                            icon
                            color="warning"
                            @click="removeSite(k)"
                            v-show="k || ( !k && formData.sites.length > 1)"
                          >
                            <v-icon>mdi-link-off</v-icon>
                          </v-btn>

                          <v-btn
                            :disabled="canAddSite(k)"
                            flat
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
                      <v-flex xs12 v-if="formData.couriers.length == 3">
                        <small class="warning--text">Número suficinete de sites</small>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12>
                    <v-subheader>Ligações às redes sociais (Opcional)</v-subheader>
                    <v-btn
                      round
                      outline
                      depressed
                      v-if="formData.socials.length == 0"
                      @click="moreSocial(0)"
                      color="primary"
                    >
                      <v-icon>mdi-share-variant</v-icon>Registar as minhas redes sociais
                    </v-btn>
                    <v-btn
                      outline
                      round
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
                        <v-flex xs12 md2>
                          <v-select
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
                        <v-flex xs12 md9>
                          <v-text-field
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

                        <v-flex xs1 justify-space-around align-center>
                          <v-btn
                            flat
                            icon
                            color="warning"
                            @click="removeSocial(k)"
                            v-show="k || ( !k && formData.socials.length > 1)"
                          >
                            <v-icon>mdi-link-variant-off</v-icon>
                          </v-btn>

                          <v-btn
                            :disabled="canAddSocial(k)"
                            flat
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
                    <v-layout row wrap mt-0 pt-0>
                      <v-flex xs12 v-if="repeatedSocial">
                        <small
                          class="red--text"
                        >Verefique redes repitidas, se não dados não serão guardados</small>
                      </v-flex>
                      <v-flex xs12 v-if="formData.couriers.length == 3">
                        <small class="warning--text">Número suficinete de redes sociais</small>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>

                <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
                <v-btn color="primary" type="submit" round>Seguinte</v-btn>
                <v-btn flat @click.native="cancel()">Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-form @submit.prevent="nextStep('form-step-3')" data-vv-scope="form-step-3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader>Registe o seu endereço atual</v-subheader>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      disabled
                      name="country"
                      label="País"
                      v-model="formData.address.country"
                      v-validate="'required'"
                      data-vv-name="form-step-3.country"
                      :error-messages="errors.collect('form-step-3.country')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      name="city"
                      label="Cidade"
                      v-model="formData.address.city"
                      v-validate="'required'"
                      data-vv-name="form-step-3.city"
                      :error-messages="errors.collect('form-step-3.city')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <v-text-field
                      name="street"
                      label="Rua"
                      v-model="formData.address.street"
                      v-validate="'required'"
                      data-vv-name="form-step-3.street"
                      :error-messages="errors.collect('form-step-3.street')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      name="postcode"
                      label="Código Postal"
                      v-model="formData.address.postcode"
                      v-validate="'required'"
                      data-vv-name="form-step-3.postcode"
                      :error-messages="errors.collect('form-step-3.postcode')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
                <v-btn type="submit" color="primary" round>Seguinte</v-btn>
                <v-btn flat @click.native="cancel()" round>Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-form @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader>Registe as suas formações</v-subheader>
                  </v-flex>
                  <v-flex xs12>
                    <template v-for="(formation,k) in formData.formations">
                      <v-layout row wrap :key="k+'for'">
                        <v-flex xs12 md6>
                          <v-text-field
                            prepend-icon="mdi-school"
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
                            prepend-icon="mdi-domain"
                            :name="'institution'+k"
                            label="Instituição"
                            v-model="formation.institution"
                            v-validate="'required'"
                            :data-vv-name="'form-step-4.frm-institution'+k"
                            :error-messages="errors.collect('form-step-4.frm-institution'+k)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-text-field
                            prepend-icon="mdi-map"
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
                            prepend-icon="mdi-map-marker"
                            :name="'city'+k"
                            label="Cidade"
                            v-model="formation.city"
                            v-validate="'required'"
                            :data-vv-name="'form-step-4.frm-city'+k"
                            :error-messages="errors.collect('form-step-4.frm-city'+k)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md3>
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
                              name="from"
                              slot="activator"
                              label="Início"
                              prepend-icon="mdi-calendar"
                              readonly
                              :value="formation.from"
                              v-validate="'required|date_format:yyyy-MM|before:valFrom'"
                              :data-vv-as="'form-step-4.frm-from'+k"
                              :error-messages="errors.collect('form-step-4.frm-from'+k)"
                            ></v-text-field>
                            <v-date-picker
                              v-model="formation.from"
                              @input="$set(from_date_menu, k, false)"
                              locale="pt-pt"
                              type="month"
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
                          <v-menu
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
                              :disabled="formation.ongoing"
                              name="to"
                              slot="activator"
                              label="Conclusão"
                              prepend-icon="mdi-calendar"
                              readonly
                              :value="formation.to"
                              v-validate="'required|date_format:yyyy-MM|before:valTo'"
                              :data-vv-as="'form-step-4.frm-to'+k"
                              :error-messages="errors.collect('form-step-4.frm-to'+k)"
                            ></v-text-field>
                            <v-date-picker
                              v-model="formation.to"
                              @input="$set(to_date_menu, k, false)"
                              locale="pt-pt"
                              type="month"
                            ></v-date-picker>
                          </v-menu>
                        </v-flex>

                        <v-flex xs12 md3 text-xs-left>
                          <v-checkbox
                            @change="resetToFrmDate(k)"
                            color="primary"
                            label="Continuando"
                            v-model="formation.ongoing"
                          ></v-checkbox>
                        </v-flex>

                        <v-flex xs12 md12 text-xs-left>
                          <v-btn color="primary">
                            Anexar aquivo
                            <v-icon>mdi-file-pdf-box</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs2 justify-space-around align-center>
                          <v-btn
                            outline
                            color="warning"
                            @click="removeFormation(k)"
                            v-show="k || ( !k && formData.formations.length > 1)"
                          >
                            <v-icon left>mdi-minus</v-icon>Remover
                          </v-btn>

                          <v-btn
                            outline
                            color="primary"
                            @click="moreFormation(k)"
                            v-show="k == formData.formations.length-1"
                          >
                            <v-icon left>mdi-plus</v-icon>Formação
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-flex>
                </v-layout>

                <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
                <v-btn color="primary" type="submit" round>Seguinte</v-btn>
                <v-btn flat @click.native="cancel()" round>Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-form @submit.prevent="nextStep('form-step-5')" data-vv-scope="form-step-5">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-subheader>Registe as suas experiêcias profissionais</v-subheader>
                  </v-flex>
                  <v-flex xs12>
                    <template v-for="(experience,k) in formData.experiences">
                      <v-layout row wrap :key="k+'ex'">
                        <v-flex xs12 md6>
                          <v-text-field
                            prepend-icon="mdi-wallet-travel"
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
                            prepend-icon="mdi-domain"
                            :name="'employer'+k"
                            label="Entidade empregadora"
                            v-model="experience.employer"
                            v-validate="'required'"
                            :data-vv-name="'form-step-5.employer'+k"
                            :error-messages="errors.collect('form-step-5.employer'+k)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-textarea
                            label="Responsabilidades/Competencias desenvolvidas"
                            name="responsibility"
                            hint="Descreva aqui agumas responsabilidades ou competencias desenvolvidas"
                            v-model="experience.responsibility"
                            v-validate="'required'"
                            :data-vv-name="'form-step-5.responsibility'+k"
                            :error-messages="errors.collect('form-step-5.responsibility'+k)"
                            rows="3"
                            auto-grow
                            box
                          ></v-textarea>
                        </v-flex>

                        <v-flex xs6 md2>
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
                              name="exp-from"
                              slot="activator"
                              label="Início"
                              prepend-icon="mdi-calendar"
                              readonly
                              :value="experience.from"
                              v-validate="'required|date_format:yyyy-MM|before:valFromEx'"
                              :data-vv-as="'form-step-5.exp-from'+k"
                              :error-messages="errors.collect('form-step-5.exp-from'+k)"
                            ></v-text-field>
                            <v-date-picker
                              v-model="experience.from"
                              @input="$set(from_ex_date_menu, k, false)"
                              locale="pt-pt"
                              type="month"
                            ></v-date-picker>
                          </v-menu>
                        </v-flex>

                        <v-flex xs6 md2>
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
                              :disabled="experience.ongoing"
                              name="exp-to"
                              slot="activator"
                              label="Conclusão"
                              prepend-icon="mdi-calendar"
                              readonly
                              :value="experience.to"
                              v-validate="'required|date_format:yyyy-MM|before:valToEx'"
                              :data-vv-as="'form-step-5.exp-to'+k"
                              :error-messages="errors.collect('form-step-5.exp-to'+k)"
                            ></v-text-field>
                            <v-date-picker
                              v-model="experience.to"
                              @input="$set(to_ex_date_menu, k, false)"
                              locale="pt-pt"
                              type="month"
                            ></v-date-picker>
                          </v-menu>
                        </v-flex>

                        <v-flex xs6 md2 text-xs-left>
                          <v-checkbox
                            @change="resetToExpDate(k)"
                            color="primary"
                            label="Continuando"
                            v-model="experience.ongoing"
                          ></v-checkbox>
                        </v-flex>

                        <v-flex xs12 md12 text-xs-left>
                          <v-btn color="primary">
                            Anexar aquivo
                            <v-icon>mdi-file-pdf-box</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs2 justify-space-around align-center>
                          <v-btn
                            outline
                            color="warning"
                            @click="removeExperience(k)"
                            v-show="k || ( !k && formData.experiences.length > 1)"
                          >
                            <v-icon left>mdi-minus</v-icon>Remover
                          </v-btn>

                          <v-btn
                            outline
                            color="primary"
                            @click="moreExperience(k)"
                            v-show="k == formData.experiences.length-1"
                          >
                            <v-icon left>mdi-plus</v-icon>Formação
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-flex>
                </v-layout>

                <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
                <v-btn color="primary" type="submit" round>Seguinte</v-btn>
                <v-btn flat @click.native="cancel()" round>Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="6">
              <v-form @submit.prevent="nextStep('form-step-6')" data-vv-scope="form-step-6">
                <v-layout row wrap>
                  <v-flex xs12 class="ma-0 pa-0">
                    <v-subheader>Destaque as suas habilidades e escolha cargos que te enteressaria</v-subheader>
                  </v-flex>
                  <v-flex xs12 md6>
                    <template v-for="(skill,k) in formData.skills">
                      <v-layout row wrap :key="k+'sk'">
                        <v-flex xs11 md5>
                          <v-text-field
                            :name="'skill-name'+k"
                            :label="'Designação '+(k+1)"
                            v-model="skill.name"
                            v-validate="'required'"
                            :data-vv-name="'form-step-6.skill-name'+k"
                            :error-messages="errors.collect('form-step-6.skill-name'+k)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs11 md5>
                          <v-textarea
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

                        <v-flex xs2>
                          <v-btn
                            flat
                            icon
                            color="warning"
                            @click="removeSkill(k)"
                            v-show="k || ( !k && formData.skills.length > 1)"
                          >
                            <v-icon>mdi-bag-personal-off</v-icon>
                          </v-btn>

                          <v-btn
                            flat
                            icon
                            color="primary"
                            @click="moreSkill(k)"
                            v-show="k == formData.skills.length-1"
                          >
                            <v-icon>mdi-bag-personal</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field
                      v-if="addingCharge"
                      name="charge-name"
                      label="Adicionar cargos"
                      v-model="formData.charge.name"
                      append-icon="mdi-content-save"
                      prepend-icon="mdi-close"
                      @click:prepend="handleAddCharge"
                      @click:append="addCharge"
                      @keyup.enter="addCharge"
                      hint="Introduza o nome do cargo que queres registar"
                    ></v-text-field>
                    <v-select
                      multiple
                      v-else
                      :items="charges"
                      v-model="formData.partner.charges"
                      label="Preferencias profissionais"
                      prepend-icon="mdi-plus-box"
                      item-text="name"
                      item-value="id"
                      chips
                      @click:prepend="handleAddCharge"
                    ></v-select>
                    
                    <small
                      v-for="(err, i) in formErrors.charge.name"
                      :key="i"
                      class="error--text"
                    >{{err}}</small>
                  </v-flex>
                </v-layout>

                <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
                <v-btn color="primary" type="submit" round>Seguinte</v-btn>
                <v-btn flat @click.native="cancel()" round>Sair</v-btn>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="7">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-subheader>Apresentação do Perfil</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <small>Apresentação do Perfil</small>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn color="primary" round @click="addPartner()">Guardar</v-btn>
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
import { multFormData } from "@mixins/HandleMultFormData";

import { getChargesDatas } from "@mixins/HelpersData";

export default {
  mixins: [multFormData, getChargesDatas],
  name: "",
  components: {},

  data: () => ({
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
    charge: {
      name: "",
      description: ""
    },
    formData: {
      partner: {
        name: "",
        lastname: "",
        gender: "",
        birthdate: "",
        ic: "",
        nif: "",
        avatar: "default.svg",
        cover: "default.png",
        color: "",
        status: "false",
        charges: []
      },

      charge: {
        name: "",
        description: ""
      },

      experiences: [
        {
          task: "",
          from: "",
          to: "",
          ongoing: false,
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
          ongoing: false,
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

      sites: [],
      socials: [],
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
    dictionary: validateDictionary,

    // tempLogoPreview: '',
    tempLogo: "",
    // tempCoverPreview: '',
    tempCover: ""
  }),

  created() {
    this.checkAuthUser();
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
    handleAddCharge() {
      this.addingCharge = !this.addingCharge;
      this.formErrors.charge = [];
      this.formData.charge.name = "";
    },
    resetToFrmDate(k) {
      this.formData.formations[k].to = "";
    },

    resetToExpDate(k) {
      this.formData.experiences[k].to = "";
    },

    addPartner() {
      axios
        .post("/api/v1/percursu/partners", this.$data.formData)
        .then(response => {
          window.getApp.$emit("APP_UPDATE_ALL_PARTNERS_DATA");
          this.$router.push({ name: "list-partners" });
        })
        .catch(err => {});
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
      this.$router.push({ name: "list-partners" });
    },

    nextStep(scope) {
      // this.$validator.validateAll(scope).then(result => {
      //   if (result) {
      this.step++;
      //   }
      // });
    },

    prevStep: function() {
      this.step--;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

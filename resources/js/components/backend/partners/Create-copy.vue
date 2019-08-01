<template>
  <v-container grid-list-lg fluid ma-0 pa-0>
    <v-layout row wrap>
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

            <v-stepper-step :complete="step > 6" step="6" editable>Habilidades e Preferencias</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="7" editable>Preferencias e Finalização</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
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
                  <v-subheader>Telefones e correios eletrónicos</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <template v-for="(phone,k) in formData.phones">
                    <v-layout row wrap :key="k+'p'">
                      <v-flex xs12 md3>
                        <v-select
                          :items="contactsType"
                          v-model="phone.type"
                          label="*Telefone"
                          item-text="name"
                          item-value="id"
                          box
                          v-validate="'required'"
                          :data-vv-name="'type'+k"
                          :error-messages="errors.collect('type'+k)"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md7>
                        <v-text-field
                          :name="'phone'+k"
                          :label="'*Número '+(k+1)"
                          v-model="phone.number"
                          box
                          v-validate="'required'"
                          :data-vv-name="'phone'+k"
                          :error-messages="errors.collect('phone'+k)"
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
                      >Atenção que numeros repitidos não serão guradados na base de dados!!</small>
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
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md7>
                        <v-text-field
                          :name="'email'+k"
                          :label="'Endereço '+(k+1)"
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

              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-subheader>Sítios e blogs</v-subheader>
                  <v-btn
                    round
                    depressed
                    v-if="formData.sites.length == 0"
                    @click="moreSite(0)"
                    color="primary"
                  >
                    <v-icon>mdi-earth</v-icon>Registar meus Sítios e Blogs
                  </v-btn>
                  <v-btn
                    round
                    depressed
                    v-if="formData.sites.length > 0"
                    @click="removeAllSites()"
                    color="warning"
                  >
                    <v-icon left>mdi-close-circle</v-icon>Remover Todos
                  </v-btn>

                  <template v-for="(site,k) in formData.sites">
                    <v-layout row wrap :key="k+'si'">
                      <v-flex xs12 md5>
                        <v-text-field
                          :name="'site'+k"
                          :label="'Ligação do Sítio '+(k+1)"
                          v-model="site.link"
                          v-validate="{url: {require_protocol: true }}"
                          :data-vv-name="'link'+k"
                          :error-messages="errors.collect('link'+k)"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          :name="'site'+k"
                          label="Descrição do sítio"
                          v-model="site.description"
                          v-validate="'required'"
                          :data-vv-name="'descriptiom'+k"
                          :error-messages="errors.collect('descriptiom'+k)"
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
                          flat
                          icon
                          color="primary"
                          @click="moreSite(k)"
                          v-show="k == formData.sites.length-1"
                        >
                          <v-icon>mdi-link-plus</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </template>
                </v-flex>

                <v-flex xs12>
                  <v-subheader>Ligações às redes sociais</v-subheader>
                  <v-btn
                    round
                    depressed
                    v-if="formData.socials.length == 0"
                    @click="moreSocial(0)"
                    color="primary"
                  >
                    <v-icon>mdi-share-variant</v-icon>Registar as minhas redes sociais
                  </v-btn>
                  <v-btn
                    round
                    depressed
                    v-if="formData.socials.length > 0"
                    @click="removeAllSocials()"
                    color="warning"
                  >
                    <v-icon left>mdi-close-circle</v-icon>Remover Todas
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
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md9>
                        <v-text-field
                          :name="'social-link'+k"
                          label="Ligação à conta"
                          v-model="social.link"
                          v-validate="'required'"
                          :data-vv-name="'social-link'+k"
                          :error-messages="errors.collect('social-link'+k)"
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
                          flat
                          icon
                          color="primary"
                          @click="moreSocial(k)"
                          v-show="k == formData.socials.length-1"
                        >
                          <v-icon>mdi-link-variant</v-icon>
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
                <v-flex xs12 md6>
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
                <v-flex xs12 md6>
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
                <v-flex xs12 md6>
                  <v-text-field
                    name="street"
                    label="Rua"
                    v-model="formData.address.street"
                    v-validate="'required'"
                    data-vv-name="street"
                    :error-messages="errors.collect('street')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    name="postcode"
                    label="Código Postal"
                    v-model="formData.address.postcode"
                    v-validate="'required'"
                    data-vv-name="postcode"
                    :error-messages="errors.collect('postcode')"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn flat @click.native="prevStep()" round>Anterior</v-btn>
              <v-btn @click.native="nextStep()" color="primary" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-layout row wrap>
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
                          :data-vv-name="'designation'+k"
                          :error-messages="errors.collect('designation'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field
                          prepend-icon="mdi-domain"
                          :name="'institution'+k"
                          label="Instituição"
                          v-model="formation.institution"
                          v-validate="'required'"
                          :data-vv-name="'institution'+k"
                          :error-messages="errors.collect('institution'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field
                          prepend-icon="mdi-map"
                          :name="'country'+k"
                          label="País"
                          v-model="formation.country"
                          v-validate="'required'"
                          :data-vv-name="'country'+k"
                          :error-messages="errors.collect('country'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field
                          prepend-icon="mdi-map-marker"
                          :name="'city'+k"
                          label="Cidade"
                          v-model="formation.city"
                          v-validate="'required'"
                          :data-vv-name="'city'+k"
                          :error-messages="errors.collect('city'+k)"
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
                            data-vv-as="from"
                            :error-messages="errors.collect('from')"
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
                            name="to"
                            slot="activator"
                            label="Conclusão"
                            prepend-icon="mdi-calendar"
                            readonly
                            :value="formation.to"
                            v-validate="'required|date_format:yyyy-MM|before:valTo'"
                            data-vv-as="to"
                            :error-messages="errors.collect('to')"
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
                          @change="resetToDate(k)"
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
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-layout row wrap>
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
                          :data-vv-name="'task'+k"
                          :error-messages="errors.collect('task'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field
                          prepend-icon="mdi-domain"
                          :name="'employer'+k"
                          label="Entidade empregadora"
                          v-model="experience.employer"
                          v-validate="'required'"
                          :data-vv-name="'employer'+k"
                          :error-messages="errors.collect('employer'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-textarea
                          label="Responsabilidades/Competencias desenvolvidas"
                          name="responsibility"
                          hint="Descreva aqui agumas responsabilidades ou competencias desenvolvidas"
                          v-model="experience.responsibility"
                          v-validate="'required'"
                          data-vv-name="responsibility"
                          :error-messages="errors.collect('responsibility')"
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
                            name="fromex"
                            slot="activator"
                            label="Início"
                            prepend-icon="mdi-calendar"
                            readonly
                            :value="experience.from"
                            v-validate="'required|date_format:yyyy-MM|before:valFromEx'"
                            data-vv-as="fromex"
                            :error-messages="errors.collect('fromex')"
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
                            name="toex"
                            slot="activator"
                            label="Conclusão"
                            prepend-icon="mdi-calendar"
                            readonly
                            :value="experience.to"
                            v-validate="'required|date_format:yyyy-MM|before:valToEx'"
                            data-vv-as="toex"
                            :error-messages="errors.collect('toex')"
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
                          @change="resetToDate(k)"
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
              <v-btn color="primary" @click.native="nextStep()" round>Seguinte</v-btn>
              <v-btn flat @click.native="cancel()" round>Sair</v-btn>
            </v-stepper-content>

            <v-stepper-content step="6">
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <template v-for="(skill,k) in formData.skills">
                    <v-layout row wrap :key="k+'sk'">
                      <v-flex xs11 md5>
                        <v-text-field
                          :name="'name'+k"
                          :label="'Designação '+(k+1)"
                          v-model="skill.name"
                          v-validate="'required'"
                          :data-vv-name="'name'+k"
                          :error-messages="errors.collect('name'+k)"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs11 md5>
                        <v-textarea
                          label="Descrição"
                          name="description"
                          v-model="skill.description"
                          v-validate="'required'"
                          data-vv-name="description"
                          :error-messages="errors.collect('description')"
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
                    name="charge"
                    label="Adicionar cargos"
                    append-icon="mdi-content-save"
                    prepend-icon="mdi-close"
                    @click:prepend="teste"
                    @click:append="saveAndUpdateCharge"
                    @keyup.enter="saveAndUpdateCharge"
                  ></v-text-field>
                  <v-select
                    multiple
                    v-else
                    :items="charges"
                    v-model="formData.partner.charges"
                    label="Preferencias profissionais"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="teste"
                  ></v-select>
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
// import {multFormData} from '@mixins/HandleMltFormData'
import { log } from "util";

export default {
  name: "",
  components: {},

  data: () => ({
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
      { id: 3, name: "Trabalho" },
      { id: 4, name: "Outros" }
    ],
    charges: ["Pessoal", "Casa", "Trabalho"],
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
    saveAndUpdateCharge() {
      this.addingCharge = !this.addingCharge;
    },

    teste() {
      this.addingCharge = !this.addingCharge;
    },

    resetToDate(k) {
      console.log("Por validar");
    },
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

    addPartner(addNew) {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("/api/v1/percursu/partners", this.$data.formData)
            .then(response => {
              // window.getApp.$emit("APP_UPDATE_ALL_PARTNERS_DATA")
              this.$router.push({ name: "list-partners" });
            })
            .catch(err => {});
        }
      });
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

    findRepeatedPhone(number) {
      this.repeatedPhone = false;
      for (var i = 0; i < this.formData.phones.length - 1; i++) {
        if (this.formData.phones[i].number == number) {
          this.repeatedPhone = true;
          return;
        }
      }
      this.repeatedPhone = false;
      return;
    },

    baseMoreData(index, obj, objEl) {
      obj.push(objEl);
    },

    baseRemoveData(index, obj) {
      obj.splice(index, 1);
    },

    morePhone(index) {
      this.findRepeatedPhone(this.formData.phones[index].number);
      if (!this.repeatedPhone) {
        this.baseMoreData(index, this.formData.phones, {
          number: "",
          type: ""
        });
      }
    },

    removePhone(index) {
      this.baseRemoveData(index, this.formData.phones);
    },

    moreEmail(index) {
      for (var i = 0; i < this.formData.couriers.length - 1; i++) {
        if (
          this.formData.couriers[i].email == this.formData.couriers[index].email
        )
          return;
      }
      this.formData.couriers.push({ email: "", type: "" });
    },

    removeEmail(index) {
      this.formData.couriers.splice(index, 1);
    },

    moreSocial(index) {
      this.formData.socials.push({ name: "", link: "" });
    },

    removeSocial(index) {
      this.formData.socials.splice(index, 1);
    },

    removeAllSocials() {
      this.formData.socials = [];
    },

    moreSite(index) {
      for (var i = 0; i < this.formData.sites.length - 1; i++) {
        if (this.formData.sites[i].link == this.formData.sites[index].link)
          return;
      }
      this.formData.sites.push({ link: "", description: "" });
    },

    removeSite(index) {
      this.formData.sites.splice(index, 1);
    },

    removeAllSites() {
      this.formData.sites = [];
    },

    moreFormation(index) {
      this.formData.formations.push({
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
      this.formData.formations.splice(index, 1);
    },

    moreExperience(index) {
      this.formData.experiences.push({
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
      this.formData.experiences.splice(index, 1);
    },

    moreSkill(index) {
      this.formData.skills.push({
        name: "",
        description: ""
      });
    },

    removeSkill(index) {
      this.formData.skills.splice(index, 1);
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

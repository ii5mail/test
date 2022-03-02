<template>
  <div id="top">
    <back-button @on_back="on_back_select" />
    <v-row class="mx-15 my-5">
      <v-icon class="mx-2">$vuetify.icons.location</v-icon>
      <div class="medium-font">Locations & Areas Served</div>
    </v-row>
    <v-row class="mx-15">
      <!-- Left Side Column containing OfficeLocation buttons -->
      <v-col cols="3" class="fill-height">
        <v-btn
          v-for="office_location in locations"
          :key="office_location.id"
          x-large
          block
          depressed
          class="location-btn pl-0 mb-2"
          :class="{ 'active-location': !add_new && curr_office_location.id === office_location.id }"
          @click="on_office_location_select(office_location)"
        >
          <div class="location-btn-text d-flex flex-column xs-font light-weight text-left">
            <div>{{office_location.office_type}}{{office_location.office_type == 'Headquarters' ? '' : ' Office'}}</div>
            <div>{{office_location.address_1}}</div>
            <div>{{office_location.city}}, {{office_location.state}}</div>
          </div>
        </v-btn>
        <v-btn
          v-if="add_new"
          x-large
          block
          depressed
          class="location-btn pl-0 mb-2"
          :class="{ 'active-location': add_new }"
        >
          <div class="location-btn-text d-flex flex-column xs-font light-weight text-left">
            <div>New Office Location</div>
            <div>{{ form.address_1 }}</div>
            <div v-if="form.city && form.state">{{ form.city }}, {{ form.state }}</div>
          </div>
        </v-btn>
        <div v-else class="mt-4 ml-4 primary--text small-font">
          <a @click="on_add_new()">Add New Office</a>
        </div>
      </v-col>
      <!-- Right Side Column containing OfficeLocation update form -->
      <v-col cols="9" class="pl-8 fill-height form-col">
        <v-form
          @submit.prevent="save_and_exit"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col>
              <div class="medium-font bold-weight">1. Office</div>
              <div class="small-font normal-weight">
                To receive the most relevant leads, enter the details below.
              </div>
            </v-col>
          </v-row>
          <v-row class="small-font primary-text--text">
            <v-col cols="6" class="pb-1 pt-0">
              <div>Office Type</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pb-1 pt-0 pr-5">
              <cb-select
                v-model="form.office_type"
                :items="office_type_choices"
                placeholder="Select Office Type"
                name="office_type"
                type="select"
                :menu-props="{ bottom: true, offsetY: true }"
                @change="$emit('input', true)"
              />
            </v-col>
          </v-row>
          <v-row class="small-font primary-text--text">
            <v-col cols="6" class="pb-1 pt-0">
              <div>Address 1*</div>
            </v-col>
            <v-col cols="6" class="pb-1 pt-0">
              <div>Address 2</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pb-1 pt-0 pr-5">
              <address-autocomplete-split
                v-model="form.full_address"
                placeholder="Address 1"
                @input="fill_address"
                :error="!!errors.address_1"
                :rules="rules.address_1"
              />
            </v-col>
            <v-col cols="6" class="pb-1 pt-0 pr-5">
              <cb-text-field
                v-model="form.address_2"
                outlined
                placeholder="Address 2"
                name="address_2"
                type="text"
                @input="$emit('input', true)"
              />
            </v-col>
          </v-row>
          <v-row class="small-font primary-text--text">
            <v-col cols="4" class="pb-1 pt-0">
              <div>City*</div>
            </v-col>
            <v-col cols="2" class="pb-1 pt-0">
              <div>State*</div>
            </v-col>
            <v-col cols="3" class="pb-1 pt-0">
              <div>Zip/Postal Code*</div>
            </v-col>
            <v-col cols="3" class="pb-1 pt-0">
              <div>Country*</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pb-1 pt-0 pr-5">
              <cb-text-field
                v-model="form.city"
                outlined
                placeholder="City"
                name="city"
                type="text"
                disabled
                @input="$emit('input', true)"
                hide-details="auto"
                :error="!!errors.city"
                :rules="rules.general"
              />
            </v-col>
            <v-col cols="2" class="pb-1 pt-0 pr-5">
              <cb-text-field
                v-model="form.state"
                outlined
                placeholder="State"
                name="state"
                type="text"
                disabled
                @input="$emit('input', true)"
                hide-details="auto"
                :error="!!errors.state"
                :rules="rules.not_empty"
              />
            </v-col>
            <v-col cols="3" class="pb-1 pt-0 pr-5">
              <cb-text-field
                v-model="form.zip_code"
                outlined
                placeholder="Zip/Postal Code"
                name="zip_code"
                type="text"
                disabled
                @input="$emit('input', true)"
                hide-details="auto"
                :error="!!errors.zip_code"
                :rules="rules.zip"
              />
            </v-col>
            <v-col cols="3" class="pb-1 pt-0 pr-5">
              <cb-select
                v-model="form.country"
                :items="country_choices"
                placeholder="Country"
                name="country"
                type="select"
                disabled
                :menu-props="{ bottom: true, offsetY: true }"
                @input="$emit('input', true)"
              />
            </v-col>
          </v-row>
          <v-row class="small-font primary-text--text">
            <v-col cols="6" class="pb-1 pt-0">
              <div>Main Number*</div>
            </v-col>
            <v-col cols="6" class="pb-1 pt-0">
              <div>General Email*</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pb-10 pt-0 pr-5">
              <cb-phone-input
                v-model="main_phone_number"
                :error="errors.phone_number"
                @format_number="val=>form.phone_number=val ? val : ''"
                @detect_change="val=>$emit('input', val)"
                ref="main_phone_input"
              />
              <!-- <cb-phone-input
                v-model="form.phone_number"
                @input="$emit('input', true)"
                :error="errors.phone_number"
              /> -->
            </v-col>
            <v-col cols="6" class="pb-1 pt-0 pr-5">
              <cb-text-field
                v-model="form.general_email"
                outlined
                placeholder="name@domain.com"
                name="email"
                type="text"
                @input="$emit('input', true)"
                hide-details="auto"
                :error="!!errors.general_email"
                :rules="rules.general_email"
              />
            </v-col>
          </v-row>
          <!-- <v-row v-if="curr_office_location.categories[0].supercategory?.supercategory?.name === 'Trade Partner'" class="small-font primary-text--text"> -->
          <v-row v-if="organization_type === 'Trade Partner'" class="small-font primary-text--text">
            <v-col cols="12" class="pb-1 pt-0">
              <div>Trades Performed Out Of This Office*</div>
            </v-col>
          </v-row>
          <!-- <v-row v-if="curr_office_location.categories[0].supercategory?.supercategory?.name === 'Trade Partner'"> -->
          <v-row v-if="organization_type === 'Trade Partner'">
            <v-col cols="12" class="pb-1 pt-0 pr-5">
              <cb-combobox
                placeholder="Start Typing a Trade or CSI Code"
                v-model="form.categories"
                :menu-props="{ bottom: true, offsetY: true }"
                :items="trade_type_choices"
                item-text="name"
                item-value="id"
                :search-input.sync="search_text"
                :return-object="true"
                height="100%"
                multiple
                @input="$emit('input', true)"
              >
                <template v-slot:selection="{ item }">
                  <v-chip class="xs-font light-blue-grey my-1 pr-1">
                    {{ item.name || item }}
                    <v-btn small icon @click="remove_category(item)">
                      <v-icon small>mdi-close</v-icon>
                    </v-btn>
                  </v-chip>
                </template>
              </cb-combobox>
            </v-col>
          </v-row>
          <div class="my-3"><br /></div>
          <v-row>
            <v-col>
              <div class="medium-font bold-weight">
                2. Areas Served For This Office
              </div>
              <div class="small-font normal-weight">
                Select the regions that you are able to serve.
              </div>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-btn
              class="mx-3 small-font primary"
              :class="{
                'primary-text white--text':
                  form.areas_served_precision === 'Nationwide',
              }"
              @click="on_areas_served_precision_change('Nationwide')"
              >Nationwide</v-btn
            >
            <v-btn
              class="mx-3 small-font primary"
              :class="{
                'primary-text white--text':
                  form.areas_served_precision === 'Statewide',
              }"
              @click="on_areas_served_precision_change('Statewide')"
              >Statewide</v-btn
            >
            <v-btn
              class="mx-3 small-font primary"
              :class="{
                'primary-text white--text': form.areas_served_precision === 'Countywide',
              }"
              @click="on_areas_served_precision_change('Countywide')"
              >By County</v-btn
            >
          </v-row>
          <v-row>
            <div class="map-container">
              <div class="google-map" id="map">
                <MglMap
                  id="mgl-map"
                  @load="on_map_create"
                  :accessToken="accessToken"
                  :mapStyle="mapStyle"
                  :center="mapConfig.center"
                  :zoom="mapConfig.zoom"
                  :minZoom="mapConfig.minZoom"
                  :maxZoom="mapConfig.maxZoom"
                  :doubleClickZoom="mapConfig.doubleClickZoom"
                  :scrollZoom="mapConfig.scrollZoom"
                  :boxZoom="mapConfig.boxZoom"
                  :touchZoomRotate="mapConfig.touchZoomRotate"
                  :dragPan="mapConfig.dragPan"
                  :dragRotate="mapConfig.dragRotate"
                >
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="background-layer"
                    :layer="mapBackgroundLayerConfig"
                  />
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="states-layer"
                    :layer="statesLayerConfig"
                    @click="add_area_served"
                    @mousemove="update_label"
                    @mouseleave="hide_label"
                  />
                  <MglGeojsonLayer
                    sourceId="counties"
                    :source="countiesSource"
                    layerId="counties-layer"
                    :layer="countiesLayerConfig"
                    @click="add_area_served"
                    @mousemove="update_label"
                    @mouseleave="hide_label"
                  />
                  <MglGeojsonLayer
                    sourceId="counties"
                    :source="countiesSource"
                    layerId="county-border-layer"
                    :layer="countiesBorderLayerConfig"
                  />
                  <MglGeojsonLayer
                    sourceId="states"
                    :source="statesSource"
                    layerId="states-border-layer"
                    :layer="statesBorderLayerConfig"
                  />
                  <MglPopup
                    :coordinates="labelConfig.coordinates"
                    :showed="labelConfig.showed"
                    :closeButton="labelConfig.closeButton"
                    :closeOnClick="labelConfig.closeOnClick"
                  >
                    <div>{{labelConfig.content}}</div>
                  </MglPopup>
                
                </MglMap>
              </div>
            </div>
            <!-- <img
              width="100%"
              height="100%"
              rel="preload"
              alt="Profile Picture"
              class="profile-img"
              src="~/assets/images/AreasServedFillerImage.png"
            /> -->
          </v-row>
          <v-row>
            <div class="pl-8 mt-4 xs-font bold-weight">Selected Areas</div>
          </v-row>
          <v-row v-if="form.areas_served" class="pl-4 pr-6">
            <v-col
              v-for="i in form.areas_served.length"
              :key="i"
              cols="6"
              class="py-0 d-flex align-center"
              :class="{
                'table-left': i % 2 === 1,
                'table-right': i % 2 === 0,
                'table-top': i === 1 || i === 2,
              }"
            >
              <div class="small-font normal-weight">
                {{ form.areas_served[i - 1].full_name }}
              </div>
              <div >
                <v-btn icon @click="remove_area_served(form.areas_served[i - 1].full_name)">
                  <v-icon color="black">mdi-close</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!-- <v-row class="pl-4 my-0 py-0">
            <v-checkbox v-model="checkbox" class="my-0 py-0">
              <template v-slot:label>
                <div class="d-flex align-center primary-text--text">
                  Will consider traveling
                  <cb-select
                    v-model="form.country"
                    class="mx-2 mt-6"
                    placeholder="# miles"
                    name="travel_distance"
                    type="select"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                  for jobs over
                  <cb-text-field
                    v-model="form.phone_number"
                    class="mx-2 mt-6"
                    outlined
                    placeholder="$"
                    name="phone_number"
                    type="text"
                  />
                </div>
              </template>
            </v-checkbox>
          </v-row>
          <v-row class="pl-4 my-0 py-0">
            <v-checkbox v-model="checkbox" class="my-0 py-0">
              <template v-slot:label>
                <div class="d-flex align-center primary-text--text">
                  Will consider traveling nationwide (continental U.S.) for jobs
                  over
                  <cb-text-field
                    v-model="form.phone_number"
                    class="mx-2 mt-6"
                    outlined
                    placeholder="$"
                    name="phone_number"
                    type="text"
                  />
                </div>
              </template>
            </v-checkbox>
          </v-row>
          <v-row class="pl-4 my-0 py-0">
            <v-checkbox v-model="checkbox" class="my-0 py-0">
              <template v-slot:label class="my-0 py-0">
                <div class="d-flex align-center primary-text--text">
                  Will consider any job with these GCs
                  <cb-text-field
                    v-model="form.phone_number"
                    class="mx-2 mt-6"
                    outlined
                    placeholder="Type to select"
                    name="phone_number"
                    type="text"
                  />
                </div>
              </template>
            </v-checkbox>
          </v-row>
          <v-row class="pl-4 my-0 py-0">
            <v-checkbox v-model="checkbox" class="my-0 py-0">
              <template v-slot:label class="my-0 py-0">
                <div class="d-flex align-center primary-text--text">
                  Will consider any job with these project managers
                  <cb-text-field
                    v-model="form.phone_number"
                    class="mx-2 mt-6"
                    outlined
                    placeholder="Type a Name"
                    name="phone_number"
                    type="text"
                  />
                </div>
              </template>
            </v-checkbox>
          </v-row> -->
          <div class="my-3"><br /></div>
          <v-row>
            <v-col>
              <div class="medium-font bold-weight">
                3. Contacts For This Location
              </div>
              <div class="small-font normal-weight">
                Enter all contacts you want displayed on Areas Served. e.g. Lead Estimator, Account, etc.
              </div>
            </v-col>
          </v-row>
          <div v-for="i in form.contacts.length" :key="i" class="mt-5">
            <v-row class="small-font medium-weight primary-text--text">
              <v-col cols="6" class="pb-1 pt-0">
                <div>
                Office Contact {{i}}
                <v-btn v-if="form.contacts.length > 1" icon small @click="open_delete_contact_dialog(form.contacts[i-1])">
                  <v-icon small>$vuetify.icons.trash_can</v-icon>
                </v-btn>
              </div>
              </v-col>
            </v-row>
            <v-row class="small-font primary-text--text">
              <v-col cols="3" class="pb-1 pt-0">
                <div>First Name*</div>
              </v-col>
              <v-col cols="3" class="pb-1 pt-0">
                <div>Last Name*</div>
              </v-col>
              <v-col cols="6" class="pb-1 pt-0">
                <div>Title*</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pb-1 pt-0 pr-5">
                <cb-text-field
                  v-model="form.contacts[i-1].first_name"
                  outlined
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  @input="$emit('input', true)"
                  :error="errors.first_name"
                  :rules="rules.general"
                />
              </v-col>
              <v-col cols="3" class="pb-1 pt-0 pr-5">
                <cb-text-field
                  v-model="form.contacts[i-1].last_name"
                  outlined
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  @input="$emit('input', true)"
                  :error="!!errors.last_name"
                  :rules="rules.general"
                />
              </v-col>
              <v-col cols="6" class="pb-1 pt-0 pr-5">
                <cb-text-field
                  v-model="form.contacts[i-1].title"
                  outlined
                  placeholder="Title"
                  name="title"
                  type="text"
                  @input="$emit('input', true)"
                  :error="!!errors.title"
                  :rules="rules.general"
                />
              </v-col>
            </v-row>
            <v-row class="small-font primary-text--text">
              <v-col cols="6" class="pb-1 pt-0">
                <div>Mobile Phone*</div>
              </v-col>
              <v-col cols="6" class="pb-1 pt-0">
                <div>Office Phone*</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pb-10 pt-0 pr-5">
                <cb-phone-input
                  v-model="contacts_mobile_num[i-1]"
                  :error="!!errors.mobile_phone_number"
                  @format_number="val=>form.contacts[i-1].mobile_phone_number=val ? val : ''"
                  @detect_change="val=>$emit('input', val)"
                  ref="mobile_phone_input"
                />
              </v-col>
              <v-col cols="6" class="pb-1 pt-0 pr-5">
                <cb-phone-input
                  v-model="contacts_office_num[i-1]"
                  :error="!!errors.office_phone_number"
                  @format_number="val=>form.contacts[i-1].office_phone_number=val ? val : ''"
                  @detect_change="val=>$emit('input', val)"
                  ref="office_phone_input"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pb-1 pt-0">
                <div>Email*</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pb-1 pt-0 pr-5">
                <cb-text-field
                  v-model="form.contacts[i-1].email"
                  outlined
                  placeholder="name@domain.com"
                  name="email"
                  type="text"
                  @input="$emit('input', true)"
                  :error="!!errors.email"
                  :rules="rules.general_email"
                />
              </v-col>
            </v-row>
          </div>
          <div class="mb-8">
            <v-btn
              depressed
              class="px-0 white primary--text small-font light-weight"
              @click="add_new_contact()"
              >Add Another Office Contact</v-btn
            >
          </div>
          <v-row
            class="
              d-flex
              flex-row-reverse
              align-center
              justify-space-between
              pr-5
              pl-3
            "
          >
            <div class="d-flex flex-row-reverse align-center">
              <cb-btn
                type="submit"
                color="primary"
                width="110px"
                height="50px"
                :loading="saving"
                depressed
              >
                Save
              </cb-btn>
              <cb-btn
                class="mr-4"
                color="primary"
                text
                depressed
                @click="save_office_location(true)"
              >
                Save and Add Another
              </cb-btn>
              <!-- <div
                class="
                  xs-font
                  bold-weight
                  primary--text
                  text-decoration-underline
                  mr-5
                "
                @click="save_office_location(true)"
              >
                Save and Add Another
              </div> -->
            </div>
            <div
              v-if="locations.length > 1"
              class="
                xs-font
                bold-weight
                error--text
                text-decoration-underline
                mr-5
              "
              @click="open_delete_location_dialog"
            >
              Remove This Office
            </div>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <confirm-delete-location-dialog v-model="show_delete_location_dialog" :location="curr_office_location"/>
    <confirm-delete-contact-dialog v-model="show_delete_contact_dialog" :contact="curr_contact" @delete_contact="delete_office_contact"/>
    <confirm-leave-page-dialog
      v-model="show_leave_dialog"
      @on_secondary_action="no_save_and_continue"
      @on_action="save_and_continue"
      title="There is Unsaved Data"
      msg="You have entered new information and haven't saved. Do you want to save or continue without saving?"
      action_btn_text="Save"
      cancel_btn_text="Continue, without Saving"
      :loading="saving"
    />
  </div>
</template>

<script>
    import mapboxgl from "mapbox-gl";
    import states from "./states.json"
    import counties from "./counties.json";
    import { cloneDeep } from 'lodash';
    import BackButton from "../../../ui/BackBtn.vue";
    import CbTextField from "../../../ui/CbTextField";
    import CbSelect from "../../../ui/CbSelect.vue";
    import CbCombobox from "../../../ui/CbCombobox.vue";
    import CbBtn from "../../../ui/CbBtn.vue";
    import ConfirmDeleteLocationDialog from "./ConfirmDeleteLocationDialog.vue"
    import ConfirmDeleteContactDialog from "./ConfirmDeleteContactDialog.vue"
    import ConfirmLeavePageDialog from "../../../ui/ConfirmLeavePageDialog.vue"
    import AddressAutocompleteSplit from "./AddressAutocompleteSplit.vue"
    import CbPhoneInput from '../../../ui/CbPhoneInput.vue'
    import { get_place_details } from "../../../registration/reg2/Workplace/utils"

    export default {
        components: {
            AddressAutocompleteSplit,
            BackButton,
            CbTextField,
            CbSelect,
            CbCombobox,
            CbBtn,
            ConfirmDeleteLocationDialog,
            ConfirmDeleteContactDialog,
            ConfirmLeavePageDialog,
            CbPhoneInput,
        },
        name: "EditLocations",
        props: {
            locations: Array,
            org_id: Number,
            value: Boolean,
            organization_type: String,
            selected_location: Number,
        },
        data() {
            return {
                curr_office_location: this.locations.length ? this.locations[0] : null,
                add_new: false,
                change_made: false,
                main_phone_number: '',
                contacts_mobile_num: [],
                contacts_office_num: [],
                form: {
                    office_type: "",
                    full_address: "",
                    address_1: "",
                    address_2: "",
                    city_state: "",
                    city: "",
                    state: "",
                    zip_code: "",
                    country: "US",
                    phone_number: null,
                    general_email: "",
                    categories: [],
                    areas_served_precision: "Countywide",
                    areas_served: [{state: "Texas"}],
                    contacts: [],
                },
                rules: {
                    general: [
                        value => !!value || 'Required.',
                        value => (value && value.length >= 2) || 'Min 2 characters',
                    ],
                    address_1: [
                        value => !!value || 'Required',
                        () => (!!this.form.full_address?.value) || 'Select address from dropdown'
                    ],
                    zip: [
                        value => !!value || 'Required.',
                        value => (value && value.length === 5) || 'Zip must be 5 digits',
                    ],
                    general_email: [
                        value => !!value || 'Required.',
                        value => {
                            if (value && value.includes('@')) {
                                let split_email = value.split('@')
                                let split_domain = split_email[1]?.split('.')
                                if (!split_email[1].includes('.') || split_email[0] === '' || split_domain[1] === '' || split_domain[0] === '') {
                                    return 'Not a valid email'
                                }
                                return true
                            } else {
                                return 'Not a valid email'
                            }
                        },
                    ],
                    not_empty: [
                        value => !!value || 'Required.',
                    ],

                },
                valid: true,
                location_queue: null,
                curr_contact: null,
                office_type_choices: ["Headquarters", "Satellite", "Area", "Regional"],
                country_choices: ["US"],
                trade_type_choices: [],
                num_new_contacts: 0,
                search_text: null,
                saving: false,
                errors: {},
                show_delete_location_dialog: false,
                show_delete_contact_dialog: false,
                show_leave_dialog: false,
                // map data
                // map: {},
                label: {},
                accessToken: "pk.eyJ1IjoiZGF2aWR0ZXJyYWwiLCJhIjoiY2tyZDJvYXR6MW5xYzJvbHFndWs5eHU2ZSJ9.WjbhNg0OGN6EBnJCzN517Q",
                mapStyle: "mapbox://styles/mapbox/light-v10",
                statesSource: {
                  type: "geojson",
                  data: states
                },
                countiesSource: {
                  type: "geojson",
                  data: counties
                },
                mapConfig: {
                  center: [-96.04, 34.907],
                  zoom: 3.15,
                  maxZoom: 10,
                  minZoom: 3.15,
                  doubleClickZoom: false,
                  scrollZoom: true,
                  boxZoom: false,
                  touchZoomRotate: false,
                  dragPan: true,
                  dragRotate: false,

                },
                statesBorderLayerConfig: {
                  id: "states-borders",
                  type: "line",
                  paint: {
                      "line-color": "white",
                      "line-width": 2,
                  },
                },
                mapBackgroundLayerConfig: {
                  id: "map-background",
                  type: "background",
                  paint: {
                      "background-color": "#ECECEE",
                  },
                },
                labelConfig: {
                  id: "map-label",
                  coordinates: [0,0],
                  showed: false,
                  closeButton: false,
                  closeOnClick: false,
                  content: "",
                },
                areas_selected: [],
            };
        },
        mounted() {
            if(!this.locations.length) {
                this.add_new = true
            }
            if (this.selected_location > -1) {
                this.curr_office_location = this.locations.find(location => location.id === this.selected_location)
            }
            this.$nextTick(() => {
                this.update_form()
            })
        },
        computed: {
            full_address() {
                return this.form.full_address
            },
            statesLayerConfig() {
              return {
                id: "states-layer",
                type: "fill",
                layout: {
                  visibility: this.form.areas_served_precision === "Statewide" ? "visible" : "none"
                },
                paint: {
                    "fill-color": [
                        "case",
                        [
                            "in",
                            ["get", "NAME"],
                            ["literal", this.areas_selected],
                        ],
                        "#313D4F",
                        "#4495D1",
                    ],
                },
              }
            },
            countiesLayerConfig() {
              return {
                id: "counties-layer",
                type: "fill",
                layout: {
                  visibility: this.form.areas_served_precision === "Countywide" ? "visible" : "none"
                },
                paint: {
                    "fill-color": [
                        "case",
                        [
                            "in",
                            ["get", "FULL_NAME"],
                            ["literal", this.areas_selected],
                        ],
                        "#313D4F",
                        "#4495D1",
                    ],
                },
              }
            },
            countiesBorderLayerConfig() {
              return {
                id: "county-border-layer",
                type: "line",
                layout: {
                  visibility: this.form.areas_served_precision === "Countywide" ? "visible" : "none"
                },
                paint: {
                    "line-color": "#d1d1d1",
                    "line-width": 1,
                },
              }
            },
        },
        watch: {
            search_text() {
                this.get_list();
            },
            value() {
                this.change_made = this.value
            },
            full_address() {
                if (!this.form.full_address) {
                    this.form.address_1 = ''
                }
            },
        },
        methods: {
            get_list: _.debounce(async function () {
                this.trade_type_choices = await this.$store.dispatch(
                    "categories/get_tertiary_categories",
                    this.search_text
                );
            }, 250),
            on_map_create(event) {
              this.map = event.map
            },
            update_label(event) {
              if(event.mapboxEvent.features){
                this.labelConfig.coordinates = [event.mapboxEvent.lngLat.lng, event.mapboxEvent.lngLat.lat]
                this.labelConfig.content = event.mapboxEvent.features[0].properties.FULL_NAME || event.mapboxEvent.features[0].properties.NAME
                this.labelConfig.showed = true
              }
            },
            hide_label(event) {
              this.labelConfig.showed = false
            },
            on_areas_served_precision_change(precision) {
                this.form.areas_served_precision = precision;
                this.form.areas_served = []
                this.areas_selected = []
            },
            add_area_served(event) {
                if(this.form.areas_served_precision === "Statewide"){
                  let added_country = "US"
                  let added_state = event.mapboxEvent.features[0].properties.NAME
                  if (!this.form.areas_served.find((el) => el.state === added_state)) {
                    this.form.areas_served.push({
                      country: added_country,
                      state: added_state,
                      full_name: added_state
                    });
                  } else {
                      this.form.areas_served = this.form.areas_served.filter( area => area.state !== added_state)
                  }
                } else if (this.form.areas_served_precision === "Countywide") {
                  let added_country = "US"
                  let added_state = event.mapboxEvent.features[0].properties.STATE
                  let added_county = event.mapboxEvent.features[0].properties.NAME
                  let added_full_name = event.mapboxEvent.features[0].properties.FULL_NAME
                  if (!this.form.areas_served.find((el) => (el.state === added_state) && (el.county === added_county))) {
                    this.form.areas_served.push({
                      country: added_country,
                      state: added_state,
                      county: added_county,
                      full_name: added_full_name,
                    });
                  } else {
                      this.form.areas_served = this.form.areas_served.filter( area => area.full_name !== added_full_name)
                  }
                }
                this.areas_selected = this.form.areas_served.map(el => el.full_name)
                
            },
            remove_area_served(area_served) {
              if(this.form.areas_served_precision === "Statewide"){
                this.form.areas_served = this.form.areas_served.filter((el) => el.state !== area_served);
                this.areas_selected = this.form.areas_served.map(el => el.state)
              } else if(this.form.areas_served_precision === "Countywide"){
                this.form.areas_served = this.form.areas_served.filter((el) => el.full_name !== area_served);
                this.areas_selected = this.form.areas_served.map(el => el.full_name)
              }
            },
            on_back_select() {
                this.$emit("set_edit", false);
            },
            update_form() {
                this.contacts_mobile_num = []
                this.contacts_office_num = []
                if(this.add_new) {
                    this.main_phone_number = null
                    this.form = {
                        office_type: this.locations.length ? "Satellite" : "Headquarters",
                        full_address: "",
                        address_1: "",
                        address_2: "",
                        city_state: "",
                        city: "",
                        state: "",
                        zip_code: "",
                        country: "US",
                        phone_number: null,
                        general_email: "",
                        categories: [],
                        areas_served_precision: "",
                        areas_served: [],
                        contacts: [],
                    }
                    this.add_new_contact()
                } else {
                    this.form = {
                        ...this.curr_office_location,
                        full_address: this.curr_office_location.address_1,
                        contacts: _.cloneDeep(this.curr_office_location.contacts),
                        areas_served: _.cloneDeep(this.curr_office_location.areas_served),
                    }
                    if (this.curr_office_location.phone_number) {
                        this.form.phone_number = this.curr_office_location.phone_number
                        this.main_phone_number = '(' + this.form.phone_number.slice(2, 5) + ') ' + this.form.phone_number.slice(5, 8) + '-' + this.form.phone_number.slice(8)
                    }
                    if (this.form.contacts.length) {
                        this.form.contacts.forEach((contact, i) => {
                            if (this.curr_office_location.contacts[i].mobile_phone_number) {
                                contact.mobile_phone_number = this.curr_office_location.contacts[i].mobile_phone_number
                                this.contacts_mobile_num.push('(' + contact.mobile_phone_number.slice(2, 5) + ') ' + contact.mobile_phone_number.slice(5, 8) + '-' + contact.mobile_phone_number.slice(8))
                            }
                            if (this.curr_office_location.contacts[i].office_phone_number) {
                                contact.office_phone_number = this.curr_office_location.contacts[i].office_phone_number
                                this.contacts_office_num.push('(' + contact.office_phone_number.slice(2, 5) + ') ' + contact.office_phone_number.slice(5, 8) + '-' + contact.office_phone_number.slice(8))
                            }
                        })
                    } else {
                        this.add_new_contact()
                    }
                }
                if (this.form.areas_served){
                  this.areas_selected = this.form.areas_served.map(el => el.full_name)
                }

                this.$emit('input', false)
                this.$nextTick(() => {
                    this.$refs.form.resetValidation()
                    this.$refs.main_phone_input.update_reset_error(true)
                    this.$refs.mobile_phone_input[0].update_reset_error(true)
                    this.$refs.office_phone_input[0].update_reset_error(true)
                })
                this.errors = {}
            },
            async fill_address() {
                if (this.form.full_address) {
                    if (this.form.full_address.value) {
                        let place_id = this.form.full_address.id
                        let split_address = this.form.full_address.value.split(', ')
                        const loc_data = await get_place_details(place_id)

                        this.form = {
                            ...this.form,
                            zip_code: loc_data.zip_code,
                            address_1: split_address[0],
                            location: loc_data.location,
                            city: split_address[1],
                            state: split_address[2]
                        }

                        this.$emit('input', true)
                    } else {
                        this.form.full_address = ''
                    }
                }
            },
            open_delete_location_dialog() {
                this.show_delete_location_dialog = true;
            },
            open_delete_contact_dialog(contact) {
                this.curr_contact = contact
                this.show_delete_contact_dialog = true;
            },
            on_office_location_select(office_location) {
                // if (!this.value) {
                if (!this.change_made) {
                    this.curr_office_location = office_location;
                    this.add_new = false
                    this.update_form()
                    // TODO: add in confirmation modal letting user know unsaved changes will be erased
                } else {
                    this.location_queue = office_location
                    this.show_leave_dialog = true
                }
            },
            no_save_and_continue() {
                this.show_leave_dialog = false
                this.$emit('input', false)
                this.$nextTick(() => {
                    if (this.location_queue) {
                        this.on_office_location_select(this.location_queue)
                        this.location_queue = null
                    } else {
                        this.on_add_new()
                    }
                })
            },
            async save_and_continue() {
                try {
                    this.show_leave_dialog = true
                    let res = await this.save_office_location()
                    this.show_leave_dialog = false
                    if (res) {
                        if (this.location_queue) {
                            this.on_office_location_select(this.location_queue)
                            this.location_queue = null
                        } else {
                            this.on_add_new()
                        }
                    } else {
                        throw ('Error Occured')
                    }
                } catch(error) {
                    console.log(error)
                }
            },
            on_add_new() {
                // if (!this.value) {
                if (!this.change_made) {
                    this.add_new = true
                    this.update_form()
                } else {
                    this.show_leave_dialog = true
                }
            },
            add_new_contact() {
                this.num_new_contacts++
                this.form.contacts.push({
                    id: -this.num_new_contacts, // negative id is used as a check to see if we have to post or patch the contact
                    office_location: this.curr_office_location.id,
                    first_name: "",
                    last_name: "",
                    title: "",
                    email: "",
                    mobile_phone_number: "",
                    office_phone_number: "",
                    format_mobile_num: "",
                    format_office_num: "",
                })
                this.contacts_mobile_num.push(null)
                this.contacts_office_num.push(null)
            },
            async save_and_exit() {
                try {
                    const res = await this.save_office_location()
                    if (res) {
                        this.on_back_select()
                    } else {
                        throw ('Error Occurred')
                    }
                } catch(e) {
                    console.log(e)
                }
            },
            async delete_office_contact(contact){
                if(contact.id > 0) {
                    try {
                        await this.$axios.delete(`/api/office_contacts/${contact.id}/delete_contact/`)
                        // await this.$store.dispatch('organizations/get_current', this.organization.id)
                    } catch (e) {
                        console.error(e)
                    }
                }
                this.form.contacts = this.form.contacts.filter( c => c.id !== contact.id)
                if(this.form.contacts.length == 0) { // make sure at least one form is showing at all times
                    this.add_new_contact()
                }
            },
            remove_category(item) {
                this.form.categories = this.form.categories.filter( ({id}) => id !== item.id )
                this.$emit('input', true)
            },
            async save_office_location(add_another = false) {
                const payload = { ...this.form }
                const categories = []
                payload.categories.forEach(({ id }) => {
                    categories.push(id)
                })
                payload.categories = categories

                const contacts = [...payload.contacts]
                delete payload.contacts

                try {
                    this.saving = true;
                    var response = null;
                    if(this.add_new){
                        payload.organization = this.org_id
                        response = await this.$axios.post(`/api/office_locations/`, payload)
                    } else {
                        await this.$axios.patch(`/api/office_locations/${payload.id}/`, payload)
                    }
                    for(var i=0; i<contacts.length; i++) {
                        if(contacts[i].id > 0) {
                            await this.$axios.patch(`/api/office_contacts/${contacts[i].id}/`, contacts[i])
                        } else {
                            if(this.add_new){
                                contacts[i].office_location = response.data.id
                            }
                            await this.$axios.post(`/api/office_contacts/`, contacts[i])
                        }
                    }
                    await this.$store.dispatch('organizations/get_current', this.org_id)
                    this.$emit('input', false)
                    if(add_another) {
                        this.add_new = true;
                        this.update_form()
                        document.getElementById("top").scrollIntoView({behavior: "smooth"})
                    } else {
                        this.add_new = false;
                        this.errors = {}
                    }
                    this.$snackbar.show_message({ content: 'Information Updated!', type: 'success' })
                    return payload
                } catch(e) {
                    if (e.response) {
                        if (e.response.status === 500) {
                            this.errors = { detail: "Error Occurred" }
                        } else {
                            this.errors = e.response.data
                        }
                    } else {
                        this.errors = { 'detail': "Error Occurred" }
                    }
                    this.$snackbar.show_message({ content: 'Please fix errors and try again', type: 'error' })
                    document.getElementById("top").scrollIntoView({behavior: "smooth"})
                    console.log(this.errors)
                } finally {
                    this.saving = false;
                }
            },
        },
    };
</script>

<style lang="stylus" scoped>
v-btn span {
  background-color: black;
}

.form-col {
  border-left: 1px solid grey;
}

.table-left {
  border: 1px solid grey;
  border-top: none;
}

.table-right {
  border: 1px solid grey;
  border-left: none;
  border-top: none;
}

.table-top {
  border-top: 1px solid grey;
}

.location-btn {
  background: transparent !important;
}

.location-btn-text {
  width: 100%;
  margin-left: 16px;
}

.active-location {
  background: var(--v-primary-base) !important;
  color: white !important;
}

.map-container {
  min-width: 100%;
  height: 545px;
}

.google-map {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
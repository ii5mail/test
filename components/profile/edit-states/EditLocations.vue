<template>
  <div>
    <back-button @on_back="on_back_select" />
    <v-row class="ma-15">
      <v-col cols="10" class="fill-height">
        <v-row class="mb-6">
          <div class="small-font">
            Headquarters address is taken from the overview page.
          </div>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Office Type</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.size"
              placeholder="Select Office Type"
              name="size"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Headquarters Address 1</div>
          </v-col>
          <v-col cols="4" class="pb-1 pt-0 px-5">
            <div>City</div>
          </v-col>
          <v-col cols="2" class="pb-1 pt-0 px-5">
            <div>State</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.address_line_1"
              outlined
              placeholder="Address 1"
              name="address_1"
              type="text"
            />
          </v-col>
          <v-col cols="4" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.city"
              outlined
              placeholder="City"
              name="city"
              type="text"
            />
          </v-col>
          <v-col cols="2" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.state"
              placeholder="State"
              name="state"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Address 2</div>
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 px-5">
            <div>Zip/Postal Code</div>
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 px-5">
            <div>Country</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.address_line_2"
              outlined
              placeholder="Address 2"
              name="address_2"
              type="text"
            />
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.zip_code"
              outlined
              placeholder="Zip/Postal Code"
              name="zip_code"
              type="text"
            />
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.country"
              placeholder="Country"
              name="country"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Website</div>
          </v-col>
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Phone Number</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.website"
              outlined
              placeholder="Website"
              name="website"
              type="text"
            />
          </v-col>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-phone-input
              v-model="form.phone_number"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="12" class="pb-1 pt-0 px-5">
            <div>This Office's Trades</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pb-1 pt-0 pr-5">
            <cb-combobox
              placeholder="i.e. Janitorial Services"
              v-model="selected"
              :menu-props="{ bottom: true, offsetY: true }"
              :items="list_items"
              item-text="name"
              item-value="id"
              :search-input.sync="search_text"
              :return-object="true"
              :height="50"
              multiple
            >
              <template v-slot:selection="{ item }">
                <v-chip class="xs-font light-blue-grey">
                  {{ item.name || item }}
                </v-chip>
              </template>
            </cb-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <hr class="my-8 grey mr-2" size="2px" />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Office Type</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.size"
              placeholder="Select Office Type"
              name="size"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Headquarters Address 1</div>
          </v-col>
          <v-col cols="4" class="pb-1 pt-0 px-5">
            <div>City</div>
          </v-col>
          <v-col cols="2" class="pb-1 pt-0 px-5">
            <div>State</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.address_line_1"
              outlined
              placeholder="Address 1"
              name="address_1"
              type="text"
            />
          </v-col>
          <v-col cols="4" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.city"
              outlined
              placeholder="City"
              name="city"
              type="text"
            />
          </v-col>
          <v-col cols="2" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.state"
              placeholder="State"
              name="state"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Address 2</div>
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 px-5">
            <div>Zip/Postal Code</div>
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 px-5">
            <div>Country</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.address_line_2"
              outlined
              placeholder="Address 2"
              name="address_2"
              type="text"
            />
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.zip_code"
              outlined
              placeholder="Zip/Postal Code"
              name="zip_code"
              type="text"
            />
          </v-col>
          <v-col cols="3" class="pb-1 pt-0 pr-5">
            <cb-select
              v-model="form.country"
              placeholder="Country"
              name="country"
              type="select"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Website</div>
          </v-col>
          <v-col cols="6" class="pb-1 pt-0 px-5">
            <div>Phone Number</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-text-field
              v-model="form.website"
              outlined
              placeholder="Website"
              name="website"
              type="text"
            />
          </v-col>
          <v-col cols="6" class="pb-1 pt-0 pr-5">
            <cb-phone-input
              v-model="form.phone_number"
            />
          </v-col>
        </v-row>
        <v-row class="small-text primary-text--text">
          <v-col cols="12" class="pb-1 pt-0 px-5">
            <div>This Office's Trades</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pb-1 pt-0 pr-5">
            <cb-combobox
              placeholder="i.e. Janitorial Services"
              v-model="selected"
              :menu-props="{ bottom: true, offsetY: true }"
              :items="list_items"
              item-text="name"
              item-value="id"
              :search-input.sync="search_text"
              :return-object="true"
              :height="50"
              multiple
            >
              <template v-slot:selection="{ item }">
                <v-chip class="xs-font light-blue-grey">
                  {{ item.name || item }}
                </v-chip>
              </template>
            </cb-combobox>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-row-reverse align-center pr-5">
          <cb-btn
            type="submit"
            color="primary"
            width="110px"
            height="50px"
            :disabled="!form"
            depressed
          >
            Save
          </cb-btn>
          <div
            class="xs-font bold-weight primary--text text-decoration-underline mr-5"
          >
            Save and Add Another
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import BackButton from "../../ui/BackBtn.vue";
    import CbTextField from "../../ui/CbTextField";
    import CbSelect from "../../ui/CbSelect.vue";
    import CbCombobox from "../../ui/CbCombobox.vue";
    import CbBtn from "../../ui/CbBtn.vue";
    import CbPhoneInput from '../../ui/CbPhoneInput.vue';

    export default {
        name: "EditLocations",
        data() {
            return {
                form: {
                    name: "",
                    address_line_1: "",
                    address_line_2: "",
                    city: "",
                    state: "",
                    zip_code: "",
                    country: "USA",
                    website: "",
                    phone_number: "",
                    size: "",
                    ownership_type: "",
                    description: "",
                    logo: "",
                },
                list_items: [],
                search_text: null,
                selected: null,
            };
        },
        components: {
            BackButton,
            CbTextField,
            CbSelect,
            CbCombobox,
            CbBtn,
            CbPhoneInput,
        },
        watch: {
            search_text() {
                this.get_list();
            },
        },
        methods: {
            get_list: _.debounce(async function () {
                this.list_items = await this.$store.dispatch(
                    "categories/get_tertiary_categories",
                    this.search_text
                );
            }, 250),
            on_back_select() {
                this.$emit("set_edit", false);
            },
        },
    };
</script>

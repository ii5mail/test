<template>
  <div>
    <v-dialog
        persistent
        max-width="630px"
        :value="value"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-col
            v-bind="attrs"
            v-on="on"
            cols="6"
            class="delete small-font red--text"
        >
            Delete Your Profile
        </v-col>
      </template> -->
      <v-card>
        <div class="d-flex flex-row-reverse pa-4">
          <v-btn
            icon
            @click="$emit('input', !value)"
          >
            <v-icon large color="primary-text">mdi-close</v-icon>
          </v-btn>
        </div>
        <v-container class="px-16 pb-8 small-font primary-text--text">
          <div class="mb-4 large-font light-weight primary-text--text">Delete This Location?</div>
          <div v-if="this.location.address_1">{{this.location.address_1}}</div>
          <div v-if="this.location.address_2">{{this.location.address_2}}</div>
          <div class="mb-4" v-if="this.location.city && this.location.state">{{this.location.city}}, {{this.location.state}}</div>
          <div class="mb-1">Type DELETE to remove this office.</div>
          <cb-text-field
            v-model="confirm_delete"
            outlined
            name="confirm_delete"
          />
          <div class="d-flex flex-row-reverse mt-6">
            <cb-btn
              @click="close_dialog"
              color="primary"
              width="134px"
              height="55px"
              depressed
            >
              Delete
            </cb-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CbBtn from "../../../ui/CbBtn.vue";
import CbTextField from '../../../ui/CbTextField.vue';

export default {
  components: {
    CbBtn,
    CbTextField,
  },
  props: {
    value: Boolean,
    location: Object
  },
  name: "ConfirmDeleteDialog",
  data() {
    return {
      dialog: false,
      confirm_delete: '',
    };
  },
  methods: {
    async close_dialog() {
      if (this.confirm_delete === 'DELETE') {
        await this.$axios.delete(`organizations/office_locations/${this.location.id}/`)
        this.$emit('input', !this.value);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
    .delete
        cursor pointer
</style>

<template>
  <div>
    <v-dialog
        persistent
        max-width="450px"
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
          <div class="mb-12 medium-font light-weight primary-text--text">Delete This Contact?</div>
          <div class="d-flex flex-row-reverse justify-space-between mt-6">
            <cb-btn
              @click="delete_contact"
              color="primary"
              width="134px"
              height="55px"
              depressed
            >
              Delete
            </cb-btn>
            <v-btn
              depressed
              class="px-0 white primary--text small-font light-weight"
              height="55px"
              @click="close_dialog"
              >Cancel</v-btn
            >
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
    contact: Object
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
      this.$emit('input', !this.value);
    },
    async delete_contact() {
      this.$emit('delete_contact', this.contact)
      this.close_dialog()
    }
  },
};
</script>

<style lang="stylus" scoped>
    .delete
        cursor pointer
</style>

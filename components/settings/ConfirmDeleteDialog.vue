<template>
  <div>
    <v-dialog
        max-width="630px"
        :value="value"
        persistent
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
          <div class="mb-4 large-font light-weight primary-text--text">Delete Your Account?</div>
          <div class="mb-8">Deleting your account will remove all data associated to your name. Added companies &#38 projects will still be present.</div>
          <div>Type DELETE if you want to delete your account &#38 data.</div>
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
import CbBtn from "../ui/CbBtn.vue";
import CbTextField from '../ui/CbTextField.vue';

export default {
  components: {
    CbBtn,
    CbTextField,
  },
  props: {
    value: Boolean
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
        await this.$axios.post('api/users/deactivate_account/')
        location.reload()
        // await this.$router.push('/login')
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

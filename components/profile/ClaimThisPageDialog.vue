<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <cb-btn
        v-bind="attrs"
        v-on="on"
        class="mr-8 claim-btn"
        width="130px"
        height="50px"
        depressed
        :disabled="claim_sent"
      >
       {{claim_sent ? 'Claimed' : 'Claim This Page'}} 
      </cb-btn>
    </template>
    <v-card class="rounded-xl">
      <div class="d-flex flex-row-reverse pa-4">
        <v-btn icon @click="close_dialog">
          <v-icon large color="primary-text">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-container class="px-8 pb-8 font-18 primary-text--text">
        <v-form @submit.prevent>
          <div v-if="step===1">
            <div class="medium-font light-weight">
              <v-icon class="primary--text mr-1 p-2"> $vuetify.icons.info </v-icon>
              Claim This Page 
            </div>
           

            <div>
            <p class="mb-7"><strong>Domain: </strong>{{ organization.domain_name ? organization.domain_name : 'unknown' }}</p>
            <p class="mb-4">Select How to Continue </p>
            <v-radio-group v-model="claim_option" class="mb-14">
              <v-radio
               v-if="!unmatched && unattached || !unmatched"
                value="identity"
                class="mb-5"
              >
                <template  v-slot:label>
                  <p class="mb-0"><strong>Identity Verification </strong>{{logged_in ?'Upload a picture to verify you work for this company.'
                    :'Register and Upload a picture to verify you work for this company.'}}</p>
                </template>
              </v-radio>
             
               <v-radio 
                value="domain"
                :disabled="unkowndomain"
                class="mb-5"
              >
                <template v-slot:label>
                  <p v-if='!unmatched' class="mb-0"><strong>Domain Verification </strong>
                  {{ unattached && !unkowndomain || !logged_in ? 'Register with an email from the domain above to verify yourself.' 
                  : 'Logout and register with an email from domain above'}}</p>
                  <p v-else class="mb-0"><strong>Domain Verification </strong>
                  Your email matches domain above, continue to claim the organization
                  </p>
                </template>
              </v-radio> 
              <v-radio
                value="duplicate"
              >
                <template v-slot:label>
                  <p class="mb-0"><strong>Duplicate Profile </strong>Let us know why you think its a duplicate</p>
                </template>
              </v-radio>
            </v-radio-group>
            </div>
            <v-row class="align-center">
              <v-col cols="7">
                <p class="small-font mb-0">If it’s a separate company you belong to, you’ll need to make a new account.</p>
              </v-col>
              <v-spacer/>
              <v-col>
                <cb-btn
                  @click="next_step"
                  color="primary"
                  width="134px"
                  height="55px"
                  depressed
                   :disabled="!claim_option"
                >
                  Continue
                </cb-btn>
              </v-col>
            </v-row>
          </div>
          <div v-if="step===2">
            <p class="small-text">Explain why the profile is duplicate or is an issue</p>
            <v-textarea
              counter="2000"
              maxlength="2000"
              no-resize
              v-model="message"
              autofocus
              outlined
              type="text"
              dense
            />
            <div  v-if="!logged_in">
            <p class="small-text">Your Email Address</p>
             <cb-text-field
              v-model="email"
              ref="email"
              outlined
              placeholder="Enter Your Email"
              type="text"
              />
            </div>
            <div class="d-flex flex-row-reverse mt-12">
              <cb-btn
                @click="submit"
                color="primary"
                width="134px"
                height="55px"
                depressed
              >
                Submit
              </cb-btn>
            </div>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
    import CbBtn from "../ui/CbBtn.vue";
    import CbSelect from "../ui/CbSelect.vue";
    import CbTextField from "../ui/CbTextField"
    import { mapState } from "vuex"
    export default {
        props: ["organization", "is_users_parent_org"],
        components: {
            CbBtn,
            CbSelect,
            CbTextField,
        },
        data() {
            return {
                dialog: false,
                step: 1,
                claim_option: null,
                claim_sent: false,
                message: "",
                unattached:true,
                unmatched:false,
                unkowndomain:true,
                logged_in:this.$auth.loggedIn,
                message:null,
                email:null,
            }
        },
          watch: {
            claim_sent() {
                 this.$emit('claimed', this.claim_sent)
            }
        },
        computed: {
            ...mapState({
                user_in_org: state => state.organizations.user_in_organization
            }),
            },
       async  mounted() {
           
            if (this.$route.params.uid) {
                await this.$store.dispatch(
                    "organizations/get_user_in_organization",
                    this.$route.params.uid
                ).then(()=>{
                   this.check_if_unattached()
                   this.check_if_unmatched()
                   this.check_if_claimed()
                   this.check_if_unknown()
                })
            }
          
        },
        methods: {
            open_dialog() {
                this.dialog = true
            },
            close_dialog() {
                this.dialog = false
            },
            next_step() {
                if (this.claim_option === 'duplicate') {
                    this.step = 2
                } else {
                    this.submit()
                }
            },
            checkForm (e) {
                if (this.email && this.message) {
                  return true;
              }
              },
            
            submit() {
                this.claim_sent = true
                
                //this.close_dialog()
                 if (this.claim_option === 'identity') {
                this.$router.push('/idverification/')
                }
                else if (this.claim_option === 'duplicate') {
                //send profile to database
                const email =this.$auth.user ? this.$auth.user.email : this.email
                const payload = {
                  "email":email,
                  "organization":this.organization.id,
                  "reason_why":this.message
                 }
                  try {
                     this.$store.dispatch('organizations/post_profile_duplicate', payload)
                  }
                  catch(err){
                     console.error(err)
                  }
                this.close_dialog()
                }
                else if(this.claim_option === 'domain'){
                  if(this.logged_in && !this.unmatched && this.unattached || !this.logged_in){
                      this.$router.push('/domain/case1/')
                  }
                  else if(this.logged_in && !this.unmatched && !this.unattached ){
                       this.$router.push('/domain/case2/')
                  }
                  else if(this.logged_in && this.unmatched){
                    //make the request to claim the organisation
                    try {
                     this.$store.dispatch('organizations/post_claim_organization', this.organization.id)
                      }
                      catch(err){
                        console.error(err)
                      }
                     this.claim_sent = true
                     this.close_dialog()
                  }
                }
                else{
                  this.close_dialog()
                }
            },
            check_if_unattached () {
                // check if the user is unatacched
               
                if (this.user_in_org && this.$auth.user){                  
                const obj = this.user_in_org?.data.find(o => o.email === this.$auth.user.email);
                if (obj){
                  this.unattached = false
                }
                return this.unattached
                }       
                },
           check_if_unknown () {
                // check if the user is unatacched
                if(this.organization.domain_name){
                          this.unkowndomain = false
                        }
                return this.unkowndomain
                },
           check_if_unmatched() {
                // check if the user is unmatched
                if(this.user_in_org && this.$auth.loggedIn){
                const email_domain = this.organization?.domain_name
                const org_domain = this.$auth.user.domain
                if (email_domain == org_domain){
                  this.unmatched = true

                }
                return this.unmatched
                }
                },
                check_if_claimed(){
                  if(this.organization.organizations_claim.length > 0){
                   if(this.organization.organizations_claim[0].claimed){
                    this.claim_sent =  true
                    }
                  }
                  return this.claim_sent
                }
                
          
        },
    };
</script>

<style lang="stylus" scoped>
    .v-textarea {
        >>> fieldset {
            border: 1px solid var(--v-primary-text-base);
        }
    }

    .claim-btn
        background-color #ED8929 !important
</style>
<template>
    <div>
        <v-row class="mx-12 mt-12 pr-6 flex-column">
            <v-row>
                <v-col class="d-flex align-center">
                    <v-icon class="mx-2">$vuetify.icons.linkage</v-icon>
                    <div class="medium-font">Relationships</div>
                </v-col>
            </v-row>
            <v-container class="mt-4">
                <v-row>
                    <v-col class="d-flex justify-center">
                        <img src="@/assets/images/stock/stock_gold_miner.png" alt="gold miner"/>
                    </v-col>
                    <v-col class="text-center">
                        <div class="medium-font heavy-weight">
                            Add Relationships & Win New Business
                        </div>
                        <div class="small-font my-12">
                            Adding relationships allows you to promote the connections you have in the industry to help
                            win new business.
                        </div>

                        <div class="small-font my-12">
                            Your relationships are private. Customers and prospects can request access
                            that you control.
                        </div>
                        <div class="small-font my-12">
                            Relationships can optionally be verified by the other company. Simply add their email and
                            we’ll take care of the rest.
                        </div>
                        <cb-btn
                            :large="false"
                            @click="$emit('next_step')"
                        >
                            Add Relationships
                        </cb-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </div>
</template>

<script>
    import CbBtn from "../../../ui/CbBtn"
    export default {
        components: { CbBtn },
        data: () => ({})
    }
</script>

<style scoped lang="stylus">

</style>
